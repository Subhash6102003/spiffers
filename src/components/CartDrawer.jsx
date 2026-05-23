import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    addToCart,
    cartSubtotal,
    cartTotal
  } = useCart();

  const navigate = useNavigate();

  // Find charms from product list to show as quick-add upsell suggestions
  const charmSuggestions = products.filter(p => p.type === 'Charms').slice(0, 3);

  const isCharmInCart = (id) => cart.some(item => item.id === id);

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Background overlay screen */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] transition-opacity duration-500 ${
          cartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
      />

      {/* Cart Drawer panel */}
      <div
        className={`fixed top-0 right-0 w-[440px] max-w-full h-full bg-white z-[1001] shadow-2xl flex flex-col transition-all duration-500 ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <h3 className="text-sm font-heading font-extrabold tracking-widest text-brand-dark">
            YOUR BAG ({cartTotal})
          </h3>
          <button onClick={closeCart} className="text-xl text-brand-dark hover:scale-110" aria-label="Close cart">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-brand-muted">
            <i className="fa-solid fa-bag-shopping text-4xl mb-4 text-brand-border"></i>
            <p className="text-[1.4rem] text-brand-secondary mb-6 font-medium">Your bag is empty.</p>
            <button
              onClick={closeCart}
              className="bg-brand-dark text-white px-6 py-3 font-heading font-bold text-xs tracking-widest uppercase hover:bg-brand-secondary transition-all"
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable list */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              
              {/* Cart item rows */}
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-brand-border pb-4">
                    
                    {/* Item Thumbnail */}
                    <div className="w-16 h-16 bg-brand-bgLight border border-brand-border flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                    </div>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-xs font-bold leading-tight text-brand-dark">{item.title}</h4>
                          <span className="font-heading font-bold text-[1.25rem] text-brand-dark">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </span>
                        </div>
                        {item.size && (
                          <div className="text-[1.1rem] text-brand-muted mt-0.5 font-medium">Size: {item.size}</div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Qty Selector */}
                        <div className="flex items-center border border-brand-border">
                          <button
                            className="w-6 h-6 flex items-center justify-center text-[1rem] text-brand-secondary hover:text-brand-dark"
                            onClick={() => updateQuantity(item.id, item.size, item.qty - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-heading font-bold text-[1.1rem]">{item.qty}</span>
                          <button
                            className="w-6 h-6 flex items-center justify-center text-[1rem] text-brand-secondary hover:text-brand-dark"
                            onClick={() => updateQuantity(item.id, item.size, item.qty + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          className="text-[1.1rem] text-brand-muted underline hover:text-brand-dark"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessories Upsell Section */}
              <div className="border-t border-brand-border pt-5 mt-2">
                <h4 className="text-[1.05rem] font-heading font-extrabold tracking-widest text-brand-dark uppercase mb-3.5">
                  COMPLETE YOUR LOOK
                </h4>
                
                <div className="flex flex-col gap-2.5">
                  {charmSuggestions.map(charm => {
                    const added = isCharmInCart(charm.id);
                    return (
                      <div key={charm.id} className="flex items-center justify-between bg-brand-bgLight/40 p-2.5 border border-brand-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white border border-brand-border flex items-center justify-center overflow-hidden">
                            <img src={charm.images[0]} alt={charm.title} className="w-8 h-8 object-contain" />
                          </div>
                          <div>
                            <p className="text-[1.2rem] font-bold leading-tight text-brand-dark">{charm.title}</p>
                            <p className="text-[1.05rem] text-brand-muted mt-0.5">₹{charm.price}</p>
                          </div>
                        </div>
                        <button
                          disabled={added}
                          onClick={() => addToCart(charm, 1)}
                          className={`text-[0.95rem] font-heading font-extrabold uppercase px-3 py-1.5 border transition-all ${
                            added
                              ? 'bg-transparent text-brand-muted border-transparent cursor-default'
                              : 'bg-brand-dark text-white border-brand-dark hover:bg-transparent hover:text-brand-dark'
                          }`}
                        >
                          {added ? <i className="fa-solid fa-check"></i> : 'ADD'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Cart Footer block */}
            <div className="p-6 border-t border-brand-border bg-white">
              <div className="flex justify-between font-heading font-extrabold text-sm mb-2 uppercase text-brand-dark">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[1.1rem] text-brand-muted mb-5 leading-normal">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-brand-dark text-white py-3.5 font-heading font-bold text-xs tracking-widest uppercase border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
