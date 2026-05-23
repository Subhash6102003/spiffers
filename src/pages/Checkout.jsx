import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'upi'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate mock order number
    const randomOrder = 'SPF-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrder);
    setOrderPlaced(true);
    
    // Wipe cart
    clearCart();
  };

  // Shipping cost
  const shippingCost = cartSubtotal >= 1000 ? 0 : 99;
  const orderTotal = cartSubtotal + shippingCost;

  if (orderPlaced) {
    return (
      <div className="pt-32 pb-20 px-6 text-center min-h-screen bg-white">
        <div className="max-w-[460px] mx-auto border border-brand-border p-8 md:p-10 shadow-sm flex flex-col items-center">
          
          {/* Checkmark */}
          <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mb-5">
            <i className="fa-solid fa-check"></i>
          </div>

          <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-2">
            Spiffers Order Confirmed
          </span>
          <h2 className="text-2xl font-heading font-extrabold mb-3 uppercase text-brand-dark">
            THANK YOU FOR YOUR ORDER!
          </h2>
          <p className="text-[1.35rem] text-brand-secondary leading-relaxed mb-6 font-medium">
            We've sent a drop confirmation email to <strong className="text-brand-dark">{formData.email}</strong>. Your sneakers/slides are being anchored for delivery!
          </p>

          <div className="w-full bg-brand-bgLight p-5 border border-brand-border mb-6 text-left">
            <div className="flex justify-between border-b border-brand-border pb-2.5 mb-2.5 text-[1.25rem]">
              <span className="text-brand-muted">Order Number:</span>
              <strong className="text-brand-dark">{orderNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-brand-border pb-2.5 mb-2.5 text-[1.25rem]">
              <span className="text-brand-muted">Shipping Carrier:</span>
              <span className="text-brand-dark font-medium">Delhivery Premium</span>
            </div>
            <div className="flex justify-between text-[1.25rem]">
              <span className="text-brand-muted">Payment:</span>
              <span className="text-brand-dark uppercase font-medium">{formData.paymentMethod} (Mocked)</span>
            </div>
          </div>

          <Link
            to="/shop"
            className="w-full text-center bg-brand-dark text-white py-3.5 font-heading font-bold text-xs tracking-widest uppercase border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-[5%] bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Title */}
        <div className="mb-10">
          <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-2">
            Secure Checkout
          </span>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-brand-dark">
            Checkout
          </h1>
        </div>

        {/* Check out grid layout */}
        {cart.length === 0 ? (
          <div className="text-center py-20 border border-brand-border bg-brand-bgLight/40">
            <i className="fa-solid fa-cart-shopping text-3xl text-brand-muted mb-4 block"></i>
            <p className="text-[1.4rem] text-brand-secondary font-heading uppercase mb-6">Your shopping bag is empty.</p>
            <Link
              to="/shop"
              className="inline-block bg-brand-dark text-white px-6 py-3.5 font-heading font-bold text-xs tracking-widest uppercase"
            >
              SHOP CATALOG
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Details form */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Contact Info */}
              <div>
                <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark border-b border-brand-border pb-2.5 mb-5 uppercase">
                  CONTACT INFORMATION
                </h3>
                <div className="flex flex-col gap-3">
                  <label className="text-xs font-heading font-bold text-brand-secondary uppercase">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email for drop notifications"
                    className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none w-full"
                  />
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="newsletter" defaultChecked className="w-4 h-4 border-brand-border" />
                    <label htmlFor="newsletter" className="text-xs text-brand-secondary uppercase select-none font-medium">
                      Keep me updated on Spiffers restocks and releases
                    </label>
                  </div>
                </div>
              </div>

              {/* Shipping Details */}
              <div>
                <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark border-b border-brand-border pb-2.5 mb-5 uppercase">
                  DELIVERY ADDRESS
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-heading font-bold text-brand-secondary uppercase">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-heading font-bold text-brand-secondary uppercase">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="text-xs font-heading font-bold text-brand-secondary uppercase">Full Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Flat, House no., Building, Apartment, Street"
                    className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-heading font-bold text-brand-secondary uppercase">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-heading font-bold text-brand-secondary uppercase">PIN / Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="6-digit PIN Code"
                      className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-heading font-bold text-brand-secondary uppercase">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="border border-brand-border p-3 text-[1.3rem] focus:border-brand-dark focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark border-b border-brand-border pb-2.5 mb-5 uppercase">
                  PAYMENT METHOD
                </h3>

                <div className="flex flex-col gap-2">
                  <label className={`flex items-center gap-3 p-3 border cursor-pointer select-none transition-all ${
                    formData.paymentMethod === 'upi' ? 'border-brand-dark bg-brand-bgLight/30' : 'border-brand-border'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-brand-dark focus:ring-brand-dark border-brand-border"
                    />
                    <span className="text-[1.25rem] font-bold text-brand-dark uppercase">Instant UPI / QR Code (Mocked)</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3 border cursor-pointer select-none transition-all ${
                    formData.paymentMethod === 'card' ? 'border-brand-dark bg-brand-bgLight/30' : 'border-brand-border'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-brand-dark focus:ring-brand-dark border-brand-border"
                    />
                    <span className="text-[1.25rem] font-bold text-brand-dark uppercase">Credit / Debit Card (Mocked)</span>
                  </label>

                  <label className={`flex items-center gap-3 p-3 border cursor-pointer select-none transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-brand-dark bg-brand-bgLight/30' : 'border-brand-border'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-brand-dark focus:ring-brand-dark border-brand-border"
                    />
                    <span className="text-[1.25rem] font-bold text-brand-dark uppercase">Cash on Delivery (COD)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary block */}
            <div className="lg:col-span-5 border border-brand-border bg-brand-bgLight/30 p-6 lg:sticky lg:top-24">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark border-b border-brand-border pb-2.5 mb-5 uppercase">
                ORDER SUMMARY
              </h3>

              {/* Items list */}
              <div className="flex flex-col gap-3 border-b border-brand-border pb-5 mb-5 max-h-[260px] overflow-y-auto pr-2 scrollbar-thin">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3.5 items-center">
                    <div className="w-12 h-12 bg-white border border-brand-border flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-9 h-9 object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[1.2rem] font-bold leading-tight text-brand-dark">{item.title}</h4>
                      <p className="text-[1.05rem] text-brand-muted mt-0.5 font-medium">
                        Qty: {item.qty} {item.size ? `| Size: ${item.size}` : ''}
                      </p>
                    </div>
                    <span className="font-heading font-bold text-[1.2rem] text-brand-dark flex-shrink-0">
                      ₹{(item.price * item.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Math */}
              <div className="flex flex-col gap-2.5 border-b border-brand-border pb-5 mb-5 text-[1.3rem]">
                <div className="flex justify-between">
                  <span className="text-brand-secondary font-medium">Bag Subtotal</span>
                  <span className="font-bold text-brand-dark">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-secondary font-medium">Delhivery Shipping</span>
                  <span className="font-bold text-brand-dark">
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between font-heading font-extrabold text-lg mb-6 uppercase text-brand-dark">
                <span>Total Amount</span>
                <span>₹{orderTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-dark text-white py-4 font-heading font-bold text-xs tracking-widest uppercase border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300"
              >
                PLACE SECURE ORDER
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
