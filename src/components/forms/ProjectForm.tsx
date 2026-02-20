'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export interface Project {
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

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void
  onCancel: () => void
  initialData?: Partial<Project>
}

export default function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [activeTab, setActiveTab] = useState('project-info')
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: initialData?.name || '',
    location: initialData?.location || '',
    pm: initialData?.pm || '',
    pic: initialData?.pic || '',
    picRole: initialData?.picRole || '',
    due: initialData?.due || '',
    status: initialData?.status || 'in-progress',
    progress: initialData?.progress || 0,
    budget: initialData?.budget || 0,
    team: initialData?.team || [],
    phases: initialData?.phases?.length ? initialData.phases : [
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
    ],
    pendingItems: initialData?.pendingItems || [],
    issues: initialData?.issues || [],
    outstandingTasks: initialData?.outstandingTasks || []
  })

  const handleSubmit = () => {
    onSubmit(newProject)
  }

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
    >
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            {initialData?.id ? 'Edit Project' : 'Add New Project'}
          </CardTitle>
          <div className="flex gap-3">
            <Button 
              onClick={onCancel}
              variant="outline"
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {initialData?.id ? 'Update Project' : 'Create Project'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('project-info')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'project-info'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Project Information
          </button>
          <button
            onClick={() => setActiveTab('phase-progress')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'phase-progress'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Phase Progress Table
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'budget'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Budget
          </button>
          <button
            onClick={() => setActiveTab('pending-items')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'pending-items'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Pending Items
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'issues'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Issues
          </button>
          <button
            onClick={() => setActiveTab('outstanding-tasks')}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === 'outstanding-tasks'
                ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Outstanding Tasks
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Project Information Tab */}
          {activeTab === 'project-info' && (
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIC Internal</label>
                  <input
                    type="text"
                    value={newProject.pm}
                    onChange={(e) => setNewProject({...newProject, pm: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter PIC Internal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIC Site</label>
                  <input
                    type="text"
                    value={newProject.pic}
                    onChange={(e) => setNewProject({...newProject, pic: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter PIC Site name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIC Site (Role)</label>
                  <input
                    type="text"
                    value={newProject.picRole}
                    onChange={(e) => setNewProject({...newProject, picRole: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter PIC Site role"
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
              </div>
            </div>
          )}

          {/* Phase Progress Table Tab */}
          {activeTab === 'phase-progress' && (
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
          )}

          {/* Budget Tab */}
          {activeTab === 'budget' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget</h3>
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {newProject.budget.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                  </div>
                  <p className="text-gray-600">Total Project Budget</p>
                </div>
              </div>
            </div>
          )}

          {/* Pending Items Tab */}
          {activeTab === 'pending-items' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Items</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Pending items management will be added here</p>
              </div>
            </div>
          )}

          {/* Issues Tab */}
          {activeTab === 'issues' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Issues management will be added here</p>
              </div>
            </div>
          )}

          {/* Outstanding Tasks Tab */}
          {activeTab === 'outstanding-tasks' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Tasks</h3>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 text-sm">Outstanding tasks management will be added here</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </motion.div>
  )
}
