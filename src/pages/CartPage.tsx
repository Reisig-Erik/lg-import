import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trash2, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeCartItem, getCartTotal } = useCart();
  const { subTotal, feeRate, total } = getCartTotal();

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
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/5 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-2xl">
              <p className="text-xl text-gray-400 mb-6">Your cart is empty</p>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Cart Items */}
              <div className="bg-white/5 rounded-2xl p-6">
                <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 mb-6 text-gray-400 px-4">
                  <div>Product</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Unit price</div>
                  <div className="text-right">Sub total</div>
                  <div></div>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return null;

                    const quantity = item.quantity || 0;
                    const itemTotal = product.price * quantity;

                    return (
                      <div key={item.id} className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 items-center bg-white/5 rounded-xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-400">Gold bar</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(0, quantity - 1))}
                            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => updateCartItem(item.id, quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          ${product.price.toLocaleString()}
                        </div>
                        <div className="text-right">
                          ${itemTotal.toLocaleString()}
                        </div>
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="p-2 text-gray-400 hover:text-white transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sub total</span>
                    <span>${subTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Fee rate</span>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>${feeRate}</span>
                  </div>
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default CartPage;