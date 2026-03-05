'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConsistentLayout from '@/components/layout/ConsistentLayout';
import { useProjects } from '@/contexts/ProjectContext';
import { Sparkles, Zap, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjects();
  const [activeTab, setActiveTab] = useState('project-info');

  const handleProjectSubmit = (project: any) => {
    console.log('New project created:', project);
    
    // Add project to global state
    addProject(project);
    
    // Redirect to projects page
    router.push('/projects');
  };

  const handleProjectCancel = () => {
    router.push('/projects');
  };

  const tabs = [
    { id: 'project-info', name: 'Project Information', icon: '📋', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'phase-progress', name: 'Phase Progress', icon: '📊', gradient: 'from-purple-500 to-pink-500' },
    { id: 'budget', name: 'Budget', icon: '💰', gradient: 'from-green-500 to-emerald-500' },
    { id: 'pending-items', name: 'Pending Items', icon: '⏳', gradient: 'from-orange-500 to-red-500' },
    { id: 'issues', name: 'Issues', icon: '⚠️', gradient: 'from-red-500 to-rose-500' }
  ];

  return (
    <ConsistentLayout 
      title="Add New Project"
      subtitle="Create a new project with our guided workflow"
      currentPage="projects"
    >
      <div className="relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400/20 via-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Glass Morphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none"></div>
          
          {/* Modern Tab Navigation */}
          <div className="mb-8 relative">
            <div className="flex items-center bg-gradient-to-r from-slate-100/80 to-slate-200/80 backdrop-blur-sm rounded-2xl p-2 shadow-inner">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? 'bg-white shadow-lg text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {activeTab === tab.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-10 rounded-xl`}></div>
                  )}
                  <span className="relative z-10 text-lg">{tab.icon}</span>
                  <span className="relative z-10">{tab.name}</span>
                  {activeTab === tab.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleProjectSubmit} className="space-y-8 relative">
            {/* Project Information Section */}
            {activeTab === 'project-info' && (
              <div className="bg-gradient-to-br from-blue-50/80 via-white/60 to-cyan-50/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 shadow-xl relative overflow-hidden">
                {/* Section Header with Modern Elements */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Project Information</h3>
                    <p className="text-sm text-slate-600">Fill in the basic details of your project</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400"
                        placeholder="Enter project name..."
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                      Project Manager <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400"
                        placeholder="Enter project manager name..."
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none placeholder:text-slate-400"
                      placeholder="Enter project description..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-2xl pointer-events-none"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Phase Progress Section */}
            {activeTab === 'phase-progress' && (
              <div className="bg-gradient-to-br from-purple-50/80 via-white/60 to-pink-50/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-200/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Phase Progress</h3>
                    <p className="text-sm text-slate-600">Track your project phases and milestones</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Planning Phase</h4>
                          <p className="text-sm text-slate-600">Initial project setup and requirements</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">75%</div>
                        <div className="w-32 bg-slate-200 rounded-full h-3 mt-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50 shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">Development Phase</h4>
                          <p className="text-sm text-slate-600">Core development and implementation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">45%</div>
                        <div className="w-32 bg-slate-200 rounded-full h-3 mt-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Budget Section */}
            {activeTab === 'budget' && (
              <div className="bg-gradient-to-br from-green-50/80 via-white/60 to-emerald-50/80 backdrop-blur-sm rounded-3xl p-8 border border-green-200/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Budget</h3>
                    <p className="text-sm text-slate-600">Manage your project finances and resources</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-lg">
                      <div className="text-sm text-slate-600 mb-2">Planned Budget</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$50,000</div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 shadow-lg">
                      <div className="text-sm text-slate-600 mb-2">Spent</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">$32,500</div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-lg">
                      <div className="text-sm text-slate-600 mb-2">Remaining</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">$17,500</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pending Items Section */}
            {activeTab === 'pending-items' && (
              <div className="bg-gradient-to-br from-orange-50/80 via-white/60 to-red-50/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-200/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Pending Items</h3>
                    <p className="text-sm text-slate-600">Track tasks that need attention</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-slate-900">Client approval required</span>
                      </div>
                      <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Due: Mar 15</span>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-slate-900">Resource allocation</span>
                      </div>
                      <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">Due: Mar 18</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Issue Section */}
            {activeTab === 'issues' && (
              <div className="bg-gradient-to-br from-red-50/80 via-white/60 to-rose-50/80 backdrop-blur-sm rounded-3xl p-8 border border-red-200/50 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Issues</h3>
                    <p className="text-sm text-slate-600">Monitor and resolve project issues</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-slate-900">Critical: API integration delay</span>
                      </div>
                      <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">High Priority</span>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl transform scale-105 group-hover:scale-110 transition-transform duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-slate-900">Medium: Design review needed</span>
                      </div>
                      <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">Medium Priority</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modern Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-200/50 relative">
              <button
                type="button"
                onClick={handleProjectCancel}
                className="px-8 py-4 bg-white/60 backdrop-blur-sm border border-red-200/50 rounded-2xl text-sm font-bold text-slate-700 hover:bg-red-50/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white rounded-2xl text-sm font-bold hover:from-red-600 hover:via-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Create Project
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ConsistentLayout>
  );
}
