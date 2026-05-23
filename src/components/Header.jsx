import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartTotal, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // On homepage, the header starts transparent with white text to blend into the video hero
  // On other pages, it should default to white background and black text
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger check immediately in case page is refreshed partway down
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Dynamic classes for header
  const headerClass = `fixed top-0 left-0 w-100 w-full z-50 flex items-center transition-all duration-500 border-b ${
    isScrolled || !isHomePage
      ? 'bg-white/95 backdrop-blur-md h-[70px] border-brand-border shadow-sm'
      : 'bg-transparent h-20 border-transparent'
  }`;

  const linkClass = ({ isActive }) =>
    `font-body text-[0.85rem] font-bold tracking-[0.25em] uppercase transition-all duration-300 relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
      isScrolled || !isHomePage
        ? 'text-brand-dark after:bg-brand-dark'
        : 'text-white/90 after:bg-white'
    } ${isActive ? 'after:w-full' : ''}`;

  const iconClass = `text-[1.8rem] transition-all duration-300 hover:scale-110 ${
    isScrolled || !isHomePage ? 'text-brand-dark' : 'text-white'
  }`;

  return (
    <>
      <header className={headerClass}>
        <div className="w-[90%] max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Hamburger toggle (Mobile) */}
          <button
            className={`md:hidden text-2xl ${
              isScrolled || !isHomePage ? 'text-brand-dark' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="Spiffers Logo">
              <img
                src="/logo_white.png"
                alt="Spiffers Logo"
                className={`transition-all duration-500 h-9 w-auto ${
                  isScrolled || !isHomePage ? 'brightness-0' : ''
                }`}
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:block" aria-label="Main Navigation">
            <ul className="flex gap-10">
              <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
              <li><NavLink to="/shop" className={linkClass}>Shop Catalog</NavLink></li>
            </ul>
          </nav>

          {/* User Controls & Cart Trigger */}
          <div className="flex items-center gap-6">
            <button className={`${iconClass} hidden sm:block`} aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <Link to="/profile" className={`${iconClass} hidden sm:block`} aria-label="Account">
              <i className="fa-regular fa-user"></i>
            </Link>
            <button
              className="relative flex items-center hover:scale-105 transition-transform"
              onClick={openCart}
              aria-label="Shopping bag"
            >
              <i className={`fa-solid fa-bag-shopping ${isScrolled || !isHomePage ? 'text-brand-dark' : 'text-white'} text-[1.8rem]`}></i>
              <span className="absolute -top-2 -right-2 bg-brand-dark text-white text-[0.9rem] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white font-heading">
                {cartTotal}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-[200] backdrop-blur-sm transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-[300px] h-full bg-white p-10 flex flex-col justify-between shadow-2xl transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col">
            <button
              className="self-end text-2xl text-brand-dark"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <ul className="flex flex-col gap-6 mt-16 font-heading text-xl font-bold uppercase text-brand-dark">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-muted">
                  Shop Catalog
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-muted">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          <div className="border-t border-brand-border pt-6">
            <p className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase mb-4">
              College to Club Footwear
            </p>
            <div className="flex gap-4 text-xl text-brand-dark">
              <a href="#" className="hover:opacity-70"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:opacity-70"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" className="hover:opacity-70"><i className="fa-brands fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
