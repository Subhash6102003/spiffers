import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RotationCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState(0);

  const imagesRef = useRef([]);
  const frameCount = 38;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let loadedCount = 0;
    const imagesArray = [];

    // Preload images into memory
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/images/SPIFFER FINAL ${i}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadPercentage(Math.floor((loadedCount / frameCount) * 100));
        if (loadedCount === frameCount) {
          imagesRef.current = imagesArray;
          setLoading(false);
          initCanvasAnimation();
        }
      };
      img.onerror = () => {
        console.error(`Failed loading image SPIFFER FINAL ${i}`);
        loadedCount++;
        if (loadedCount === frameCount) {
          imagesRef.current = imagesArray;
          setLoading(false);
          initCanvasAnimation();
        }
      };
      imagesArray.push(img);
    }

    function drawFrame(index, imagesList = imagesRef.current) {
      const img = imagesList[index];
      if (!img || !img.complete) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Adjust for retina displays
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, w, h);

      // Contain scaling calculations
      const imgW = img.width;
      const imgH = img.height;
      const hRatio = w / imgW;
      const vRatio = h / imgH;
      const ratio = Math.min(hRatio, vRatio);

      const drawW = imgW * ratio;
      const drawH = imgH * ratio;
      const x = (w - drawW) / 2;
      const y = (h - drawH) / 2;

      ctx.drawImage(img, x, y, drawW, drawH);
    }

    let activeScrollTrigger = null;
    let activePinTrigger = null;
    let currentFrameIndex = 0;

    const handleResize = () => {
      drawFrame(currentFrameIndex);
    };

    function initCanvasAnimation() {
      // Draw first frame
      drawFrame(0, imagesArray);

      // Set up resize listener
      window.addEventListener('resize', handleResize);

      // Setup GSAP Pinning
      activePinTrigger = ScrollTrigger.create({
        trigger: ".rotation-section",
        start: "top top",
        end: "bottom bottom",
        pin: ".rotation-sticky-container",
        scrub: true
      });

      // Setup GSAP frame scrub
      const rotationDriver = { frame: 0 };
      activeScrollTrigger = gsap.to(rotationDriver, {
        frame: frameCount - 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".rotation-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Slightly increased scrub for smoother damping
          onUpdate: (self) => {
            const frame = Math.floor(rotationDriver.frame);
            currentFrameIndex = frame;
            drawFrame(frame);
            setScrollProgress(self.progress);
          }
        }
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (activeScrollTrigger && activeScrollTrigger.scrollTrigger) activeScrollTrigger.scrollTrigger.kill();
      if (activePinTrigger) activePinTrigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="rotation-sticky-container relative w-full h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center">
          <div className="w-[120px] h-[2px] bg-brand-border relative overflow-hidden mb-4">
            <div className="absolute top-0 left-0 h-full bg-brand-dark transition-all duration-300" style={{ width: `${loadPercentage}%` }}></div>
          </div>
          <span className="font-heading text-xs font-bold tracking-widest text-brand-dark uppercase">
            LOADING EXPERIENCE {loadPercentage}%
          </span>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        id="product-canvas"
        className="w-[50vh] h-[50vh] sm:w-[60vh] sm:h-[60vh] max-w-[90%] max-h-[90%] object-contain z-10 transition-transform duration-300 scale-105 sm:scale-110 will-change-transform"
      />

      {/* Copy Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        
        {/* Card 1 */}
        <div
          className={`absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 w-[420px] max-w-[90%] bg-white/90 backdrop-blur-md border border-brand-border p-8 md:p-10 pointer-events-auto transition-all duration-700 ${
            scrollProgress < 0.3
              ? 'opacity-100 visible translate-y-[-50%]'
              : 'opacity-0 invisible translate-y-[-40%]'
          }`}
        >
          <span className="font-heading text-[1.1rem] font-bold text-brand-muted tracking-widest uppercase block mb-3">
            Spiffers Cumulus
          </span>
          <h2 className="text-3xl font-extrabold mb-4 font-heading leading-tight">
            THE CUMULUS BLAZE
          </h2>
          <p className="text-[1.5rem] text-brand-secondary">
            Crafted to redefine walkability, with a contoured design that cradles your foot securely from morning lecture to the late-night dance floor.
          </p>
        </div>

        {/* Card 2 */}
        <div
          className={`absolute top-1/2 right-[5%] md:right-[10%] -translate-y-1/2 w-[420px] max-w-[90%] bg-white/90 backdrop-blur-md border border-brand-border p-8 md:p-10 pointer-events-auto transition-all duration-700 ${
            scrollProgress >= 0.3 && scrollProgress < 0.65
              ? 'opacity-100 visible translate-y-[-50%]'
              : 'opacity-0 invisible translate-y-[-40%]'
          }`}
        >
          <span className="font-heading text-[1.1rem] font-bold text-brand-muted tracking-widest uppercase block mb-3">
            Tech & Sole
          </span>
          <h2 className="text-3xl font-extrabold mb-4 font-heading leading-tight">
            CLOUD-LIKE CUSHIONING
          </h2>
          <p className="text-[1.5rem] text-brand-secondary">
            Our dual-density EVA foam midsole absorbs heavy impacts, distributing weight evenly to eliminate fatigue during prolonged wear.
          </p>
        </div>

        {/* Card 3 */}
        <div
          className={`absolute top-1/2 left-[5%] md:left-[10%] -translate-y-1/2 w-[420px] max-w-[90%] bg-white/90 backdrop-blur-md border border-brand-border p-8 md:p-10 pointer-events-auto transition-all duration-700 ${
            scrollProgress >= 0.65
              ? 'opacity-100 visible translate-y-[-50%]'
              : 'opacity-0 invisible translate-y-[-40%]'
          }`}
        >
          <span className="font-heading text-[1.1rem] font-bold text-brand-muted tracking-widest uppercase block mb-3">
            Materials & Build
          </span>
          <h2 className="text-3xl font-extrabold mb-4 font-heading leading-tight">
            WATERPROOF SHELL
          </h2>
          <p className="text-[1.5rem] text-brand-secondary">
            Featuring hydro-phobic uppers and non-slip traction soles. Easy to wash, quick to dry, and built to survive any weather or club spill.
          </p>
        </div>

      </div>

      {/* Progress line */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-brand-bgLight z-10">
        <div className="h-full bg-brand-dark transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>
      </div>
    </div>
  );
}
