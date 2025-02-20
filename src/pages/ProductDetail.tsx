import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Info, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const product = products.find(p => p.id === Number(id));

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const images = [
    product.image,
    product.image,
    product.image
  ];

  const productDetails = {
    type: 'Fine Gold',
    weight: product.weight,
    purity: '999.9',
    producer: 'Heraeus',
    packagingType: 'Blister',
    size: '15.1 x 8.8 x 0.5'
  };

  const faqItems = [
    {
      id: 'payment',
      title: 'Payment Methods',
      content: `We accept various payment methods including Bitcoin, credit cards (Visa, Mastercard), PayPal, and bank transfers. All transactions are processed securely, and we use industry-standard encryption to protect your financial information. Bitcoin payments are confirmed instantly, while traditional payment methods may take 1-2 business days to process.`,
      logos: [
        {
          src: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
          alt: 'Bitcoin',
          className: 'h-8'
        },
        {
          src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
          alt: 'PayPal',
          className: 'h-6'
        },
        {
          src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
          alt: 'Mastercard',
          className: 'h-8'
        },
        {
          src: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
          alt: 'Visa',
          className: 'h-6'
        },
        {
          src: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg',
          alt: 'Google Pay',
          className: 'h-6'
        }
      ]
    },
    {
      id: 'storage',
      title: 'Storage',
      content: `Your gold bars are stored in high-security vaults operated by our trusted partners. Each bar is fully insured and regularly audited by independent parties. You can request physical delivery at any time or keep your gold in secure storage. Storage fees are waived for the first year and are minimal thereafter, calculated at just 0.12% annually of the gold's value.`
    },
    {
      id: 'delivery',
      title: 'Redemption and Delivery',
      content: `Physical delivery is available to most countries worldwide. When requesting delivery, your gold bars are carefully packaged in tamper-evident containers and shipped via insured courier services. Delivery typically takes 3-5 business days within Europe and 5-10 business days for international shipments. All shipments are fully insured and require signature upon delivery.`
    }
  ];

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white relative">
      {/* Golden gradient shadows */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#B8860B]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B8860B]/20 to-transparent pointer-events-none"></div>

      {/* Main Content */}
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
            <h1 className="text-4xl font-bold">{product.name}</h1>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-2 gap-12 mb-16">
            {/* Left column - Images */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="max-w-sm mx-auto space-y-6">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-1 aspect-square bg-white/10 rounded-xl transition ${
                        selectedImage === index ? 'ring-2 ring-[#B8860B]' : ''
                      }`}
                    >
                      <div className="w-full h-full p-2">
                        <div className="w-full h-full rounded-lg overflow-hidden">
                          <img
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column - Details */}
            <div className="space-y-8">
              <div>
                <div className="flex items-baseline gap-4 mb-2">
                  <h2 className="text-4xl font-bold">${product.price.toLocaleString()}</h2>
                  <span className="text-gray-400">VAT free</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>incl. Inscription costs & certificate</span>
                  <Info className="w-4 h-4" />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-500 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {product.inStock ? 'Available now' : 'Out of stock'}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white/5 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-xl"
                    disabled={!product.inStock}
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-xl"
                    disabled={!product.inStock}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-full font-semibold flex items-center justify-center gap-2 ${
                    product.inStock 
                      ? 'bg-[#B8860B] hover:bg-[#986D0B]' 
                      : 'bg-gray-500 cursor-not-allowed'
                  } transition`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'Add to cart' : 'Out of stock'}
                </button>
              </div>

              <div className="bg-white/5 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-6">Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.type}</h4>
                      <p className="text-sm text-gray-400">Type</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.producer}</h4>
                      <p className="text-sm text-gray-400">Producer</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.weight}</h4>
                      <p className="text-sm text-gray-400">Weight</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.packagingType}</h4>
                      <p className="text-sm text-gray-400">Packaging Type</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.purity}</h4>
                      <p className="text-sm text-gray-400">Purity</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-6">
                      <h4 className="font-medium mb-1">{productDetails.size}</h4>
                      <p className="text-sm text-gray-400">Size in mm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section without headline */}
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition"
                >
                  <span className="text-lg font-medium">{item.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      openFaq === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openFaq === item.id ? 'py-4' : 'py-0 h-0'
                  }`}
                >
                  <p className={`text-gray-300 leading-relaxed mb-4 ${
                    openFaq === item.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {item.content}
                  </p>
                  {'logos' in item && (
                    <div className={`grid grid-cols-5 gap-8 items-center ${
                      openFaq === item.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      {item.logos?.map((logo, index) => (
                        <img
                          key={index}
                          src={logo.src}
                          alt={logo.alt}
                          className={logo.className}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;