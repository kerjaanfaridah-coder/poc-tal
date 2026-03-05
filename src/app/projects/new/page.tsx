'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ConsistentLayout from '@/components/layout/ConsistentLayout';
import { useProjects } from '@/contexts/ProjectContext';

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
    { id: 'project-info', name: 'Project Information' },
    { id: 'phase-progress', name: 'Phase Progress' },
    { id: 'budget', name: 'Budget' },
    { id: 'pending-items', name: 'Pending Items' },
    { id: 'issues', name: 'Issues' }
  ];

  return (
    <ConsistentLayout 
      title="Add New Project"
      subtitle="Create a new project with our guided workflow"
      currentPage="projects"
    >
      <div>
        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl p-8">
          {/* Horizontal Navigation */}
          <div className="mb-8">
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleProjectSubmit} className="space-y-8">
            {/* Project Information Section */}
            {activeTab === 'project-info' && (
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Project Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter project name..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Project Manager <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter project manager name..."
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter project description..."
                  />
                </div>
              </div>
            )}

            {/* Phase Progress Section */}
            {activeTab === 'phase-progress' && (
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Phase Progress</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-900">Planning Phase</h4>
                      <p className="text-sm text-slate-600">Initial project setup and requirements</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">75%</div>
                      <div className="w-24 bg-slate-200 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-medium text-slate-900">Development Phase</h4>
                      <p className="text-sm text-slate-600">Core development and implementation</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">45%</div>
                      <div className="w-24 bg-slate-200 rounded-full h-2 mt-2">
                        <div className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Budget Section */}
            {activeTab === 'budget' && (
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Budget</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Planned Budget</div>
                    <div className="text-2xl font-bold text-slate-900">$50,000</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Spent</div>
                    <div className="text-2xl font-bold text-red-600">$32,500</div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Remaining</div>
                    <div className="text-2xl font-bold text-green-600">$17,500</div>
                  </div>
                </div>
              </div>
            )}

            {/* Pending Items Section */}
            {activeTab === 'pending-items' && (
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Pending Items</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-900">Client approval required</span>
                    </div>
                    <span className="text-xs text-slate-600">Due: Mar 15</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-900">Resource allocation</span>
                    </div>
                    <span className="text-xs text-slate-600">Due: Mar 18</span>
                  </div>
                </div>
              </div>
            )}

            {/* Issue Section */}
            {activeTab === 'issues' && (
              <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Issues</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-900">Critical: API integration delay</span>
                    </div>
                    <span className="text-xs text-red-600">High Priority</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-900">Medium: Design review needed</span>
                    </div>
                    <span className="text-xs text-yellow-600">Medium Priority</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={handleProjectCancel}
                className="px-6 py-3 bg-white border border-red-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-red-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </ConsistentLayout>
  );
}
