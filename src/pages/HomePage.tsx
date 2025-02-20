import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ManualSelection from '../components/ManualSelection';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function HomePage() {
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();
  const [amount, setAmount] = useState(50000);
  const [showRecommended, setShowRecommended] = useState(false);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, quantity: 1, price: 4100, name: 'Libregold 5g Gold bar' },
    { id: 2, quantity: 2, price: 4100, name: 'Libregold 5g Gold bar' }
  ]);

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    setShowRecommended(true);
    setShowManualSelection(false);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.preventDefault(); // Prevent navigation to product detail
    addToCart(productId, 1);
  };

  const handleBuyNow = () => {
    // Clear existing cart items first
    clearCart();
    
    // Add all selected items to cart without showing the drawer
    selectedItems.forEach(item => {
      addToCart(item.id, item.quantity, true);
    });

    // Navigate directly to checkout
    navigate('/checkout');
  };

  const suggestedAmounts = [5000, 10000, 15000, 25000, 100000];
  const feeRate = 150;
  const subTotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subTotal + feeRate;

  const popularProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white relative">
      {/* Golden gradient shadows */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#B8860B]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B8860B]/20 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="max-w-4xl mx-auto">
          <Header />

          {/* Main Content */}
          <h1 className="text-4xl font-bold mb-12">Buy Libregold on Bitcoin</h1>

          {/* Amount Selector */}
          <div className="bg-white/5 rounded-3xl p-8 mb-8 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">How much would you like to spend?</h2>
              <p className="text-gray-400">Adjust the amount to see our recommended selection</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2 text-sm text-gray-400">
                <span>0</span>
                <span>$ {amount.toLocaleString()}</span>
                <span>$ 100k</span>
              </div>
              <div className="relative">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-gray-700 rounded-full"></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-[#B8860B] rounded-full" 
                  style={{ width: `${(amount / 100000) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={amount}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  className="relative w-full appearance-none bg-transparent cursor-pointer z-10"
                  style={{
                    '--thumb-size': '24px',
                    '--thumb-color': '#B8860B'
                  } as React.CSSProperties}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-2xl text-gray-400">$</span>
              <input
                type="text"
                value={amount.toLocaleString()}
                onChange={(e) => handleAmountChange(Number(e.target.value.replace(/,/g, '')))}
                className="bg-transparent border-none text-2xl text-center w-32 focus:outline-none"
              />
            </div>

            <div className="flex justify-center gap-2 mb-8">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleAmountChange(amt)}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-sm"
                >
                  $ {amt.toLocaleString()}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setShowRecommended(true);
                  setShowManualSelection(false);
                }}
                className="px-16 py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
              >
                Show selections
              </button>
            </div>
          </div>

          {/* Selected Items */}
          {showRecommended && (
            <div className="bg-white/5 rounded-3xl p-8 mb-8 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Recommended selection</h2>
                <button 
                  onClick={() => {
                    setShowManualSelection(true);
                    setShowRecommended(false);
                  }}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  Select manually
                </button>
              </div>

              {/* Table Headers */}
              <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 mb-4 text-gray-400 px-4">
                <div>Product</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Unite price</div>
                <div className="text-right">Sub total</div>
                <div></div>
              </div>

              {/* Table Content */}
              <div className="space-y-3 mb-8">
                {selectedItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 items-center bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SZpQdNq78XlSbTBG9kIwkaGpnFjyQM.png"
                          alt="Gold bar"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">Gold bar</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">-</button>
                      <span>{item.quantity}</span>
                      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">+</button>
                    </div>
                    <div className="text-right">
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="text-right">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button className="flex justify-end">
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 rounded-2xl p-6">
                <div className="flex justify-between mb-4">
                  <span>Sub total</span>
                  <span>${subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span>Fee rate</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <span>${feeRate}</span>
                </div>
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-[#B8860B] rounded-full font-semibold mt-6 hover:bg-[#986D0B] transition"
                >
                  Buy now
                </button>
              </div>
            </div>
          )}

          {/* Manual Selection */}
          {showManualSelection && <ManualSelection />}

          {/* Popular Products */}
          <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Most popular products</h2>
                <p className="text-gray-400">Explore gold bars by weight</p>
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {popularProducts.map((product) => (
                <div key={product.id} className="bg-white/5 rounded-2xl p-4 transition hover:bg-white/10">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium mb-3 text-center">{product.name}</h3>
                      <p className="text-[#B8860B] font-semibold text-xl mb-4">${product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                  <button 
                    onClick={(e) => handleAddToCart(e, product.id)}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded-full flex items-center justify-center gap-2 ${
                      product.inStock 
                        ? 'bg-[#B8860B] hover:bg-[#986D0B]' 
                        : 'bg-gray-500 cursor-not-allowed'
                    } transition`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Add to cart' : 'Out of stock'}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link to="/products" className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                View all products
              </Link>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;