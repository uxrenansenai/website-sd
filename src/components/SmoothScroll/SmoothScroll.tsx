import { useEffect } from 'react';
import Lenis from 'lenis';

const desktopPointer = '(min-width: 1301px), (min-width: 901px) and (hover: hover) and (pointer: fine)';
const reducedMotion = '(prefers-reduced-motion: reduce)';

export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia(desktopPointer);
    const reduced = window.matchMedia(reducedMotion);
    const originalScrollRestoration = window.history.scrollRestoration;
    let lenis: Lenis | null = null;
    let initialFrame = 0;
    let layoutObserver: ResizeObserver | null = null;

    const sync = () => {
      lenis?.destroy();
      lenis = null;
      document.documentElement.classList.remove('has-smooth-scroll');
      window.history.scrollRestoration = originalScrollRestoration;

      if (!desktop.matches || reduced.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.16,
        wheelMultiplier: 1,
        respectReducedMotion: true,
      });
      document.documentElement.classList.add('has-smooth-scroll');
      window.history.scrollRestoration = 'manual';
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.hash;
      const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      if (window.location.hash !== hash) window.history.pushState(null, '', hash);
      lenis.scrollTo(target, { duration: 0.85 });
    };

    const onHistory = () => {
      if (!lenis) return;
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (target) lenis.scrollTo(target, { duration: 0.85 });
      else lenis.scrollTo(0, { duration: 0.85 });
    };

    sync();

    const initialHash = window.location.hash;
    if (initialHash) {
      const target = document.getElementById(decodeURIComponent(initialHash.slice(1)));
      const services = document.getElementById('servicos');
      if (target) {
        const alignInitialHash = () => {
          if (window.location.hash !== initialHash) return;
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(target, { immediate: true });
          }
          else target.scrollIntoView({ behavior: 'auto' });
        };
        const needsMeasuredServices = desktop.matches && !reduced.matches;
        if (needsMeasuredServices && services) {
          layoutObserver = new ResizeObserver(() => {
            const travel = Number.parseFloat(services.style.getPropertyValue('--service-travel'));
            if (travel > 0) {
              layoutObserver?.disconnect();
              initialFrame = window.requestAnimationFrame(alignInitialHash);
            }
          });
          layoutObserver.observe(services);
        } else {
          initialFrame = window.requestAnimationFrame(alignInitialHash);
        }
      }
    }

    desktop.addEventListener('change', sync);
    reduced.addEventListener('change', sync);
    document.addEventListener('click', onAnchorClick);
    window.addEventListener('popstate', onHistory);
    window.addEventListener('hashchange', onHistory);

    return () => {
      desktop.removeEventListener('change', sync);
      reduced.removeEventListener('change', sync);
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('popstate', onHistory);
      window.removeEventListener('hashchange', onHistory);
      window.cancelAnimationFrame(initialFrame);
      layoutObserver?.disconnect();
      lenis?.destroy();
      document.documentElement.classList.remove('has-smooth-scroll');
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, []);

  return null;
}
