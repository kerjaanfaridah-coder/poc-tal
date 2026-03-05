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
            <div className="mt-6">
              {/* Modern Budget Header */}
              <div className="mb-8">
                {/* Modern Total Budget Input */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💰 Total Project Budget (IDR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">IDR</span>
                    <input
                      type="number"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                      className="w-full pl-16 pr-4 py-4 text-2xl font-bold bg-white border-2 border-red-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-400 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Modern Budget Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Budget Planned Card */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/80">Total</div>
                      <div className="text-2xl font-bold">100%</div>
                    </div>
                  </div>
                  <div className="text-sm text-white/90 mb-1">Budget Planned</div>
                  <div className="text-3xl font-bold">
                    IDR {newProject.budget.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Spent Card */}
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/80">Used</div>
                      <div className="text-2xl font-bold">
                        {newProject.budget > 0 ? Math.round((((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)) / newProject.budget) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/90 mb-1">Amount Spent</div>
                  <div className="text-3xl font-bold">
                    IDR {((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)).toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Remaining Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/80">Left</div>
                      <div className="text-2xl font-bold">
                        {newProject.budget > 0 ? Math.round(((newProject.budget - ((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0))) / newProject.budget) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-white/90 mb-1">Remaining</div>
                  <div className="text-3xl font-bold">
                    IDR {(newProject.budget - ((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0))).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              {/* Modern Progress Bar */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Budget Usage</h3>
                  <span className="text-sm font-medium text-gray-600">
                    {newProject.budget > 0 ? Math.round((((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)) / newProject.budget) * 100) : 0}% Used
                  </span>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: newProject.budget > 0 ? 
                          Math.min((((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)) / newProject.budget) * 100, 100) + '%' 
                        : '0%'
                      }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-4 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Modern Budget Breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">💸 Budget Breakdown</h3>
                </div>
                <div className="p-6 space-y-4">
                  {/* Outsource */}
                  <div className="group">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A9.001 9.001 0 0112 21a9.001 9.001 0 01-9-9.255A9.001 9.001 0 0112 3c4.474 0 8.268 3.12 9.255 7.255z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Outsource</div>
                          <div className="text-sm text-gray-500">External services & contractors</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">IDR</span>
                        <input
                          type="number"
                          value={newProject.outsource || 0}
                          onChange={(e) => setNewProject({...newProject, outsource: parseInt(e.target.value) || 0})}
                          className="w-32 text-right font-semibold bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cost Other */}
                  <div className="group">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Cost Other</div>
                          <div className="text-sm text-gray-500">Miscellaneous expenses</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">IDR</span>
                        <input
                          type="number"
                          value={newProject.costOther || 0}
                          onChange={(e) => setNewProject({...newProject, costOther: parseInt(e.target.value) || 0})}
                          className="w-32 text-right font-semibold bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cost Overtime */}
                  <div className="group">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Cost Overtime</div>
                          <div className="text-sm text-gray-500">Extra hours & overtime pay</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">IDR</span>
                        <input
                          type="number"
                          value={newProject.costOvertime || 0}
                          onChange={(e) => setNewProject({...newProject, costOvertime: parseInt(e.target.value) || 0})}
                          className="w-32 text-right font-semibold bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cost Man Power */}
                  <div className="group">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Cost Man Power</div>
                          <div className="text-sm text-gray-500">Team salaries & wages</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">IDR</span>
                        <input
                          type="number"
                          value={newProject.costManPower || 0}
                          onChange={(e) => setNewProject({...newProject, costManPower: parseInt(e.target.value) || 0})}
                          className="w-32 text-right font-semibold bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                          placeholder="0"
                        />
                      </div>
                    </div>
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
            {/* Modern Pending Items Header */}
              <div className="mb-8">
                <div className="mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📋 Pending Items</h2>
                    <p className="text-gray-600">Track decisions, actions, and tasks for your project</p>
                  </div>
                </div>

                {/* Modern Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-600 font-medium">Total Items</div>
                        <div className="text-2xl font-bold text-blue-900">{newProject.pendingItems?.length || 0}</div>
                      </div>
                      <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-orange-600 font-medium">Due Soon</div>
                        <div className="text-2xl font-bold text-orange-900">
                          {(() => {
                            const today = new Date();
                            const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                            return newProject.pendingItems?.filter(item => {
                              if (!item.dueDate || item.completed) return false;
                              const dueDate = new Date(item.dueDate);
                              return dueDate <= threeDaysFromNow && dueDate >= today;
                            }).length || 0;
                          })()}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">⏰</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-red-600 font-medium">Overdue</div>
                        <div className="text-2xl font-bold text-red-900">
                          {(() => {
                            const today = new Date();
                            return newProject.pendingItems?.filter(item => {
                              if (!item.dueDate || item.completed) return false;
                              const dueDate = new Date(item.dueDate);
                              return dueDate < today;
                            }).length || 0;
                          })()}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🚨</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-green-600 font-medium">Completed</div>
                        <div className="text-2xl font-bold text-green-900">
                          {newProject.pendingItems?.filter(item => item.completed).length || 0}
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">✅</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modern Quick Add Section */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Item</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <select
                      id="quick-add-type-modern-form"
                      className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 font-medium"
                      defaultValue="decision"
                    >
                      <option value="decision">🤔 Decision</option>
                      <option value="action">⚡ Action</option>
                      <option value="issue">� Issue</option>
                      <option value="risk">⚠️ Risk</option>
                      <option value="followup">📝 Follow Up</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Description..."
                      className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 font-medium"
                      id="quick-add-description-modern-form"
                    />
                    <input
                      type="text"
                      placeholder="Assignee..."
                      className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 font-medium"
                      id="quick-add-assignee-modern-form"
                    />
                    <select
                      id="quick-add-priority-modern-form"
                      className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 font-medium"
                      defaultValue="medium"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                    <input
                      type="date"
                      className="px-4 py-3 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 font-medium"
                      id="quick-add-date-modern-form"
                    />
                  </div>
                  <div className="mt-4">
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
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Add Item
                    </button>
                  </div>
                </div>

              {/* Modern Items Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">📝 All Items</h3>
                </div>
                
                {newProject.pendingItems?.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No items yet</h3>
                    <p className="text-gray-600">Add your first item to get started</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {newProject.pendingItems?.map((item, index) => {
                          const today = new Date();
                          const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
                          const dueDate = item.dueDate ? new Date(item.dueDate) : null;
                          const isOverdue = dueDate && dueDate < today && !item.completed;
                          const isDueSoon = dueDate && dueDate <= threeDaysFromNow && dueDate >= today && !item.completed;
                          
                          // Auto status calculation
                          let status = 'Open';
                          let statusColor = 'bg-gray-100 text-gray-800';
                          if (item.completed) {
                            status = 'Completed';
                            statusColor = 'bg-green-100 text-green-800';
                          } else if (isOverdue) {
                            status = 'Overdue';
                            statusColor = 'bg-red-100 text-red-800';
                          } else if (isDueSoon) {
                            status = 'Due Soon';
                            statusColor = 'bg-orange-100 text-orange-800';
                          } else if (item.status === 'in-progress') {
                            status = 'In Progress';
                            statusColor = 'bg-blue-100 text-blue-800';
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
                            low: { icon: '🟢', color: 'bg-green-100 text-green-800' },
                            medium: { icon: '🟡', color: 'bg-yellow-100 text-yellow-800' },
                            high: { icon: '🔴', color: 'bg-red-100 text-red-800' }
                          };
                          
                          const config = typeConfig[itemType] || typeConfig.decision;
                          const priorityConfigItem = priorityConfig[item.priority] || priorityConfig.medium;
                          
                          return (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                                  <span>{config.icon}</span>
                                  {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={item.itemName}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].itemName = e.target.value;
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className={`font-medium text-gray-900 border border-gray-300 rounded px-2 py-1 w-full text-sm ${
                                    item.completed ? 'line-through opacity-60' : ''
                                  }`}
                                  placeholder="Description..."
                                />
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="text"
                                  value={item.assignedPerson}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].assignedPerson = e.target.value;
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                  placeholder="Assignee..."
                                />
                              </td>
                              <td className="px-4 py-3">
                                <select
                                  value={item.priority}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].priority = e.target.value as 'low' | 'medium' | 'high';
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfigItem.color}`}
                                >
                                  <option value="low">🟢 Low</option>
                                  <option value="medium">🟡 Medium</option>
                                  <option value="high">🔴 High</option>
                                </select>
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="date"
                                  value={item.dueDate}
                                  onChange={(e) => {
                                    const updatedItems = [...newProject.pendingItems];
                                    updatedItems[index].dueDate = e.target.value;
                                    setNewProject({...newProject, pendingItems: updatedItems});
                                  }}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                                  {status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedItems = [...newProject.pendingItems];
                                      updatedItems[index].completed = !updatedItems[index].completed;
                                      setNewProject({...newProject, pendingItems: updatedItems});
                                    }}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
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
                                    className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-xs font-semibold transition-all duration-200"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
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
            {/* Issue Tracker - Modern Visual UX */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Issue Tracker</h2>
              </div>

              {/* Modern Summary with Badges */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {newProject.issues?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">🔴</span>
                    <span className="text-gray-600 font-medium">Open:</span>
                    <span className="text-lg font-bold text-red-600">
                      {newProject.issues?.filter(issue => issue.status === 'open').length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🔵</span>
                    <span className="text-gray-600 font-medium">In Progress:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {newProject.issues?.filter(issue => issue.status === 'in-progress').length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🟢</span>
                    <span className="text-gray-600 font-medium">Resolved:</span>
                    <span className="text-lg font-bold text-green-600">
                      {newProject.issues?.filter(issue => issue.status === 'resolved' || issue.status === 'closed').length || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Balanced Quick Add Form */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Add Issue</span>
                </div>
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Enter issue title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      id="quick-add-issue-title"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      id="quick-add-issue-severity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      id="quick-add-issue-assignee"
                    />
                  </div>
                  <div className="col-span-1">
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
                      className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Modern Issue Table */}
              {newProject.issues.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Severity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assignee</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
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
                          <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
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
                              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
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
                                <option value="open" className="bg-red-100 text-red-800">🔴 Open</option>
                                <option value="in-progress" className="bg-blue-100 text-blue-800">🔵 In Progress</option>
                                <option value="resolved" className="bg-green-100 text-green-800">🟢 Resolved</option>
                                <option value="closed" className="bg-gray-100 text-gray-800">⚪ Closed</option>
                              </select>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
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
          // Other steps - show card title
          <>
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
