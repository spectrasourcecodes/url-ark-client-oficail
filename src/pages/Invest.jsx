// src/pages/Invest.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, Clock, Award, X, Copy, Check,
  Wallet, ExternalLink, AlertCircle, RefreshCw,
  Shield, Zap, BarChart3, Sparkles, History
} from 'lucide-react';
import { toast } from 'react-toastify';

const Invest = () => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const assets = [
    { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', price: 261725, change: 5.2, apy: 8.5, icon: '₿', color: 'from-orange-500 to-yellow-500', bg: 'bg-orange-50', textColor: 'text-orange-600', risk: 'Baixo', min: 500, max: 5000000 },
    { id: 'ETH', name: 'Ethereum', symbol: 'ETH', price: 16170, change: 3.8, apy: 6.2, icon: 'Ξ', color: 'from-blue-500 to-indigo-500', bg: 'bg-blue-50', textColor: 'text-blue-600', risk: 'Baixo', min: 250, max: 2500000 },
    { id: 'USDT', name: 'Tether', symbol: 'USDT', price: 5.00, change: 0.01, apy: 4.5, icon: '💵', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', textColor: 'text-green-600', risk: 'Muito Baixo', min: 250, max: 5000000 },
    { id: 'SOL', name: 'Solana', symbol: 'SOL', price: 712.5, change: 7.2, apy: 9.5, icon: 'SOL', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', textColor: 'text-purple-600', risk: 'Médio', min: 250, max: 1250000 },
  ];

  const investmentPlans = [
    { period: '6', label: '6 Horas', return: 17, icon: Clock },
    { period: '8', label: '8 Horas', return: 25, icon: TrendingUp },
    { period: '24', label: '24 Horas', return: 50, icon: Award },
  ];

  const walletAddresses = {
    BTC: '13u1DCFYTkzd7cNTiUEMkR3YmQVShovkZw',
    ETH: '13u1DCFYTkzd7cNTiUEMkR3YmQVShovkZw',
    USDT: '13u1DCFYTkzd7cNTiUEMkR3YmQVShovkZw',
    SOL: '13u1DCFYTkzd7cNTiUEMkR3YmQVShovkZw',
  };

  const calculateProjectedReturn = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const selectedPlan = investmentPlans.find(p => p.period === selectedPeriod);
    return amount * (selectedPlan?.return / 100 || 0);
  };

  const handleInvestNow = () => {
    if (!investmentAmount || parseFloat(investmentAmount) < 500) {
      toast.error('O valor mínimo de investimento é R$ 500');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Endereço copiado!');
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedAssetData = assets.find(a => a.id === selectedAsset);
  const projectedReturn = calculateProjectedReturn();
  const totalAmount = (parseFloat(investmentAmount) || 0) + projectedReturn;

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Investir</h1>

      {/* Assets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {assets.map(asset => (
          <button key={asset.id}
            onClick={() => setSelectedAsset(asset.id)}
            className="p-4 bg-white rounded-xl border hover:shadow"
          >
            <p>{asset.icon} {asset.name}</p>
            <p className="text-sm">{formatCurrency(asset.price)}</p>
          </button>
        ))}
      </div>

      {/* Investment Input */}
      <div className="bg-white p-6 rounded-xl mb-6">
        <label>Valor</label>
        <div className="flex items-center border rounded p-2">
          <span>R$</span>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            className="flex-1 ml-2 outline-none"
          />
        </div>
        <p className="text-sm text-gray-500">
          Mín: {formatCurrency(selectedAssetData?.min)} | Máx: {formatCurrency(selectedAssetData?.max)}
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {investmentPlans.map(plan => (
          <button key={plan.period}
            onClick={() => setSelectedPeriod(plan.period)}
            className="p-4 bg-white rounded-xl border"
          >
            <p>{plan.label}</p>
            <p className="text-green-600">+{plan.return}%</p>
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-xl mb-6">
        <p>Investimento: {formatCurrency(investmentAmount)}</p>
        <p>Lucro: +{formatCurrency(projectedReturn)}</p>
        <p className="font-bold">Total: {formatCurrency(totalAmount)}</p>
      </div>

      {/* Button */}
      <button
        onClick={handleInvestNow}
        className="w-full bg-blue-600 text-white p-4 rounded-xl"
      >
        Investir Agora
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="font-bold mb-4">Pagamento</h2>

            <p className="mb-2">Envie para:</p>
            <input
              value={walletAddresses[selectedAsset]}
              readOnly
              className="w-full p-2 border rounded mb-2"
            />

            <button
              onClick={() => handleCopyAddress(walletAddresses[selectedAsset])}
              className="mb-4 text-blue-600"
            >
              Copiar Endereço
            </button>

            <p className="mb-4">
              Valor: {formatCurrency(investmentAmount)}
            </p>

            <button
              onClick={() => {
                toast.warning('Verificação do pagamento em andamento...');
                setIsModalOpen(false);
              }}
              className="w-full bg-green-600 text-white p-3 rounded"
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invest;