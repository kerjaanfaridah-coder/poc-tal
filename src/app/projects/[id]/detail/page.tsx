'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, X, Plus, Trash2, Edit2, Check, AlertTriangle, Clock } from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import PageHeader from '@/components/ui/PageHeader';

interface Phase {
  id: string;
  name: string;
  progress: number;
  budget: number;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Issue {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
}

interface PendingItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { projects, updateProject } = useProjects();
  const [project, setProject] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<any>(null);

  const getRemainingBudget = (project: any) => {
    const totalBudget = project.budget || 0;
    const usedBudget = project.phases ? 
      project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0;
    return totalBudget - usedBudget;
  };

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.id);
    if (foundProject) {
      setProject(foundProject);
      setEditedProject({ ...foundProject });
    }
  }, [params.id, projects]);

  const handleSave = () => {
    updateProject(params.id as string, editedProject);
    setProject(editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject({ ...project });
    setIsEditing(false);
  };

  const addPhase = () => {
    const newPhase: Phase = {
      id: Date.now().toString(),
      name: 'New Phase',
      progress: 0,
      budget: 0,
      deadline: '',
      status: 'pending'
    };
    setEditedProject({
      ...editedProject,
      phases: [...(editedProject.phases || []), newPhase]
    });
  };

  const addIssue = () => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      title: 'New Issue',
      description: '',
      priority: 'medium',
      status: 'open',
      createdAt: new Date().toISOString()
    };
    setEditedProject({
      ...editedProject,
      issues: [...(editedProject.issues || []), newIssue]
    });
  };

  const addPendingItem = () => {
    const newPendingItem: PendingItem = {
      id: Date.now().toString(),
      title: 'New Task',
      description: '',
      assignee: '',
      dueDate: '',
      completed: false
    };
    setEditedProject({
      ...editedProject,
      pendingItems: [...(editedProject.pendingItems || []), newPendingItem]
    });
  };

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <button
            onClick={() => router.push('/projects')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <PageHeader 
            title={isEditing ? 'Edit Project' : 'Project Details'}
            subtitle={project.name}
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.push('/projects')}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Project Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-900">{project.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            {isEditing ? (
              <select
                value={editedProject.status}
                onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('-', ' ')}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            {isEditing ? (
              <select
                value={editedProject.priority}
                onChange={(e) => setEditedProject({ ...editedProject, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                project.priority === 'high' ? 'bg-red-100 text-red-800' :
                project.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                'bg-green-100 text-green-800'
              }`}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            {isEditing ? (
              <input
                type="date"
                value={editedProject.deadline}
                onChange={(e) => setEditedProject({ ...editedProject, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-gray-900">{project.deadline || 'Not set'}</p>
            )}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={editedProject.description}
              onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}
        {!isEditing && project.description && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <p className="text-gray-900">{project.description}</p>
          </div>
        )}
      </div>

      {/* Budget Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget</label>
            {isEditing ? (
              <input
                type="number"
                value={editedProject.budget}
                onChange={(e) => setEditedProject({ ...editedProject, budget: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">IDR {project.budget?.toLocaleString('id-ID') || 'Not set'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Used Budget</label>
            <p className="text-lg font-semibold text-orange-600">
              IDR {(project.phases ? project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0).toLocaleString('id-ID')}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Budget</label>
            <p className="text-lg font-semibold text-green-600">
              IDR {getRemainingBudget(project).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        
        {/* Budget Progress Bar */}
        <div className="mt-6">
          {(() => {
            const totalBudget = project.budget || 0;
            const usedBudget = project.phases ? project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0;
            const budgetUsagePercentage = totalBudget > 0 ? Math.round((usedBudget / totalBudget) * 100) : 0;
            
            return (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Budget Usage</span>
                  <span className="text-sm text-gray-600">{budgetUsagePercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-300 bg-red-500"
                    style={{ width: `${budgetUsagePercentage}%` }}
                  />
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Phase Progress</h2>
          {isEditing && (
            <button
              onClick={addPhase}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Phase
            </button>
          )}
        </div>
        <div className="space-y-4">
          {(isEditing ? editedProject.phases : project.phases)?.map((phase: Phase, index: number) => (
            <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={phase.name}
                    onChange={(e) => {
                      const updatedPhases = [...(editedProject.phases || [])];
                      updatedPhases[index] = { ...phase, name: e.target.value };
                      setEditedProject({ ...editedProject, phases: updatedPhases });
                    }}
                    className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                  />
                ) : (
                  <h3 className="font-medium text-gray-900">{phase.name}</h3>
                )}
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                  phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {phase.status.replace('-', ' ')}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={phase.progress}
                      onChange={(e) => {
                        const updatedPhases = [...(editedProject.phases || [])];
                        updatedPhases[index] = { ...phase, progress: parseInt(e.target.value) };
                        setEditedProject({ ...editedProject, phases: updatedPhases });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${phase.progress}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{phase.progress}%</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={phase.budget}
                      onChange={(e) => {
                        const updatedPhases = [...(editedProject.phases || [])];
                        updatedPhases[index] = { ...phase, budget: parseInt(e.target.value) };
                        setEditedProject({ ...editedProject, phases: updatedPhases });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">IDR {phase.budget?.toLocaleString('id-ID')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={phase.deadline}
                      onChange={(e) => {
                        const updatedPhases = [...(editedProject.phases || [])];
                        updatedPhases[index] = { ...phase, deadline: e.target.value };
                        setEditedProject({ ...editedProject, phases: updatedPhases });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{phase.deadline || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Budget</h2>
          {isEditing && (
            <button
              onClick={() => {
                const newPhase = {
                  id: Date.now().toString(),
                  name: 'New Budget Item',
                  budget: 0,
                  type: 'expense'
                };
                setEditedProject({
                  ...editedProject,
                  budgetItems: [...(editedProject.budgetItems || []), newPhase]
                });
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Budget Item
            </button>
          )}
        </div>
        
        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget</label>
            {isEditing ? (
              <input
                type="number"
                value={editedProject.budget}
                onChange={(e) => setEditedProject({ ...editedProject, budget: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            ) : (
              <p className="text-lg font-semibold text-gray-900">IDR {project.budget?.toLocaleString('id-ID') || 'Not set'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allocated Budget</label>
            <p className="text-lg font-semibold text-orange-600">
              IDR {(project.phases ? project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0).toLocaleString('id-ID')}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Budget</label>
            <p className="text-lg font-semibold text-green-600">
              IDR {getRemainingBudget(project).toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Budget Allocation</span>
            <span className="text-sm text-gray-600">
              {(() => {
                const totalBudget = project.budget || 0;
                const allocatedBudget = project.phases ? project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0;
                const allocationPercentage = totalBudget > 0 ? Math.round((allocatedBudget / totalBudget) * 100) : 0;
                return `${allocationPercentage}%`;
              })()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            {(() => {
              const totalBudget = project.budget || 0;
              const allocatedBudget = project.phases ? project.phases.reduce((sum: number, phase: any) => sum + (phase.budget || 0), 0) : 0;
              const allocationPercentage = totalBudget > 0 ? Math.round((allocatedBudget / totalBudget) * 100) : 0;
              return (
                <div 
                  className="h-3 rounded-full transition-all duration-300 bg-red-500"
                  style={{ width: `${allocationPercentage}%` }}
                />
              );
            })()}
          </div>
        </div>

        {/* Budget Items List */}
        <div className="space-y-4">
          {(isEditing ? editedProject.budgetItems : project.budgetItems)?.map((item: any, index: number) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = [...(editedProject.budgetItems || [])];
                      updatedItems[index] = { ...item, name: e.target.value };
                      setEditedProject({ ...editedProject, budgetItems: updatedItems });
                    }}
                    className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 flex-1 mr-2"
                  />
                ) : (
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                )}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    item.type === 'expense' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.type}
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => {
                        const updatedItems = (editedProject.budgetItems || []).filter((_: any, i: number) => i !== index);
                        setEditedProject({ ...editedProject, budgetItems: updatedItems });
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.budget}
                      onChange={(e) => {
                        const updatedItems = [...(editedProject.budgetItems || [])];
                        updatedItems[index] = { ...item, budget: parseInt(e.target.value) };
                        setEditedProject({ ...editedProject, budgetItems: updatedItems });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  ) : (
                    <p className="text-sm text-gray-900">IDR {item.budget?.toLocaleString('id-ID')}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  {isEditing ? (
                    <select
                      value={item.type}
                      onChange={(e) => {
                        const updatedItems = [...(editedProject.budgetItems || [])];
                        updatedItems[index] = { ...item, type: e.target.value };
                        setEditedProject({ ...editedProject, budgetItems: updatedItems });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-900">{item.type}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issues */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Issues</h2>
          {isEditing && (
            <button
              onClick={addIssue}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Issue
            </button>
          )}
        </div>
        <div className="space-y-4">
          {(isEditing ? editedProject.issues : project.issues)?.map((issue: Issue, index: number) => (
            <div key={issue.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={issue.title}
                    onChange={(e) => {
                      const updatedIssues = [...(editedProject.issues || [])];
                      updatedIssues[index] = { ...issue, title: e.target.value };
                      setEditedProject({ ...editedProject, issues: updatedIssues });
                    }}
                    className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 flex-1 mr-2"
                  />
                ) : (
                  <h3 className="font-medium text-gray-900">{issue.title}</h3>
                )}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                    issue.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              {isEditing ? (
                <textarea
                  value={issue.description}
                  onChange={(e) => {
                    const updatedIssues = [...(editedProject.issues || [])];
                    updatedIssues[index] = { ...issue, description: e.target.value };
                    setEditedProject({ ...editedProject, issues: updatedIssues });
                  }}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Issue description..."
                />
              ) : (
                issue.description && (
                  <p className="text-sm text-gray-600">{issue.description}</p>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pending Items - Modern SaaS Style */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Pending Items</h2>
          {isEditing && (
            <button
              onClick={addPendingItem}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(isEditing ? editedProject.pendingItems : project.pendingItems)?.length || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Due Soon</p>
                <p className="text-2xl font-bold text-orange-900 mt-1">
                  {(() => {
                    const items = (isEditing ? editedProject.pendingItems : project.pendingItems) || [];
                    const today = new Date();
                    const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                    return items.filter((item: PendingItem) => {
                      if (!item.dueDate || item.completed) return false;
                      const dueDate = new Date(item.dueDate);
                      return dueDate <= threeDaysFromNow && dueDate >= today;
                    }).length;
                  })()}
                </p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Overdue</p>
                <p className="text-2xl font-bold text-red-900 mt-1">
                  {(() => {
                    const items = (isEditing ? editedProject.pendingItems : project.pendingItems) || [];
                    const today = new Date();
                    return items.filter((item: PendingItem) => {
                      if (!item.dueDate || item.completed) return false;
                      const dueDate = new Date(item.dueDate);
                      return dueDate < today;
                    }).length;
                  })()}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Item */}
        {isEditing && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Plus className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Quick Add Item</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                id="quick-add-type"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                defaultValue="decision"
              >
                <option value="decision">Decision</option>
                <option value="action">Action</option>
                <option value="change">Change</option>
                <option value="task">Task</option>
              </select>
              <input
                type="text"
                placeholder="Description..."
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                id="quick-add-description"
              />
              <input
                type="date"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                id="quick-add-date"
              />
              <button
                onClick={() => {
                  const type = (document.getElementById('quick-add-type') as HTMLSelectElement)?.value || 'decision';
                  const description = (document.getElementById('quick-add-description') as HTMLInputElement)?.value || 'New Item';
                  const dueDate = (document.getElementById('quick-add-date') as HTMLInputElement)?.value || '';
                  
                  const newPendingItem: PendingItem = {
                    id: Date.now().toString(),
                    title: description,
                    description: '',
                    assignee: '',
                    dueDate: dueDate,
                    completed: false
                  };
                  
                  setEditedProject({
                    ...editedProject,
                    pendingItems: [...(editedProject.pendingItems || []), newPendingItem]
                  });
                  
                  // Clear form
                  (document.getElementById('quick-add-description') as HTMLInputElement).value = '';
                  (document.getElementById('quick-add-date') as HTMLInputElement).value = '';
                }}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* Items Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(isEditing ? editedProject.pendingItems : project.pendingItems)?.map((item: PendingItem, index: number) => {
                const today = new Date();
                const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                const dueDate = item.dueDate ? new Date(item.dueDate) : null;
                const isOverdue = dueDate && dueDate < today && !item.completed;
                const isDueSoon = dueDate && dueDate <= threeDaysFromNow && dueDate >= today && !item.completed;
                const itemType = item.title.toLowerCase().includes('decision') ? 'decision' : 
                               item.title.toLowerCase().includes('action') ? 'action' : 
                               item.title.toLowerCase().includes('change') ? 'change' : 'task';
                
                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-gray-50 transition-colors ${isOverdue ? 'bg-red-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        itemType === 'decision' ? 'bg-blue-100 text-blue-800' :
                        itemType === 'action' ? 'bg-orange-100 text-orange-800' :
                        itemType === 'change' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {itemType === 'decision' && '🔵'}
                        {itemType === 'action' && '🟠'}
                        {itemType === 'change' && '🟣'}
                        {itemType === 'task' && '⚪'}
                        {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updatedItems = [...(editedProject.pendingItems || [])];
                            updatedItems[index] = { ...item, title: e.target.value };
                            setEditedProject({ ...editedProject, pendingItems: updatedItems });
                          }}
                          className={`font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-full ${
                            item.completed ? 'line-through opacity-60' : ''
                          }`}
                        />
                      ) : (
                        <div className={`font-medium text-gray-900 ${item.completed ? 'line-through opacity-60' : ''}`}>
                          {item.title}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {isEditing ? (
                        <input
                          type="text"
                          value={item.assignee}
                          onChange={(e) => {
                            const updatedItems = [...(editedProject.pendingItems || [])];
                            updatedItems[index] = { ...item, assignee: e.target.value };
                            setEditedProject({ ...editedProject, pendingItems: updatedItems });
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Assignee..."
                        />
                      ) : (
                        <span className="text-sm text-gray-900">{item.assignee || 'Not assigned'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <input
                            type="date"
                            value={item.dueDate}
                            onChange={(e) => {
                              const updatedItems = [...(editedProject.pendingItems || [])];
                              updatedItems[index] = { ...item, dueDate: e.target.value };
                              setEditedProject({ ...editedProject, pendingItems: updatedItems });
                            }}
                            className="px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        ) : (
                          <span className="text-sm text-gray-900">{item.dueDate || 'Not set'}</span>
                        )}
                        {!item.completed && item.dueDate && (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            isOverdue ? 'bg-red-100 text-red-800' :
                            isDueSoon ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {isOverdue && '🔴 Overdue'}
                            {isDueSoon && '⚠️ Due Soon'}
                            {!isOverdue && !isDueSoon && '✓ Normal'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isEditing ? (
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              const updatedItems = [...(editedProject.pendingItems || [])];
                              updatedItems[index] = { ...item, completed: e.target.checked };
                              setEditedProject({ ...editedProject, pendingItems: updatedItems });
                            }}
                            className="rounded border-gray-300 text-red-500 focus:ring-red-500"
                          />
                        ) : (
                          <div className={`w-4 h-4 rounded border-2 ${
                            item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {item.completed && <Check className="w-3 h-3 text-white" />}
                          </div>
                        )}
                        <span className={`text-sm font-medium ${
                          item.completed ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {item.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isEditing && (
                          <button
                            onClick={() => {
                              const updatedItems = (editedProject.pendingItems || []).filter((_: any, i: number) => i !== index);
                              setEditedProject({ ...editedProject, pendingItems: updatedItems });
                            }}
                            className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Activity Timeline */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-gray-900">Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Decision added</p>
                <p className="text-xs text-gray-500">John Doe – 12 Mar 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Due date updated</p>
                <p className="text-xs text-gray-500">Decision "cddvv" → 15 Mar</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Item completed</p>
                <p className="text-xs text-gray-500">Action "Install cable"</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Added decision</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Updated due date</p>
                <p className="text-xs text-gray-500">yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
