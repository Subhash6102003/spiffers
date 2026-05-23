import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RotationCanvas from '../components/RotationCanvas';
import VideoShowroom from '../components/VideoShowroom';

export default function Home() {
  const [activeTab, setActiveTab] = useState('tab-materials');
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Slow down speed by half
    }
  }, []);

  const categories = [
    {
      title: 'Cumulus Slides',
      desc: 'Ultralight, breathable slides for poolside chilling or campus sprints.',
      video: '/videos/10.mp4',
      link: '/shop?category=Slides',
      price: '₹1,499'
    },
    {
      title: 'Aero Clogs',
      desc: 'Sleek design with strap lock technology for a secure, athletic fit.',
      video: '/videos/11.mp4',
      link: '/shop?category=Slides',
      price: '₹1,099'
    },
    {
      title: 'Club Slip-Ons',
      desc: 'Casual slip-ons featuring premium comfort uppers and flexible fit.',
      video: '/videos/12.mp4',
      link: '/shop?category=Sneakers',
      price: '₹1,299'
    }
  ];

  return (
    <div>
      {/* 1. HERO VIDEO SECTION */}
      <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-1">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 z-2" />
        </div>

        <div className="relative z-10 text-center text-white max-w-[900px] px-6">
          <h1 className="text-[9vw] md:text-[6vw] font-black leading-none mb-6 tracking-tighter drop-shadow-xl font-heading">
            COLLEGE TO CLUB
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-10 max-w-[600px] mx-auto drop-shadow-md">
            Next-generation premium footwear engineered for all-day cloud comfort and high-fashion aesthetics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-brand-dark px-10 py-5 font-heading text-xs font-bold tracking-widest uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              EXPLORE SHOP
            </Link>
            <a
              href="#rotation-showcase"
              className="bg-transparent text-white px-10 py-5 font-heading text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-brand-dark border border-white backdrop-blur-sm transition-all duration-300"
            >
              360° ROTATOR
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-white">
          <span className="font-heading text-xs font-bold tracking-widest uppercase opacity-80">Scroll to Spin</span>
          <div className="w-6 h-10 border-2 border-white rounded-full relative">
            <div className="w-1 h-2 bg-white rounded-full absolute top-1.5 left-1/2 -translate-x-1/2 animate-scroll-wheel"></div>
          </div>
        </div>
      </section>

      {/* 2. 3D SCROLL ROTATION (STICKY CANVAS) */}
      <section id="rotation-showcase" className="rotation-section relative w-full bg-white h-[600vh]">
        <RotationCanvas />
      </section>

      {/* 3. CATGORY SHOWCASE GRID */}
      <section className="py-24 px-[5%] bg-white border-t border-brand-border">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-3">
            Curated Categories
          </span>
          <h2 className="text-4xl font-heading font-extrabold mb-4">
            THE STYLES LAB
          </h2>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white border border-brand-border flex flex-col hover:translate-y-[-5px] hover:shadow-lg transition-all duration-500 group">
              <div className="relative w-full pb-[125%] overflow-hidden bg-brand-bgLight">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                  <source src={cat.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-brand-secondary text-[1.4rem] leading-relaxed mb-6 min-h-[45px]">{cat.desc}</p>
                </div>
                <Link
                  to={cat.link}
                  className="w-full text-center border border-brand-dark bg-transparent text-brand-dark py-4 font-heading font-bold text-xs tracking-widest uppercase hover:bg-brand-dark hover:text-white transition-all duration-300"
                >
                  SHOP {cat.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TECHNICAL SPECS TABLE */}
      <section className="py-24 px-[5%] bg-white border-t border-brand-border">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-10 gap-16 items-center">
          
          <div className="lg:col-span-4 max-w-[500px]">
            <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-3">
              Engineered for Feet
            </span>
            <h2 className="text-4xl font-heading font-extrabold mb-4">
              THE SPECS SHEET
            </h2>
            <p className="text-[1.6rem] text-brand-secondary leading-relaxed mb-10">
              We combine automotive-grade elastomer science with anatomical orthopedics to build sliders and slip-ons that protect your feet while looking incredibly sharp.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => setActiveTab('tab-materials')}
                className={`font-heading text-[1.5rem] font-extrabold tracking-wider text-left pb-4 border-b-2 transition-all ${
                  activeTab === 'tab-materials'
                    ? 'border-brand-dark text-brand-dark'
                    : 'border-brand-border text-brand-muted hover:text-brand-dark'
                }`}
              >
                MATERIALS
              </button>
              <button
                onClick={() => setActiveTab('tab-technology')}
                className={`font-heading text-[1.5rem] font-extrabold tracking-wider text-left pb-4 border-b-2 transition-all ${
                  activeTab === 'tab-technology'
                    ? 'border-brand-dark text-brand-dark'
                    : 'border-brand-border text-brand-muted hover:text-brand-dark'
                }`}
              >
                SOLE TECH
              </button>
              <button
                onClick={() => setActiveTab('tab-fit')}
                className={`font-heading text-[1.5rem] font-extrabold tracking-wider text-left pb-4 border-b-2 transition-all ${
                  activeTab === 'tab-fit'
                    ? 'border-brand-dark text-brand-dark'
                    : 'border-brand-border text-brand-muted hover:text-brand-dark'
                }`}
              >
                FIT GUIDE
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 bg-brand-bgLight border border-brand-border p-8 md:p-12 min-h-[380px] flex flex-col justify-center">
            {activeTab === 'tab-materials' && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Upper Shell</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">High-elastomer composite polymer, waterproof and scratch-resistant.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Strap Rivets</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">Double reinforced industrial alloy core with matte nylon cap.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Ventilation</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">Aerodynamic slot configuration designed for thermal release.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Ecology</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">100% recyclable compounds, cruelty-free vegan construction.</span>
                </div>
              </div>
            )}

            {activeTab === 'tab-technology' && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Foam Compound</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">Dual-layer proprietary EVA (Ethylene-Vinyl Acetate) cushion matrix.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Traction Rating</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">High friction coefficient rubberized pattern (Anti-slip wet floors).</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Orthotic Arch</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">3D Molded heel cup and arch support to reduce pressure spikes.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Bounce Return</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">38% shock energy return for effortless forward motion.</span>
                </div>
              </div>
            )}

            {activeTab === 'tab-fit' && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Sizing Style</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">True to size. If you are a half-size, we recommend sizing up.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pb-6 border-b border-brand-border">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Foot Width</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">Wide-fit toe box to allow natural toe splay and relaxed grip.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="font-heading text-[1.3rem] font-extrabold tracking-wider text-brand-dark uppercase">Adjustability</span>
                  <span className="sm:col-span-2 text-brand-secondary text-[1.5rem]">Rear pivot straps rotate 90° for quick convertible support.</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5. DYNAMIC LIFESTYLE VIDEO SHOWROOM (Placed above footer) */}
      <VideoShowroom />
    </div>
  );
}
