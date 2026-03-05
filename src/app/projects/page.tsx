'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Users, CheckCircle, Trash2, AlertTriangle, Clock, ArrowUpRight, TrendingUp, FolderKanban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { projects, deleteProject } = useProjects();

  const handleNewProject = () => {
    router.push('/projects/new');
  };

  const handleDeleteClick = (projectId: string, projectName: string) => {
    if (confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      deleteProject(projectId);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  return (
    <ConsistentLayout 
      title="Projects" 
      subtitle="Manage and track all your projects in one place"
      currentPage="projects"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{projects.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-medium">Total Projects</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">vs last month</p>
                <p className="text-sm font-bold text-green-600">+12%</p>
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
              <p className="text-3xl font-bold text-slate-900">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-medium">Completed</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">vs last month</p>
                <p className="text-sm font-bold text-green-600">+8%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">
                {projects.filter(p => p.status === 'in-progress').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-medium">In Progress</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">vs last month</p>
                <p className="text-sm font-bold text-green-600">+2%</p>
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
              <p className="text-3xl font-bold text-slate-900">
                {projects.filter(p => p.status === 'on-hold').length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-medium">On Hold</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">vs last month</p>
                <p className="text-sm font-bold text-orange-600">+5%</p>
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-80"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <button
            onClick={handleNewProject}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(project.priority)}`}>
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{project.name}</h3>
              <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Progress</span>
                <span className="font-medium text-slate-900">0%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: '0%' }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Users className="w-4 h-4" />
                <span>{project.team?.length || 0} members</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteClick(project.id, project.name)}
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FolderKanban className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No projects found</h3>
          <p className="text-slate-600">Get started by creating your first project</p>
        </div>
      )}
    </ConsistentLayout>
  );
}
