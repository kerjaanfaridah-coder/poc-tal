'use client';

import { useState } from 'react';
import { CheckCircle, Users, FolderKanban, CheckSquare, BarChart3, Calendar, FileText, TrendingUp, ArrowUpRight, Activity } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Sample data
  const stats = [
    {
      title: 'Total Tasks',
      value: '248',
      change: '+12%',
      icon: CheckSquare,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Completed',
      value: '186',
      change: '+8%',
      icon: CheckCircle,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'In Progress',
      value: '42',
      change: '-3%',
      icon: Activity,
      color: 'bg-orange-500',
      trend: 'down'
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      icon: Users,
      color: 'bg-purple-500',
      trend: 'up'
    }
  ];

  const recentTasks = [
    {
      id: '1',
      title: 'Design new landing page',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: '2024-03-15'
    },
    {
      id: '2',
      title: 'Fix authentication bug',
      status: 'completed',
      priority: 'high',
      assignee: 'Mike Chen',
      dueDate: '2024-03-12'
    },
    {
      id: '3',
      title: 'Update documentation',
      status: 'todo',
      priority: 'medium',
      assignee: 'Emily Davis',
      dueDate: '2024-03-18'
    },
    {
      id: '4',
      title: 'Code review for feature X',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'John Doe',
      dueDate: '2024-03-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ConsistentLayout title="Dashboard" subtitle="Welcome back! Here's what's happening with your projects today.">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color} rounded-xl`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                {stat.change}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm font-bold text-slate-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Tasks</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPeriod('day')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'day' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'week' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'month' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{task.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                    {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                  <span className="text-sm text-slate-600">{task.assignee}</span>
                  <span className="text-sm text-slate-600">{task.dueDate}</span>
                </div>
              </div>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ConsistentLayout>
  );
}
