'use client';

import { 
  BarChart3, 
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
  Bell,
  Search,
  Settings,
  LayoutGrid,
  List,
  Filter
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import TaskDistribution from '@/components/dashboard/TaskDistribution';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import PageHeader from '@/components/ui/PageHeader';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Dashboard</span>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Overview
                </button>
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Projects
                </button>
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Team
                </button>
                <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  Reports
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Header with Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, John</h1>
            <p className="text-slate-600">Here's what's happening with your projects today</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/25">
              <Zap className="w-4 h-4" />
              Quick Action
            </button>
          </div>
        </div>
        
        {/* Modern Stats Cards with Enhanced Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <StatsCard
              title="Total Projects"
              value="24"
              change="+12% from last month"
              changeType="positive"
              icon={FolderKanban}
              dominant={true}
              glassmorphism={true}
            />
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <StatsCard
              title="Active Tasks"
              value="142"
              change="+8% from last month"
              changeType="positive"
              icon={CheckCircle2}
              glassmorphism={true}
            />
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <StatsCard
              title="Team Members"
              value="18"
              change="+2% from last month"
              changeType="positive"
              icon={Users}
              glassmorphism={true}
            />
          </div>
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <StatsCard
              title="Completion Rate"
              value="87%"
              change="+5% from last month"
              changeType="positive"
              icon={TrendingUp}
              glassmorphism={true}
            />
          </div>
        </div>

        {/* Modern Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Analytics Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Analytics Overview</h2>
                <p className="text-sm text-slate-600">Track your project performance and team productivity</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Modern Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Project Progress</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl">
                  <ProjectProgress />
                </div>
              </div>
              
              <div className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Task Distribution</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-blue-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="h-48 flex items-center justify-center bg-slate-50 rounded-xl">
                  <TaskDistribution />
                </div>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs">Last 7 days</span>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
              <RecentActivity />
            </div>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">Next 7 days</span>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
              <UpcomingDeadlines />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <p className="text-blue-100 text-sm">Common tasks and shortcuts</p>
                  </div>
                  <Zap className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <FolderKanban className="w-5 h-5" />
                    <span>Create New Project</span>
                  </button>
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <Target className="w-5 h-5" />
                    <span>Add Task</span>
                  </button>
                  <button className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-200 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Report Issue</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Team Overview */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Team Overview</h3>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Users className="w-5 h-5" />
                    <span className="text-xs">18 members</span>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">John Doe</p>
                      <p className="text-xs text-slate-500">Project Manager</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="text-green-600 font-medium">8</span> projects
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                      MK
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Mike Kim</p>
                      <p className="text-xs text-slate-500">Developer</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="text-blue-600 font-medium">6</span> projects
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-lg">
                      SJ
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Sarah Johnson</p>
                      <p className="text-xs text-slate-500">Designer</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="text-orange-600 font-medium">4</span> projects
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
