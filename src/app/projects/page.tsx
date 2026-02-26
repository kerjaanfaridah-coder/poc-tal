'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Calendar, Users, CheckCircle, Trash2, AlertTriangle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import PageHeader from '@/components/ui/PageHeader';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; name: string } | null>(null);
  const router = useRouter();
  const { projects, deleteProject } = useProjects();

  const handleNewProject = () => {
    router.push('/projects/new');
  };

  const handleDeleteClick = (projectId: string, projectName: string) => {
    setProjectToDelete({ id: projectId, name: projectName });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete.id);
      setConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setProjectToDelete(null);
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

  const getIssuesCount = (project: any) => {
    return project.issues ? project.issues.length : 0;
  };

  const getPendingCount = (project: any) => {
    return project.pendingItems ? project.pendingItems.filter((item: any) => !item.completed).length : 0;
  };

  const getRemainingBudget = (project: any) => {
    const totalBudget = project.budget || 0;
    const usedBudget = project.phases ? 
      project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0;
    return totalBudget - usedBudget;
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

      {/* Projects Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const progress = getProjectProgress(project);
          const issuesCount = getIssuesCount(project);
          const pendingCount = getPendingCount(project);
          const remainingBudget = getRemainingBudget(project);

          return (
            <div key={project.id} className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition">
              {/* SECTION 1 — HEADER */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium min-w-[80px] whitespace-nowrap ${getStatusColor(project.status)}`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              {/* SECTION 2 — PHASE PROGRESS */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Phase Progress</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 bg-red-500 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{progress}%</span>
                </div>
              </div>

              {/* SECTION 3 — REMAINING BUDGET */}
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Remaining Budget</p>
                <p className="text-base font-semibold text-gray-900">
                  IDR {remainingBudget.toLocaleString('id-ID')}
                </p>
              </div>

              {/* SECTION 4 — ISSUE & PENDING ITEMS */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">{issuesCount} Issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-600">{pendingCount} Pending</span>
                </div>
              </div>

              {/* SECTION 5 — DEADLINE, PRIORITY, ACTIONS */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 whitespace-nowrap">{project.deadline || 'Not set'}</span>
                  </div>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium min-w-[60px] whitespace-nowrap ${getPriorityColor(project.priority)}`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => router.push(`/projects/${project.id}/detail`)}
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    title="View project details"
                  >
                    Detail
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(project.id, project.name)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={confirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={projectToDelete?.name || ''}
      />
    </div>
  );
}
