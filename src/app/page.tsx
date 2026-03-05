'use client';

import { 
  BarChart4, 
  TrendingUp, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Calendar,
  Activity,
  Target,
  Zap,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  LayoutGrid,
  List,
  Filter,
  Sparkles,
  Flame,
  Rocket,
  Trophy,
  Star,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  TrendingDown,
  Eye,
  Download,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Layers,
  Grid3x3,
  ZapOff,
  Plus
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import TaskDistribution from '@/components/dashboard/TaskDistribution';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import PageHeader from '@/components/ui/PageHeader';
import { useState } from 'react';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl shadow-purple-500/25 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                <span className="text-yellow-300 font-bold text-sm">PREMIUM DASHBOARD</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome back, John! 🚀
              </h1>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                Your productivity increased by <span className="font-bold text-yellow-300">47%</span> this month. Keep up the amazing work!
              </p>
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-200 shadow-lg flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  View Analytics
                </button>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-200 border border-white/30 flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  View Achievements
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Bar */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Quick Actions</p>
                    <p className="text-sm text-slate-600">Get things done faster</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Project
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Add Task
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Report Issue
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                >
                  {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                </button>
                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                  {(['7d', '30d', '90d'] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedPeriod === period
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {period === '7d' ? '7 days' : period === '30d' ? '30 days' : '90 days'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <ArrowUpRight className="w-3 h-3" />
                  LIVE
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">24</p>
                  <p className="text-sm text-slate-600 font-medium">Active Projects</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+12%</p>
                  <p className="text-xs text-slate-500">vs last month</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <TrendingUp className="w-3 h-3" />
                  TRENDING
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">142</p>
                  <p className="text-sm text-slate-600 font-medium">Tasks Completed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+8%</p>
                  <p className="text-xs text-slate-500">vs last month</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3 h-3" />
                  PRO
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">18</p>
                  <p className="text-sm text-slate-600 font-medium">Team Members</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+2%</p>
                  <p className="text-xs text-slate-500">vs last month</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <Flame className="w-3 h-3" />
                  HOT
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">87%</p>
                  <p className="text-sm text-slate-600 font-medium">Success Rate</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+5%</p>
                  <p className="text-xs text-slate-500">vs last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Analytics Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics Overview</h2>
                <p className="text-slate-600">Track your performance and team productivity</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white border border-indigo-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
            
            {/* Enhanced Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border border-indigo-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Project Progress</h3>
                    <p className="text-sm text-slate-600">Real-time project tracking</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-xs font-bold">12%</span>
                    </div>
                    <span className="text-xs text-slate-500">growth</span>
                  </div>
                </div>
                <div className="h-48 flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-sm">
                  <ProjectProgress />
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border border-purple-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Task Distribution</h3>
                    <p className="text-sm text-slate-600">Team workload analysis</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-xs font-bold">8%</span>
                    </div>
                    <span className="text-xs text-slate-500">efficiency</span>
                  </div>
                </div>
                <div className="h-48 flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-sm">
                  <TaskDistribution />
                </div>
              </div>
            </div>
            
            {/* Enhanced Recent Activity */}
            <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                  <p className="text-sm text-slate-600">Latest updates from your team</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-200 transition-colors">
                    View All
                  </button>
                  <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <RecentActivity />
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl shadow-xl border border-orange-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h3>
                  <p className="text-sm text-slate-600">Tasks that need attention</p>
                </div>
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <UpcomingDeadlines />
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold">Power Tools</h3>
                    <p className="text-indigo-100 text-sm">Supercharge your workflow</p>
                  </div>
                  <Zap className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <Rocket className="w-5 h-5" />
                    <span>Launch Project</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <MessageSquare className="w-5 h-5" />
                    <span>Team Chat</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-bold hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <Share2 className="w-5 h-5" />
                    <span>Share Report</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Team Overview */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Team Stars</h3>
                  <p className="text-sm text-slate-600">Top performers this week</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl hover:from-yellow-100 hover:to-orange-100 transition-colors border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        JD
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 text-white fill-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-600">Project Manager</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-600">🔥 98</p>
                    <p className="text-xs text-slate-500">points</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-colors border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      MK
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Mike Kim</p>
                      <p className="text-xs text-slate-600">Developer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-blue-600">⚡ 87</p>
                    <p className="text-xs text-slate-500">points</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-colors border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      SJ
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Sarah Johnson</p>
                      <p className="text-xs text-slate-600">Designer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-600">💎 76</p>
                    <p className="text-xs text-slate-500">points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
