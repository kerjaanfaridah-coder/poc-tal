'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Calendar, User, MoreHorizontal, CheckCircle, Clock, AlertCircle, X, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  assignee: string;
  project: string;
  dueDate: string;
  estimatedHours: number;
  createdAt: string;
}

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    assignee: string;
    project: string;
    dueDate: string;
    estimatedHours: number;
  }>({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assignee: '',
    project: '',
    dueDate: '',
    estimatedHours: 1
  });

  // Load tasks from localStorage on mount
  const loadTasksFromStorage = (): Task[] => {
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks);
        // Type casting to ensure proper types
        return parsed.map((task: any) => ({
          ...task,
          status: task.status as 'To Do' | 'In Progress' | 'Completed',
          priority: task.priority as 'Low' | 'Medium' | 'High'
        }));
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
    
    // Default tasks if no stored data
    return [
      {
        id: 1,
        title: 'Complete API integration',
        description: 'Integrate payment gateway API with the backend system',
        status: 'In Progress' as const,
        priority: 'High' as const,
        assignee: 'Sarah Chen',
        project: 'Mobile App Redesign',
        dueDate: '2024-01-10',
        estimatedHours: 8,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        title: 'Review design mockups',
        description: 'Review and approve new mobile app design mockups',
        status: 'To Do' as const,
        priority: 'Medium' as const,
        assignee: 'Mike Johnson',
        project: 'Website Revamp',
        dueDate: '2024-01-12',
        estimatedHours: 4,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        title: 'Fix navigation bug',
        description: 'Resolve navigation issues in the main menu',
        status: 'Completed' as const,
        priority: 'Low' as const,
        assignee: 'Alex Kim',
        project: 'Mobile App Redesign',
        dueDate: '2024-01-08',
        estimatedHours: 2,
        createdAt: new Date().toISOString()
      },
      {
        id: 4,
        title: 'Database optimization',
        description: 'Optimize database queries for better performance',
        status: 'In Progress' as const,
        priority: 'High' as const,
        assignee: 'Lisa Wang',
        project: 'Backend Migration',
        dueDate: '2024-01-15',
        estimatedHours: 12,
        createdAt: new Date().toISOString()
      },
      {
        id: 5,
        title: 'User testing session',
        description: 'Conduct user testing for new features',
        status: 'To Do' as const,
        priority: 'Medium' as const,
        assignee: 'Emma Davis',
        project: 'Analytics Dashboard',
        dueDate: '2024-01-20',
        estimatedHours: 6,
        createdAt: new Date().toISOString()
      }
    ];
  };

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load tasks from localStorage on mount (client only)
  useEffect(() => {
    if (isClient) {
      const initialTasks = loadTasksFromStorage();
      setTasks(initialTasks);
    }
  }, [isClient]);

  // Save tasks to localStorage whenever they change (client only)
  useEffect(() => {
    if (isClient && tasks.length > 0) {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  }, [tasks, isClient]);

  // Listen for storage events from other tabs (client only)
  useEffect(() => {
    if (isClient) {
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'tasks') {
          const updatedTasks = loadTasksFromStorage();
          setTasks(updatedTasks);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [isClient]);

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(), // Use timestamp for unique ID
        ...newTask,
        createdAt: new Date().toISOString()
      };
      
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      
      // Clear and reset localStorage
      try {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      } catch (error) {
        console.error('Error saving new task to localStorage:', error);
      }
      
      setNewTask({
        title: '',
        description: '',
        status: 'To Do' as const,
        priority: 'Medium' as const,
        assignee: '',
        project: '',
        dueDate: '',
        estimatedHours: 1
      });
      setShowNewTaskModal(false);
    }
  };

  const handleCancelTask = () => {
    setNewTask({
      title: '',
      description: '',
      status: 'To Do' as const,
      priority: 'Medium' as const,
      assignee: '',
      project: '',
      dueDate: '',
      estimatedHours: 1
    });
    setShowNewTaskModal(false);
  };

  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    
    // Clear and reset localStorage
    try {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
    }
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: 'To Do' | 'In Progress' | 'Completed') => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    
    // Clear and reset localStorage
    try {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task status in localStorage:', error);
    }
  };

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
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
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
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate real-time stats
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress').length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const overdueTasks = tasks.filter(task => {
    if (task.status === 'Completed') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

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
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalTasks}</p>
              <p className="text-sm text-blue-600 mt-2">Active tasks</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{inProgressTasks}</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{completedTasks}</p>
              <p className="text-sm text-green-600 mt-2">Done</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{overdueTasks}</p>
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
        <div className="flex items-center justify-between gap-4">
          {/* LEFT SIDE - Search Input */}
          <div className="flex-1 max-w-[720px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 h-11 rounded-lg border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-red-200 focus:border-red-400"
              />
            </div>
          </div>

          {/* RIGHT SIDE - Controls Group */}
          <div className="flex items-center gap-3">
            {/* Status Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-[180px] h-11 rounded-lg border border-gray-200 text-sm font-medium focus:ring-2 focus:ring-red-200 focus:border-red-400 bg-white"
            >
              <option value="all">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Filter Button */}
            <button className="flex items-center gap-2 px-4 h-11 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 text-sm font-medium">
              <Filter className="w-4 h-4" />
              Filter
            </button>

            {/* New Task Button */}
            <button 
              onClick={() => setShowNewTaskModal(true)}
              className="flex items-center gap-2 px-5 h-11 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-sm text-sm font-medium"
            >
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
          
          // Check if task is overdue
          const isOverdue = task.status !== 'Completed' && new Date(task.dueDate) < new Date();
          
          return (
            <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-2 py-1 bg-gray-100 rounded text-lg font-bold text-black">
                      {task.project}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <StatusIcon className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {isOverdue && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Overdue
                      </span>
                    )}
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
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  {/* Status Update Dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as 'To Do' | 'In Progress' | 'Completed')}
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create New Task</h2>
              <button
                onClick={handleCancelTask}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={newTask.project}
                  onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  placeholder="Enter project name"
                />
              </div>

              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  placeholder="Enter task title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  placeholder="Enter task description"
                  rows={3}
                />
              </div>

              {/* Status and Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value as 'To Do' | 'In Progress' | 'Completed'})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'Low' | 'Medium' | 'High'})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  placeholder="Enter assignee name"
                />
              </div>

              {/* Due Date and Estimated Hours */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
                  <input
                    type="number"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({...newTask, estimatedHours: parseInt(e.target.value) || 1})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancelTask}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={!newTask.title.trim()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
