import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'BTC', symbol: '₿' }
  ];

  return (
    <div className="flex justify-between items-center mb-12">
      <Link to="/" className="flex items-center gap-2">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/libregold-H5Y5za4PZ7vQJoEdUsaxFO1d4GEiqX.png" 
          alt="Libregold Logo" 
          className="h-12 w-auto"
        />
      </Link>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            className="px-4 py-2 rounded-full bg-white/10 flex items-center gap-2 hover:bg-white/20 transition group"
          >
            🇺🇸 USA
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 p-4 bg-black rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <p className="text-sm text-gray-300">
                Your location was detected based on your IP address. Local Know Your Customer (KYC) regulations and compliance requirements will apply based on your country of residence.
              </p>
              <div className="absolute left-1/2 -top-2 -translate-x-1/2 border-8 border-transparent border-b-black"></div>
            </div>
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setShowCurrencies(!showCurrencies)}
            className="px-4 py-2 rounded-full bg-white/10 flex items-center gap-2 hover:bg-white/20 transition whitespace-nowrap"
          >
            {currencies.find(c => c.code === selectedCurrency)?.symbol} {selectedCurrency}
          </button>
          {showCurrencies && (
            <div className="absolute right-0 top-full mt-2 bg-black rounded-xl overflow-hidden z-50">
              {currencies.map(currency => (
                <button
                  key={currency.code}
                  onClick={() => {
                    setSelectedCurrency(currency.code);
                    setShowCurrencies(false);
                  }}
                  className="w-full px-6 py-2 text-left hover:bg-white/10 transition whitespace-nowrap"
                >
                  {currency.symbol} {currency.code}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => navigate('/cart')}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#B8860B] rounded-full flex items-center justify-center text-xs font-medium">
                {cartCount}
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;