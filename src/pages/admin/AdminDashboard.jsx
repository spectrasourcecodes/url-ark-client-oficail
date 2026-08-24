// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Shield,
  Clock,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RefreshCw,
  Mail,
  Phone,
  Eye,
  Wallet,
  BarChart3,
  PieChart,
  Zap,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import AdminNavbar from '../../components/AdminNavbar';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    unverifiedUsers: 0,
    totalBalance: 0,
    totalProfit: 0,
    averageBalance: 0,
    kycApproved: 0,
    kycPending: 0,
    recentWallets: []
  });

  const fetchDashboard = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      
      const { data } = await axiosInstance.get("/api/admin/users");
      const walletsData = data.wallets || [];
      
      setWallets(walletsData);
      
      const totalUsers = walletsData.length;
      const verifiedUsers = walletsData.filter(w => w.user?.isVerified).length;
      const unverifiedUsers = totalUsers - verifiedUsers;
      const totalBalance = walletsData.reduce((sum, w) => sum + (w.balance || 0), 0);
      const totalProfit = walletsData.reduce((sum, w) => sum + (w.profit || 0), 0);
      const kycApproved = walletsData.filter(w => w.kyc).length;
      const kycPending = totalUsers - kycApproved;
      
      const recentWallets = [...walletsData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalUsers,
        verifiedUsers,
        unverifiedUsers,
        totalBalance,
        totalProfit,
        averageBalance: totalUsers > 0 ? totalBalance / totalUsers : 0,
        kycApproved,
        kycPending,
        recentWallets
      });

      if (showToast) toast.success("Dashboard updated");
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      toast.error(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value || 0);
  };

  const formatCompactCurrency = (value) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return formatCurrency(value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      change: `+${stats.totalUsers > 0 ? '12' : '0'}%`,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Verified Users',
      value: stats.verifiedUsers,
      icon: UserCheck,
      change: `${((stats.verifiedUsers / (stats.totalUsers || 1)) * 100).toFixed(1)}%`,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Total Balance',
      value: formatCompactCurrency(stats.totalBalance),
      icon: DollarSign,
      change: '+15%',
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'KYC Approved',
      value: stats.kycApproved,
      icon: Shield,
      change: `${((stats.kycApproved / (stats.totalUsers || 1)) * 100).toFixed(1)}%`,
      color: 'from-yellow-500 to-yellow-600',
      bg: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header with quick actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 text-sm mt-1">
                Total Value Locked: {formatCompactCurrency(stats.totalBalance)} • Total Profit: {formatCompactCurrency(stats.totalProfit)}
              </p>
            </div>
            <button
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium text-gray-700">Refresh</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Balance Distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-gray-400" />
                Platform Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Average Balance</span>
                    <span className="font-semibold">{formatCurrency(stats.averageBalance)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">KYC Rate</span>
                    <span className="font-semibold">{((stats.kycApproved / (stats.totalUsers || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Verification Rate</span>
                    <span className="font-semibold">{((stats.verifiedUsers / (stats.totalUsers || 1)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-gray-400" />
                Key Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Total Balance</p>
                  <p className="text-xl font-bold text-gray-900">{formatCompactCurrency(stats.totalBalance)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">Total Profit</p>
                  <p className="text-xl font-bold text-green-600">{formatCompactCurrency(stats.totalProfit)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">KYC Approved</p>
                  <p className="text-xl font-bold text-gray-900">{stats.kycApproved}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 mb-1">KYC Pending</p>
                  <p className="text-xl font-bold text-yellow-600">{stats.kycPending}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Wallets/Users */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">Recent Wallets</h3>
              </div>
              <Link to="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {stats.recentWallets.map((wallet) => (
                <div key={wallet._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {wallet.user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{wallet.user?.fullName || 'Unknown'}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center text-sm text-gray-500">
                          <Mail className="w-3 h-3 mr-1" />
                          {wallet.user?.email || 'No email'}
                        </span>
                        {wallet.user?.country && (
                          <span className="text-sm text-gray-500">
                            • {wallet.user.country}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 mt-3 sm:mt-0">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(wallet.balance)}</p>
                      <p className={`text-sm ${wallet.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {wallet.profit >= 0 ? '+' : ''}{formatCurrency(wallet.profit)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        wallet.kyc 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {wallet.kyc ? 'KYC Verified' : 'KYC Pending'}
                      </span>
                      <span className="text-xs text-gray-400 mt-1">{formatDate(wallet.createdAt)}</span>
                    </div>
                    <Link 
                      to={`/admin/users?id=${wallet.user?._id}`}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                </div>
              ))}

              {stats.recentWallets.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No wallets found
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/admin/users" className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white hover:shadow-lg transition-all hover:scale-[1.02]">
              <Users className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-xl font-bold mb-1">Manage Users</h4>
              <p className="text-sm text-blue-100">View and manage all wallets</p>
              <p className="text-xs text-blue-200 mt-2">{stats.totalUsers} total users</p>
            </Link>
            
            <Link to="/admin/kyc-receipts" className="group bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-2xl p-6 text-white hover:shadow-lg transition-all hover:scale-[1.02]">
              <Shield className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-xl font-bold mb-1">KYC Receipts</h4>
              <p className="text-sm text-yellow-100">{stats.kycPending} pending verifications</p>
              <p className="text-xs text-yellow-200 mt-2">{stats.kycApproved} approved</p>
            </Link>
            
            <Link to="/admin/profile" className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white hover:shadow-lg transition-all hover:scale-[1.02]">
              <User className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-xl font-bold mb-1">Admin Profile</h4>
              <p className="text-sm text-gray-400">Manage your account settings</p>
              <p className="text-xs text-gray-500 mt-2">Update password, email, etc.</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;