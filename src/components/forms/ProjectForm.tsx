'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react'

export interface Project {
  id: string
  name: string
  description: string
  status: 'in-progress' | 'on-hold' | 'completed'
  priority: 'low' | 'medium' | 'high'
  startDate: string
  deadline: string
  location: string
  pm: string
  pic: string
  picRole: string
  budget: number
  team: string[]
  phases: Array<{
    id: string
    name: string
    owner: string
    progress: number
    status: 'not-started' | 'in-progress' | 'completed' | 'on-hold'
  }>
  pendingItems: Array<{
    id: string
    itemName: string
    dueDate: string
    assignedPerson: string
    completed: boolean
  }>
  issues: Array<{
    id: string
    title: string
    severity: 'low' | 'medium' | 'high'
    assignedTo: string
    status: 'open' | 'in-progress' | 'resolved' | 'closed'
  }>
}

interface ProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void
  onCancel: () => void
  initialData?: Partial<Project>
}

export default function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    status: initialData?.status || 'in-progress',
    priority: initialData?.priority || 'medium',
    startDate: initialData?.startDate || '',
    deadline: initialData?.deadline || '',
    location: initialData?.location || '',
    pm: initialData?.pm || '',
    pic: initialData?.pic || '',
    picRole: initialData?.picRole || '',
    budget: initialData?.budget || 0,
    team: initialData?.team || [],
    phases: initialData?.phases || [
      {
        id: 'phase-1',
        name: 'Phase 1 - Planning',
        owner: '',
        progress: 0,
        status: 'not-started'
      }
    ],
    pendingItems: initialData?.pendingItems || [],
    issues: initialData?.issues || []
  })

  const totalSteps = 5

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!newProject.name.trim()) {
      alert('Project name is required');
      return;
    }
    
    onSubmit(newProject);
  }

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  }

  const steps = [
    { id: 1, name: 'Basic Info' },
    { id: 2, name: 'Phase Progress' },
    { id: 3, name: 'Budget' },
    { id: 4, name: 'Pending Items' },
    { id: 5, name: 'Issue' }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter project name"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({...newProject, status: e.target.value as Project['status']})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="in-progress">In Progress</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newProject.priority}
                  onChange={(e) => setNewProject({...newProject, priority: e.target.value as Project['priority']})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={newProject.startDate}
                  onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter project description"
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mt-6 rounded-xl bg-gray-50 p-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Phase Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Owner</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Progress (%)</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
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
                            placeholder="Enter phase name"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={phase.owner}
                            onChange={(e) => {
                              const updatedPhases = [...newProject.phases]
                              updatedPhases[phaseIndex].owner = e.target.value
                              setNewProject({...newProject, phases: updatedPhases})
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            placeholder="Enter owner name"
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
                          <select
                            value={phase.status}
                            onChange={(e) => {
                              const updatedPhases = [...newProject.phases]
                              updatedPhases[phaseIndex].status = e.target.value as Project['phases'][0]['status']
                              setNewProject({...newProject, phases: updatedPhases})
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="on-hold">On Hold</option>
                          </select>
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
                        owner: '',
                        progress: 0,
                        status: 'not-started' as const
                      }
                      setNewProject({...newProject, phases: [...newProject.phases, newPhase]})
                    }}
                    className="w-full py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    + Add Row
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="mt-6 rounded-xl bg-gray-50 p-6 space-y-6">
              {/* Total Budget Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget (IDR)</label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter total project budget"
                />
              </div>

              {/* Budget Summary Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Total Budget</h4>
                  <p className="text-xl font-bold text-gray-900">
                    IDR {newProject.budget.toLocaleString('id-ID')}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-600 mb-2">Estimated Cost</h4>
                  <p className="text-xl font-bold text-blue-900">
                    IDR {Math.round(newProject.budget * 0.75).toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">75% of total budget</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="text-sm font-medium text-green-600 mb-2">Remaining Budget</h4>
                  <p className="text-xl font-bold text-green-900">
                    IDR {Math.round(newProject.budget * 0.25).toLocaleString('id-ID')}
                  </p>
                  <p className="text-xs text-green-600 mt-1">25% remaining</p>
                </div>
              </div>

              {/* Progress Bar Visualization */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Budget Allocation</h4>
                
                <div className="space-y-4">
                  {/* Estimated Cost Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Estimated Cost</span>
                      <span className="text-sm text-gray-600">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>

                  {/* Remaining Budget Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Remaining Budget</span>
                      <span className="text-sm text-gray-600">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Total Progress */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-900">Total Budget Used</span>
                    <span className="text-sm font-semibold text-gray-900">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-4 rounded-full transition-all duration-300"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Budget Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Planning Phase</span>
                    <span className="text-sm font-medium text-gray-900">IDR {Math.round(newProject.budget * 0.15).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Development Phase</span>
                    <span className="text-sm font-medium text-gray-900">IDR {Math.round(newProject.budget * 0.45).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Testing Phase</span>
                    <span className="text-sm font-medium text-gray-900">IDR {Math.round(newProject.budget * 0.10).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Deployment Phase</span>
                    <span className="text-sm font-medium text-gray-900">IDR {Math.round(newProject.budget * 0.05).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-semibold text-gray-900">Contingency (20%)</span>
                    <span className="text-sm font-semibold text-gray-900">IDR {Math.round(newProject.budget * 0.20).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Pending Items</h3>
            
            <div className="space-y-4">
              {/* Pending Items List */}
              {newProject.pendingItems.map((item, index) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="pt-1">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={(e) => {
                          const updatedItems = [...newProject.pendingItems]
                          updatedItems[index].completed = e.target.checked
                          setNewProject({...newProject, pendingItems: updatedItems})
                        }}
                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Item Name */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Item Name</label>
                          <input
                            type="text"
                            value={item.itemName}
                            onChange={(e) => {
                              const updatedItems = [...newProject.pendingItems]
                              updatedItems[index].itemName = e.target.value
                              setNewProject({...newProject, pendingItems: updatedItems})
                            }}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                              item.completed ? 'bg-gray-50 text-gray-500 line-through' : ''
                            }`}
                            placeholder="Enter item name"
                          />
                        </div>

                        {/* Due Date */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
                          <input
                            type="date"
                            value={item.dueDate}
                            onChange={(e) => {
                              const updatedItems = [...newProject.pendingItems]
                              updatedItems[index].dueDate = e.target.value
                              setNewProject({...newProject, pendingItems: updatedItems})
                            }}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                              item.completed ? 'bg-gray-50 text-gray-500' : ''
                            }`}
                          />
                        </div>

                        {/* Assigned Person */}
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Assigned Person</label>
                          <input
                            type="text"
                            value={item.assignedPerson}
                            onChange={(e) => {
                              const updatedItems = [...newProject.pendingItems]
                              updatedItems[index].assignedPerson = e.target.value
                              setNewProject({...newProject, pendingItems: updatedItems})
                            }}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                              item.completed ? 'bg-gray-50 text-gray-500 line-through' : ''
                            }`}
                            placeholder="Enter assigned person"
                          />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const updatedItems = newProject.pendingItems.filter((_, itemIndex) => itemIndex !== index)
                            setNewProject({...newProject, pendingItems: updatedItems})
                          }}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Delete Item
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Item Button */}
              <button
                type="button"
                onClick={() => {
                  const newItem = {
                    id: `pending-${Date.now()}`,
                    itemName: '',
                    dueDate: '',
                    assignedPerson: '',
                    completed: false
                  }
                  setNewProject({...newProject, pendingItems: [...newProject.pendingItems, newItem]})
                }}
                className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>

              {/* Summary Stats */}
              {newProject.pendingItems.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{newProject.pendingItems.length}</p>
                      <p className="text-sm text-gray-600">Total Items</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {newProject.pendingItems.filter(item => item.completed).length}
                      </p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        {newProject.pendingItems.filter(item => !item.completed).length}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {newProject.pendingItems.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Pending Items</h4>
                  <p className="text-gray-600 mb-4">Add your first pending item to get started</p>
                  <button
                    type="button"
                    onClick={() => {
                      const newItem = {
                        id: `pending-${Date.now()}`,
                        itemName: '',
                        dueDate: '',
                        assignedPerson: '',
                        completed: false
                      }
                      setNewProject({...newProject, pendingItems: [...newProject.pendingItems, newItem]})
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add First Item
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Issue Tracker</h3>
            
            <div className="space-y-4">
              {/* Issues List */}
              {newProject.issues.map((issue, index) => (
                <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Issue Title */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Issue Title</label>
                        <input
                          type="text"
                          value={issue.title}
                          onChange={(e) => {
                            const updatedIssues = [...newProject.issues]
                            updatedIssues[index].title = e.target.value
                            setNewProject({...newProject, issues: updatedIssues})
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter issue title"
                        />
                      </div>

                      {/* Severity */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Severity</label>
                        <select
                          value={issue.severity}
                          onChange={(e) => {
                            const updatedIssues = [...newProject.issues]
                            updatedIssues[index].severity = e.target.value as Project['issues'][0]['severity']
                            setNewProject({...newProject, issues: updatedIssues})
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>

                      {/* Assigned To */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Assigned To</label>
                        <input
                          type="text"
                          value={issue.assignedTo}
                          onChange={(e) => {
                            const updatedIssues = [...newProject.issues]
                            updatedIssues[index].assignedTo = e.target.value
                            setNewProject({...newProject, issues: updatedIssues})
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Enter assignee"
                        />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-medium text-gray-600">Status:</label>
                        <select
                          value={issue.status}
                          onChange={(e) => {
                            const updatedIssues = [...newProject.issues]
                            updatedIssues[index].status = e.target.value as Project['issues'][0]['status']
                            setNewProject({...newProject, issues: updatedIssues})
                          }}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.status === 'open' ? 'bg-red-100 text-red-800' :
                          issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedIssues = newProject.issues.filter((_, issueIndex) => issueIndex !== index)
                          setNewProject({...newProject, issues: updatedIssues})
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Delete Issue
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Issue Button */}
              <button
                type="button"
                onClick={() => {
                  const newIssue = {
                    id: `issue-${Date.now()}`,
                    title: '',
                    severity: 'medium' as const,
                    assignedTo: '',
                    status: 'open' as const
                  }
                  setNewProject({...newProject, issues: [...newProject.issues, newIssue]})
                }}
                className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Issue
              </button>

              {/* Summary Stats */}
              {newProject.issues.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{newProject.issues.length}</p>
                      <p className="text-sm text-gray-600">Total Issues</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {newProject.issues.filter(issue => issue.status === 'open').length}
                      </p>
                      <p className="text-sm text-gray-600">Open</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {newProject.issues.filter(issue => issue.status === 'in-progress').length}
                      </p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {newProject.issues.filter(issue => issue.status === 'resolved' || issue.status === 'closed').length}
                      </p>
                      <p className="text-sm text-gray-600">Resolved/Closed</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {newProject.issues.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Issues</h4>
                  <p className="text-gray-600 mb-4">Track and manage project issues here</p>
                  <button
                    type="button"
                    onClick={() => {
                      const newIssue = {
                        id: `issue-${Date.now()}`,
                        title: '',
                        severity: 'medium' as const,
                        assignedTo: '',
                        status: 'open' as const
                      }
                      setNewProject({...newProject, issues: [...newProject.issues, newIssue]})
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add First Issue
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="space-y-6"
    >
      {/* Step Navigation */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  getStepStatus(step.id) === 'completed'
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : getStepStatus(step.id) === 'active'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {getStepStatus(step.id) === 'completed' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </span>
                )}
                {step.name}
              </button>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  getStepStatus(step.id) === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            {steps[currentStep - 1].name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <Button 
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="border-gray-300 text-gray-700"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep === totalSteps ? (
              <Button 
                onClick={handleSubmit}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Save Project
              </Button>
            ) : (
              <Button 
                onClick={nextStep}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </motion.div>
  )
}
