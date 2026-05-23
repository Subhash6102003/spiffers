import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-bgLight text-brand-dark py-20 px-[5%] border-t border-brand-border">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Summary */}
        <div className="flex flex-col">
          {/* We use the black/dark logo on the white footer background */}
          <img src="/logo_white.png" alt="Spiffers Logo" className="h-9 w-auto self-start mb-6 brightness-0" />
          <p className="text-brand-secondary text-[1.3rem] leading-relaxed mb-6 max-w-[320px]">
            Designing comfort concepts for the youth culture. From college corridors to club dancefloors, Spiffers keeps you moving.
          </p>
          <div className="flex gap-5 text-lg text-brand-dark">
            <a href="#" className="hover:text-brand-secondary transition-all duration-300 hover:scale-105" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-brand-secondary transition-all duration-300 hover:scale-105" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-brand-secondary transition-all duration-300 hover:scale-105" aria-label="Twitter"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="#" className="hover:text-brand-secondary transition-all duration-300 hover:scale-105" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        {/* Catalog Categories */}
        <div>
          <h4 className="text-brand-dark text-xs font-heading font-extrabold tracking-widest uppercase mb-6">LAB SHOP</h4>
          <ul className="flex flex-col gap-3.5 text-[1.3rem] text-brand-secondary font-medium">
            <li><Link to="/shop" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Shop Catalog</Link></li>
            <li><Link to="/shop?category=Slides" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Slides & Clogs</Link></li>
            <li><Link to="/shop?category=Sneakers" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Sneakers</Link></li>
            <li><Link to="/shop?category=Shoe+Accessories" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Shoe Accessories</Link></li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h4 className="text-brand-dark text-xs font-heading font-extrabold tracking-widest uppercase mb-6">ASSISTANCE</h4>
          <ul className="flex flex-col gap-3.5 text-[1.3rem] text-brand-secondary font-medium">
            <li><a href="#" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Track Order</a></li>
            <li><a href="#" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Size Chart</a></li>
            <li><a href="#" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-brand-dark hover:pl-1 transition-all duration-200">Support Center</a></li>
          </ul>
        </div>

        {/* Drops Signup & Info */}
        <div className="flex flex-col">
          <h4 className="text-brand-dark text-xs font-heading font-extrabold tracking-widest uppercase mb-6">STAY UPDATED</h4>
          <p className="text-brand-secondary text-[1.3rem] mb-6">Subscribe to receive drop notifications, collection launches, and private sales.</p>
          <form className="flex border-b border-brand-border pb-2 mb-8" onSubmit={e => { e.preventDefault(); alert('Subscribed to Spiffers Drops!'); }}>
            <input
              type="email"
              placeholder="Your email address"
              required
              className="bg-transparent border-none text-brand-dark text-[1.3rem] w-full focus:outline-none placeholder:text-brand-muted"
            />
            <button type="submit" className="text-brand-dark ml-2 transition-transform duration-200 hover:translate-x-1" aria-label="Subscribe">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          <div className="flex flex-col gap-2 text-[1.25rem] text-brand-secondary font-medium">
            <p><i className="fa-solid fa-phone mr-3 text-brand-muted"></i> +91 98765-15500</p>
            <p><i className="fa-solid fa-envelope mr-3 text-brand-muted"></i> support@spiffers.in</p>
          </div>
        </div>

      </div>

      <div className="max-w-[1600px] mx-auto border-t border-brand-border pt-8 text-center text-xs text-brand-muted">
        <p>&copy; 2026 Spiffers Footwear. Engineered in India. All rights reserved.</p>
      </div>
    </footer>
  );
}
