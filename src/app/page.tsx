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
  CheckCircle2
} from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import TaskDistribution from '@/components/dashboard/TaskDistribution';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import PageHeader from '@/components/ui/PageHeader';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Page Header */}
        <div className="mb-8">
          <PageHeader 
            title="Dashboard" 
            subtitle="Welcome back! Here's what's happening with your projects"
          />
        </div>
        
        {/* Modern Stats Cards with Glass Morphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
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
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <StatsCard
              title="Active Tasks"
              value="142"
              change="+8% from last month"
              changeType="positive"
              icon={CheckCircle2}
              glassmorphism={true}
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
            <StatsCard
              title="Team Members"
              value="18"
              change="+2% from last month"
              changeType="positive"
              icon={Users}
              glassmorphism={true}
            />
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
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

        {/* Main Content Grid - Modern Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Charts Section - 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Charts Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Analytics Overview</h3>
                <p className="text-sm text-gray-600">Track your project performance and team productivity</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 days
                </button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
            
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Project Progress</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">+12%</span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                <ProjectProgress />
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">Task Distribution</h4>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">+8%</span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                <TaskDistribution />
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 mr-2" />
                    <span className="text-xs text-gray-500">Last 7 days</span>
                  </div>
                </div>
              </div>
              <RecentActivity />
            </div>
          </div>

          {/* Side Section - 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-xs text-gray-500">Next 7 days</span>
                  </div>
                </div>
              </div>
              <UpcomingDeadlines />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold">Quick Actions</h4>
                  <p className="text-blue-100 text-sm">Common tasks and shortcuts</p>
                </div>
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white font-medium hover:bg-opacity-30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="w-5 h-5" />
                    <span>Create New Project</span>
                  </div>
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white font-medium hover:bg-opacity-30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5" />
                    <span>Add Task</span>
                  </div>
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-20 rounded-lg text-white font-medium hover:bg-opacity-30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span>Report Issue</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Team Overview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Team Overview</h4>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="text-xs text-gray-500">18 members</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Project Manager</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-green-600 font-medium">8</span> active projects
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      MK
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Mike Kim</p>
                      <p className="text-xs text-gray-500">Developer</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-blue-600 font-medium">6</span> active projects
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      SJ
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Designer</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-orange-600 font-medium">4</span> active projects
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
