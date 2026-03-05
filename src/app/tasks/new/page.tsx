'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Calendar, User, Flag, Clock, CheckCircle, AlertTriangle, X } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function NewTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    project: '',
    assignee: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    progress: 0
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('New task created:', formData);
    router.push('/tasks');
  };

  const handleCancel = () => {
    router.push('/tasks');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'todo': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ConsistentLayout 
      title="Create New Task"
      subtitle="Add a new task to your project"
      currentPage="tasks"
    >
      <div>
        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.taskName}
                onChange={(e) => handleInputChange('taskName', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter task name..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Enter task description..."
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.project}
                  onChange={(e) => handleInputChange('project', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter project name..."
                />
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Assignee <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.assignee}
                  onChange={(e) => handleInputChange('assignee', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter assignee name..."
                />
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map(priority => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => handleInputChange('priority', priority)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        formData.priority === priority
                          ? getPriorityColor(priority)
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  {['todo', 'in-progress', 'completed'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleInputChange('status', status)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        formData.status === status
                          ? getStatusColor(status)
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {status === 'todo' ? 'To Do' : status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Progress */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Progress <span className="text-xs text-slate-500">(optional)</span>
              </label>
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      formData.progress === 0 ? 'bg-slate-300' :
                      formData.progress <= 25 ? 'bg-red-400' :
                      formData.progress <= 50 ? 'bg-orange-400' :
                      formData.progress <= 75 ? 'bg-yellow-400' :
                      formData.progress < 100 ? 'bg-green-400' : 'bg-green-500'
                    }`}></div>
                    <span className="text-sm font-medium text-slate-700">Task Progress</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{formData.progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        formData.progress === 0 ? 'bg-slate-300' :
                        formData.progress <= 25 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                        formData.progress <= 50 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                        formData.progress <= 75 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                        formData.progress < 100 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-green-500 to-green-600'
                      }`}
                      style={{ width: `${formData.progress}%` }}
                    ></div>
                  </div>
                  {/* Progress markers */}
                  <div className="absolute top-0 left-0 right-0 flex justify-between px-1 -mt-3">
                    {[0, 25, 50, 75, 100].map((marker) => (
                      <div key={marker} className="relative">
                        <div className={`w-2 h-2 rounded-full border-2 border-white ${
                          formData.progress >= marker ? 'bg-slate-600' : 'bg-slate-300'
                        }`}></div>
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-slate-500">
                          {marker}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => handleInputChange('progress', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    {/* Custom thumb */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg cursor-pointer pointer-events-none"
                      style={{ left: `${formData.progress}%`, transform: 'translateX(-50%)' }}
                    ></div>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg border border-slate-200 px-3 py-2">
                    <button
                      type="button"
                      onClick={() => handleInputChange('progress', Math.max(0, formData.progress - 10))}
                      className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <span className="text-slate-600 text-xs">-</span>
                    </button>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => handleInputChange('progress', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-12 text-center bg-transparent border-0 text-sm font-medium text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('progress', Math.min(100, formData.progress + 10))}
                      className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                    >
                      <span className="text-slate-600 text-xs">+</span>
                    </button>
                  </div>
                </div>

                {/* Quick Progress Options */}
                <div className="flex gap-2 mt-3">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleInputChange('progress', value)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                        formData.progress === value
                          ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {value === 0 ? 'Not Started' : `${value}%`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #ef4444, #f97316);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(to right, #ef4444, #f97316);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-webkit-slider-track {
          background: #e2e8f0;
          border-radius: 9999px;
        }
        .slider::-moz-range-track {
          background: #e2e8f0;
          border-radius: 9999px;
        }
      `}</style>
    </ConsistentLayout>
  );
}
