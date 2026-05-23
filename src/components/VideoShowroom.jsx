import React, { useEffect, useRef, useState } from 'react';

export default function VideoShowroom() {
  const [activeLightboxVideo, setActiveLightboxVideo] = useState(null);
  const [mutedStates, setMutedStates] = useState({});
  const videoRefs = useRef({});

  // 8 videos to showcase
  const videosList = [
    { id: 1, src: '/videos/2.mp4', tag: 'VIBE 01' },
    { id: 2, src: '/videos/3.mp4', tag: 'COMFORT 02' },
    { id: 3, src: '/videos/4.mp4', tag: 'STREET 03' },
    { id: 4, src: '/videos/5.mp4', tag: 'VIBE 04' },
    { id: 5, src: '/videos/6.mp4', tag: 'FLEX 05' },
    { id: 6, src: '/videos/7.mp4', tag: 'CHILLING 06' },
    { id: 7, src: '/videos/8.mp4', tag: 'NIGHT 07' },
    { id: 8, src: '/videos/9.mp4', tag: 'BEAT 08' },
  ];

  useEffect(() => {
    // Set up observer to play/pause videos on screen enter/exit
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('data-id');
        const video = videoRefs.current[id];
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    // Observe each video wrapper
    const cards = document.querySelectorAll('.showroom-video-card');
    cards.forEach(card => observer.observe(card));

    // Initialize all as muted
    const initialMuted = {};
    videosList.forEach(v => {
      initialMuted[v.id] = true;
    });
    setMutedStates(initialMuted);

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  const handleMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video && video.paused) {
      video.play().catch(() => {});
    }
  };

  const handleVideoClick = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (e, id) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    const newMuted = !video.muted;
    video.muted = newMuted;
    setMutedStates(prev => ({
      ...prev,
      [id]: newMuted
    }));
  };

  const handleExpand = (e, src) => {
    e.stopPropagation();
    setActiveLightboxVideo(src);
  };

  const closeLightbox = () => {
    setActiveLightboxVideo(null);
  };

  return (
    <section className="bg-brand-bgLight py-20 px-[5%]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-3">
            Real-World Action
          </span>
          <h2 className="text-4xl font-heading font-extrabold mb-4">
            THE SHOWROOM IN MOTION
          </h2>
          <p className="text-[1.5rem] text-brand-secondary">
            Experience Spiffers in raw motion. Hover over any card below to play the video.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videosList.map(video => (
            <div
              key={video.id}
              data-id={video.id}
              className="showroom-video-card relative bg-white border border-brand-border overflow-hidden cursor-pointer hover:translate-y-[-8px] hover:shadow-xl transition-all duration-500"
              onMouseEnter={() => handleMouseEnter(video.id)}
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative w-full pb-[177%] overflow-hidden">
                <video
                  ref={el => videoRefs.current[video.id] = el}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                >
                  <source src={video.src} type="video/mp4" />
                </video>

                {/* Video controls */}
                <div className="absolute bottom-4 right-4 flex gap-2 z-10 opacity-0 md:group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 showroom-video-controls">
                  <button
                    onClick={(e) => toggleMute(e, video.id)}
                    className="w-9 h-9 bg-white/85 rounded-full flex items-center justify-center text-brand-dark text-xs shadow hover:scale-105 hover:bg-white transition-all"
                    aria-label="Toggle mute"
                  >
                    {mutedStates[video.id] ? (
                      <i className="fa-solid fa-volume-xmark"></i>
                    ) : (
                      <i className="fa-solid fa-volume-high"></i>
                    )}
                  </button>
                  <button
                    onClick={(e) => handleExpand(e, video.src)}
                    className="w-9 h-9 bg-white/85 rounded-full flex items-center justify-center text-brand-dark text-xs shadow hover:scale-105 hover:bg-white transition-all"
                    aria-label="Expand video"
                  >
                    <i className="fa-solid fa-expand"></i>
                  </button>
                </div>

                {/* Mobile video overlay play/mute indicators */}
                <div className="absolute top-4 left-4 bg-brand-dark/70 backdrop-blur-md text-white py-1 px-3 font-heading text-[0.9rem] font-bold tracking-widest uppercase z-10">
                  {video.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video Lightbox */}
      {activeLightboxVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[2000] flex items-center justify-center transition-all duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-white text-3xl hover:scale-110"
            aria-label="Close player"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div
            className="w-[90%] max-w-[450px] aspect-[9/16] bg-black shadow-2xl overflow-hidden border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <video controls autoPlay className="w-full h-full object-cover">
              <source src={activeLightboxVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      
      {/* Inject styling helper for controls visibility on hover */}
      <style>{`
        .showroom-video-card:hover .showroom-video-controls {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
