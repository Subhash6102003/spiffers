import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart, openCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  
  // Hover image index cache to show alternative images
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Sync category state with search query param
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setActiveCategory(catParam);
    } else {
      setActiveCategory('All');
    }
  }, [searchParams]);

  // Categories list
  const categoriesList = ['All', 'Sneakers', 'Slides', 'Shoe Accessories'];

  // Handle category trigger click
  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    setActiveCategory(category);
  };

  // Filter and sort logic
  const filteredProducts = products
    .filter(product => {
      let matchesCategory = false;
      if (activeCategory === 'All') {
        matchesCategory = true;
      } else if (activeCategory === 'Sneakers') {
        matchesCategory = product.type === 'Sneakers' || product.type === 'Shoes';
      } else if (activeCategory === 'Slides') {
        matchesCategory = product.type === 'Slides';
      } else if (activeCategory === 'Shoe Accessories') {
        matchesCategory = product.type === 'Accessories' || product.type === 'Charms';
      }
      
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'title-asc') return a.title.localeCompare(b.title);
      if (sortOption === 'title-desc') return b.title.localeCompare(a.title);
      
      // Default (Featured) - custom priority: Sneakers/Shoes first (1), Slides second (2), Accessories third (3), Charms fourth (4)
      const typePriority = {
        'Sneakers': 1,
        'Shoes': 1,
        'Slides': 2,
        'Accessories': 3,
        'Charms': 4
      };
      
      const priorityA = typePriority[a.type] || 99;
      const priorityB = typePriority[b.type] || 99;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      return a.id - b.id; // Secondary sort by ID
    });

  // Direct add to bag handler
  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.type === 'Slides' || product.type === 'Sneakers' || product.type === 'Shoes') {
      addToCart(product, 1, 'UK 8');
    } else {
      addToCart(product, 1, null);
    }
    openCart();
  };

  return (
    <div className="pt-28 pb-20 px-[5%] bg-white min-h-screen">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Page title */}
        <div className="mb-10">
          <span className="font-heading text-[1.05rem] font-bold tracking-widest text-brand-muted uppercase block mb-2">
            Spiffers Catalog
          </span>
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold uppercase text-brand-dark">
            {activeCategory} Collection
          </h1>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center border-b border-brand-border pb-6 mb-8">
          
          {/* Categories Slider */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`font-body text-[0.8rem] font-bold tracking-wider uppercase px-5 py-2.5 border whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-dark text-white border-brand-dark'
                    : 'bg-transparent text-brand-dark border-brand-border hover:border-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search and Sort controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            
            {/* Search */}
            <div className="relative border border-brand-border flex items-center px-3 py-2 bg-white w-full sm:w-[240px]">
              <i className="fa-solid fa-magnifying-glass text-brand-muted mr-2 text-xs"></i>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-[1.25rem] focus:outline-none placeholder:text-brand-muted"
              />
            </div>

            {/* Sort */}
            <div className="relative border border-brand-border flex items-center px-3 py-2 bg-white">
              <i className="fa-solid fa-arrow-down-wide-short text-brand-muted mr-2 text-xs"></i>
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="bg-transparent border-none text-[1.2rem] font-heading font-bold uppercase focus:outline-none pr-6 cursor-pointer text-brand-dark"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="title-asc">Alphabetical: A-Z</option>
                <option value="title-desc">Alphabetical: Z-A</option>
              </select>
            </div>

          </div>
        </div>

        {/* Catalog Count */}
        <div className="text-[1.2rem] text-brand-muted mb-6">
          Showing {filteredProducts.length} products
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-brand-border bg-brand-bgLight/40">
            <i className="fa-regular fa-folder-open text-3xl text-brand-muted mb-4 block"></i>
            <p className="text-[1.4rem] text-brand-secondary font-heading uppercase">No matching products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => {
              const showAlternative = hoveredProduct === product.id && product.images.length > 1;
              const productUrl = `/product/${product.handle}`;
              
              return (
                <Link
                  key={product.id}
                  to={productUrl}
                  className="flex flex-col bg-white border border-brand-border group hover:shadow-md transition-all duration-300"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Thumbnail Wrapper */}
                  <div className="relative w-full pb-[110%] bg-brand-bgLight overflow-hidden flex items-center justify-center border-b border-brand-border">
                    <img
                      src={showAlternative ? product.images[1] : product.images[0]}
                      alt={product.title}
                      className="absolute inset-0 w-[80%] h-[80%] object-contain m-auto transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Direct Add to Bag Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <button
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="w-full bg-white/95 text-brand-dark py-3 text-xs font-heading font-bold tracking-widest uppercase shadow-md hover:bg-brand-dark hover:text-white transition-all duration-300"
                      >
                        QUICK ADD
                      </button>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-[0.95rem] font-heading font-extrabold tracking-widest text-brand-muted uppercase block mb-1">
                        {product.type === 'Charms' ? 'Charms' : product.type}
                      </span>
                      <h3 className="text-[1.35rem] font-bold leading-snug group-hover:text-brand-muted transition-colors text-brand-dark">
                        {product.title}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-brand-bgLight">
                      <span className="font-heading font-bold text-[1.3rem] text-brand-dark">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[1.05rem] font-heading font-bold tracking-widest text-brand-muted uppercase group-hover:underline">
                        VIEW DETAILS
                      </span>
                    </div>
                  </div>

                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
