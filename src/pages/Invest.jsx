// src/pages/Invest.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  X, 
  Copy, 
  Check,
  Wallet,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Shield,
  Zap,
  BarChart3,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  History
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

  const assets = [
    { 
      id: 'BTC', 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 52345, 
      change: 5.2, 
      apy: 8.5,
      icon: '₿',
      color: 'from-orange-500 to-yellow-500',
      bg: 'bg-orange-50',
      textColor: 'text-orange-600',
      risk: 'Baixo',
      min: 100,
      max: 1000000
    },
    { 
      id: 'ETH', 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 3234, 
      change: 3.8, 
      apy: 6.2,
      icon: 'Ξ',
      color: 'from-blue-500 to-indigo-500',
      bg: 'bg-blue-50',
      textColor: 'text-blue-600',
      risk: 'Baixo',
      min: 50,
      max: 500000
    },
    { 
      id: 'USDT', 
      name: 'Tether', 
      symbol: 'USDT', 
      price: 1.00, 
      change: 0.01, 
      apy: 4.5,
      icon: '💵',
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
      textColor: 'text-green-600',
      risk: 'Muito Baixo',
      min: 10,
      max: 1000000
    },
    { 
      id: 'SOL', 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 142.50, 
      change: 7.2, 
      apy: 9.5,
      icon: 'SOL',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
      textColor: 'text-purple-600',
      risk: 'Médio',
      min: 25,
      max: 250000
    },
  ];

  const investmentPlans = [
    { 
      period: '6', 
      label: '6 Horas', 
      return: 2.5, 
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
      description: 'Crescimento de curto prazo'
    },
    { 
      period: '8', 
      label: '8 Horas', 
      return: 8.0, 
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Ganhos de médio prazo'
    },
    { 
      period: '24', 
      label: '24 Horas', 
      return: 17.5, 
      icon: Award,
      color: 'from-orange-500 to-red-500',
      description: 'Retornos máximos'
    },
  ];

  const walletAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b844Bc5e75dC7a3a5d',
    USDT: '0x742d35Cc6634C0532925a3b844Bc5e75dC7a3a5d',
    SOL: 'solana_wallet_address_demo_123456789',
  };

  const calculateProjectedReturn = () => {
    const amount = parseFloat(investmentAmount) || 0;
    const selectedPlan = investmentPlans.find(p => p.period === selectedPeriod);
    const multiplier = selectedPlan ? selectedPlan.return / 100 : 0;
    return amount * multiplier;
  };

  const handleInvestNow = () => {
    if (!investmentAmount || parseFloat(investmentAmount) < 100) {
      toast.error('O valor mínimo de investimento é $100');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success('Endereço da carteira copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePaymentConfirmed = () => {
    if (!agreeToTerms) {
      toast.error('Por favor, aceite os termos e condições');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Solicitação enviada! A carteira será atualizada em breve.");
      setIsModalOpen(false);
      setInvestmentAmount('');
      setAgreeToTerms(false);
    }, 2000);
  };

  const selectedAssetData = assets.find(a => a.id === selectedAsset);
  const selectedPlanData = investmentPlans.find(p => p.period === selectedPeriod);
  const walletAddress = walletAddresses[selectedAsset];
  const projectedReturn = calculateProjectedReturn();
  const totalAmount = parseFloat(investmentAmount || 0) + projectedReturn;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Começar a Investir
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <History className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Comece a Ganhar Hoje</h2>
              <p className="text-white/80">Escolha sua estratégia de investimento e veja seu portfólio crescer</p>
            </div>
            <Sparkles className="w-12 h-12 text-white/30" />
          </div>
        </div>

        {/* Asset Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Selecionar Ativo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <button
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden group
                  ${selectedAsset === asset.id 
                    ? `border-${asset.color.split('-')[1]}-500 bg-gradient-to-br ${asset.color} bg-opacity-10` 
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${asset.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className={`w-12 h-12 ${asset.bg} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                    <span className={`text-2xl ${asset.textColor}`}>{asset.icon}</span>
                  </div>
                  <p className="font-semibold text-sm">{asset.name}</p>
                  <p className="text-xs text-gray-500 mt-1">${asset.price.toLocaleString()}</p>
                  <p className={`text-xs font-medium mt-1 ${
                    asset.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </p>
                  {selectedAsset === asset.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Investment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Detalhes do Investimento</h2>
              
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Valor do Investimento
                    </label>
                    <span className="text-xs text-gray-500">
                      Mín: ${selectedAssetData?.min} | Máx: ${selectedAssetData?.max}
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="w-full pl-8 pr-24 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                      placeholder="0,00"
                      min={selectedAssetData?.min}
                      max={selectedAssetData?.max}
                      step="10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setInvestmentAmount(selectedAssetData?.max)}
                        className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        MÁX
                      </button>
                      <span className="text-sm text-gray-500">USD</span>
                    </div>
                  </div>
                </div>

                {/* Investment Period */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Período de Investimento
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {investmentPlans.map((plan) => {
                      const Icon = plan.icon;
                      return (
                        <button
                          key={plan.period}
                          onClick={() => setSelectedPeriod(plan.period)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center overflow-hidden group
                            ${selectedPeriod === plan.period 
                              ? `border-${plan.color.split('-')[1]}-500 bg-gradient-to-br ${plan.color} bg-opacity-10` 
                              : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                          <div className="relative">
                            <Icon className={`w-6 h-6 mx-auto mb-2 ${
                              selectedPeriod === plan.period ? `text-${plan.color.split('-')[1]}-600` : 'text-gray-600'
                            }`} />
                            <p className="font-semibold text-sm">{plan.label}</p>
                            <p className="text-xs text-green-600 font-medium mt-1">+{plan.return}%</p>
                            <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Projected Returns */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Retornos Projetados</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Valor do Investimento:</span>
                      <span className="font-semibold text-gray-900">
                        {formatCurrency(parseFloat(investmentAmount || 0))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Retorno Esperado ({selectedPlanData?.return}%):</span>
                      <span className="font-semibold text-green-600">
                        +{formatCurrency(projectedReturn)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Valor Total Após {selectedPlanData?.label}:</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* APY Comparison */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rendimento Percentual Anual (APY)</span>
                      <span className="font-semibold text-green-600">{selectedAssetData?.apy}%</span>
                    </div>
                    <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        style={{ width: `${(selectedAssetData?.apy || 0) * 5}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleInvestNow}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Investir Agora
                  </button>
                  <button className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Zap className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Security Note */}
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Investimento Seguro</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Seu investimento é protegido por contratos inteligentes auditados pelas principais empresas de segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Asset Details */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Detalhes do Ativo</h3>
              {selectedAssetData && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 ${selectedAssetData.bg} rounded-xl flex items-center justify-center`}>
                        <span className={`text-2xl ${selectedAssetData.textColor}`}>{selectedAssetData.icon}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{selectedAssetData.name}</p>
                        <p className="text-sm text-gray-500">{selectedAssetData.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(selectedAssetData.price)}</p>
                      <p className={`text-sm font-medium ${
                        selectedAssetData.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedAssetData.change >= 0 ? '+' : ''}{selectedAssetData.change}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">APY</p>
                      <p className="text-lg font-semibold text-blue-600">{selectedAssetData.apy}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Nível de Risco</p>
                      <p className="text-lg font-semibold text-gray-900">{selectedAssetData.risk}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Por que investir em {selectedAssetData.name}?</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        Retornos históricos de {selectedAssetData.apy}% APY
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        Investimento mínimo baixo
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 text-green-600 mr-2" />
                        Totalmente segurado e auditado
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Estatísticas Rápidas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Investidores Ativos</span>
                  <span className="font-semibold">12.345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Investido</span>
                  <span className="font-semibold">$124,5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Retorno Médio</span>
                  <span className="font-semibold text-green-600">+14,2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taxa de Sucesso</span>
                  <span className="font-semibold">98,5%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Payment Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />

            <div className="relative min-h-screen flex items-center justify-center p-4">
              <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Completar Investimento</h3>
                      <p className="text-sm text-gray-500">Envie o pagamento para o endereço abaixo</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Investment Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Valor</p>
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(parseFloat(investmentAmount))}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Ativo</p>
                        <div className="flex items-center">
                          <div className={`w-6 h-6 ${selectedAssetData?.bg} rounded-lg flex items-center justify-center mr-2`}>
                            <span className={`text-xs font-bold ${selectedAssetData?.textColor}`}>{selectedAssetData?.icon}</span>
                          </div>
                          <p className="text-xl font-bold text-gray-900">{selectedAsset}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Período</p>
                        <p className="text-lg font-semibold text-gray-900">{selectedPlanData?.label}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Retorno Estimado</p>
                        <p className="text-lg font-semibold text-green-600">+{formatCurrency(projectedReturn)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Address */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Envie {selectedAsset} para este endereço
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={walletAddress}
                        readOnly
                        className="w-full px-4 py-4 pr-24 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                        <button
                          onClick={() => handleCopyAddress(walletAddress)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          {copied ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600" />
                          )}
                        </button>
                        <a
                          href="#"
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-5 h-5 text-gray-600" />
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Envie apenas {selectedAsset} para este endereço
                    </p>
                  </div>

                  {/* QR Code */}
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="text-xs text-gray-400 text-center">
                        Escaneie o QR
                        <br />
                        para pagar
                      </span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Instruções de Pagamento
                    </h4>
                    <ol className="text-sm text-yellow-700 space-y-2 list-decimal list-inside">
                      <li>Copie o endereço da carteira acima</li>
                      <li>Envie exatamente {formatCurrency(parseFloat(investmentAmount))} em {selectedAsset}</li>
                      <li>Aguarde 3 confirmações na blockchain</li>
                      <li>Seu investimento será creditado automaticamente</li>
                    </ol>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      Confirmo que enviei o valor exato e concordo com os 
                      <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">termos</a>.
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handlePaymentConfirmed}
                      disabled={!agreeToTerms || isLoading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                          Processando...
                        </span>
                      ) : (
                        'Confirmar Pagamento'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invest;