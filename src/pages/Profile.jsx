import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState({
    firstName: 'Raghav',
    lastName: 'Sharma',
    email: 'raghav.sharma@collegedom.in',
    phone: '+91 98765 12345',
    rewardsPoints: 450,
    tier: 'Gold Anchor'
  });

  const orders = [
    {
      id: 'SPF-743920',
      date: 'May 20, 2026',
      total: 1499,
      status: 'In Transit',
      carrier: 'Delhivery Premium',
      trackingNum: 'DEL9876543210IN',
      items: [
        { title: 'Cumulus Blaze Slides', qty: 1, price: 1499, size: 'UK 8', image: 'https://cdn.shopify.com/s/files/1/0454/1146/7424/files/3_65a9118c-6c65-496e-a4d4-d51036664675.png?v=1750779324' }
      ]
    },
    {
      id: 'SPF-512984',
      date: 'April 02, 2026',
      total: 1749,
      status: 'Delivered',
      carrier: 'Delhivery Standard',
      trackingNum: 'DEL3210987654IN',
      items: [
        { title: 'Planate Clog SlipOns', qty: 1, price: 1099, size: 'UK 8', image: 'https://cdn.shopify.com/s/files/1/0454/1146/7424/files/IMG_6328a_75bbbd84-788e-450c-9f93-7bc8f0220823.png?v=1718445968' },
        { title: 'Spiffers Bolt Charm', qty: 1, price: 99, size: null, image: 'https://cdn.shopify.com/s/files/1/0454/1146/7424/files/IMG_6407.jpg?v=1769764312' },
        { title: 'Sunset Palm Charm', qty: 2, price: 240, size: null, image: 'https://cdn.shopify.com/s/files/1/0454/1146/7424/files/IMG_6490.jpg?v=1769763923' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-[5%] bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Title */}
        <div className="mb-12 border-b border-brand-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="font-heading text-xs font-bold tracking-widest text-brand-muted uppercase block mb-2">
              REWARDS CLUB
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold uppercase">
              My Profile
            </h1>
          </div>
          
          <div className="bg-brand-bgLight border border-brand-border px-6 py-4 flex gap-8 items-center">
            <div>
              <p className="text-xs text-brand-muted uppercase font-heading font-bold">REWARDS BAL</p>
              <p className="text-2xl font-heading font-extrabold text-brand-dark">{user.rewardsPoints} PTS</p>
            </div>
            <div className="h-8 w-[1px] bg-brand-border" />
            <div>
              <p className="text-xs text-brand-muted uppercase font-heading font-bold">CLUB TIER</p>
              <p className="text-[1.4rem] font-heading font-bold text-brand-dark uppercase tracking-wider">{user.tier}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Account Details & Shipping */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Profile Detail Block */}
            <div className="border border-brand-border p-8 bg-white">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark uppercase border-b border-brand-border pb-3 mb-6">
                ACCOUNT Details
              </h3>
              <div className="flex flex-col gap-4 text-[1.4rem]">
                <div>
                  <span className="text-brand-muted text-xs uppercase block mb-1">Full Name</span>
                  <strong className="text-brand-dark">{user.firstName} {user.lastName}</strong>
                </div>
                <div>
                  <span className="text-brand-muted text-xs uppercase block mb-1">Email Address</span>
                  <span className="text-brand-dark font-medium">{user.email}</span>
                </div>
                <div>
                  <span className="text-brand-muted text-xs uppercase block mb-1">Mobile Contact</span>
                  <span className="text-brand-dark font-medium">{user.phone}</span>
                </div>
              </div>
            </div>

            {/* Address Block */}
            <div className="border border-brand-border p-8 bg-white">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark uppercase border-b border-brand-border pb-3 mb-6">
                PRIMARY ADDRESS
              </h3>
              <p className="text-[1.4rem] text-brand-dark leading-relaxed">
                <strong>Raghav Sharma</strong><br />
                Vasant Kunj Hostel, Block D, Room 412,<br />
                Jawaharlal Nehru University (JNU),<br />
                New Delhi, Delhi - 110067<br />
                <span className="text-brand-muted block mt-2">Mobile: +91 98765 12345</span>
              </p>
              <button className="text-xs font-heading font-bold uppercase tracking-wider text-brand-dark border border-brand-dark px-4 py-2 mt-6 hover:bg-brand-dark hover:text-white transition-all">
                EDIT ADDRESSES
              </button>
            </div>
          </div>

          {/* Right Column: Order History and Status Tracking */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="border border-brand-border p-8 bg-white">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-brand-dark uppercase border-b border-brand-border pb-3 mb-6">
                Order History
              </h3>

              <div className="flex flex-col gap-8">
                {orders.map(order => (
                  <div key={order.id} className="border border-brand-border p-6 bg-brand-bgLight/20">
                    
                    {/* Order summary header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-brand-border pb-4 mb-4 text-[1.3rem]">
                      <div>
                        <span className="text-brand-muted">Order ID:</span>{' '}
                        <strong className="text-brand-dark">{order.id}</strong>
                      </div>
                      <div>
                        <span className="text-brand-muted">Date:</span>{' '}
                        <span className="text-brand-dark font-medium">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-brand-muted">Total:</span>{' '}
                        <strong className="text-brand-dark">₹{order.total.toLocaleString('en-IN')}</strong>
                      </div>
                      <div>
                        <span className={`px-3 py-1 font-heading text-[1rem] font-bold uppercase tracking-wider border ${
                          order.status === 'In Transit'
                            ? 'bg-blue-50 text-blue-500 border-blue-200'
                            : 'bg-green-50 text-green-500 border-green-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order details */}
                    <div className="flex flex-col gap-4 mb-6">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-brand-bgLight border border-brand-border flex items-center justify-center flex-shrink-0">
                            <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-[1.3rem] font-bold leading-tight text-brand-dark">{item.title}</h4>
                            <p className="text-xs text-brand-muted mt-0.5">
                              Qty: {item.qty} {item.size ? `| Size: ${item.size}` : ''}
                            </p>
                          </div>
                          <span className="font-heading font-bold text-[1.3rem] text-brand-dark">
                            ₹{(item.price * item.qty).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping tracker line */}
                    {order.status === 'In Transit' && (
                      <div className="border-t border-brand-border pt-4">
                        <p className="text-xs font-heading font-bold text-brand-dark uppercase mb-4 tracking-wider">
                          <i className="fa-solid fa-truck-fast mr-2"></i> Delivery Tracking Timeline
                        </p>
                        
                        {/* Interactive dots line */}
                        <div className="relative flex justify-between items-center max-w-[450px] mx-auto py-4">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-brand-border z-1">
                            <div className="h-full bg-blue-400 w-2/3"></div>
                          </div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-brand-dark border-4 border-white flex items-center justify-center text-[0.6rem] text-white"></div>
                            <span className="text-[1rem] font-heading font-bold text-brand-dark uppercase">Booked</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-brand-dark border-4 border-white flex items-center justify-center text-[0.6rem] text-white"></div>
                            <span className="text-[1rem] font-heading font-bold text-brand-dark uppercase">Hub</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-1.5 animate-pulse">
                            <div className="w-6 h-6 rounded-full bg-blue-500 border-4 border-white flex items-center justify-center text-[0.6rem] text-white"></div>
                            <span className="text-[1rem] font-heading font-bold text-blue-500 uppercase">Transit</span>
                          </div>
                          <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-40">
                            <div className="w-6 h-6 rounded-full bg-brand-border border-4 border-white flex items-center justify-center text-[0.6rem] text-white"></div>
                            <span className="text-[1rem] font-heading font-bold text-brand-muted uppercase">Delivered</span>
                          </div>
                        </div>

                        <div className="mt-4 bg-brand-bgLight p-4 border border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-brand-secondary">
                          <div>
                            <span className="text-brand-muted">Carrier:</span>{' '}
                            <strong>{order.carrier}</strong>
                            <br />
                            <span className="text-brand-muted">Waybill / tracking ID:</span>{' '}
                            <strong>{order.trackingNum}</strong>
                          </div>
                          <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); alert(`Redirecting to Delhivery tracking for ${order.trackingNum}`); }}
                            className="bg-brand-dark text-white px-4 py-2 font-heading font-bold uppercase tracking-wider hover:bg-brand-secondary transition-all"
                          >
                            TRACK ON DELHIVERY
                          </a>
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
