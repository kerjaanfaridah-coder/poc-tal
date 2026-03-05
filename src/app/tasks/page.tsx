'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Users, CheckCircle, Trash2, AlertTriangle, Clock, ArrowUpRight, TrendingUp, CheckSquare, Circle, MoreHorizontal, Star, Flag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  // Sample tasks data
  const tasks = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create modern landing page design with hero section and features',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Johnson',
      dueDate: '2024-03-10',
      project: 'E-commerce Platform',
      progress: 75
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Add login and registration functionality with JWT',
      status: 'todo',
      priority: 'high',
      assignee: 'Mike Kim',
      dueDate: '2024-03-12',
      project: 'Mobile App',
      progress: 0
    },
    {
      id: '3',
      title: 'Database optimization',
      description: 'Optimize database queries and add indexing',
      status: 'completed',
      priority: 'medium',
      assignee: 'John Doe',
      dueDate: '2024-03-08',
      project: 'Analytics Dashboard',
      progress: 100
    },
    {
      id: '4',
      title: 'API documentation',
      description: 'Write comprehensive API documentation',
      status: 'in-progress',
      priority: 'low',
      assignee: 'Emily Davis',
      dueDate: '2024-03-15',
      project: 'Backend API',
      progress: 40
    },
    {
      id: '5',
      title: 'Performance testing',
      description: 'Conduct load testing and performance optimization',
      status: 'todo',
      priority: 'medium',
      assignee: 'Tom Wilson',
      dueDate: '2024-03-18',
      project: 'Customer Portal',
      progress: 0
    }
  ];

  const handleNewTask = () => {
    router.push('/tasks/new');
  };

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    if (confirm(`Are you sure you want to delete "${taskTitle}"? This action cannot be undone.`)) {
      // Handle delete logic here
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'todo': return <Circle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4 text-red-500" />;
      case 'medium': return <Flag className="w-4 h-4 text-orange-500" />;
      case 'low': return <Flag className="w-4 h-4 text-gray-500" />;
      default: return <Flag className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <ConsistentLayout 
      title="Tasks" 
      subtitle="Manage and track all your tasks in one place"
      currentPage="tasks"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                <ArrowUpRight className="w-3 h-3" />
                LIVE
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{tasks.length}</p>
                <p className="text-sm text-slate-600 font-medium">Total Tasks</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+15%</p>
                <p className="text-xs text-slate-500">vs last week</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-bold">
                <TrendingUp className="w-3 h-3" />
                TRENDING
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-slate-600 font-medium">Completed</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+8%</p>
                <p className="text-xs text-slate-500">vs last week</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold">
                <ArrowUpRight className="w-3 h-3" />
                PRO
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </p>
                <p className="text-sm text-slate-600 font-medium">In Progress</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+12%</p>
                <p className="text-xs text-slate-500">vs last week</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-bold">
                <ArrowUpRight className="w-3 h-3" />
                HOT
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {tasks.filter(t => t.status === 'todo').length}
                </p>
                <p className="text-sm text-slate-600 font-medium">To Do</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-orange-600">+5%</p>
                <p className="text-xs text-slate-500">vs last week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-80"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              {['all', 'todo', 'in-progress', 'completed'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedFilter === filter
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter === 'all' ? 'All' : 
                   filter === 'todo' ? 'To Do' :
                   filter === 'in-progress' ? 'In Progress' : 'Completed'}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleNewTask}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Task</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        {getPriorityIcon(task.priority)}
                        <h3 className="font-medium text-slate-900">{task.title}</h3>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2">{task.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{task.project}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      {task.status === 'in-progress' ? 'In Progress' : 
                       task.status === 'todo' ? 'To Do' : 
                       task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                        {task.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-slate-900">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id, task.title)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CheckSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No tasks found</h3>
          <p className="text-slate-600 mb-6">Get started by creating your first task</p>
          <button
            onClick={handleNewTask}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create Task
          </button>
        </div>
      )}
    </ConsistentLayout>
  );
}
