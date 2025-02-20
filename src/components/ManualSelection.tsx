import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { Info } from 'lucide-react';

function ManualSelection() {
  const { cartItems, updateCartItem, removeCartItem } = useCart();
  const feeRate = 150;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateCartItem(productId, newQuantity);
    }
  };

  const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subTotal + feeRate;

  return (
    <div className="bg-white/5 rounded-3xl p-8 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">My selection</h2>
        <button className="px-4 py-2 rounded-full bg-white/10">
          Show only recommended
        </button>
      </div>

      <div className="space-y-6 mb-8">
        {products.map((product) => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const quantity = cartItem?.quantity || 0;

          return (
            <div key={product.id} className="flex items-center gap-6">
              <div className="flex items-center gap-4 w-48">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, quantity - 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      handleQuantityChange(product.id, val);
                    }}
                    className="w-12 h-8 bg-white/10 rounded-lg text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(product.id, quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  >
                    +
                  </button>
                </div>
                {quantity > 0 && (
                  <button
                    onClick={() => removeCartItem(product.id)}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="flex-1">{product.name}</span>
                <span className="w-32 text-right">${product.price.toLocaleString()}</span>
                <span className="w-32 text-right">
                  ${(product.price * quantity).toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {cartItems.length > 0 && (
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
          <button className="w-full py-3 bg-[#B8860B] rounded-full font-semibold mt-6 hover:bg-[#986D0B] transition">
            Buy now
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualSelection;