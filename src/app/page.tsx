'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import Layout from '@/components/Layout'

interface Project {
  id: string
  name: string
  location: string
  pm: string
  pic: string
  picRole: string
  due: string
  status: 'in-progress' | 'on-hold' | 'completed'
  progress: number
  budget: number
  team: string[]
  phases: Array<{
    id: string
    name: string
    progress: number
    tasks: Array<{
      id: string
      name: string
      status: string
    }>
  }>
  pendingItems: Array<{
    id: string
    category: string
    description: string
  }>
  issues: Array<{
    id: string
    category: string
    description: string
    severity: 'low' | 'medium' | 'high'
  }>
  outstandingTasks: Array<{
    id: string
    description: string
    assignee: string
    due: string
    status: string
  }>
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])

  // Load projects from localStorage on component mount
  React.useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(savedProjects)
  }, [])

  const [showAddForm, setShowAddForm] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; projectId: string; projectName: string }>({
    show: false,
    projectId: '',
    projectName: ''
  })

  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    pm: '',
    pic: '',
    picRole: '',
    due: '',
    budget: 0,
    phases: [
      {
        id: 'phase-1',
        name: 'Phase 1 - Planning',
        progress: 0,
        tasks: [
          { id: 't1', name: 'Kick Off Meeting', status: 'pending' },
          { id: 't2', name: 'Shop Drawing', status: 'pending' }
        ]
      },
      {
        id: 'phase-2',
        name: 'Phase 2 - Design',
        progress: 0,
        tasks: [
          { id: 't3', name: 'Material Approval', status: 'pending' },
          { id: 't4', name: 'Design Review', status: 'pending' }
        ]
      },
      {
        id: 'phase-3',
        name: 'Phase 3 - Implementation',
        progress: 0,
        tasks: [
          { id: 't5', name: 'Installation', status: 'pending' },
          { id: 't6', name: 'Testing', status: 'pending' }
        ]
      },
      {
        id: 'phase-4',
        name: 'Phase 4 - Completion',
        progress: 0,
        tasks: [
          { id: 't7', name: 'Final Inspection', status: 'pending' },
          { id: 't8', name: 'Handover', status: 'pending' }
        ]
      }
    ]
  })

  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true
    return project.status === activeTab
  })

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusConfig = (status: string) => {
      switch (status) {
        case 'in-progress':
          return { bg: 'bg-blue-500', text: 'In Progress', icon: '⚡' }
        case 'on-hold':
          return { bg: 'bg-amber-500', text: 'On Hold', icon: '⏸️' }
        case 'completed':
          return { bg: 'bg-green-500', text: 'Completed', icon: '✅' }
        default:
          return { bg: 'bg-gray-500', text: 'Unknown', icon: '❓' }
      }
    }

    const config = getStatusConfig(status)
    return (
      <Badge className={`${config.bg} text-white border-0 shadow-md`}>
        {config.icon} {config.text}
      </Badge>
    )
  }

  const ProgressBar = ({ value }: { value: number }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  )

  const handleAddProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      location: newProject.location,
      pm: newProject.pm,
      pic: newProject.pic,
      picRole: newProject.picRole,
      due: newProject.due,
      status: 'in-progress',
      progress: 0,
      budget: newProject.budget,
      team: [],
      phases: [],
      pendingItems: [],
      issues: [],
      outstandingTasks: []
    }
    setProjects([...projects, project])
    setNewProject({ 
    name: '', 
    location: '', 
    pm: '', 
    pic: '', 
    picRole: '', 
    due: '', 
    budget: 0,
    phases: [
      {
        id: 'phase-1',
        name: 'Phase 1 - Planning',
        progress: 0,
        tasks: [
          { id: 't1', name: 'Kick Off Meeting', status: 'pending' },
          { id: 't2', name: 'Shop Drawing', status: 'pending' }
        ]
      },
      {
        id: 'phase-2',
        name: 'Phase 2 - Design',
        progress: 0,
        tasks: [
          { id: 't3', name: 'Material Approval', status: 'pending' },
          { id: 't4', name: 'Design Review', status: 'pending' }
        ]
      },
      {
        id: 'phase-3',
        name: 'Phase 3 - Implementation',
        progress: 0,
        tasks: [
          { id: 't5', name: 'Installation', status: 'pending' },
          { id: 't6', name: 'Testing', status: 'pending' }
        ]
      },
      {
        id: 'phase-4',
        name: 'Phase 4 - Completion',
        progress: 0,
        tasks: [
          { id: 't7', name: 'Final Inspection', status: 'pending' },
          { id: 't8', name: 'Handover', status: 'pending' }
        ]
      }
    ]
  })
    setShowAddForm(false)
  }

  const handleDeleteProject = (projectId: string, projectName: string) => {
    setDeleteModal({ show: true, projectId, projectName })
  }

  const confirmDeleteProject = () => {
    if (deleteModal.projectId) {
      setProjects(projects.filter(p => p.id !== deleteModal.projectId))
      setDeleteModal({ show: false, projectId: '', projectName: '' })
    }
  }

  const cancelDelete = () => {
    setDeleteModal({ show: false, projectId: '', projectName: '' })
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Projects</h1>
              <p className="text-gray-600">Manage and track all your projects</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveTab('all')}
            className="text-sm"
          >
            All ({projects.length})
          </Button>
          <Button
            variant={activeTab === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setActiveTab('in-progress')}
            className="text-sm"
          >
            In Progress ({projects.filter(p => p.status === 'in-progress').length})
          </Button>
          <Button
            variant={activeTab === 'on-hold' ? 'default' : 'outline'}
            onClick={() => setActiveTab('on-hold')}
            className="text-sm"
          >
            On Hold ({projects.filter(p => p.status === 'on-hold').length})
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
            className="text-sm"
          >
            Completed ({projects.filter(p => p.status === 'completed').length})
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:shadow-gray-500/20 transition-all duration-300"
            >
              <Card className="border-0 shadow-none h-full">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-normal whitespace-normal relative z-10">{project.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600 leading-normal whitespace-normal relative z-10">
                        <p>📍 {project.location}</p>
                        <p>👤 {project.pm}</p>
                        <p>🔧 {project.pic}</p>
                        <p>📅 {project.due}</p>
                      </div>
                    </div>
                    <StatusBadge status={project.status} />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Progress</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>

                  <div className="mb-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Budget</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.budget.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                    </div>
                  </div>

                  <div className="mb-4 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Phases</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.phases.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Pending Items</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.pendingItems.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Issues</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.issues.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-800 font-medium leading-normal whitespace-normal relative z-10">Outstanding Tasks</span>
                      <span className="font-medium text-gray-900 leading-normal whitespace-normal relative z-10">{project.outstandingTasks.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        // Navigate to project dashboard
                        console.log('Navigate to dashboard for project:', project.id)
                        // TODO: Navigate to dashboard when ready
                        // window.location.href = `/projects/${project.id}/dashboard`
                      }}
                    >
                      📊 Dashboard
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        // Navigate to edit project
                        console.log('Edit project:', project.id)
                        // TODO: Navigate to edit when ready
                        // window.location.href = `/projects/${project.id}/edit`
                      }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
                      onClick={() => handleDeleteProject(project.id, project.name)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Project Modal */}
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Add New Project</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Project Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                        <input
                          type="text"
                          value={newProject.name}
                          onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter project name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={newProject.location}
                          onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                          placeholder="0"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').replace(/\B/g, '').replace(/[^\d]/g, '')
                            const formattedValue = value ? `Rp. ${parseInt(value).toLocaleString('id-ID')}` : ''
                            e.target.value = formattedValue
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIC</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                          placeholder="0"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').replace(/\B/g, '').replace(/[^\d]/g, '')
                            const formattedValue = value ? `Rp. ${parseInt(value).toLocaleString('id-ID')}` : ''
                            e.target.value = formattedValue
                          }}
                          value={newProject.pic}
                          onChange={(e) => setNewProject({...newProject, pic: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter PIC name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIC Role</label>
                        <input
                          type="text"
                          value={newProject.picRole}
                          onChange={(e) => setNewProject({...newProject, picRole: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter PIC role"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                        <input
                          type="date"
                          value={newProject.due}
                          onChange={(e) => setNewProject({...newProject, due: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                        <input
                          type="number"
                          value={newProject.budget}
                          onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter budget"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase Progress Table */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Phase Progress Table</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Phase</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Progress</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tasks</th>
                            <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {newProject.phases.map((phase, phaseIndex) => (
                            <tr key={phase.id}>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={phase.name}
                                  onChange={(e) => {
                                    const updatedPhases = [...newProject.phases]
                                    updatedPhases[phaseIndex].name = e.target.value
                                    setNewProject({...newProject, phases: updatedPhases})
                                  }}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={phase.progress}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].progress = parseInt(e.target.value)
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="flex-1"
                                  />
                                  <span className="text-sm font-medium text-gray-900 w-12">{phase.progress}%</span>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <div className="space-y-1">
                                  {phase.tasks.map((task, taskIndex) => (
                                    <div key={task.id} className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={task.name}
                                        onChange={(e) => {
                                          const updatedPhases = [...newProject.phases]
                                          updatedPhases[phaseIndex].tasks[taskIndex].name = e.target.value
                                          setNewProject({...newProject, phases: updatedPhases})
                                        }}
                                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs"
                                      />
                                      <select
                                        value={task.status}
                                        onChange={(e) => {
                                          const updatedPhases = [...newProject.phases]
                                          updatedPhases[phaseIndex].tasks[taskIndex].status = e.target.value
                                          setNewProject({...newProject, phases: updatedPhases})
                                        }}
                                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                                      >
                                        <option value="pending">Pending</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                      </select>
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].tasks.push({
                                        id: `task-${Date.now()}`,
                                        name: '',
                                        status: 'pending'
                                      })
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                                  >
                                    + Add Task
                                  </button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedPhases = newProject.phases.filter((_, index) => index !== phaseIndex)
                                    setNewProject({...newProject, phases: updatedPhases})
                                  }}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="p-3 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => {
                            const newPhase = {
                              id: `phase-${Date.now()}`,
                              name: `Phase ${newProject.phases.length + 1}`,
                              progress: 0,
                              tasks: [
                                { id: `task-${Date.now()}`, name: '', status: 'pending' }
                              ]
                            }
                            setNewProject({...newProject, phases: [...newProject.phases, newPhase]})
                          }}
                          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          + Add Phase
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Budget details will be added after project creation</p>
                    </div>
                  </div>

                  {/* Pending Items */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Items</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Pending items will be added after project creation</p>
                    </div>
                  </div>

                  {/* Issues */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Issues will be added after project creation</p>
                    </div>
                  </div>

                  {/* Outstanding Tasks */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Tasks</h3>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 text-sm">Outstanding tasks will be added after project creation</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <Button 
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddProject}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Create Project
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModal.show && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                    <span className="text-red-600 text-lg">🗑️</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Delete Project?</h2>
                    <p className="text-sm text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-medium text-gray-900">{deleteModal.projectName}</p>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button 
                    onClick={cancelDelete}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={confirmDeleteProject}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  )
}
