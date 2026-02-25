'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Calendar, Users, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import PageHeader from '@/components/ui/PageHeader';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { projects } = useProjects();

  const handleNewProject = () => {
    router.push('/projects/new');
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectProgress = (project: any) => {
    if (project.phases && project.phases.length > 0) {
      const totalProgress = project.phases.reduce((sum: number, phase: any) => sum + phase.progress, 0);
      return Math.round(totalProgress / project.phases.length);
    }
    return 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <PageHeader 
        title="Projects" 
        subtitle="Manage and track all your projects in one place"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{filteredProjects.length}</p>
              <p className="text-sm text-green-600 mt-2">Active portfolio</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredProjects.filter(p => p.status === 'in-progress').length}
              </p>
              <p className="text-sm text-blue-600 mt-2">Active now</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Hold</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredProjects.filter(p => p.status === 'on-hold').length}
              </p>
              <p className="text-sm text-yellow-600 mt-2">Paused</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {filteredProjects.filter(p => p.status === 'completed').length}
              </p>
              <p className="text-sm text-green-600 mt-2">Done</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
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
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:ring-0 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg focus:ring-0 focus:border-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={handleNewProject}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Project Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Progress</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Team</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Deadline</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Priority</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-900">Budget</th>
                <th className="text-center px-6 py-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium min-w-[100px] whitespace-nowrap ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${getProjectProgress(project)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">{getProjectProgress(project)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1">
                        {project.team.length > 0 ? project.team.slice(0, 2).map((member, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700 whitespace-nowrap">
                            {member.split(' ').map(n => n[0]).join('')}
                          </span>
                        )) : (
                          <span className="text-sm text-gray-500 whitespace-nowrap">No team</span>
                        )}
                        {project.team.length > 2 && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">+{project.team.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
                      <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{project.deadline || 'Not set'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium min-w-[80px] whitespace-nowrap ${getPriorityColor(project.priority)}`}>
                      {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">IDR</span>
                      <span className="font-semibold text-gray-900">
                        {project.budget ? project.budget.toLocaleString('id-ID') : 'Not set'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
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
  );
}
