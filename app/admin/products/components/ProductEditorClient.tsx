"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Image as ImageIcon, Plus, Trash2, RefreshCw } from "lucide-react"
import { createClient } from '@/services/supabase/client'
import { toast } from 'sonner'
import { generateSlug } from '@/lib/utils'
import { X, UploadCloud } from "lucide-react"
import { revalidateProductPaths } from "../actions"

interface ProductFormData {
  title: string
  description: string
  short_description: string
  price: string
  sale_price: string
  product_type: string
  manage_stock: boolean
  stock_quantity: string
  category_id: string
  status: string
  images: string[]
  glass_type: string
  height: string
  cabin_shape: string
}

export default function ProductEditorClient({
  initialData, 
  globalAttributes = [],
  categories = []
}: { 
  initialData?: any,
  globalAttributes?: any[],
  categories?: any[]
}) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const isEdit = !!initialData

  const formatPrice = (val: string) => {
    const numeric = val.replace(/\D/g, '')
    if (!numeric) return ''
    return new Intl.NumberFormat('tr-TR').format(Number(numeric))
  }

  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.name || initialData?.title || '',
    description: initialData?.description || '',
    short_description: initialData?.short_description || '',
    price: formatPrice(initialData?.price?.toString() || initialData?.base_price?.toString() || ''),
    sale_price: formatPrice(initialData?.sale_price?.toString() || ''),
    product_type: initialData?.product_type || 'simple', 
    manage_stock: initialData?.manage_stock || false,
    stock_quantity: initialData?.stock_quantity?.toString() || '0',
    category_id: initialData?.category_id || '', 
    status: initialData?.status || 'active',
    images: Array.isArray(initialData?.images)
      ? initialData.images.filter((url: unknown): url is string => typeof url === 'string')
      : [],
    glass_type: initialData?.technical_specs?.glassType || 'temperli',
    height: initialData?.technical_specs?.height || 'Standart 190 veya Özel',
    cabin_shape: initialData?.technical_specs?.cabinShape || 'Köşe'
  })

  const [isUploading, setIsUploading] = useState(false)

  // Reverse engineer active attributes and variations from initialData
  const { initialVariations, initialActiveAttributes } = useMemo(() => {
    if (!initialData?.variants || initialData.variants.length === 0) return { initialVariations: [], initialActiveAttributes: [] }
    
    const vars = initialData.variants.map((v: any, index: number) => {
      const display = v.attributes ? Object.values(v.attributes).join(' - ') : v.name.replace(`${initialData.name} - `, '')
      return {
        id: v.id || `temp_${Date.now()}_${index}`,
        display,
        attributes: v.attributes || {},
        price: formatPrice(v.price?.toString() || '0'),
        sale_price: formatPrice(v.sale_price?.toString() || ''),
        stock: v.stock_quantity?.toString() || '0',
        sku: v.sku || ''
      }
    })

    const activeAttrsMap = new Map()
    initialData.variants.forEach((v: any) => {
      if (v.attributes) {
        Object.entries(v.attributes).forEach(([attrSlug, termSlug]) => {
          if (!activeAttrsMap.has(attrSlug)) {
            activeAttrsMap.set(attrSlug, new Set())
          }
          activeAttrsMap.get(attrSlug).add(termSlug)
        })
      }
    })

    const activeAttrs: any[] = []
    activeAttrsMap.forEach((termSlugs, attrSlug) => {
      const globalAttr = globalAttributes.find(a => a.slug === attrSlug)
      if (globalAttr) {
        const selectedTerms = globalAttr.terms?.filter((t: any) => termSlugs.has(t.slug)) || []
        activeAttrs.push({
          ...globalAttr,
          visible: true,
          variation: true,
          selectedTerms
        })
      }
    })

    return { initialVariations: vars, initialActiveAttributes: activeAttrs }
  }, [initialData, globalAttributes])

  // Selected attributes for this product
  const [selectedAttrId, setSelectedAttrId] = useState('')
  const [activeAttributes, setActiveAttributes] = useState<any[]>(initialActiveAttributes)

  // Variations array
  const [variations, setVariations] = useState<any[]>(initialVariations)

  const handleAddAttribute = () => {
    if (!selectedAttrId) return
    const attr = globalAttributes.find(a => a.id === selectedAttrId)
    if (!attr) return
    
    if (activeAttributes.some(a => a.id === selectedAttrId)) {
      toast.error("Bu nitelik zaten ekli!")
      return
    }

    // By default, start with NO terms selected so the user can pick them
    setActiveAttributes([...activeAttributes, {
      ...attr,
      visible: true,
      variation: true,
      selectedTerms: [] 
    }])
    setSelectedAttrId('')
  }

  const toggleTerm = (attrId: string, term: any) => {
    setActiveAttributes(prev => prev.map(a => {
      if (a.id !== attrId) return a
      const hasTerm = a.selectedTerms.some((t:any) => t.id === term.id)
      if (hasTerm) {
        return { ...a, selectedTerms: a.selectedTerms.filter((t:any) => t.id !== term.id) }
      } else {
        return { ...a, selectedTerms: [...a.selectedTerms, term] }
      }
    }))
  }

  const selectAllTerms = (attrId: string) => {
    setActiveAttributes(prev => prev.map(a => {
      if (a.id !== attrId) return a
      return { ...a, selectedTerms: a.terms || [] }
    }))
  }

  const handleRemoveAttribute = (id: string) => {
    setActiveAttributes(activeAttributes.filter(a => a.id !== id))
  }

  // Generate variations Cartesian product
  const handleGenerateVariations = () => {
    const variationAttrs = activeAttributes.filter(a => a.variation)
    if (variationAttrs.length === 0) {
      toast.error("Varyasyon oluşturmak için varyasyon olarak işaretlenmiş nitelik olmalı.")
      return
    }

    // Example: [ {name: 'Color', terms: [{slug:'red'}, {slug:'blue'}]}, {name: 'Size', terms: [{slug:'M'}]} ]
    // Cartesian Product
    let combinations: any[][] = [[]]
    for (const attr of variationAttrs) {
      const temp: any[][] = []
      for (const combo of combinations) {
        for (const term of attr.selectedTerms) {
          temp.push([...combo, { [attr.slug]: term.slug, _termName: term.name }])
        }
      }
      combinations = temp
    }

    const newVariations = combinations.map((combo, index) => {
      // Flatten combo array to single object
      const attrObj = combo.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      // Extract _termName for display
      const displayNames = combo.map(c => c._termName).join(' - ')
      
      // Clean up _termName from the actual attribute storage
      const finalAttrs = { ...attrObj }
      for (const key in finalAttrs) {
        if (key === '_termName') delete finalAttrs[key]
      }

      return {
        id: `temp_${Date.now()}_${index}`,
        display: displayNames,
        attributes: finalAttrs,
        price: formData.price || '0',
        sale_price: '',
        stock: '0',
        sku: `SKU-${Math.floor(Math.random() * 10000)}`
      }
    })

    // Add new variations to the existing list, or replace them? 
    // Usually generating replaces all or appends. Let's replace for simplicity.
    setVariations(newVariations)
    toast.success(`${newVariations.length} varyasyon başarıyla üretildi!`)
  }

  const handleRemoveVariation = (id: string) => {
    setVariations(variations.filter(v => v.id !== id))
  }

  const handleVariationChange = (id: string, field: string, value: string) => {
    setVariations(variations.map(v => v.id === id ? { ...v, [field]: value } : v))
  }

  const handleSave = async (status: string) => {
    if (!formData.title) {
      toast.error("Lütfen ürün adını giriniz.")
      return
    }

    setIsSaving(true)
    const supabase = createClient()
    const slug = generateSlug(formData.title)

    const payload = {
      name: formData.title,
      slug: slug,
      description: formData.description,
      short_description: formData.short_description,
      base_price: formData.price ? Number(formData.price.replace(/\./g, '')) : null,
      sale_price: formData.sale_price ? Number(formData.sale_price.replace(/\./g, '')) : null,
      product_type: formData.product_type,
      manage_stock: formData.manage_stock,
      stock_quantity: Number(formData.stock_quantity),
      category_id: formData.category_id || null,
      status: status,
      images: formData.images,
      technical_specs: {
        glassType: formData.glass_type,
        height: formData.height,
        cabinShape: formData.cabin_shape,
        layoutType: initialData?.technical_specs?.layoutType || 'Standart'
      }
    }

    try {
      let productId = initialData?.id

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('products')
          .update(payload)
          .eq('id', productId)
        if (updateError) throw updateError
      } else {
        const { data, error: insertError } = await supabase
          .from('products')
          .insert({ ...payload, sku: 'PRD-' + Math.floor(Math.random() * 10000) })
          .select()
          .single()
        
        if (insertError) throw insertError
        productId = data.id
      }

      // Save Variations if product is variable
      if (formData.product_type === 'variable' && variations.length > 0) {
        // We delete old ones first for simplicity (or we can upsert if we track IDs properly)
        await supabase.from('product_variants').delete().eq('product_id', productId)

        const varPayloads = variations.map(v => ({
          product_id: productId,
          name: `${formData.title} - ${v.display}`,
          sku: v.sku,
          price: v.price ? Number(v.price.replace(/\./g, '')) : 0,
          sale_price: v.sale_price ? Number(v.sale_price.replace(/\./g, '')) : null,
          stock_quantity: Number(v.stock),
          attributes: v.attributes,
          status: 'active'
        }))

        const { error: varError } = await supabase.from('product_variants').insert(varPayloads)
        if (varError) throw varError
      }

      // Revalidate cache for list and product details
      const category = categories.find(c => c.id === formData.category_id)
      const categorySlug = category?.slug
      await revalidateProductPaths(categorySlug, slug)

      toast.success(isEdit ? 'Ürün başarıyla güncellendi.' : 'Yeni ürün başarıyla eklendi.')
      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      toast.error('Kaydedilirken hata oluştu: ' + err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const supabase = createClient();
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('products')
          .upload(fileName, file);
          
        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);
          
        uploadedUrls.push(publicUrlData.publicUrl);
      }
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));
      toast.success(`${uploadedUrls.length} görsel yüklendi.`);
    } catch (error: any) {
      toast.error('Görsel yüklenemedi: ' + error.message);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h1>
            <p className="text-sm text-gray-500">Kapsamlı ürün yönetimi (WooCommerce stili).</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            disabled={isSaving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
          >
            Taslak Kaydet
          </button>
          <button 
            disabled={isSaving}
            onClick={() => handleSave('active')}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 shadow-sm disabled:opacity-50"
          >
            {isSaving ? <RefreshCw className="size-4 animate-spin" /> : <Save className="size-4" />}
            {isSaving ? 'Kaydediliyor...' : (isEdit ? 'Güncelle' : 'Yayımla')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Ürün Adı (Örn: Minimalist Banyo Dolabı)" 
                className="w-full px-4 py-3 text-lg font-medium border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 outline-none text-black placeholder:font-normal" 
              />
            </div>
            <div>
              <textarea 
                rows={4} 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detaylı ürün açıklaması..."
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 outline-none resize-y text-black"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-56 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
              <div className="p-3 font-semibold text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200 bg-gray-100 flex items-center justify-between">
                <span>Ürün Verisi</span>
                <select 
                  value={formData.product_type}
                  onChange={e => setFormData({...formData, product_type: e.target.value})}
                  className="bg-transparent font-medium text-black border-none outline-none text-xs text-right cursor-pointer"
                >
                  <option value="simple">Basit Ürün</option>
                  <option value="variable">Varyasyonlu</option>
                </select>
              </div>
              <ul className="flex flex-row md:flex-col overflow-x-auto">
                <li key="general">
                  <button onClick={() => setActiveTab('general')} className={`w-full text-left px-4 py-3 text-sm font-medium border-l-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'general' ? 'bg-white border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                    Genel
                  </button>
                </li>
                <li key="attributes">
                  <button onClick={() => setActiveTab('attributes')} className={`w-full text-left px-4 py-3 text-sm font-medium border-l-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'attributes' ? 'bg-white border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                    Nitelikler
                  </button>
                </li>
                {formData.product_type === 'variable' && (
                  <li key="variations">
                    <button onClick={() => setActiveTab('variations')} className={`w-full text-left px-4 py-3 text-sm font-medium border-l-2 whitespace-nowrap flex items-center gap-2 ${activeTab === 'variations' ? 'bg-white border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                      Varyasyonlar
                    </button>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="flex-1 p-6 min-h-[400px]">
              {/* GENERAL TAB */}
              {activeTab === 'general' && (
                <div className="space-y-5">
                  {formData.product_type === 'simple' && (
                    <>
                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-sm font-medium text-gray-700">Normal Fiyat (₺)</label>
                        <input 
                          type="text" 
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: formatPrice(e.target.value)})}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black max-w-xs" 
                          placeholder="Örn: 8.500" 
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="w-1/3 text-sm font-medium text-gray-700">İndirimli Fiyat (₺)</label>
                        <input 
                          type="text" 
                          value={formData.sale_price}
                          onChange={e => setFormData({...formData, sale_price: formatPrice(e.target.value)})}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black max-w-xs" 
                          placeholder="İsteğe bağlı" 
                        />
                      </div>
                    </>
                  )}
                  {formData.product_type === 'variable' && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      Varyasyonlu ürünler için fiyatlar <strong>Varyasyonlar</strong> sekmesinden ayarlanır.
                    </div>
                  )}
                </div>
              )}



              {/* ATTRIBUTES TAB */}
              {activeTab === 'attributes' && (
                <div className="space-y-6">
                  {globalAttributes.length === 0 && (
                    <div className="p-4 bg-orange-50 text-orange-800 text-sm rounded-lg border border-orange-100">
                      Sistemde henüz kayıtlı Global Nitelik yok. Önce "Nitelikler" menüsünden Nitelik eklemelisiniz.
                    </div>
                  )}
                  <div className="flex gap-2">
                    <select 
                      value={selectedAttrId}
                      onChange={e => setSelectedAttrId(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-sm text-black"
                    >
                      <option value="">Mevcut Nitelik Seçin...</option>
                      {globalAttributes.map(attr => (
                        <option key={attr.id} value={attr.id}>{attr.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={handleAddAttribute}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-200"
                    >
                      Ekle
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeAttributes.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-lg">Henüz bu ürüne nitelik eklenmedi.</p>
                    )}
                    {activeAttributes.map((attr) => (
                      <div key={attr.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center cursor-pointer">
                          <span className="font-semibold text-sm text-gray-800">{attr.name}</span>
                          <button onClick={() => handleRemoveAttribute(attr.id)} className="text-red-500 hover:text-red-700 text-sm">Kaldır</button>
                        </div>
                        <div className="p-4 bg-white space-y-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="text-xs font-medium text-gray-500">Kullanılacak Değerler (Bu ürüne özel):</label>
                              <button 
                                onClick={() => selectAllTerms(attr.id)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Tümünü Seç
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {attr.terms?.map((term: any) => {
                                const isSelected = attr.selectedTerms.some((t:any) => t.id === term.id)
                                return (
                                  <label 
                                    key={term.id} 
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                  >
                                    <input 
                                      type="checkbox" 
                                      checked={isSelected}
                                      onChange={() => toggleTerm(attr.id, term)}
                                      className="hidden"
                                    />
                                    {term.name}
                                  </label>
                                )
                              })}
                              {(!attr.terms || attr.terms.length === 0) && (
                                <span className="text-xs text-red-500">Bu niteliğe ait hiç değer bulunamadı. Önce "Nitelikler" menüsünden değer ekleyin.</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input 
                                type="checkbox" 
                                checked={attr.visible} 
                                onChange={e => setActiveAttributes(activeAttributes.map(a => a.id === attr.id ? {...a, visible: e.target.checked} : a))}
                                className="size-4" 
                              /> 
                              Ürün sayfasında görünür
                            </label>
                            {formData.product_type === 'variable' && (
                              <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input 
                                  type="checkbox" 
                                  checked={attr.variation} 
                                  onChange={e => setActiveAttributes(activeAttributes.map(a => a.id === attr.id ? {...a, variation: e.target.checked} : a))}
                                  className="size-4" 
                                /> 
                                Varyasyonlar için kullanılır
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VARIATIONS TAB */}
              {activeTab === 'variations' && formData.product_type === 'variable' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Niteliklerden otomatik kombinasyonlar üretir.</p>
                    <button 
                      onClick={handleGenerateVariations}
                      className="px-4 py-2 bg-blue-50 border border-blue-200 text-sm font-medium rounded-lg text-blue-700 hover:bg-blue-100"
                    >
                      Tüm Niteliklerden Varyasyon Üret
                    </button>
                  </div>

                  <div className="space-y-4">
                    {variations.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4 border border-dashed rounded-lg">Varyasyon bulunmuyor. Nitelikleri ekleyip "Üret" butonuna basın.</p>
                    )}
                    {variations.map((v, i) => (
                      <div key={v.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <div className="flex gap-4">
                            <span className="font-semibold text-sm text-gray-800">#{i+1}</span>
                            <span className="text-sm text-gray-600 font-medium">
                              {v.display}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-bold text-gray-900">{v.price} ₺</span>
                            <button onClick={() => handleRemoveVariation(v.id)} className="text-red-500 hover:text-red-700"><Trash2 className="size-4"/></button>
                          </div>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4 bg-white">
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Normal Fiyat</label>
                            <input type="text" value={v.price} onChange={e => handleVariationChange(v.id, 'price', formatPrice(e.target.value))} className="w-full px-3 py-1.5 border border-gray-200 rounded-md outline-none text-sm text-black" />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">İndirimli Fiyat</label>
                            <input type="text" value={v.sale_price} onChange={e => handleVariationChange(v.id, 'sale_price', formatPrice(e.target.value))} className="w-full px-3 py-1.5 border border-gray-200 rounded-md outline-none text-sm text-black" />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-xs font-medium text-gray-500 mb-1">SKU (Opsiyonel)</label>
                            <input type="text" value={v.sku} onChange={e => handleVariationChange(v.id, 'sku', e.target.value)} className="w-full px-3 py-1.5 border border-gray-200 rounded-md outline-none text-sm text-black" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Ürün Kısa Açıklaması</h3>
            <textarea 
              rows={3} 
              value={formData.short_description}
              onChange={e => setFormData({...formData, short_description: e.target.value})}
              placeholder="Ürün sayfasında fiyatın altında görünecek kısa özet..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 outline-none resize-none text-black"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Kategori Seçimi</h3>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    value={cat.id}
                    checked={formData.category_id === cat.id}
                    onChange={e => setFormData({...formData, category_id: e.target.value})}
                    className="size-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-black">
                    {cat.name}
                    {cat.parent_category && <span className="text-xs text-gray-400 ml-1">(Alt Kategori)</span>}
                  </span>
                </label>
              ))}
              {categories.length === 0 && (
                <p className="text-sm text-gray-500">Henüz kategori bulunmuyor.</p>
              )}
            </div>
          </div>

          {/* Cam Tipi & Yükseklik Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-950 border-b border-gray-100 pb-2">Cam Tipi & Yükseklik</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Kabin Cam Tipi</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData, 
                      glass_type: 'temperli',
                      height: 'Standart 190 veya Özel'
                    })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center cursor-pointer transition-colors ${formData.glass_type === 'temperli' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                  >
                    Temperli Cam
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData, 
                      glass_type: 'mika',
                      height: '180'
                    })}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center cursor-pointer transition-colors ${formData.glass_type === 'mika' ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                  >
                    Mika Cam
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Cam Yüksekliği (cm)</label>
                {formData.glass_type === 'temperli' ? (
                  <select
                    value={formData.height}
                    onChange={e => setFormData({...formData, height: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm text-black bg-white"
                  >
                    <option value="Standart 190 veya Özel">Standart 190 veya Özel</option>
                    <option value="Standart 190">Standart 190</option>
                    <option value="Tavana Kadar Özel">Tavana Kadar Özel</option>
                  </select>
                ) : (
                  <select
                    value={formData.height}
                    onChange={e => setFormData({...formData, height: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm text-black bg-white"
                  >
                    <option value="180">Standart 180</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Kabin Şekli Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-950 border-b border-gray-100 pb-2">Kabin Şekli</h3>
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Görseldeki Kabin Şekli</label>
              <select
                value={formData.cabin_shape}
                onChange={e => setFormData({...formData, cabin_shape: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-sm text-black bg-white"
              >
                <option value="Köşe">Köşe</option>
                <option value="Oval">Oval</option>
                <option value="İki Duvar Arası">İki Duvar Arası</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Yayınla</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'active'}
                  onChange={() => setFormData({...formData, status: 'active'})}
                  className="text-blue-600 size-4" 
                />
                Yayında
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'draft'}
                  onChange={() => setFormData({...formData, status: 'draft'})}
                  className="text-blue-600 size-4" 
                />
                Taslak (Gizli)
              </label>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Ürün Görselleri</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {formData.images.map((img: string, idx: number) => (
                <div key={idx} className={`relative aspect-square rounded-lg overflow-hidden border border-gray-200 group ${idx === 0 ? 'col-span-2' : ''}`}>
                  <img src={img} alt={`Görsel ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-md font-medium tracking-wide">ANA GÖRSEL</div>
                  )}
                  <button 
                    onClick={() => removeImage(idx)}
                    className="absolute top-2 right-2 size-6 bg-red-500/90 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <label className={`w-full aspect-[2/1] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer text-gray-500 ${isUploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}`}>
              <input 
                type="file" 
                multiple 
                accept="image/png, image/jpeg, image/webp" 
                onChange={handleImageUpload}
                disabled={isUploading}
                className="hidden" 
              />
              {isUploading ? (
                <>
                  <RefreshCw className="size-6 animate-spin text-blue-500" />
                  <span className="text-sm font-medium text-blue-600">Yükleniyor...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="size-6" />
                  <span className="text-sm font-medium">Görsel Yükle</span>
                </>
              )}
            </label>
            <p className="text-xs text-gray-400 text-center">PNG, JPG, WEBP (Maks. 10MB)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
