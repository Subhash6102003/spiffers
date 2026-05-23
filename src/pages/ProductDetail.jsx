import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { handle } = useParams();
  const { addToCart, openCart } = useCart();
  
  // Find product
  const product = products.find(p => p.handle === handle);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <i className="fa-solid fa-triangle-exclamation text-3xl text-brand-muted mb-4 block"></i>
        <h2 className="text-2xl font-heading font-extrabold mb-6">Product Not Found</h2>
        <Link to="/shop" className="bg-brand-dark text-white px-6 py-3 font-heading font-bold text-xs tracking-widest uppercase">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  // Sizing definitions
  const sizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];
  
  // States
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCharms, setSelectedCharms] = useState([]);
  const [sizeWarning, setSizeWarning] = useState(false);

  // Sync active image if product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    setSelectedSize(null);
    setSelectedCharms([]);
    setSizeWarning(false);
  }, [product]);

  // Check if product requires size selection (footwear)
  const requiresSize = ['Slides', 'Sneakers', 'Shoes'].includes(product.type);

  // Fetch charms database to show in the "Frequently Bought Together" upsell
  const charmsCatalog = products.filter(p => p.type === 'Charms').slice(0, 3);

  // Handle charm checkbox toggle
  const handleCharmToggle = (charm) => {
    setSelectedCharms(prev => {
      const exists = prev.some(c => c.id === charm.id);
      if (exists) {
        return prev.filter(c => c.id !== charm.id);
      } else {
        return [...prev, charm];
      }
    });
  };

  // Calculate dynamic bundle total
  const bundleTotal = product.price + selectedCharms.reduce((acc, c) => acc + c.price, 0);

  // Add bundle to cart
  const handleAddToBag = () => {
    if (requiresSize && !selectedSize) {
      setSizeWarning(true);
      return;
    }
    setSizeWarning(false);

    // Add main product (with size)
    addToCart(product, 1, selectedSize);

    // Add selected charms (no sizes)
    selectedCharms.forEach(charm => {
      addToCart(charm, 1, null);
    });

    openCart();
  };

  return (
    <div className="pt-28 pb-20 px-[5%] bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="flex gap-2 text-[1.1rem] font-heading font-bold text-brand-muted uppercase mb-10">
          <Link to="/" className="hover:text-brand-dark">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-brand-dark">Shop</Link>
          <span>/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(['Charms', 'Accessories'].includes(product.type) ? 'Shoe Accessories' : product.type)}`}
            className="hover:text-brand-dark"
          >
            {['Charms', 'Accessories'].includes(product.type) ? 'Shoe Accessories' : product.type}
          </Link>
          <span>/</span>
          <span className="text-brand-dark truncate">{product.title}</span>
        </div>

        {/* Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Media Slider Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Preview Container */}
            <div className="relative w-full pb-[95%] bg-brand-bgLight border border-brand-border flex items-center justify-center overflow-hidden">
              <img
                src={activeImage}
                alt={product.title}
                className="absolute inset-0 w-[80%] h-[80%] object-contain m-auto"
              />
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 bg-brand-bgLight border flex-shrink-0 flex items-center justify-center overflow-hidden transition-all ${
                      activeImage === img ? 'border-brand-dark shadow-sm' : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-[80%] h-[80%] object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Brand Title & Price */}
            <div>
              <span className="font-heading text-[1rem] font-bold tracking-widest text-brand-muted uppercase block mb-1">
                {product.type}
              </span>
              <h1 className="text-2xl md:text-3xl font-heading font-extrabold mb-3 leading-tight text-brand-dark">
                {product.title}
              </h1>
              <span className="text-2xl font-heading font-bold text-brand-dark block mt-2">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Description */}
            <div className="border-t border-brand-border pt-5">
              <p className="text-[1.35rem] text-brand-secondary leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Size Selector (Only for Footwear) */}
            {requiresSize && (
              <div className="border-t border-brand-border pt-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-heading text-xs font-bold tracking-widest text-brand-dark uppercase">
                    Select Size
                  </span>
                  <a href="#" className="text-xs text-brand-muted underline uppercase hover:text-brand-dark">Size Chart</a>
                </div>
                
                {sizeWarning && (
                  <p className="text-xs text-red-500 font-bold uppercase mb-3">
                    <i className="fa-solid fa-circle-exclamation mr-1.5"></i> Please select a size before adding to bag
                  </p>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeWarning(false); }}
                      className={`font-heading text-xs font-bold py-3.5 border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-dark text-white border-brand-dark'
                          : 'bg-transparent text-brand-dark border-brand-border hover:border-brand-dark'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Bought Together (Shoe Charms / Clog Pins - Only for footwear) */}
            {requiresSize && (
              <div className="border-t border-brand-border pt-5">
                <h3 className="font-heading text-xs font-extrabold tracking-widest text-brand-dark uppercase mb-3">
                  FREQUENTLY BOUGHT TOGETHER
                </h3>
                <p className="text-xs text-brand-muted mb-3 font-medium">Customize your footwear. Check to bundle Spiffers charms and save:</p>
                
                <div className="flex flex-col gap-2">
                  {charmsCatalog.map(charm => {
                    const isChecked = selectedCharms.some(c => c.id === charm.id);
                    return (
                      <div
                        key={charm.id}
                        onClick={() => handleCharmToggle(charm)}
                        className={`flex items-center gap-3.5 p-2.5 border cursor-pointer select-none transition-all ${
                          isChecked ? 'border-brand-dark bg-brand-bgLight/30' : 'border-brand-border hover:border-brand-dark/50'
                        }`}
                      >
                        {/* Checkbox */}
                        <div className={`w-4 h-4 border flex items-center justify-center text-[0.7rem] flex-shrink-0 transition-all ${
                          isChecked ? 'bg-brand-dark border-brand-dark text-white' : 'border-brand-border bg-white'
                        }`}>
                          {isChecked && <i className="fa-solid fa-check"></i>}
                        </div>

                        {/* Charm Thumbnail */}
                        <div className="w-10 h-10 bg-brand-bgLight border border-brand-border flex items-center justify-center flex-shrink-0">
                          <img src={charm.images[0]} alt={charm.title} className="w-8 h-8 object-contain" />
                        </div>

                        {/* Details */}
                        <div className="flex-grow">
                          <p className="text-[1.2rem] font-bold leading-tight text-brand-dark">{charm.title}</p>
                          <p className="text-xs text-brand-muted mt-0.5">+ ₹{charm.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bundle Checkout Subtotal & Purchase CTA */}
            <div className="border-t border-brand-border pt-5">
              {selectedCharms.length > 0 && (
                <div className="flex justify-between font-heading font-extrabold text-base mb-4 uppercase text-brand-dark">
                  <span>Bundle Total</span>
                  <span>₹{bundleTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <button
                onClick={handleAddToBag}
                className="w-full bg-brand-dark text-white py-4.5 font-heading font-bold text-xs tracking-widest uppercase border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300"
              >
                ADD TO BAG
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
