'use client';

import { 
  BarChart3, 
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
  Filter,
  Plus,
  Home,
  FileText,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

export default function ModernDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const navigation = [
    { name: 'Overview', icon: Home, id: 'overview' },
    { name: 'Projects', icon: FolderKanban, id: 'projects' },
    { name: 'Tasks', icon: CheckSquare, id: 'tasks' },
    { name: 'Issues', icon: AlertTriangle, id: 'issues' },
    { name: 'Reports', icon: FileText, id: 'reports' },
  ];

  const projects = [
    { id: 1, name: 'E-commerce Platform', status: 'In Progress', progress: 75, team: 8, budget: '$125,000' },
    { id: 2, name: 'Mobile App Development', status: 'Planning', progress: 25, team: 5, budget: '$85,000' },
    { id: 3, name: 'Data Analytics Dashboard', status: 'Completed', progress: 100, team: 6, budget: '$65,000' },
    { id: 4, name: 'Customer Portal', status: 'In Progress', progress: 60, team: 4, budget: '$45,000' },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'created project', target: 'E-commerce Platform', time: '2 hours ago' },
    { id: 2, user: 'Sarah Johnson', action: 'completed task', target: 'API Integration', time: '4 hours ago' },
    { id: 3, user: 'Mike Kim', action: 'resolved issue', target: 'Login Bug', time: '6 hours ago' },
    { id: 4, user: 'Emily Davis', action: 'updated budget', target: 'Mobile App', time: '1 day ago' },
  ];

  const upcomingDeadlines = [
    { id: 1, project: 'E-commerce Platform', task: 'Payment Gateway Integration', date: '2024-03-10', priority: 'High' },
    { id: 2, project: 'Mobile App', task: 'UI Design Review', date: '2024-03-12', priority: 'Medium' },
    { id: 3, project: 'Data Analytics', task: 'Performance Testing', date: '2024-03-15', priority: 'Low' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-xs text-slate-500">Project Management</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200">
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Help & Support</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200">
              <Settings className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Settings</span>}
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200">
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm"
        >
          <ChevronRight className={`w-3 h-3 text-slate-600 transition-transform duration-200 ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Welcome back, John</h2>
                <p className="text-sm text-slate-600">Here's what's happening with your projects today</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search projects, tasks, issues..."
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                  />
                </div>
                
                <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">John Doe</p>
                    <p className="text-xs text-slate-500">Project Manager</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">12%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-sm text-slate-600">Total Projects</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">8%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">142</p>
                <p className="text-sm text-slate-600">Active Tasks</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">2%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">18</p>
                <p className="text-sm text-slate-600">Team Members</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">87%</p>
                <p className="text-sm text-slate-600">Completion Rate</p>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Recent Projects</h3>
                  <p className="text-sm text-slate-600">Your latest project updates</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Project</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Progress</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Team</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider">Budget</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-slate-900">{project.name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-slate-600">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                              {project.team}
                            </div>
                            <span className="text-sm text-slate-600">{project.team} members</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-slate-900">{project.budget}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
                    <p className="text-sm text-slate-600">Latest updates from your team</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h3>
                    <p className="text-sm text-slate-600">Tasks that need your attention</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-slate-900">{deadline.task}</p>
                          <p className="text-sm text-slate-600">{deadline.project}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(deadline.priority)}`}>
                          {deadline.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        <span>{deadline.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
