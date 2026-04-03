'use client';

import { useEffect, useRef } from 'react';

const contourSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1800" fill="none">
    <g stroke="white" stroke-width="1.1" opacity="0.9">
      <path d="M-80 180C80 150 170 140 300 160C430 180 500 250 640 270C780 290 880 240 1020 210C1160 180 1290 210 1430 250C1570 290 1670 280 1760 250" />
      <path d="M-60 320C80 295 180 290 300 305C420 320 520 380 650 400C780 420 890 390 1020 365C1150 340 1260 360 1390 395C1520 430 1625 435 1750 410" />
      <path d="M-50 500C95 475 210 473 330 490C450 507 555 567 690 587C825 607 930 575 1065 545C1200 515 1310 530 1445 568C1580 605 1680 617 1780 600" />
      <path d="M-40 740C110 715 235 713 360 733C485 753 595 813 735 835C875 857 990 825 1130 790C1270 755 1380 767 1515 807C1650 847 1745 865 1820 855" />
      <path d="M-10 1010C130 983 260 980 390 1002C520 1025 635 1087 780 1110C925 1133 1040 1100 1185 1063C1330 1027 1445 1040 1582 1083C1718 1125 1808 1139 1870 1131" />
      <path d="M20 1320C160 1295 290 1292 425 1315C560 1338 682 1400 830 1425C977 1450 1095 1415 1245 1377C1395 1340 1510 1355 1648 1398C1785 1440 1880 1460 1940 1452" />
      <path d="M50 1645C195 1620 330 1618 470 1642C610 1667 735 1732 885 1758C1035 1785 1155 1750 1307 1710C1460 1670 1575 1685 1715 1728C1855 1772 1940 1786 1990 1778" />
    </g>
  </svg>
`);

const noiseSvg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="1" />
  </svg>
`);

export function SiteBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {return;}

    let raf = 0;

    const updatePointer = (x: number, y: number) => {
      const px = (x / window.innerWidth) * 100;
      const py = (y / window.innerHeight) * 100;

      root.style.setProperty('--bg-pointer-x', `${px}%`);
      root.style.setProperty('--bg-pointer-y', `${py}%`);
      root.style.setProperty('--bg-pointer-offset-x', `${(px - 50) * 0.22}px`);
      root.style.setProperty('--bg-pointer-offset-y', `${(py - 50) * 0.16}px`);
    };

    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        updatePointer(event.clientX, event.clientY);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scroll = window.scrollY;
        root.style.setProperty('--bg-scroll-slow', `${scroll * 0.06}px`);
        root.style.setProperty('--bg-scroll-medium', `${scroll * 0.12}px`);
      });
    };

    updatePointer(window.innerWidth / 2, window.innerHeight / 3);
    onScroll();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="site-background pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="site-background__base" />
      <div className="site-background__far-glow site-background__far-glow--cyan" />
      <div className="site-background__far-glow site-background__far-glow--violet" />

      <div
        className="site-background__contours"
        style={{
          backgroundImage: `url("data:image/svg+xml,${contourSvg}")`,
        }}
      />

      <div className="site-background__spotlight" />
      <div className="site-background__grid" />

      <div
        className="site-background__noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,${noiseSvg}")`,
        }}
      />

      <div className="site-background__vignette" />
      <div className="site-background__top-sheen" />
    </div>
  );
}
