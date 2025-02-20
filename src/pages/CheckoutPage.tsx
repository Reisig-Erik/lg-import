import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Wallet, UserCheck, CreditCard, CheckCircle2, AlertCircle, 
  ArrowLeft, Copy, ExternalLink 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

type CheckoutStep = 'wallet' | 'kyc' | 'payment' | 'complete';
type PaymentMethod = 'Credit Card' | 'Crypto' | 'Bank Transfer' | 'PayPal';
type CryptoOption = 'Bitcoin' | 'Ethereum' | 'Solana' | 'Cardano';

interface CryptoDetails {
  name: CryptoOption;
  symbol: string;
  address: string;
  icon: string;
  network: string;
}

function CheckoutPage() {
  const navigate = useNavigate();
  const { getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('wallet');
  const [walletAddress, setWalletAddress] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isKycComplete, setIsKycComplete] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption | null>(null);
  const [showCryptoOptions, setShowCryptoOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const { total } = getCartTotal();
  const requiresKyc = total > 10000;

  const cryptoOptions: CryptoDetails[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      network: 'Bitcoin Network'
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      network: 'Ethereum Mainnet'
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      address: '7cKC91mPyX7zf2gVcxiHLdvWj4QYCEYvyTw7KoTiYxdr',
      icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      network: 'Solana Mainnet'
    },
    {
      name: 'Cardano',
      symbol: 'ADA',
      address: 'addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
      network: 'Cardano Mainnet'
    }
  ];

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `ORD-${timestamp}-${random}`.toUpperCase();
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    setWalletAddress('bc1p...3kp9');
    setTimeout(() => setCurrentStep(requiresKyc ? 'kyc' : 'payment'), 500);
  };

  const handleCompleteKyc = () => {
    setIsKycComplete(true);
    setCurrentStep('payment');
  };

  const handlePayment = () => {
    const orderId = generateOrderId();
    clearCart();
    navigate(`/order-status/${orderId}`);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(address);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleBackToPaymentMethods = () => {
    setSelectedPaymentMethod(null);
    setSelectedCrypto(null);
    setShowCryptoOptions(false);
  };

  const handleBackToCryptoOptions = () => {
    setSelectedCrypto(null);
    setShowCryptoOptions(true);
  };

  const renderPaymentMethodContent = () => {
    if (selectedPaymentMethod === 'Crypto') {
      if (selectedCrypto) {
        const cryptoDetails = cryptoOptions.find(c => c.name === selectedCrypto);
        if (!cryptoDetails) return null;

        return (
          <div className="space-y-6">
            <button
              onClick={handleBackToCryptoOptions}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to crypto options
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={cryptoDetails.icon}
                alt={cryptoDetails.name}
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-xl font-semibold">{cryptoDetails.name}</h3>
                <p className="text-gray-400">{cryptoDetails.network}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">
                  Send exactly
                </label>
                <div className="text-2xl font-semibold">0.12 {cryptoDetails.symbol}</div>
                <div className="text-gray-400 text-sm">≈ ${total.toLocaleString()}</div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-2">
                    To this address
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white/5 p-3 rounded-lg font-mono text-sm break-all">
                      {cryptoDetails.address}
                    </code>
                    <button
                      onClick={() => handleCopyAddress(cryptoDetails.address)}
                      className={`p-2 rounded-lg transition ${
                        copySuccess === cryptoDetails.address
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'hover:bg-white/10'
                      }`}
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="w-32 h-32 bg-white/5 rounded-lg p-2 flex items-center justify-center">
                  <QRCodeSVG
                    value={cryptoDetails.address}
                    size={112}
                    bgColor="transparent"
                    fgColor="#FFFFFF"
                    level="L"
                    includeMargin={false}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 text-sm text-yellow-500">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>
                    Send only {cryptoDetails.symbol} to this address. Sending any other assets may result in permanent loss.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
            >
              I have sent the payment
            </button>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-gray-400 hover:text-white transition"
            >
              <span className="flex items-center gap-1 justify-center">
                View transaction status
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        );
      }

      if (showCryptoOptions) {
        return (
          <div className="space-y-6">
            <button
              onClick={handleBackToPaymentMethods}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to payment methods
            </button>

            <div className="grid grid-cols-2 gap-4">
              {cryptoOptions.map((crypto) => (
                <button
                  key={crypto.name}
                  onClick={() => setSelectedCrypto(crypto.name)}
                  className="p-4 rounded-xl border-2 border-white/10 hover:border-white/20 transition bg-white/5"
                >
                  <img
                    src={crypto.icon}
                    alt={crypto.name}
                    className="w-10 h-10 mb-3"
                  />
                  <span className="font-medium">{crypto.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      }
    }

    return (
      <>
        <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {(['Credit Card', 'Crypto', 'Bank Transfer', 'PayPal'] as PaymentMethod[]).map((method) => (
            <button
              key={method}
              onClick={() => {
                setSelectedPaymentMethod(method);
                if (method === 'Crypto') {
                  setShowCryptoOptions(true);
                }
              }}
              className="p-4 rounded-xl border-2 border-white/10 hover:border-white/20 transition bg-white/5"
            >
              <div className="w-10 h-10 bg-white/20 rounded-lg mb-3"></div>
              <span className="font-medium">{method}</span>
            </button>
          ))}
        </div>
      </>
    );
  };

  const steps = useMemo(() => {
    const baseSteps = [
      { id: 'wallet', label: 'Connect Wallet', icon: Wallet },
      { id: 'payment', label: 'Payment', icon: CreditCard },
    ];

    if (requiresKyc) {
      baseSteps.splice(1, 0, { id: 'kyc', label: 'KYC', icon: UserCheck });
    }

    return baseSteps;
  }, [requiresKyc]);

  const getStepStatus = (stepId: string) => {
    if (stepId === currentStep) return 'current';
    if (
      (stepId === 'wallet' && isWalletConnected) ||
      (stepId === 'kyc' && isKycComplete) ||
      (stepId === 'payment' && currentStep === 'complete')
    ) return 'complete';
    return 'pending';
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'wallet':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-6">
                Connect your Bitcoin wallet to receive your ordinal inscription. Make sure you're using a wallet that supports ordinals.
              </p>
              <button
                onClick={handleConnectWallet}
                className="w-full py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Supported Wallets</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Xverse', 'Unisat', 'Hiro'].map((wallet) => (
                  <div key={wallet} className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3"></div>
                    <span>{wallet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'kyc':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">KYC Verification Required</h2>
                  <p className="text-gray-400">
                    For purchases above $10,000, we require KYC verification to:
                  </p>
                  <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                    <li>Comply with regulatory requirements</li>
                    <li>Ensure transaction security</li>
                    <li>Protect against fraud</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={handleCompleteKyc}
                className="w-full py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
              >
                Complete KYC
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6">
              {renderPaymentMethodContent()}
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="bg-white/5 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Payment Complete!</h2>
            <p className="text-gray-400 mb-6">
              Your ordinal inscription will be delivered to your wallet shortly.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-[#B8860B] rounded-full font-semibold hover:bg-[#986D0B] transition"
            >
              Return to Home
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#B8860B]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B8860B]/20 to-transparent pointer-events-none"></div>

      <div className="relative p-6">
        <div className="max-w-4xl mx-auto">
          <Header />

          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={() => navigate('/cart')}
              className="px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/5 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Cart
            </button>
            <h1 className="text-4xl font-bold">Checkout</h1>
          </div>

          {currentStep !== 'complete' && (
            <div className="mb-8">
              <div className="flex items-center justify-between relative mb-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                          getStepStatus(step.id) === 'complete'
                            ? 'bg-[#B8860B]'
                            : getStepStatus(step.id) === 'current'
                            ? 'bg-white/20 ring-2 ring-[#B8860B]'
                            : 'bg-white/20'
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{step.label}</span>
                        </div>
                        {step.id === 'wallet' && isWalletConnected && (
                          <span className="text-sm text-gray-400">{walletAddress}</span>
                        )}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-[2px] bg-white/20 mx-4">
                        <div
                          className="h-full bg-[#B8860B] transition-all"
                          style={{
                            width:
                              getStepStatus(step.id) === 'complete' ? '100%' : '0%',
                          }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {renderStepContent()}

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;