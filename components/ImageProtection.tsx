'use client';

import { useEffect } from 'react';

export function ImageProtection() {
  useEffect(() => {
    // 1. Tüm sitede sağ tıklamayı tamamen engelle (İncele seçeneğini kapatır)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Görsellerin sürüklenmesini engelle
    const handleDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    // 3. Klavye Kısayollarını Engelle (F12, Ctrl+U, Ctrl+Shift+I vb.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
      }
      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
      // Mac kısayolları (Cmd+Opt+I/J/C/U)
      if (e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };

    // 4. DevTools Trap (Eğer zorla açarlarsa sayfayı kilitler)
    // Sadece production (canlı) ortamda çalışsın ki siz geliştirme yaparken delirmeyin
    let devToolsTrap: ReturnType<typeof setInterval>;
    if (process.env.NODE_ENV === 'production') {
      devToolsTrap = setInterval(() => {
        // DevTools açıksa debugger sayfayı dondurur.
        // Kullanıcı F12'yi bir şekilde açsa bile site kilitlenir ve kaynak kodları gezemez.
        const t0 = performance.now();
        Function('debugger')(); 
        const t1 = performance.now();
        
        // Eğer debugger sayfayı dondurduysa (zaman farkı büyükse), body'i temizle
        if (t1 - t0 > 100) {
          document.body.innerHTML = '<div style="height: 100vh; display: flex; align-items: center; justify-content: center; background: black; color: white; font-family: sans-serif;"><h1>Güvenlik İhlali: Geliştirici Araçları Kullanılamaz.</h1></div>';
        }
      }, 1000);
    }

    // Dinleyicileri ekle
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
      if (devToolsTrap) clearInterval(devToolsTrap);
    };
  }, []);

  return null;
}
