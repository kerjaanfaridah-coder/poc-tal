'use client';

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Plus, AlertTriangle, Clock, Trash2, Check } from 'lucide-react'

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
    itemType: 'decision' | 'action' | 'issue' | 'risk' | 'followup'
    dueDate: string
    assignedPerson: string
    priority: 'low' | 'medium' | 'high'
    completed: boolean
    status: 'open' | 'in-progress' | 'due-soon' | 'overdue' | 'completed'
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
  const [currentStep, setCurrentStep] = useState<number>(1)
  // Initialize with sample pending items data
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
    issues: initialData?.issues || []
  })

  const totalSteps: number = 5

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
    const requiredFields = [
      { field: 'name', label: 'Project Name' },
      { field: 'location', label: 'Location' },
      { field: 'pic', label: 'PIC Internal' },
      { field: 'picSite', label: 'PIC Site' },
      { field: 'picRole', label: 'PIC Site (Role)' },
      { field: 'dueDate', label: 'Due Date' }
    ];

    const missingFields = requiredFields.filter(({ field }) => {
      const value = newProject[field as keyof typeof newProject];
      return !value || (typeof value === 'string' && !value.trim());
    });

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(({ label }) => label).join(', ');
      alert(`The following fields are required: ${missingFieldNames}`);
      return;
    }
    
    onSubmit(newProject);
  }

  const getStepStatus = (step: number) => {
    const currentStepNum = Number(currentStep);
    if (step < currentStepNum) return 'completed';
    if (step === currentStepNum) return 'active';
    return 'pending';
  };

  const steps = [
    { id: 1, name: 'Project Information' },
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
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-6">
                {/* LEFT COLUMN */}
                
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Project Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newProject.location || ''}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Enter project location"
                    required
                  />
                </div>

                {/* PIC Internal */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Internal <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newProject.pic || ''}
                    onChange={(e) => setNewProject({...newProject, pic: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Internal person in charge"
                    required
                  />
                </div>

                {/* PIC Site */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Site <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newProject.picSite || ''}
                    onChange={(e) => setNewProject({...newProject, picSite: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Site PIC name"
                    required
                  />
                </div>

                {/* RIGHT COLUMN */}

                {/* PIC Site (Role) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Site (Role) <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newProject.picRole || ''}
                    onChange={(e) => setNewProject({...newProject, picRole: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Role or position"
                    required
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Due Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    value={newProject.dueDate || ''}
                    onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    required
                  />
                </div>

                {/* Notes - Full Width */}
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={4}
                    value={newProject.notes || ''}
                    onChange={(e) => setNewProject({...newProject, notes: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 resize-none"
                    placeholder="Additional project notes..."
                  />
                </div>
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
            <div className="mt-6">
              {/* Placeholder for Phase Progress */}
              <div className="border border-gray-300 rounded-lg p-8 text-center">
                <div className="text-gray-500">
                  <p className="text-lg mb-2">Phase Progress Configuration</p>
                  <p className="text-sm">This section will be redesigned</p>
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
            {/* Modern Budget Header */}
            <div className="mb-8">
              <div className="mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">💰 Budget</h2>
                  <p className="text-gray-600">Manage and track your project budget allocation</p>
                </div>
              </div>

              {/* Calculate budget values */}
              {(() => {
                const totalBudget = newProject.budget || 0;
                const amountSpent = (newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0);
                const remaining = totalBudget - amountSpent;
                const amountSpentPercentage = totalBudget > 0 ? Math.round((amountSpent / totalBudget) * 100) : 0;
                const remainingPercentage = totalBudget > 0 ? Math.round((remaining / totalBudget) * 100) : 0;

                return (
                  <>
                    {/* Stats Cards - Following Projects Page Design */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl">💰</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">100%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-600 font-semibold">Budget Planned</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500">Total allocation</p>
                              <p className="text-sm font-bold text-blue-600">IDR {totalBudget.toLocaleString('id-ID')}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl">💸</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{amountSpentPercentage}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-600 font-semibold">Amount Spent</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500">vs budget</p>
                              <p className="text-sm font-bold text-red-600">IDR {amountSpent.toLocaleString('id-ID')}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                        <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl">💵</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900">{remainingPercentage}%</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-600 font-semibold">Remaining</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500">vs budget</p>
                              <p className="text-sm font-bold text-green-600">IDR {remaining.toLocaleString('id-ID')}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Add Budget Section - Following Projects Page Search/Actions Style */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-6 mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Set Total Budget</h3>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-700 mb-2">Total Project Budget (IDR)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">IDR</span>
                            <input
                              type="number"
                              value={newProject.budget}
                              onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                              className="w-full pl-16 pr-4 py-3 text-xl font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget Breakdown Table - Clean Data List */}
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center">
                            <span className="text-lg">💸</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">Budget Breakdown</h3>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        {/* Outsource */}
                        <div className="group">
                          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A9.001 9.001 0 0112 21a9.001 9.001 0 01-9-9.255A9.001 9.001 0 0112 3c4.474 0 8.268 3.12 9.255 7.255z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">Outsource</div>
                                <div className="text-sm text-slate-500">External services & contractors</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">IDR</span>
                              <input
                                type="number"
                                value={newProject.outsource || 0}
                                onChange={(e) => setNewProject({...newProject, outsource: parseInt(e.target.value) || 0})}
                                className="w-32 text-right font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cost Other */}
                        <div className="group">
                          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">Cost Other</div>
                                <div className="text-sm text-slate-500">Miscellaneous expenses</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">IDR</span>
                              <input
                                type="number"
                                value={newProject.costOther || 0}
                                onChange={(e) => setNewProject({...newProject, costOther: parseInt(e.target.value) || 0})}
                                className="w-32 text-right font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cost Overtime */}
                        <div className="group">
                          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">Cost Overtime</div>
                                <div className="text-sm text-slate-500">Extra hours & overtime pay</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">IDR</span>
                              <input
                                type="number"
                                value={newProject.costOvertime || 0}
                                onChange={(e) => setNewProject({...newProject, costOvertime: parseInt(e.target.value) || 0})}
                                className="w-32 text-right font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Cost Man Power */}
                        <div className="group">
                          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">Cost Man Power</div>
                                <div className="text-sm text-slate-500">Team salaries & wages</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-slate-500">IDR</span>
                              <input
                                type="number"
                                value={newProject.costManPower || 0}
                                onChange={(e) => setNewProject({...newProject, costManPower: parseInt(e.target.value) || 0})}
                                className="w-32 text-right font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                placeholder="0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
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
            {/* Modern Pending Items Header */}
              <div className="mb-8">
                <div className="mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📋 Pending Items</h2>
                    <p className="text-gray-600">Track decisions, actions, and tasks for your project</p>
                  </div>
                </div>

                {/* Stats Cards - Following Projects Page Design */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">📊</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">{newProject.pendingItems?.length || 0}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600 font-semibold">Total Items</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">vs last week</p>
                          <p className="text-sm font-bold text-green-600">+12%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">⏰</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">
                          {(() => {
                            const today = new Date();
                            const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                            return newProject.pendingItems?.filter(item => {
                              if (!item.dueDate || item.completed) return false;
                              const dueDate = new Date(item.dueDate);
                              return dueDate <= threeDaysFromNow && dueDate >= today;
                            }).length || 0;
                          })()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600 font-semibold">Due Soon</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">vs last week</p>
                          <p className="text-sm font-bold text-orange-600">+5%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">🚨</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">
                          {(() => {
                            const today = new Date();
                            return newProject.pendingItems?.filter(item => {
                              if (!item.dueDate || item.completed) return false;
                              const dueDate = new Date(item.dueDate);
                              return dueDate < today;
                            }).length || 0;
                          })()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600 font-semibold">Overdue</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">vs last week</p>
                          <p className="text-sm font-bold text-red-600">+2%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                    <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-2xl">✅</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">
                          {newProject.pendingItems?.filter(item => item.completed).length || 0}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-600 font-semibold">Completed</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">vs last week</p>
                          <p className="text-sm font-bold text-green-600">+8%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add New Item Section - Clearly Separated Form Card */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-6 mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Add New Item</h3>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                      {/* Type Field */}
                      <div className="flex-1 min-w-[120px]">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Type</label>
                        <select
                          id="quick-add-type-modern-form"
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          defaultValue="decision"
                        >
                          <option value="decision">🤔 Decision</option>
                          <option value="action">⚡ Action</option>
                          <option value="issue">🚨 Issue</option>
                          <option value="risk">⚠️ Risk</option>
                          <option value="followup">📝 Follow Up</option>
                        </select>
                      </div>

                      {/* Description Field */}
                      <div className="flex-2 min-w-[200px]">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Description</label>
                        <input
                          type="text"
                          placeholder="Enter description..."
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          id="quick-add-description-modern-form"
                        />
                      </div>

                      {/* Assignee Field */}
                      <div className="flex-1 min-w-[120px]">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Assignee</label>
                        <input
                          type="text"
                          placeholder="Enter assignee..."
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          id="quick-add-assignee-modern-form"
                        />
                      </div>

                      {/* Priority Field */}
                      <div className="flex-1 min-w-[100px]">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Priority</label>
                        <select
                          id="quick-add-priority-modern-form"
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          defaultValue="medium"
                        >
                          <option value="low">🟢 Low</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="high">🔴 High</option>
                        </select>
                      </div>

                      {/* Due Date Field */}
                      <div className="flex-1 min-w-[120px]">
                        <label className="block text-xs font-bold text-slate-700 mb-2">Due Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          id="quick-add-date-modern-form"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const type = (document.getElementById('quick-add-type-modern-form') as HTMLSelectElement)?.value || 'decision';
                        const description = (document.getElementById('quick-add-description-modern-form') as HTMLInputElement)?.value || 'New Item';
                        const assignee = (document.getElementById('quick-add-assignee-modern-form') as HTMLInputElement)?.value || '';
                        const priority = (document.getElementById('quick-add-priority-modern-form') as HTMLSelectElement)?.value || 'medium';
                        const dueDate = (document.getElementById('quick-add-date-modern-form') as HTMLInputElement)?.value || '';
                        
                        const newItem = {
                          id: `pending-${Date.now()}`,
                          itemName: description,
                          itemType: type as 'decision' | 'action' | 'issue' | 'risk' | 'followup',
                          assignedPerson: assignee,
                          priority: priority as 'low' | 'medium' | 'high',
                          dueDate: dueDate,
                          completed: false,
                          status: 'open' as 'open' | 'in-progress' | 'due-soon' | 'overdue' | 'completed'
                        };
                        
                        setNewProject({
                          ...newProject,
                          pendingItems: [...(newProject.pendingItems || []), newItem]
                        });
                        
                        // Clear form
                        (document.getElementById('quick-add-description-modern-form') as HTMLInputElement).value = '';
                        (document.getElementById('quick-add-assignee-modern-form') as HTMLInputElement).value = '';
                        (document.getElementById('quick-add-date-modern-form') as HTMLInputElement).value = '';
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Item
                    </button>
                  </div>
                </div>

              {/* All Pending Items Table - Clean Data List */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">All Pending Items</h3>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '120px' }}>Type</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ minWidth: '200px' }}>Description</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '180px' }}>Assignee</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '120px' }}>Priority</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '140px' }}>Due</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '140px' }}>Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {newProject.pendingItems?.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <span className="text-2xl">📋</span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">No items yet</h3>
                            <p className="text-slate-600">Add your first item to get started</p>
                          </td>
                        </tr>
                      ) : (
                        newProject.pendingItems?.map((item, index) => {
                          const today = new Date();
                          const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                          const dueDate = item.dueDate ? new Date(item.dueDate) : null;
                          const isOverdue = dueDate && dueDate < today && !item.completed;
                          const isDueSoon = dueDate && dueDate <= threeDaysFromNow && dueDate >= today && !item.completed;
                          
                          // Auto status calculation
                          let status = 'Open';
                          let statusColor = 'bg-gray-100 text-gray-800 border-gray-200';
                          if (item.completed) {
                            status = 'Completed';
                            statusColor = 'bg-green-100 text-green-800 border-green-200';
                          } else if (isOverdue) {
                            status = 'Overdue';
                            statusColor = 'bg-red-100 text-red-800 border-red-200';
                          } else if (isDueSoon) {
                            status = 'Due Soon';
                            statusColor = 'bg-orange-100 text-orange-800 border-orange-200';
                          } else if (item.status === 'in-progress') {
                            status = 'In Progress';
                            statusColor = 'bg-blue-100 text-blue-800 border-blue-200';
                          }
                          
                          const itemType = item.itemType || 'decision';
                          const typeConfig = {
                            decision: { icon: '🤔', color: 'bg-blue-100 text-blue-800 border-blue-200' },
                            action: { icon: '⚡', color: 'bg-orange-100 text-orange-800 border-orange-200' },
                            issue: { icon: '🚨', color: 'bg-red-100 text-red-800 border-red-200' },
                            risk: { icon: '⚠️', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                            followup: { icon: '📝', color: 'bg-purple-100 text-purple-800 border-purple-200' }
                          };
                          
                          const priorityConfig = {
                            low: { icon: '🟢', color: 'bg-green-100 text-green-800 border-green-200' },
                            medium: { icon: '🟡', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                            high: { icon: '🔴', color: 'bg-red-100 text-red-800 border-red-200' }
                          };
                          
                          const config = typeConfig[itemType] || typeConfig.decision;
                          const priorityConfigItem = priorityConfig[item.priority] || priorityConfig.medium;
                          
                          return (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4" style={{ width: '120px' }}>
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                                  <span>{config.icon}</span>
                                  {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4" style={{ minWidth: '200px' }}>
                                <div>
                                  <input
                                    type="text"
                                    value={item.itemName}
                                    onChange={(e) => {
                                      const updatedItems = [...newProject.pendingItems];
                                      updatedItems[index].itemName = e.target.value;
                                      setNewProject({...newProject, pendingItems: updatedItems});
                                    }}
                                    className={`font-medium text-slate-900 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 w-full ${
                                      item.completed ? 'line-through opacity-60' : ''
                                    }`}
                                    placeholder="Description..."
                                  />
                                </div>
                              </td>
                              <td className="px-6 py-4" style={{ width: '180px' }}>
                                <input
                                  type="text"
                                  value={item.assignedPerson}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].assignedPerson = e.target.value;
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className="text-sm text-slate-900 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 w-full"
                                  placeholder="Assignee..."
                                />
                              </td>
                              <td className="px-6 py-4" style={{ width: '120px' }}>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${priorityConfigItem.color}`}>
                                  <span>{priorityConfigItem.icon}</span>
                                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4" style={{ width: '140px' }}>
                                <input
                                  type="date"
                                  value={item.dueDate}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].dueDate = e.target.value;
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className="text-sm text-slate-600 bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 w-full"
                                />
                              </td>
                              <td className="px-6 py-4" style={{ width: '140px' }}>
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
                                  {status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center" style={{ width: '120px' }}>
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedItems = [...newProject.pendingItems];
                                      updatedItems[index].completed = !updatedItems[index].completed;
                                      setNewProject({...newProject, pendingItems: updatedItems});
                                    }}
                                    className={`p-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                      item.completed 
                                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                                    }`}
                                  >
                                    {item.completed ? '↩️' : '✅'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedItems = newProject.pendingItems.filter((_, itemIndex) => itemIndex !== index);
                                      setNewProject({...newProject, pendingItems: updatedItems});
                                    }}
                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-xs font-semibold transition-all duration-200"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
            {/* Modern Issue Header */}
            <div className="mb-8">
              <div className="mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🚨 Issue</h2>
                  <p className="text-gray-600">Track and manage project issues and bugs</p>
                </div>
              </div>

              {/* Stats Cards - Following Projects Page Design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">📋</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{newProject.issues?.length || 0}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-600 font-semibold">Total Issues</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">all issues</p>
                        <p className="text-sm font-bold text-blue-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🔴</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">
                        {newProject.issues?.filter(issue => issue.status === 'open').length || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-600 font-semibold">Open</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">need attention</p>
                        <p className="text-sm font-bold text-red-600">Urgent</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🔵</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">
                        {newProject.issues?.filter(issue => issue.status === 'in-progress').length || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-600 font-semibold">In Progress</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">being worked</p>
                        <p className="text-sm font-bold text-blue-600">Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-2xl">🟢</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">
                        {newProject.issues?.filter(issue => issue.status === 'resolved' || issue.status === 'closed').length || 0}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-600 font-semibold">Resolved</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-slate-500">completed</p>
                        <p className="text-sm font-bold text-green-600">Done</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Issue Section - Following Projects Page Search/Actions Style */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200 p-6 mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Add New Issue</h3>
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Issue Title</label>
                    <input
                      type="text"
                      placeholder="Enter issue title..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      id="quick-add-issue-title"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Severity</label>
                    <select
                      id="quick-add-issue-severity"
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      defaultValue="medium"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="flex-1 lg:w-48">
                    <label className="block text-xs font-bold text-slate-700 mb-2">Assignee</label>
                    <input
                      type="text"
                      placeholder="Assignee name..."
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      id="quick-add-issue-assignee"
                    />
                  </div>
                  <div className="lg:w-24">
                    <button
                      type="button"
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
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add Issue
                    </button>
                  </div>
                </div>
              </div>

              {/* Issue Table - Clean Data List */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center">
                      <span className="text-lg">🚨</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">All Issues</h3>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ minWidth: '200px' }}>Title</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '120px' }}>Severity</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '180px' }}>Assignee</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '140px' }}>Status</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider" style={{ width: '120px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {newProject.issues.length > 0 ? (
                        newProject.issues.map((issue, index) => {
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
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-slate-900">
                                  {issue.title || 'Untitled Issue'}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${severityColor}`}>
                                  <span>{severityIcon}</span>
                                  {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-slate-900">
                                  {issue.assignedTo || 'Unassigned'}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <select
                                  value={issue.status}
                                  onChange={(e) => {
                                    const updatedIssues = [...newProject.issues]
                                    updatedIssues[index].status = e.target.value as Project['issues'][0]['status']
                                    setNewProject({...newProject, issues: updatedIssues})
                                  }}
                                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${statusColor}`}
                                >
                                  <option value="open" className="bg-red-100 text-red-800">🔴 Open</option>
                                  <option value="in-progress" className="bg-blue-100 text-blue-800">🔵 In Progress</option>
                                  <option value="resolved" className="bg-green-100 text-green-800">🟢 Resolved</option>
                                  <option value="closed" className="bg-gray-100 text-gray-800">⚪ Closed</option>
                                </select>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedIssues = newProject.issues.filter((_, issueIndex) => issueIndex !== index)
                                      setNewProject({...newProject, issues: updatedIssues})
                                    }}
                                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-xs font-semibold transition-all duration-200"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl">🚨</span>
                              </div>
                              <div>
                                <p className="text-lg font-semibold text-slate-900 mb-1">No issues yet</p>
                                <p className="text-sm text-slate-500">Add your first issue to get started</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
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
      <div className="flex items-center justify-between py-4 px-6 bg-transparent">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {/* Number Circle */}
              <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                getStepStatus(step.id) === 'active'
                  ? 'bg-white text-red-500 ring-2 ring-red-200'
                  : getStepStatus(step.id) === 'completed'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {getStepStatus(step.id) === 'completed' ? (
                  <Check className="w-3 h-3" />
                ) : (
                  step.id
                )}
              </div>
              
              {/* Step Label */}
              <span className={`text-sm font-medium tracking-tight rounded-full px-4 py-2 ${
                getStepStatus(step.id) === 'active'
                  ? 'bg-red-500 text-white shadow-sm ring-2 ring-red-200'
                  : getStepStatus(step.id) === 'completed'
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {step.name}
              </span>
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] ${
                getStepStatus(step.id) === 'completed' ? 'bg-red-300' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {Number(currentStep) === 4 ? (
          // Pending Items step - no card title to avoid duplicate
          <>
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <Button 
                onClick={prevStep}
                disabled={Number(currentStep) === 1}
                variant="outline"
                className="border-gray-300 text-gray-700"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {Number(currentStep) === Number(totalSteps) ? (
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
          </>
        ) : (
          // Other steps - show card title (except Budget and Issue steps)
          <>
            {currentStep !== 3 && currentStep !== 5 && (
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {steps[currentStep - 1].name}
                </CardTitle>
              </CardHeader>
            )}
            
            <CardContent className="space-y-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <Button 
                  onClick={prevStep}
                  disabled={Number(currentStep) === 1}
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {Number(currentStep) === Number(totalSteps) ? (
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
          </>
        )}
      </div>
    </motion.div>
  )
}
