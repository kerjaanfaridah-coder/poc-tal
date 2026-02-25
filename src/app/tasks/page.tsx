'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Calendar, User, MoreHorizontal, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'Complete API integration',
      description: 'Integrate payment gateway API with the backend system',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Sarah Chen',
      project: 'Mobile App Redesign',
      dueDate: '2024-01-10',
      estimatedHours: 8
    },
    {
      id: 2,
      title: 'Review design mockups',
      description: 'Review and approve new mobile app design mockups',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Mike Johnson',
      project: 'Website Revamp',
      dueDate: '2024-01-12',
      estimatedHours: 4
    },
    {
      id: 3,
      title: 'Fix navigation bug',
      description: 'Resolve navigation issues in the main menu',
      status: 'Completed',
      priority: 'Low',
      assignee: 'Alex Kim',
      project: 'Mobile App Redesign',
      dueDate: '2024-01-08',
      estimatedHours: 2
    },
    {
      id: 4,
      title: 'Database optimization',
      description: 'Optimize database queries for better performance',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Lisa Wang',
      project: 'Backend Migration',
      dueDate: '2024-01-15',
      estimatedHours: 12
    },
    {
      id: 5,
      title: 'User testing session',
      description: 'Conduct user testing for new features',
      status: 'To Do',
      priority: 'Medium',
      assignee: 'Emma Davis',
      project: 'Analytics Dashboard',
      dueDate: '2024-01-20',
      estimatedHours: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'To Do': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tasks</h1>
            <p className="text-gray-600">Manage and track all tasks across your projects</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">142</p>
                  <p className="text-sm text-blue-600 mt-2">+8% from last week</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">28</p>
                  <p className="text-sm text-blue-600 mt-2">Active now</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">96</p>
                  <p className="text-sm text-green-600 mt-2">This month</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                  <p className="text-sm text-red-600 mt-2">Need attention</p>
                </div>
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:border-gray-300"
                >
                  <option value="all">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Plus className="w-4 h-4" />
                  New Task
                </button>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const StatusIcon = getStatusIcon(task.status);
              
              return (
                <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StatusIcon className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{task.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Due {task.dueDate}</span>
                        </div>
                        <div>
                          <span>{task.estimatedHours}h estimated</span>
                        </div>
                        <div className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {task.project}
                        </div>
                      </div>
                    </div>
                    
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg ml-4">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
    </div>
  );
}
