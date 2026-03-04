'use client';

import { 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Filter, 
  Search,
  Calendar,
  Download,
  Settings,
  Bell,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Target,
  Zap,
  FolderKanban
} from 'lucide-react';
import { useState } from 'react';

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample data
  const issues = [
    {
      id: 'ISS-001',
      title: 'Fix authentication bug in login flow',
      severity: 'high',
      status: 'open',
      assignee: 'John Doe',
      createdAt: '2024-03-04',
      project: 'E-commerce Platform'
    },
    {
      id: 'ISS-002', 
      title: 'Improve dashboard loading performance',
      severity: 'medium',
      status: 'in-progress',
      assignee: 'Mike Kim',
      createdAt: '2024-03-03',
      project: 'Analytics Dashboard'
    },
    {
      id: 'ISS-003',
      title: 'Add dark mode support',
      severity: 'low',
      status: 'resolved',
      assignee: 'Sarah Johnson',
      createdAt: '2024-03-02',
      project: 'Mobile App'
    },
    {
      id: 'ISS-004',
      title: 'Database connection timeout error',
      severity: 'high',
      status: 'open',
      assignee: 'John Doe',
      createdAt: '2024-03-04',
      project: 'Backend API'
    },
    {
      id: 'ISS-005',
      title: 'Update user profile validation',
      severity: 'medium',
      status: 'resolved',
      assignee: 'Sarah Johnson',
      createdAt: '2024-03-01',
      project: 'User Management'
    }
  ];

  const stats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'open').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'high': return '🔴';
      case 'medium': return '🟠';
      case 'low': return '⚪';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open': return '🔴';
      case 'in-progress': return '🔵';
      case 'resolved': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Issues</span>
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
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
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
        {/* Modern Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Issue Management</h1>
            <p className="text-slate-600">Track, prioritize, and resolve project issues efficiently</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 shadow-lg shadow-red-500/25">
              <Plus className="w-4 h-4" />
              New Issue
            </button>
          </div>
        </div>
        
        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Total Issues</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-red-600">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-xs font-medium">12%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">🔴 Open</p>
                  <p className="text-2xl font-bold text-red-600">{stats.open}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-red-600">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-xs font-medium">8%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">🔵 In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-blue-600">
                      <ArrowDownRight className="w-3 h-3" />
                      <span className="text-xs font-medium">3%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-md">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500"></div>
            <div className="relative bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">🟢 Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="w-3 h-3" />
                      <span className="text-xs font-medium">15%</span>
                    </div>
                    <span className="text-xs text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'all' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Issues
            </button>
            <button
              onClick={() => setSelectedFilter('open')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'open' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setSelectedFilter('in-progress')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'in-progress' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setSelectedFilter('resolved')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === 'resolved' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Resolved
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Issue</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {issues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{issue.title}</div>
                          <div className="text-sm text-slate-500">{issue.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
                          <FolderKanban className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-slate-900">{issue.project}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                        <span>{getSeverityIcon(issue.severity)}</span>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                        <span>{getStatusIcon(issue.status)}</span>
                        {issue.status.charAt(0).toUpperCase() + issue.status.replace('-', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {issue.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm text-slate-900">{issue.assignee}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        {issue.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
