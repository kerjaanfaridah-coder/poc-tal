'use client';

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Plus, AlertTriangle, Clock, Trash2, Check, CheckCircle2, Circle, ArrowRight, FolderKanban, Target, Users, DollarSign, Calendar, Settings, BarChart3, Search, Filter, MoreHorizontal } from 'lucide-react'

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
  picSite: string
  dueDate: string
  notes: string
  budget: number
  outsource: number
  costOther: number
  costOvertime: number
  costManPower: number
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
  budgetItems: Array<{
    id: string
    name: string
    budget: number
    actual: number
    category: string
  }>
}

interface ModernProjectFormProps {
  onSubmit: (project: Omit<Project, 'id'>) => void
  onCancel: () => void
  initialData?: Project
}

const steps = [
  { id: 1, name: 'Project Information', icon: FolderKanban },
  { id: 2, name: 'Phase Progress', icon: BarChart3 },
  { id: 3, name: 'Budget', icon: DollarSign },
  { id: 4, name: 'Pending Items', icon: Target },
  { id: 5, name: 'Issue Tracker', icon: AlertTriangle },
]

export default function ModernProjectForm({ onSubmit, onCancel, initialData }: ModernProjectFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(1)
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
    picSite: initialData?.picSite || '',
    dueDate: initialData?.dueDate || '',
    notes: initialData?.notes || '',
    budget: initialData?.budget || 0,
    outsource: initialData?.outsource || 0,
    costOther: initialData?.costOther || 0,
    costOvertime: initialData?.costOvertime || 0,
    costManPower: initialData?.costManPower || 0,
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
    issues: initialData?.issues || [],
    budgetItems: initialData?.budgetItems || []
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(newProject)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newProject)
  }

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed'
    if (step === currentStep) return 'active'
    return 'pending'
  }

  const addPendingItem = () => {
    const newItem = {
      id: `pending-${Date.now()}`,
      itemName: '',
      dueDate: '',
      assignedPerson: '',
      completed: false
    }
    setNewProject({...newProject, pendingItems: [...newProject.pendingItems, newItem]})
  }

  const addIssue = () => {
    const newIssue = {
      id: `issue-${Date.now()}`,
      title: '',
      severity: 'medium' as const,
      assignedTo: '',
      status: 'open' as const
    }
    setNewProject({...newProject, issues: [...newProject.issues, newIssue]})
  }

  const renderStepContent = () => {
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
            {/* Project Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Project Information</h3>
                  <p className="text-sm text-slate-600">Basic details and project overview</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Project Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={newProject.status}
                    onChange={(e) => setNewProject({...newProject, status: e.target.value as Project['status']})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="in-progress">In Progress</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={newProject.priority}
                    onChange={(e) => setNewProject({...newProject, priority: e.target.value as Project['priority']})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Project location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    required
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deadline <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    required
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({...newProject, deadline: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Description <span className="text-red-500">*</span></label>
                <textarea
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Project description"
                />
              </div>
            </div>

            {/* Team Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Team Information</h3>
                  <p className="text-sm text-slate-600">Project team and roles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Project Manager</label>
                  <input
                    type="text"
                    value={newProject.pm}
                    onChange={(e) => setNewProject({...newProject, pm: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Project manager name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Person in Charge</label>
                  <input
                    type="text"
                    value={newProject.pic}
                    onChange={(e) => setNewProject({...newProject, pic: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Person in charge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">PIC Role</label>
                  <input
                    type="text"
                    value={newProject.picRole}
                    onChange={(e) => setNewProject({...newProject, picRole: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Role of person in charge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">PIC Site</label>
                  <input
                    type="text"
                    value={newProject.picSite}
                    onChange={(e) => setNewProject({...newProject, picSite: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Site location"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                <textarea
                  value={newProject.notes}
                  onChange={(e) => setNewProject({...newProject, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows={3}
                  placeholder="Additional notes"
                />
              </div>
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
            {/* Phase Progress Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Phase Progress</h3>
                  <p className="text-sm text-slate-600">Track project phases and milestones</p>
                </div>
              </div>

              <div className="space-y-4">
                {newProject.phases.map((phase, index) => (
                  <div key={phase.id} className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => {
                          const updatedPhases = [...newProject.phases]
                          updatedPhases[index].name = e.target.value
                          setNewProject({...newProject, phases: updatedPhases})
                        }}
                        className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => {
                          const updatedPhases = newProject.phases.filter((_, i) => i !== index)
                          setNewProject({...newProject, phases: updatedPhases})
                        }}
                        className="ml-3 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Owner</label>
                        <input
                          type="text"
                          value={phase.owner}
                          onChange={(e) => {
                            const updatedPhases = [...newProject.phases]
                            updatedPhases[index].owner = e.target.value
                            setNewProject({...newProject, phases: updatedPhases})
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Phase owner"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Progress</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={phase.progress}
                            onChange={(e) => {
                              const updatedPhases = [...newProject.phases]
                              updatedPhases[index].progress = parseInt(e.target.value)
                              setNewProject({...newProject, phases: updatedPhases})
                            }}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium text-slate-700 w-12 text-right">{phase.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                        <select
                          value={phase.status}
                          onChange={(e) => {
                            const updatedPhases = [...newProject.phases]
                            updatedPhases[index].status = e.target.value as Project['phases'][0]['status']
                            setNewProject({...newProject, phases: updatedPhases})
                          }}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="not-started">Not Started</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    const newPhase = {
                      id: `phase-${Date.now()}`,
                      name: 'New Phase',
                      owner: '',
                      progress: 0,
                      status: 'not-started' as const
                    }
                    setNewProject({...newProject, phases: [...newProject.phases, newPhase]})
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
                >
                  <Plus className="w-4 h-4" />
                  Add Phase
                </button>
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
            {/* Budget Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Budget Management</h3>
                  <p className="text-sm text-slate-600">Track project costs and financial planning</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Total Budget</label>
                  <input
                    type="number"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({...newProject, budget: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Outsource Costs</label>
                  <input
                    type="number"
                    value={newProject.outsource}
                    onChange={(e) => setNewProject({...newProject, outsource: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Other Costs</label>
                  <input
                    type="number"
                    value={newProject.costOther}
                    onChange={(e) => setNewProject({...newProject, costOther: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Overtime Costs</label>
                  <input
                    type="number"
                    value={newProject.costOvertime}
                    onChange={(e) => setNewProject({...newProject, costOvertime: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Manpower Costs</label>
                  <input
                    type="number"
                    value={newProject.costManPower}
                    onChange={(e) => setNewProject({...newProject, costManPower: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Budget Summary */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Total Estimated Cost</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${(newProject.budget + newProject.outsource + newProject.costOther + newProject.costOvertime + newProject.costManPower).toLocaleString()}
                  </span>
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
            {/* Pending Items Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Pending Items</h3>
                  <p className="text-sm text-slate-600">Track tasks and deliverables</p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Total:</span>
                    <span className="text-xl font-bold text-slate-900">{newProject.pendingItems.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🔵</span>
                    <span className="text-slate-600 font-medium">Pending:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {newProject.pendingItems.filter(item => !item.completed).length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🟢</span>
                    <span className="text-slate-600 font-medium">Completed:</span>
                    <span className="text-lg font-bold text-green-600">
                      {newProject.pendingItems.filter(item => item.completed).length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Add */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Add Item</span>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Item name..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="quick-add-item"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="quick-add-due"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Assignee..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      id="quick-add-assignee"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => {
                        const name = (document.getElementById('quick-add-item') as HTMLInputElement)?.value || 'New Item';
                        const dueDate = (document.getElementById('quick-add-due') as HTMLInputElement)?.value || '';
                        const assignee = (document.getElementById('quick-add-assignee') as HTMLInputElement)?.value || '';
                        
                        const newItem = {
                          id: `pending-${Date.now()}`,
                          itemName: name,
                          dueDate: dueDate,
                          assignedPerson: assignee,
                          completed: false
                        };
                        
                        setNewProject({...newProject, pendingItems: [...newProject.pendingItems, newItem]});
                        
                        // Clear form
                        (document.getElementById('quick-add-item') as HTMLInputElement).value = '';
                        (document.getElementById('quick-add-due') as HTMLInputElement).value = '';
                        (document.getElementById('quick-add-assignee') as HTMLInputElement).value = '';
                      }}
                      className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              {newProject.pendingItems.length > 0 && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Due Date</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Assignee</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {newProject.pendingItems.map((item, index) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                              {item.itemName || 'Untitled Item'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                              {item.dueDate || 'No due date'}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                              {item.assignedPerson || 'Unassigned'}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
                              item.completed 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-blue-100 text-blue-800 border-blue-200'
                            }`}>
                              {item.completed ? '🟢 Completed' : '🔵 Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                const updatedItems = newProject.pendingItems.filter((_, itemIndex) => itemIndex !== index)
                                setNewProject({...newProject, pendingItems: updatedItems})
                              }}
                              className="text-red-500 hover:text-red-600 text-lg"
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
            {/* Issue Tracker Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Issue Tracker</h3>
                  <p className="text-sm text-slate-600">Track and resolve project issues</p>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 font-medium">Total:</span>
                    <span className="text-xl font-bold text-slate-900">{newProject.issues.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">🔴</span>
                    <span className="text-slate-600 font-medium">Open:</span>
                    <span className="text-lg font-bold text-red-600">
                      {newProject.issues.filter(issue => issue.status === 'open').length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🔵</span>
                    <span className="text-slate-600 font-medium">In Progress:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {newProject.issues.filter(issue => issue.status === 'in-progress').length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🟢</span>
                    <span className="text-slate-600 font-medium">Resolved:</span>
                    <span className="text-lg font-bold text-green-600">
                      {newProject.issues.filter(issue => issue.status === 'resolved' || issue.status === 'closed').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Add */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">Add Issue</span>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Issue title..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      id="quick-add-issue-title"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      id="quick-add-issue-severity"
                      defaultValue="medium"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      placeholder="Assignee..."
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      id="quick-add-issue-assignee"
                    />
                  </div>
                  <div className="col-span-1">
                    <button
                      onClick={() => {
                        const title = (document.getElementById('quick-add-issue-title') as HTMLInputElement)?.value || 'New Issue';
                        const severity = (document.getElementById('quick-add-issue-severity') as HTMLSelectElement)?.value || 'medium';
                        const assignedTo = (document.getElementById('quick-add-issue-assignee') as HTMLInputElement)?.value || '';
                        
                        const newIssue = {
                          id: `issue-${Date.now()}`,
                          title: title,
                          severity: severity as Project['issues'][0]['severity'],
                          assignedTo: assignedTo,
                          status: 'open' as const
                        };
                        
                        setNewProject({...newProject, issues: [...newProject.issues, newIssue]});
                        
                        // Clear form
                        (document.getElementById('quick-add-issue-title') as HTMLInputElement).value = '';
                        (document.getElementById('quick-add-issue-assignee') as HTMLInputElement).value = '';
                      }}
                      className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Issues Table */}
              {newProject.issues.length > 0 && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Severity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Assignee</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {newProject.issues.map((issue, index) => {
                        const severityColor = issue.severity === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                                           issue.severity === 'medium' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                                           'bg-gray-100 text-gray-800 border-gray-200';
                        const severityIcon = issue.severity === 'high' ? '🔴' :
                                           issue.severity === 'medium' ? '🟠' : '⚪';
                        
                        const statusColor = issue.status === 'open' ? 'bg-red-100 text-red-800 border-red-200' :
                                          issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                          issue.status === 'resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                                          'bg-gray-100 text-gray-800 border-gray-200';
                        const statusIcon = issue.status === 'open' ? '🔴' :
                                          issue.status === 'in-progress' ? '🔵' : '🟢';
                        
                        return (
                          <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                                {issue.title || 'Untitled Issue'}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${severityColor}`}>
                                <span>{severityIcon}</span>
                                {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                                {issue.assignedTo || 'Unassigned'}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <select
                                value={issue.status}
                                onChange={(e) => {
                                  const updatedIssues = [...newProject.issues]
                                  updatedIssues[index].status = e.target.value as Project['issues'][0]['status']
                                  setNewProject({...newProject, issues: updatedIssues})
                                }}
                                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusColor}`}
                              >
                                <option value="open">🔴 Open</option>
                                <option value="in-progress">🔵 In Progress</option>
                                <option value="resolved">🟢 Resolved</option>
                                <option value="closed">⚪ Closed</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => {
                                  const updatedIssues = newProject.issues.filter((_, issueIndex) => issueIndex !== index)
                                  setNewProject({...newProject, issues: updatedIssues})
                                }}
                                className="text-red-500 hover:text-red-600 text-lg"
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FolderKanban className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Create New Project</h1>
            </div>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const status = getStepStatus(step.id)
              const Icon = step.icon
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : status === 'active' 
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                          : 'bg-slate-100 text-slate-400'
                    }`}>
                      {status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        status === 'completed' 
                          ? 'text-green-600' 
                          : status === 'active' 
                            ? 'text-blue-600' 
                            : 'text-slate-400'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      status === 'completed' ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              currentStep === 1
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Previous
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </span>
            <button
              onClick={currentStep === steps.length ? handleSubmit : handleNext}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              {currentStep === steps.length ? 'Create Project' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
