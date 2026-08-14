/* ==========================================================================
   ERAYDUŞ (eraydus.net) - Official Ankara Duşakabin Sistemleri Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Erayduş Ürün Durumu ---
  const state = {
    selectedModel: 'livorno',
    selectedVariant: 'gold', // eraydus.net signature Gold & Black PVD
    glassThickness: '6mm',
    glassColor: 'Şeffaf Kristal',
    dimension: '90x90cm',
    customWidth: 90,
    customHeight: 200,
    estimatedPrice: 15900,
    phoneWhatsApp: '905548830071', // Gerçek eraydus.net WhatsApp Numarası
    phonePhone: '03123507939'
  };

  // Erayduş Model Koleksiyonu
  const models = {
    livorno: {
      title: 'Livorno Serisi',
      desc: 'Minimalist çerçevesiz lüks tasarım, gizli paslanmaz donanım.',
      basePrice: 15900
    },
    askili: {
      title: 'Askılı Sistem Serisi',
      desc: 'Paslanmaz çelik üst ray ve makaralı lüks askılı kapılar.',
      basePrice: 18500
    },
    katlanir: {
      title: 'Katlanır Duşakabin Serisi',
      desc: 'Küçük ve dar banyolar için maksimum açılım sağlayan katlanır camlar.',
      basePrice: 14200
    },
    kare: {
      title: 'Kare Cam Duşakabin Serisi',
      desc: 'Kristal berraklığında 90° köşe birleşimli modern mimari camlar.',
      basePrice: 16800
    }
  };

  // Erayduş Profil & Donanım Kaplamaları
  const variants = {
    gold: {
      name: 'Altın Sarısı (Gold Profil)',
      image: './images/eray_gold.jpg',
      accentColor: '#eab308',
      accentRgb: '234, 179, 8',
      accentGlow: 'rgba(234, 179, 8, 0.4)',
      gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
      priceModifier: 1.15
    },
    black: {
      name: 'Mat Siyah Profil',
      image: './images/eray_black.jpg',
      accentColor: '#10b981',
      accentRgb: '16, 185, 129',
      accentGlow: 'rgba(16, 185, 129, 0.4)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      priceModifier: 1.0
    },
    chrome: {
      name: 'Parlak Krom Paslanmaz',
      image: './images/eray_chrome.jpg',
      accentColor: '#38bdf8',
      accentRgb: '56, 189, 248',
      accentGlow: 'rgba(56, 189, 248, 0.4)',
      gradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
      priceModifier: 1.05
    },
    gunmetal: {
      name: 'Gunmetal / Rose Profil',
      image: './images/eray_gunmetal.jpg',
      accentColor: '#f43f5e',
      accentRgb: '244, 63, 94',
      accentGlow: 'rgba(244, 63, 94, 0.4)',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)',
      priceModifier: 1.2
    }
  };

  // Hotspot Erayduş Mühendislik Bilgileri
  const hotspotData = {
    1: {
      title: "Paslanmaz Çelik Rulman",
      desc: "Çelik bilyalı yapısı ile su ve nemden etkilenmez. 100.000 açma/kapama testinden geçen sessiz akış mekanizması."
    },
    2: {
      title: "Manyetik Mıknatıslı Sızdırmazlık Fitili",
      desc: "%100 vakum etkili şeffaf mıknatıslı fitiller sayesinde banyonuzun zeminine su sızması tamamen engellenir."
    },
    3: {
      title: "6mm Şişecam Temperli Kristal Cam",
      desc: "±0.5 mm milimetrik CNC kesim ile üretilen yüksek güvenlikli temperli camlar. Darbelere karşı yüksek mukavemet."
    },
    4: {
      title: "Solmayan Özel Renkli Profil",
      desc: "Özel kaplama teknolojisi ile üretilen altın, siyah ve krom yüzeyler ömür boyu soyulmaz ve çizilmez."
    }
  };

  // --- DOM Referansları ---
  const mainImg = document.getElementById('mainProductImg');
  const variantNameEl = document.getElementById('selectedVariantName');
  const modelNameEl = document.getElementById('selectedModelName');
  const priceDisplayEl = document.getElementById('priceDisplay');
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const modelBtns = document.querySelectorAll('.model-tab-btn');

  const glassThicknessSelect = document.getElementById('glassThicknessSelect');
  const glassColorSelect = document.getElementById('glassColorSelect');
  const sizeSelect = document.getElementById('sizeSelect');
  const customSizeBox = document.getElementById('customSizeBox');
  const customWidthInput = document.getElementById('customWidthInput');
  const customHeightInput = document.getElementById('customHeightInput');

  const waBtnMain = document.getElementById('waBtnMain');
  const waBtnFloat = document.getElementById('waBtnFloat');
  const waKesifBtn = document.getElementById('waKesifBtn');
  const floatImg = document.getElementById('floatImg');
  const floatPrice = document.getElementById('floatPrice');
  const floatingBar = document.getElementById('floatingBuyBar');
  const header = document.querySelector('.header-glass');

  // --- Tahmini Fiyat Hesaplama ---
  function calculateEstimatedPrice() {
    const model = models[state.selectedModel];
    const variant = variants[state.selectedVariant];
    let price = model.basePrice * variant.priceModifier;

    if (state.glassThickness === '6mm') price += 0;
    if (state.glassThickness === '10mm') price += 3200;

    if (state.dimension === '90x120cm') price += 2400;
    if (state.dimension === '100x140cm') price += 4100;
    if (state.dimension === 'Özel Ölçü') {
      const w = parseInt(customWidthInput?.value || 90);
      const h = parseInt(customHeightInput?.value || 200);
      price += (w * h / 100) * 85;
    }

    state.estimatedPrice = Math.round(price / 100) * 100;

    const formattedPrice = `₺${state.estimatedPrice.toLocaleString('tr-TR')}`;
    if (priceDisplayEl) priceDisplayEl.textContent = formattedPrice;
    if (floatPrice) floatPrice.textContent = `Tahmini ${formattedPrice}`;
  }

  // --- Model Tab Seçici ---
  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedModel = btn.dataset.model;
      if (modelNameEl) modelNameEl.textContent = models[state.selectedModel].title;
      calculateEstimatedPrice();
    });
  });

  // --- Swatch Renk Değiştirici ---
  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const variantKey = btn.dataset.variant;
      if (!variants[variantKey] || state.selectedVariant === variantKey) return;

      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.selectedVariant = variantKey;
      const v = variants[variantKey];

      document.documentElement.style.setProperty('--accent-color', v.accentColor);
      document.documentElement.style.setProperty('--accent-rgb', v.accentRgb);
      document.documentElement.style.setProperty('--accent-glow', v.accentGlow);
      document.documentElement.style.setProperty('--accent-gradient', v.gradient);

      mainImg.classList.add('changing');
      setTimeout(() => {
        mainImg.src = v.image;
        if (floatImg) floatImg.src = v.image;
        mainImg.classList.remove('changing');
      }, 250);

      if (variantNameEl) variantNameEl.textContent = v.name;
      calculateEstimatedPrice();
    });
  });

  // --- Select Değişiklik Dinleyicileri ---
  glassThicknessSelect?.addEventListener('change', (e) => {
    state.glassThickness = e.target.value;
    calculateEstimatedPrice();
  });

  glassColorSelect?.addEventListener('change', (e) => {
    state.glassColor = e.target.value;
    calculateEstimatedPrice();
  });

  sizeSelect?.addEventListener('change', (e) => {
    state.dimension = e.target.value;
    if (e.target.value === 'Özel Ölçü') {
      if (customSizeBox) customSizeBox.style.display = 'flex';
    } else {
      if (customSizeBox) customSizeBox.style.display = 'none';
    }
    calculateEstimatedPrice();
  });

  customWidthInput?.addEventListener('input', calculateEstimatedPrice);
  customHeightInput?.addEventListener('input', calculateEstimatedPrice);

  // --- WhatsApp Bağlantı Oluşturucu (eraydus.net formatı) ---
  function openWhatsAppOrder(isKesif = false) {
    const model = models[state.selectedModel];
    const v = variants[state.selectedVariant];
    let olcuMetni = state.dimension;

    if (state.dimension === 'Özel Ölçü') {
      const w = customWidthInput?.value || '90';
      const h = customHeightInput?.value || '200';
      olcuMetni = `Özel Ölçü (${w} cm Genişlik x ${h} cm Yükseklik)`;
    }

    let text = '';
    if (isKesif) {
      text = `Merhaba Erayduş Ekibi (eraydus.net),\n` +
             `Ankara bölgesindeki banyom için ÜCRETSİZ KEŞİF VE ÖLÇÜ ALIMI talebinde bulunmak istiyorum.\n\n` +
             `▪ İlgilendiğim Model: ${model.title}\n` +
             `▪ Profil Kaplama: ${v.name}\n` +
             `Adres ve müsait zaman bilgisi için görüşebilir miyiz?`;
    } else {
      text = `Merhaba Erayduş (eraydus.net),\n` +
             `Sitenizdeki 3D Konfigüratör üzerinden oluşturduğum duşakabin için net fiyat ve imalat süresi almak istiyorum:\n\n` +
             `▪ Model: ${model.title}\n` +
             `▪ Profil / Donanım Rengi: ${v.name}\n` +
             `▪ Cam Kalınlığı: ${state.glassThickness} Şişecam Temperli\n` +
             `▪ Cam Rengi: ${state.glassColor}\n` +
             `▪ Ölçü: ${olcuMetni}\n` +
             `▪ Sitedeki Tahmini Fiyat: ₺${state.estimatedPrice.toLocaleString('tr-TR')}\n\n` +
             `Ankara ücretsiz montaj ve teslimat detayları hakkında bilgi verebilir misiniz?`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${state.phoneWhatsApp}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }

  waBtnMain?.addEventListener('click', () => openWhatsAppOrder(false));
  waBtnFloat?.addEventListener('click', () => openWhatsAppOrder(false));
  waKesifBtn?.addEventListener('click', () => openWhatsAppOrder(true));

  // --- Scroll Observer ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 550) {
      floatingBar?.classList.add('visible');
    } else {
      floatingBar?.classList.remove('visible');
    }
  });

  // --- Hotspots Popup ---
  const hotspotNodes = document.querySelectorAll('.hotspot-node');
  const hotspotModal = document.getElementById('hotspotModal');
  const hotspotModalTitle = document.getElementById('hotspotModalTitle');
  const hotspotModalBody = document.getElementById('hotspotModalBody');
  const hotspotClose = document.getElementById('hotspotClose');

  hotspotNodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.dataset.hotspot;
      if (hotspotData[id]) {
        hotspotModalTitle.textContent = hotspotData[id].title;
        hotspotModalBody.textContent = hotspotData[id].desc;
        hotspotModal.classList.add('active');
      }
    });
  });

  hotspotClose?.addEventListener('click', () => {
    hotspotModal?.classList.remove('active');
  });

  // --- Easy-Clean Nano Cam Interaktif Leke Canvas ---
  const nanoCanvas = document.getElementById('nanoCanvas');
  if (nanoCanvas) {
    const ctx = nanoCanvas.getContext('2d');

    function initNanoCanvas() {
      nanoCanvas.width = nanoCanvas.parentElement.clientWidth;
      nanoCanvas.height = nanoCanvas.parentElement.clientHeight;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, 0, nanoCanvas.width, nanoCanvas.height);

      // Draw water drop stains
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      for (let i = 0; i < 40; i++) {
        const x = (i * 37 + 12) % nanoCanvas.width;
        const y = (i * 53 + 24) % nanoCanvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#38bdf8';
      ctx.font = '700 15px "Plus Jakarta Sans"';
      ctx.textAlign = 'center';
      ctx.fillText('✨ Farenizi veya parmağınızı cam üzerinde gezdirerek Easy-Clean silme etkisini deneyin', nanoCanvas.width / 2, nanoCanvas.height / 2);
    }

    initNanoCanvas();

    function cleanAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    nanoCanvas.addEventListener('mousemove', (e) => {
      const rect = nanoCanvas.getBoundingClientRect();
      cleanAt(e.clientX - rect.left, e.clientY - rect.top);
    });

    document.getElementById('resetNanoBtn')?.addEventListener('click', () => {
      ctx.globalCompositeOperation = 'source-over';
      initNanoCanvas();
    });
  }

  // --- Cam Işıma Visualizer ---
  const glassCanvas = document.getElementById('glassCanvas');
  if (glassCanvas) {
    const ctx = glassCanvas.getContext('2d');
    let animStep = 0;

    function drawGlassSim() {
      if (!glassCanvas.parentElement) return;
      glassCanvas.width = glassCanvas.parentElement.clientWidth;
      glassCanvas.height = glassCanvas.parentElement.clientHeight;

      ctx.clearRect(0, 0, glassCanvas.width, glassCanvas.height);
      const w = glassCanvas.width;
      const h = glassCanvas.height;

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.lineWidth = 2;

      for (let i = 0; i < 6; i++) {
        const xOffset = (i * 100 + animStep * 30) % w;
        ctx.beginPath();
        ctx.moveTo(xOffset, 0);
        ctx.lineTo(xOffset - 60, h);
        ctx.stroke();
      }

      animStep += 0.04;
      requestAnimationFrame(drawGlassSim);
    }
    drawGlassSim();
  }

  // Sayfa yüklendiğinde fiyatı hesapla
  calculateEstimatedPrice();
});
