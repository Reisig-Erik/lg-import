import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Copy, ExternalLink, Mail, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'failed';
type OrdinalStatus = 'pending' | 'minting' | 'delivered' | 'failed';

interface OrdinalDelivery {
  id: string;
  weight: string;
  status: OrdinalStatus;
  txId?: string;
  inscription?: string;
}

function OrderStatusPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  // Mock data - In a real app, this would come from an API
  const orderDetails = {
    id: orderId || 'ORD-123456',
    paymentStatus: 'confirmed' as OrderStatus,
    paymentMethod: 'Bitcoin',
    paymentAmount: '0.12 BTC',
    paymentTxId: '2a7e35c68c3c40d509ab901c2c0694a9e3608d5a5c5e1c4d1e9f3b2a1c0d8e7f',
    ordinals: [
      {
        id: 'ORD-1',
        weight: '100g',
        status: 'minting' as OrdinalStatus,
        txId: '1a2b3c4d5e6f7g8h9i0j',
      },
      {
        id: 'ORD-2',
        weight: '50g',
        status: 'delivered' as OrdinalStatus,
        txId: '2b3c4d5e6f7g8h9i0j1',
        inscription: 'abc123xyz789',
      }
    ] as OrdinalDelivery[]
  };

  const statusColors = {
    pending: 'text-yellow-500',
    confirmed: 'text-emerald-500',
    completed: 'text-emerald-500',
    failed: 'text-red-500',
    minting: 'text-blue-500',
    delivered: 'text-emerald-500'
  };

  const statusIcons = {
    pending: Clock,
    confirmed: CheckCircle2,
    completed: CheckCircle2,
    failed: AlertCircle,
    minting: Clock,
    delivered: CheckCircle2
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(text);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setIsEmailSubmitted(true);
    setTimeout(() => setIsEmailSubmitted(false), 3000);
  };

  const statusPageUrl = window.location.href;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white relative">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#B8860B]/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#B8860B]/20 to-transparent pointer-events-none"></div>

      <div className="relative p-6">
        <div className="max-w-4xl mx-auto">
          <Header />

          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white/5 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </button>
            <h1 className="text-4xl font-bold">Order Status</h1>
          </div>

          <div className="space-y-8">
            {/* Order ID and Status Link */}
            <div className="bg-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Order #{orderDetails.id}</h2>
                  <p className="text-gray-400">Track your order status anytime using this page</p>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => handleCopy(statusPageUrl)}
                    className="px-4 py-2 bg-white/10 rounded-full flex items-center gap-2 hover:bg-white/20 transition"
                  >
                    <Copy className="w-4 h-4" />
                    {copySuccess === statusPageUrl ? 'Copied!' : 'Copy status page link'}
                  </button>
                </div>
              </div>

              {/* Email Notification Form */}
              <form onSubmit={handleEmailSubmit} className="flex gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email for status updates"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#B8860B] transition"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`px-6 py-3 rounded-full font-semibold transition ${
                    isEmailSubmitted
                      ? 'bg-emerald-500 hover:bg-emerald-600'
                      : 'bg-[#B8860B] hover:bg-[#986D0B]'
                  }`}
                >
                  {isEmailSubmitted ? 'Email Sent!' : 'Get Email Updates'}
                </button>
              </form>
            </div>

            {/* Payment Status */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Payment Status</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {React.createElement(statusIcons[orderDetails.paymentStatus], {
                    className: `w-5 h-5 ${statusColors[orderDetails.paymentStatus]}`
                  })}
                  <span className={`font-medium ${statusColors[orderDetails.paymentStatus]}`}>
                    {orderDetails.paymentStatus.charAt(0).toUpperCase() + orderDetails.paymentStatus.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Payment Method</p>
                    <p className="font-medium">{orderDetails.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Amount</p>
                    <p className="font-medium">{orderDetails.paymentAmount}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-white/5 p-3 rounded-lg font-mono text-sm break-all">
                      {orderDetails.paymentTxId}
                    </code>
                    <button
                      onClick={() => handleCopy(orderDetails.paymentTxId)}
                      className={`p-2 rounded-lg transition ${
                        copySuccess === orderDetails.paymentTxId
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : 'hover:bg-white/10'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={`https://mempool.space/tx/${orderDetails.paymentTxId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/10 transition"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Ordinal Delivery Status */}
            <div className="bg-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Ordinal Delivery Status</h3>
              <div className="space-y-6">
                {orderDetails.ordinals.map((ordinal) => (
                  <div key={ordinal.id} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          {ordinal.weight}
                        </div>
                        <div>
                          <h4 className="font-medium">{ordinal.id}</h4>
                          <div className="flex items-center gap-2">
                            {React.createElement(statusIcons[ordinal.status], {
                              className: `w-4 h-4 ${statusColors[ordinal.status]}`
                            })}
                            <span className={`text-sm ${statusColors[ordinal.status]}`}>
                              {ordinal.status.charAt(0).toUpperCase() + ordinal.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {ordinal.txId && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-400 mb-1">Transaction ID</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 bg-white/5 p-2 rounded-lg font-mono text-sm break-all">
                            {ordinal.txId}
                          </code>
                          <button
                            onClick={() => handleCopy(ordinal.txId!)}
                            className={`p-2 rounded-lg transition ${
                              copySuccess === ordinal.txId
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'hover:bg-white/10'
                            }`}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://mempool.space/tx/${ordinal.txId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}

                    {ordinal.inscription && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Inscription ID</p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 bg-white/5 p-2 rounded-lg font-mono text-sm break-all">
                            {ordinal.inscription}
                          </code>
                          <button
                            onClick={() => handleCopy(ordinal.inscription!)}
                            className={`p-2 rounded-lg transition ${
                              copySuccess === ordinal.inscription
                                ? 'bg-emerald-500/20 text-emerald-500'
                                : 'hover:bg-white/10'
                            }`}
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://ordinals.com/inscription/${ordinal.inscription}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-white/10 transition"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default OrderStatusPage;