import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

function CartDrawer() {
  const navigate = useNavigate();
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    updateCartItem, 
    removeCartItem,
    getCartTotal 
  } = useCart();

  const { subTotal, feeRate, total } = getCartTotal();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-[#1a1a1a] shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button 
              onClick={closeCart}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;

                  return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-white/5 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-2">${product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartItem(item.id, Math.max(0, item.quantity - 1))}
                            className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity || 0}</span>
                          <button
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="ml-auto p-1 text-gray-400 hover:text-white transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/10 p-6">
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fee rate</span>
                  <span>${feeRate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
                >
                  Checkout
                </button>
                <button 
                  onClick={closeCart}
                  className="w-full py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartDrawer;