import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, ArrowUpDown, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

type SortOption = 'price-asc' | 'price-desc' | 'weight-asc' | 'weight-desc';

function ProductListPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Convert weight string to number for sorting (e.g., "200g" -> 200, "1kg" -> 1000)
  const weightToNumber = (weight: string): number => {
    const value = parseFloat(weight);
    const unit = weight.replace(/[0-9.]/g, '').toLowerCase();
    return unit === 'kg' ? value * 1000 : value;
  };

  const filteredAndSortedProducts = useMemo(() => {
    return [...products]
      .filter(product => {
        if (showOnlyAvailable && !product.inStock) {
          return false;
        }
        return searchQuery === '' || 
          product.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'weight-asc':
            return weightToNumber(a.weight) - weightToNumber(b.weight);
          case 'weight-desc':
            return weightToNumber(b.weight) - weightToNumber(a.weight);
          default:
            return 0;
        }
      });
  }, [sortBy, searchQuery, showOnlyAvailable]);

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'weight-asc', label: 'Weight: Low to High' },
    { value: 'weight-desc', label: 'Weight: High to Low' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white relative">
      {/* Golden gradient shadows */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#B8860B]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B8860B]/20 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="max-w-4xl mx-auto">
          <Header />

          {/* Back button and title */}
          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/5 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-bold">Buy libregold on bitcoin</h1>
          </div>

          {/* Search, Availability, and Sort Controls */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl">
              <span className="text-sm text-gray-400">Only available</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showOnlyAvailable}
                  onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#B8860B]"></div>
              </label>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortOptions(!showSortOptions)}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 transition text-sm min-w-[200px]"
              >
                <ArrowUpDown className="w-4 h-4" />
                {sortOptions.find(option => option.value === sortBy)?.label}
              </button>
              {showSortOptions && (
                <div className="absolute top-full left-0 mt-2 w-[200px] bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg z-10">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value as SortOption);
                        setShowSortOptions(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition ${
                        sortBy === option.value ? 'bg-white/5' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-4 gap-4">
            {filteredAndSortedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white/5 rounded-2xl p-4 transition group relative hover:bg-white/10"
              >
                <Link 
                  to={`/product/${product.id}`}
                  className="block mb-4"
                >
                  <div className="relative">
                    <div className="aspect-[3/4] rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 px-3 py-1 bg-gray-500/90 rounded-full text-xs font-medium">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 text-center">
                    <h3 className="font-medium hover:text-[#B8860B] transition">{product.name}</h3>
                    <p className="text-[#B8860B] font-semibold text-xl">${product.price.toLocaleString()}</p>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (product.inStock) {
                      addToCart(1);
                    }
                  }}
                  disabled={!product.inStock}
                  className={`w-full py-2 rounded-full text-sm flex items-center justify-center gap-2
                    ${product.inStock 
                      ? 'bg-[#B8860B] hover:bg-[#986D0B] transition' 
                      : 'bg-gray-500 cursor-not-allowed'}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? 'Add to cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No products found matching your search.</p>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;