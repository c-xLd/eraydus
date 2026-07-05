import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft, Check, Smartphone, Settings2, Info } from 'lucide-react';
import { NEW_CONFIGURATOR_DATA } from '../configuratorData';
import { cn } from '../lib/utils';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n/useTranslation';
import { useSearchParams } from 'react-router-dom';

import { useStore } from '../store/useStore';

type ConfigState = {
  layoutId: string | null;
  collectionId: string | null;
  modelId: string | null;
  width: number;
  height: number;
  glassId: string | null;
  thicknessId: string | null;
  profileId: string | null;
  doorId: string | null;
  directionId: string | null;
  handleId: string | null;
  accessoryIds: string[];
  installationId: string | null;
  warrantyId: string | null;
};

export default function Configurator() {
  const { language } = useTranslation();
  const [searchParams] = useSearchParams();
  const t = (tr: string, en: string) => language === 'tr' ? tr : en;

  const { addQuoteRequest } = useStore();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCity, setCustomerCity] = useState('İstanbul');
  const [projectType, setProjectType] = useState('Residential');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const STEPS = [
    { id: 'layout', title: t('Yerleşim', 'Layout') },
    { id: 'collection', title: t('Koleksiyon', 'Collection') },
    { id: 'model', title: t('Model', 'Model') },
    { id: 'measurements', title: t('Ölçüler', 'Measurements') },
    { id: 'glass', title: t('Cam Seçimi', 'Glass Selection') },
    { id: 'thickness', title: t('Cam Kalınlığı', 'Glass Thickness') },
    { id: 'profile', title: t('Profil Rengi', 'Profile Color') },
    { id: 'door', title: t('Kapı Sistemi', 'Door System') },
    { id: 'direction', title: t('Açılış Yönü', 'Opening Direction') },
    { id: 'handle', title: t('Kulp Seçimi', 'Handle Selection') },
    { id: 'accessories', title: t('Aksesuarlar', 'Accessories') },
    { id: 'installation', title: t('Kurulum', 'Installation') },
    { id: 'warranty', title: t('Garanti', 'Warranty') },
    { id: 'review', title: t('Sipariş Özeti', 'Review') },
  ];

  const initialModelId = searchParams.get('model') || 'aura';
  const initialCollectionId = NEW_CONFIGURATOR_DATA.models.find(m => m.id === initialModelId)?.collectionId || 'premium';

  const [currentStepIndex, setCurrentStepIndex] = useState(searchParams.has('model') ? 3 : 0);
  const [config, setConfig] = useState<ConfigState>({
    layoutId: 'wall-to-wall',
    collectionId: initialCollectionId,
    modelId: initialModelId,
    width: 120,
    height: 200,
    glassId: 'transparent',
    thicknessId: '8mm',
    profileId: 'chrome',
    doorId: 'sliding',
    directionId: 'left',
    handleId: 'minimal',
    accessoryIds: [],
    installationId: 'delivery',
    warrantyId: '2years',
  });

  const updateConfig = (key: keyof ConfigState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const toggleAccessory = (id: string) => {
    setConfig(prev => {
      const exists = prev.accessoryIds.includes(id);
      if (exists) {
        return { ...prev, accessoryIds: prev.accessoryIds.filter(a => a !== id) };
      }
      return { ...prev, accessoryIds: [...prev.accessoryIds, id] };
    });
  };

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) setCurrentStepIndex(prev => prev + 1);
  };
  const prevStep = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  };
  const setStep = (idx: number) => {
    if (idx >= 0 && idx < STEPS.length) setCurrentStepIndex(idx);
  };

  // Derived selections
  const layout = NEW_CONFIGURATOR_DATA.layouts.find(x => x.id === config.layoutId);
  const collection = NEW_CONFIGURATOR_DATA.collections.find(x => x.id === config.collectionId);
  const model = NEW_CONFIGURATOR_DATA.models.find(x => x.id === config.modelId);
  const glass = NEW_CONFIGURATOR_DATA.glassTypes.find(x => x.id === config.glassId);
  const thickness = NEW_CONFIGURATOR_DATA.glassThickness.find(x => x.id === config.thicknessId);
  const profile = NEW_CONFIGURATOR_DATA.profileColors.find(x => x.id === config.profileId);
  const door = NEW_CONFIGURATOR_DATA.doorSystems.find(x => x.id === config.doorId);
  const direction = NEW_CONFIGURATOR_DATA.openingDirections.find(x => x.id === config.directionId);
  const handle = NEW_CONFIGURATOR_DATA.handles.find(x => x.id === config.handleId);
  const accessories = NEW_CONFIGURATOR_DATA.accessories.filter(x => config.accessoryIds.includes(x.id));
  const installation = NEW_CONFIGURATOR_DATA.installations.find(x => x.id === config.installationId);
  const warranty = NEW_CONFIGURATOR_DATA.warranties.find(x => x.id === config.warrantyId);

  const totalPrice = useMemo(() => {
    let total = 0;
    if (collection) total += collection.basePrice;
    if (glass) total += glass.price;
    if (thickness) total += thickness.price;
    if (profile) total += profile.price;
    if (door) total += door.price;
    if (handle) total += handle.price;
    accessories.forEach(a => total += a.price);
    if (installation) total += installation.price;
    if (warranty) total += warranty.price;
    if (config.width > 120) total += (config.width - 120) * 20;
    if (config.height > 200) total += (config.height - 200) * 30;
    return total;
  }, [collection, glass, thickness, profile, door, handle, accessories, installation, warranty, config.width, config.height]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    setIsSubmitting(true);
    
    // Save to store CRM
    const quoteId = addQuoteRequest({
      name: customerName,
      phone: customerPhone,
      email: customerEmail || 'no-email@eraydus.com',
      city: customerCity,
      projectType: projectType,
      model: model?.name || '-',
      dimensions: `${config.width}x${config.height}`,
      glass: glass ? (language === 'tr' ? glass.nameTr : glass.name) : '-',
      profile: profile ? (language === 'tr' ? profile.nameTr : profile.name) : '-',
      installation: installation ? (language === 'tr' ? installation.nameTr : installation.name) : '-',
      price: totalPrice,
      status: 'New',
      notes: 'Web showroom yapılandırıcısı üzerinden oluşturulan otomatik kayıt.'
    });

    // Create custom proposal file (for user download)
    const textContent = `
============================================================
              ERAYDUŞ DIJITAL DENEYIM SHOWROOM
                    TEKLİF FORMU & ÖZETİ
============================================================
Teklif ID: ${quoteId}
Tarih: ${new Date().toLocaleDateString('tr-TR')}
Müşteri: ${customerName}
Telefon: ${customerPhone}
Şehir: ${customerCity}
E-posta: ${customerEmail || '-'}
Proje Tipi: ${projectType}

------------------------------------------------------------
YAPILANDIRMA DETAYLARI:
------------------------------------------------------------
Koleksiyon: ${collection?.nameTr || collection?.name || '-'}
Model: ${model?.nameTr || model?.name || '-'}
Ölçüler: ${config.width}cm x ${config.height}cm
Cam Tipi: ${glass?.nameTr || glass?.name || '-'} (${thickness?.name || '-'})
Profil Rengi: ${profile?.nameTr || profile?.name || '-'}
Kapı Sistemi: ${door?.nameTr || door?.name || '-'}
Açılış Yönü: ${direction?.nameTr || direction?.name || '-'}
Kulp Tipi: ${handle?.nameTr || handle?.name || '-'}
Kurulum: ${installation?.nameTr || installation?.name || '-'}
Garanti: ${warranty?.nameTr || warranty?.name || '-'}
Ek Aksesuarlar: ${accessories.map(a => a.nameTr || a.name).join(', ') || 'Yok'}

------------------------------------------------------------
FİYAT VE ÖDEME:
------------------------------------------------------------
Tahmini Tutar: ₺${totalPrice.toLocaleString('tr-TR')} (KDV Dahil)

------------------------------------------------------------
AÇIKLAMALAR & SONRAKİ ADIMLAR:
1. Bu teklif dijital showroom üzerinden otomatik oluşturulmuştur.
2. Mimari ekibimiz net ölçü keşfi ve renk teyidi için sizinle iletişime geçecektir.
3. Onayınızı takiben üretim süresi 14 iş günüdür.

ERAYDUŞ Dijital Showroom Hizmetleri
Esentepe, Şişli, İstanbul, Türkiye
www.eraydus.com
============================================================
`;
    
    // Trigger download of plain-text proposal (representing a formal PDF)
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `eraydus_teklif_${quoteId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Open WhatsApp Message
    const text = language === 'tr' ? 
      `Merhaba Erayduş Ekibi,%0A%0AÖzel bir duşakabin yapılandırması oluşturdum.%0A%0A*Teklif ID:* ${quoteId}\n*Müşteri:* ${customerName}\n*Model:* ${model?.nameTr || '-'}\n*Ölçüler:* ${config.width}cm x ${config.height}cm\n*Cam:* ${glass?.nameTr || '-'} (${thickness?.name || '-'})\n*Profil:* ${profile?.nameTr || '-'}\n*Kurulum:* ${installation?.nameTr || '-'}\n%0A*Tahmini Tutar:* ₺${totalPrice.toLocaleString('tr-TR')}%0A%0ALütfen benimle iletişime geçin.`
      : `Hello Erayduş Team,%0A%0AI have created a custom shower cabin configuration.%0A%0A*Quote ID:* ${quoteId}\n*Customer:* ${customerName}\n*Model:* ${model?.name || '-'}\n*Dimensions:* ${config.width}cm x ${config.height}cm\n*Glass:* ${glass?.name || '-'} (${thickness?.name || '-'})\n*Profile:* ${profile?.name || '-'}\n*Installation:* ${installation?.name || '-'}\n%0A*Estimated Total:* ₺${totalPrice.toLocaleString('tr-TR')}%0A%0APlease contact me.`;
    
    setTimeout(() => {
      window.open(`https://wa.me/905555555555?text=${text}`, '_blank');
      setIsSubmitting(false);
      setShowQuoteModal(false);
    }, 800);
  };

  // Render Step Content
  const renderStepContent = () => {
    switch (currentStepIndex) {
      case 0: return ( // Layout
        <div className="grid grid-cols-2 gap-4">
          {NEW_CONFIGURATOR_DATA.layouts.map(item => (
            <button key={item.id} onClick={() => { updateConfig('layoutId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border text-left transition-all flex flex-col gap-3", config.layoutId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="aspect-video bg-black/5 rounded-lg overflow-hidden relative">
                <img src={item.image} className="w-full h-full object-cover" alt=""/>
              </div>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
            </button>
          ))}
        </div>
      );
      case 1: return ( // Collection
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.collections.map(item => (
            <button key={item.id} onClick={() => { updateConfig('collectionId', item.id); nextStep(); }}
              className={cn("p-5 rounded-xl border w-full text-left transition-all", config.collectionId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium text-lg">{t(item.nameTr, item.name)}</span>
                <span className="text-sm">₺{item.basePrice.toLocaleString('tr-TR')}</span>
              </div>
              <p className="text-sm text-black/60">{t(item.descTr, item.desc)}</p>
            </button>
          ))}
        </div>
      );
      case 2: return ( // Model
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.models.filter(m => m.collectionId === config.collectionId).map(item => (
            <button key={item.id} onClick={() => { updateConfig('modelId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border text-left w-full transition-all flex items-center gap-4", config.modelId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="w-24 h-24 bg-black/5 rounded-lg overflow-hidden shrink-0">
                 <img src={item.image} className="w-full h-full object-cover" alt=""/>
              </div>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
            </button>
          ))}
          {NEW_CONFIGURATOR_DATA.models.filter(m => m.collectionId === config.collectionId).length === 0 && (
             <p className="text-sm text-black/50">{t('Bu koleksiyonda model bulunmuyor.', 'No models in this collection.')}</p>
          )}
        </div>
      );
      case 3: return ( // Measurements
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t('Genişlik (cm)', 'Width (cm)')}</label>
            <input type="range" min="80" max="200" value={config.width} onChange={e => updateConfig('width', Number(e.target.value))} className="w-full accent-black"/>
            <div className="text-right font-medium mt-1">{config.width} cm</div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('Yükseklik (cm)', 'Height (cm)')}</label>
            <input type="range" min="180" max="240" value={config.height} onChange={e => updateConfig('height', Number(e.target.value))} className="w-full accent-black"/>
            <div className="text-right font-medium mt-1">{config.height} cm</div>
          </div>
          <button onClick={nextStep} className="w-full py-4 bg-black text-white rounded-full font-medium">{t('Onayla', 'Confirm')}</button>
        </div>
      );
      case 4: return ( // Glass
        <div className="grid grid-cols-2 gap-4">
          {NEW_CONFIGURATOR_DATA.glassTypes.map(item => (
            <button key={item.id} onClick={() => { updateConfig('glassId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border transition-all text-left", config.glassId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="font-medium mb-1">{t(item.nameTr, item.name)}</div>
              <div className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</div>
            </button>
          ))}
        </div>
      );
      case 5: return ( // Thickness
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.glassThickness.map(item => (
            <button key={item.id} onClick={() => { updateConfig('thicknessId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.thicknessId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</span>
            </button>
          ))}
        </div>
      );
      case 6: return ( // Profile
        <div className="grid grid-cols-2 gap-4">
          {NEW_CONFIGURATOR_DATA.profileColors.map(item => (
            <button key={item.id} onClick={() => { updateConfig('profileId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border transition-all text-left", config.profileId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="w-8 h-8 rounded-full shadow-inner mb-3 border border-black/10" style={{ backgroundColor: item.hex }}></div>
              <div className="font-medium">{t(item.nameTr, item.name)}</div>
              <div className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</div>
            </button>
          ))}
        </div>
      );
      case 7: return ( // Door
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.doorSystems.map(item => (
            <button key={item.id} onClick={() => { updateConfig('doorId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.doorId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
              <span className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</span>
            </button>
          ))}
        </div>
      );
      case 8: return ( // Direction
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.openingDirections.map(item => (
            <button key={item.id} onClick={() => { updateConfig('directionId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all", config.directionId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
            </button>
          ))}
        </div>
      );
      case 9: return ( // Handle
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.handles.map(item => (
            <button key={item.id} onClick={() => { updateConfig('handleId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.handleId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
              <span className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</span>
            </button>
          ))}
        </div>
      );
      case 10: return ( // Accessories
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.accessories.map(item => (
            <button key={item.id} onClick={() => toggleAccessory(item.id)}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.accessoryIds.includes(item.id) ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <div className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-md border flex items-center justify-center", config.accessoryIds.includes(item.id) ? "bg-black border-black text-white" : "border-black/30")}>
                  {config.accessoryIds.includes(item.id) && <Check className="w-3 h-3"/>}
                </div>
                <span className="font-medium">{t(item.nameTr, item.name)}</span>
              </div>
              <span className="text-sm text-black/60">+₺{item.price}</span>
            </button>
          ))}
          <button onClick={nextStep} className="w-full py-4 bg-black text-white rounded-full font-medium mt-4">{t('Devam Et', 'Continue')}</button>
        </div>
      );
      case 11: return ( // Installation
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.installations.map(item => (
            <button key={item.id} onClick={() => { updateConfig('installationId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.installationId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
              <span className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</span>
            </button>
          ))}
        </div>
      );
      case 12: return ( // Warranty
        <div className="space-y-4">
          {NEW_CONFIGURATOR_DATA.warranties.map(item => (
            <button key={item.id} onClick={() => { updateConfig('warrantyId', item.id); nextStep(); }}
              className={cn("p-4 rounded-xl border w-full text-left transition-all flex justify-between", config.warrantyId === item.id ? "border-black shadow-md bg-white" : "border-black/10 hover:border-black/30")}>
              <span className="font-medium">{t(item.nameTr, item.name)}</span>
              <span className="text-sm text-black/60">{item.price === 0 ? t('Dahil', 'Included') : `+₺${item.price}`}</span>
            </button>
          ))}
        </div>
      );
      case 13: return ( // Review
        <div className="space-y-6 text-sm">
          <div className="p-6 bg-black/5 rounded-2xl space-y-4">
            <div className="flex justify-between pb-4 border-b border-black/10">
              <span className="text-black/60">{t('Model', 'Model')}</span>
              <span className="font-medium">{model?.name || '-'}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-black/10">
              <span className="text-black/60">{t('Ölçüler', 'Dimensions')}</span>
              <span className="font-medium">{config.width} x {config.height}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-black/10">
              <span className="text-black/60">{t('Cam', 'Glass')}</span>
              <span className="font-medium">{t(glass?.nameTr || '', glass?.name || '')} ({thickness?.name})</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-black/10">
              <span className="text-black/60">{t('Profil', 'Profile')}</span>
              <span className="font-medium">{t(profile?.nameTr || '', profile?.name || '')}</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-black/10">
              <span className="text-black/60">{t('Kurulum', 'Installation')}</span>
              <span className="font-medium">{t(installation?.nameTr || '', installation?.name || '')}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="font-medium uppercase tracking-wider">{t('Toplam', 'Total')}</span>
              <span className="font-medium text-2xl">₺{totalPrice.toLocaleString('tr-TR')}</span>
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-[#f8f9fa] font-sans relative pt-[80px] lg:pt-0">
      <Helmet>
        <title>{t('Yapılandırıcı | ERAYDUŞ', 'Configurator | ERAYDUŞ')}</title>
      </Helmet>
      
      <button onClick={() => window.history.back()} className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-md hover:scale-105 transition-transform hidden lg:flex">
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* LEFT PANEL - STEPS (30%) */}
      <div className="w-full lg:w-[30%] lg:h-full bg-white flex flex-col border-r border-black/5 z-20 shadow-xl lg:shadow-none lg:pt-[80px]">
        <div className="p-6 border-b border-black/5 shrink-0">
          <h1 className="text-2xl font-medium tracking-tight mb-1">{t('Tasarım Stüdyosu', 'Design Studio')}</h1>
          <p className="text-sm text-black/50">{t('Adım', 'Step')} {currentStepIndex + 1} / {STEPS.length}</p>
        </div>
        
        {/* Step Navigation / Wizard Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-medium mb-6">{STEPS[currentStepIndex].title}</h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="p-4 border-t border-black/5 shrink-0 flex justify-between items-center bg-white lg:hidden">
           <button onClick={prevStep} disabled={currentStepIndex === 0} className="p-3 rounded-full hover:bg-black/5 disabled:opacity-30">
             <ArrowLeft className="w-5 h-5"/>
           </button>
           <div className="font-medium">
             ₺{totalPrice.toLocaleString('tr-TR')}
           </div>
           {currentStepIndex < STEPS.length - 1 ? (
             <button onClick={nextStep} className="p-3 bg-black text-white rounded-full">
               <ChevronRight className="w-5 h-5"/>
             </button>
           ) : (
             <button onClick={() => setShowQuoteModal(true)} className="p-3 bg-[#25D366] text-white rounded-full flex items-center justify-center">
               <Smartphone className="w-5 h-5" />
             </button>
           )}
        </div>
      </div>

      {/* CENTER PANEL - 3D VISUALIZATION (45%) */}
      <div className="w-full lg:w-[45%] h-[40vh] lg:h-full bg-[#ebebeb] relative overflow-hidden flex flex-col justify-center items-center order-first lg:order-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent z-0"></div>
        <AnimatePresence mode="wait">
          <motion.img 
            key={model?.image || layout?.image}
            src={model?.image || layout?.image} 
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
            alt="Preview"
          />
        </AnimatePresence>
        
        {/* Interactive Overlays / Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
           {STEPS.map((s, i) => (
             <button key={s.id} onClick={() => setStep(i)} className={cn("w-2 h-2 rounded-full transition-all", currentStepIndex === i ? "bg-black w-6" : "bg-black/20 hover:bg-black/40")} />
           ))}
        </div>
      </div>

      {/* RIGHT PANEL - SUMMARY & CTA (25%) */}
      <div className="hidden lg:flex lg:w-[25%] lg:h-full bg-white flex-col border-l border-black/5 z-20 lg:pt-[80px]">
        <div className="p-8 flex-1 overflow-y-auto no-scrollbar">
          <h3 className="text-sm font-medium uppercase tracking-widest text-black/40 mb-8">{t('Özet', 'Summary')}</h3>
          
          <div className="space-y-6 text-sm">
            <div>
              <div className="text-black/50 mb-1">{t('Koleksiyon & Model', 'Collection & Model')}</div>
              <div className="font-medium text-lg">{model ? t(model.nameTr, model.name) : '-'}</div>
            </div>
            
            <div>
              <div className="text-black/50 mb-1">{t('Ölçüler', 'Dimensions')}</div>
              <div className="font-medium">{config.width}cm x {config.height}cm</div>
            </div>
            
            <div>
              <div className="text-black/50 mb-1">{t('Cam', 'Glass')}</div>
              <div className="font-medium">{glass ? t(glass.nameTr, glass.name) : '-'} ({thickness?.name})</div>
            </div>
            
            <div>
              <div className="text-black/50 mb-1">{t('Donanım', 'Hardware')}</div>
              <div className="font-medium">{profile ? t(profile.nameTr, profile.name) : '-'}, {handle ? t(handle.nameTr, handle.name) : '-'}</div>
            </div>
          </div>
          
          <div className="mt-12 p-5 bg-black/5 rounded-2xl">
            <div className="flex items-start gap-3 text-black/70">
              <Info className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                {t('Tahmini teslimat süresi 14 iş günüdür. Üretim sürecine başlamadan önce mimari ekibimiz sizinle iletişime geçerek ölçüleri teyit edecektir.', 'Estimated delivery time is 14 business days. Our architectural team will contact you to confirm measurements before starting production.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-8 bg-white border-t border-black/5 shrink-0">
          <div className="text-xs font-medium uppercase tracking-widest text-black/40 mb-2">{t('Tahmini Tutar', 'Estimated Total')}</div>
          <div className="text-4xl font-medium tracking-tight mb-6">₺{totalPrice.toLocaleString('tr-TR')}</div>
          
          <button 
            onClick={() => setShowQuoteModal(true)}
            className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full font-medium flex items-center justify-center gap-3 transition-colors shadow-lg hover-lift"
          >
            <Smartphone className="w-5 h-5" /> 
            {t('WhatsApp ile Teklif Al', 'Get Quote via WhatsApp')}
          </button>
        </div>
      </div>

      {/* Customer Info Modal for Quote Submission */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[32px] p-8 max-w-lg w-full border border-black/5 shadow-2xl relative">
            <h2 className="text-2xl font-medium tracking-tight mb-2">
              {t('Teklif Al ve Belge İndir', 'Get Quote & Download Proposal')}
            </h2>
            <p className="text-sm text-black/50 mb-6">
              {t('Lütfen bilgilerinizi girin. Teklifiniz sisteme kaydedilecek, belgeniz indirilecek ve WhatsApp yetkilisine yönlendirileceksiniz.', 'Please provide your details. Your configuration will be saved, your quotation document downloaded, and you will be routed to our WhatsApp representative.')}
            </p>
            
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-1.5">{t('Adınız Soyadınız *', 'Full Name *')}</label>
                <input 
                  type="text" 
                  required 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ahmet Yılmaz" 
                  className="w-full px-4 py-3 bg-black/5 rounded-xl border-none focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-1.5">{t('Telefon *', 'Phone *')}</label>
                  <input 
                    type="tel" 
                    required 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0532 555 1234" 
                    className="w-full px-4 py-3 bg-black/5 rounded-xl border-none focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-1.5">{t('E-posta', 'Email')}</label>
                  <input 
                    type="email" 
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="ahmet@example.com" 
                    className="w-full px-4 py-3 bg-black/5 rounded-xl border-none focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-1.5">{t('Şehir', 'City')}</label>
                  <input 
                    type="text" 
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="İstanbul" 
                    className="w-full px-4 py-3 bg-black/5 rounded-xl border-none focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-black/50 mb-1.5">{t('Proje Tipi', 'Project Type')}</label>
                  <select 
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 bg-black/5 rounded-xl border-none focus:ring-2 focus:ring-black/10 outline-none text-sm font-medium"
                  >
                    <option value="Residential">{t('Bireysel Konut', 'Residential')}</option>
                    <option value="Architectural Project">{t('Mimari Proje', 'Architectural')}</option>
                    <option value="Hospitality">{t('Otel / Rezidans', 'Hospitality')}</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-6 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 py-3.5 bg-black/5 hover:bg-black/10 rounded-full text-sm font-semibold transition-colors"
                >
                  {t('İptal', 'Cancel')}
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-50 text-white rounded-full text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  {isSubmitting ? (
                    <span>{t('Kaydediliyor...', 'Saving...')}</span>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>{t('Teklifi Al', 'Get Quote')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
