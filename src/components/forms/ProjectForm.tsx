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
    type: 'header' | 'tasks' | 'summary'
    phaseName: string
    no: number
    tasks: string
    assignedTo: string
    startDate: string
    endDate: string
    days: number
    status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold'
    achievement: {
      C: number; // Complete
      O: number; // On Progress
      I: number; // Issue
      N: number; // Not Started
    }
    noted: string
    evidence: string
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
        id: 'phase-1-header',
        type: 'header',
        phaseName: 'PHASE 1',
        no: 1,
        tasks: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-1-tasks',
        type: 'tasks',
        phaseName: 'PHASE 1',
        no: 1,
        tasks: '1. Kick off Meeting\n2. Produce Shop Drawing\n3. Project ON DP 1',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-1-summary',
        type: 'summary',
        phaseName: 'PHASE 1',
        no: 0,
        tasks: 'PHASE 1 ACHIEVEMENT SUMMARY',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-2-header',
        type: 'header',
        phaseName: 'PHASE 2',
        tasks: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-2-tasks',
        type: 'tasks',
        phaseName: 'PHASE 2',
        tasks: '4. Survey\n5. Material Approval\n6. Cable Delivery\n7. Cabling Installation\n8. Marking Device\n9. Report Progress to Owner\n10. QC Cabling & Placement',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-2-summary',
        type: 'summary',
        phaseName: 'PHASE 2',
        tasks: 'PHASE 2 ACHIEVEMENT SUMMARY',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-3-header',
        type: 'header',
        phaseName: 'PHASE 3',
        tasks: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-3-tasks',
        type: 'tasks',
        phaseName: 'PHASE 3',
        tasks: '11. Payment DP II\n12. Device Delivery\n13. Device Installation\n14. QC Installation & Racking\n15. Report Progress to Owner\n16. Integration - Setting & Configuration\n17. Testing Function\n18. QC Integration',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-3-summary',
        type: 'summary',
        phaseName: 'PHASE 3',
        tasks: 'PHASE 3 ACHIEVEMENT SUMMARY',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-4-header',
        type: 'header',
        phaseName: 'PHASE 4',
        tasks: '',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-4-tasks',
        type: 'tasks',
        phaseName: 'PHASE 4',
        tasks: '19. Handover Document\n20. Test Commisioning\n21. Final QC\n22. Function/ Defect Checklist\n23. Repair Defect\n24. Training\n25. BAST\n26. Maintenance',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
      },
      {
        id: 'phase-4-summary',
        type: 'summary',
        phaseName: 'PHASE 4',
        tasks: 'PHASE 4 ACHIEVEMENT SUMMARY',
        assignedTo: '',
        startDate: '',
        endDate: '',
        days: 0,
        status: 'Not Started',
        achievement: { C: 0, O: 0, I: 0, N: 100 },
        noted: '',
        evidence: ''
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
    if (!newProject.name.trim()) {
      alert('Project name is required');
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
                  <label className="block text-sm font-bold text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Enter project name"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newProject.location || ''}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Enter project location"
                  />
                </div>

                {/* PIC Internal */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Internal</label>
                  <input
                    type="text"
                    value={newProject.pic || ''}
                    onChange={(e) => setNewProject({...newProject, pic: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Internal person in charge"
                  />
                </div>

                {/* PIC Site */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Site</label>
                  <input
                    type="text"
                    value={newProject.picSite || ''}
                    onChange={(e) => setNewProject({...newProject, picSite: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Site PIC name"
                  />
                </div>

                {/* RIGHT COLUMN */}

                {/* PIC Site (Role) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">PIC Site (Role)</label>
                  <input
                    type="text"
                    value={newProject.picRole || ''}
                    onChange={(e) => setNewProject({...newProject, picRole: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                    placeholder="Role or position"
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newProject.dueDate || ''}
                    onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
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
              {/* Project Monitoring Spreadsheet UI */}
              <div className="bg-white">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Project Phase Progress Monitoring</h2>
                  <p className="text-gray-600">Track and monitor project phases with real-time progress updates</p>
                </div>
                
                {/* Excel-style Table */}
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      {/* Header Row */}
                      <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 w-16">No</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[200px]">Tasks</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[120px]">Assigned To</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[100px]">Start Date</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[100px]">End Date</th>
                          <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-700 bg-gray-50 w-16">Days</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[120px]">Status</th>
                          <th className="border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-700 bg-gray-50">
                            <div className="text-center">ACHIEVEMENT %</div>
                            <div className="grid grid-cols-4 gap-0 mt-1">
                              <div className="border-r border-gray-300 pr-1 text-xs">C</div>
                              <div className="border-r border-gray-300 px-1 text-xs">O</div>
                              <div className="border-r border-gray-300 px-1 text-xs">I</div>
                              <div className="pl-1 text-xs">N</div>
                            </div>
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[150px]">Noted</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-50 min-w-[200px]">Evidence / Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newProject.phases.map((phase, phaseIndex) => {
                          const isHeader = phase.type === 'header';
                          const isTasks = phase.type === 'tasks';
                          const isSummary = phase.type === 'summary';
                          
                          return (
                            <tr key={phase.id} className={`hover:bg-gray-50 border-b border-gray-200 ${isHeader ? 'bg-blue-50' : isSummary ? 'bg-green-50' : ''}`}>
                              {/* No */}
                              <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white">
                                {isHeader ? (
                                  <div className="font-bold text-blue-700 text-center py-2">
                                    {phase.phaseName.replace('PHASE ', '')}
                                  </div>
                                ) : isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="number"
                                    value={phase.no || phaseIndex + 1}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].no = parseInt(e.target.value) || 0
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-center"
                                    min="1"
                                  />
                                )}
                              </td>

                              {/* Tasks */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader ? (
                                  <div className="font-bold text-blue-700 text-center py-2">
                                    {phase.phaseName}
                                  </div>
                                ) : isSummary ? (
                                  <div className="font-semibold text-green-700 text-center py-2">
                                    {phase.tasks}
                                  </div>
                                ) : (
                                  <textarea
                                    value={phase.tasks || (phase as any).name || ''}
                                    readOnly
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm bg-gray-50 text-gray-700 resize-none cursor-not-allowed"
                                    placeholder="Enter task description"
                                    rows={4}
                                    style={{ minHeight: '80px', maxHeight: '120px' }}
                                  />
                                )}
                              </td>

                              {/* Assigned To */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="text"
                                    value={phase.assignedTo || (phase as any).owner || ''}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].assignedTo = e.target.value
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    placeholder="Assign to..."
                                  />
                                )}
                              </td>

                              {/* Start Date */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="date"
                                    value={phase.startDate || ''}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].startDate = e.target.value
                                      // Auto-calculate days
                                      if (updatedPhases[phaseIndex].endDate) {
                                        const start = new Date(e.target.value)
                                        const end = new Date(updatedPhases[phaseIndex].endDate)
                                        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
                                        updatedPhases[phaseIndex].days = days > 0 ? days : 0
                                      }
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  />
                                )}
                              </td>

                              {/* End Date */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="date"
                                    value={phase.endDate || ''}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].endDate = e.target.value
                                      // Auto-calculate days
                                      if (updatedPhases[phaseIndex].startDate) {
                                        const start = new Date(updatedPhases[phaseIndex].startDate)
                                        const end = new Date(e.target.value)
                                        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
                                        updatedPhases[phaseIndex].days = days > 0 ? days : 0
                                      }
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  />
                                )}
                              </td>

                              {/* Days */}
                              <td className="border border-gray-300 px-3 py-2 text-center bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="number"
                                    value={phase.days || 0}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].days = parseInt(e.target.value) || 0
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    min="0"
                                  />
                                )}
                              </td>

                              {/* Status */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <select
                                    value={phase.status || 'Not Started'}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].status = e.target.value as Project['phases'][0]['status']
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  >
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="On Hold">On Hold</option>
                                  </select>
                                )}
                              </td>

                              {/* Achievement % - C | O | I | N */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : isSummary ? (
                                  <div className="grid grid-cols-4 gap-0">
                                    {(['C', 'O', 'I', 'N'] as const).map((type) => (
                                      <div key={type} className="border-r border-gray-200 last:border-r-0">
                                        <div className="text-xs text-center font-medium px-1 py-1 bg-green-100 text-green-700">
                                          {phase.achievement?.[type] || 0}%
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="grid grid-cols-4 gap-0">
                                    {(['C', 'O', 'I', 'N'] as const).map((type) => (
                                      <div key={type} className="border-r border-gray-200 last:border-r-0">
                                        <input
                                          type="number"
                                          value={phase.achievement?.[type] || 0}
                                          onChange={(e) => {
                                            const updatedPhases = [...newProject.phases]
                                            // Ensure achievement object exists
                                            if (!updatedPhases[phaseIndex].achievement) {
                                              updatedPhases[phaseIndex].achievement = { C: 0, O: 0, I: 0, N: 100 }
                                            }
                                            updatedPhases[phaseIndex].achievement[type] = parseInt(e.target.value) || 0
                                            setNewProject({...newProject, phases: updatedPhases})
                                          }}
                                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
                                          min="0"
                                          max="100"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </td>

                              {/* Noted */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="text"
                                    value={phase.noted || ''}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].noted = e.target.value
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    placeholder="Add notes..."
                                  />
                                )}
                              </td>

                              {/* Evidence / Link */}
                              <td className="border border-gray-300 px-3 py-2 bg-white">
                                {isHeader || isSummary ? (
                                  <div className="text-center text-gray-500">-</div>
                                ) : (
                                  <input
                                    type="text"
                                    value={phase.evidence || ''}
                                    onChange={(e) => {
                                      const updatedPhases = [...newProject.phases]
                                      updatedPhases[phaseIndex].evidence = e.target.value
                                      setNewProject({...newProject, phases: updatedPhases})
                                    }}
                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                                    placeholder="https://..."
                                  />
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
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
              {/* Total Budget Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget (IDR)</label>
                <input
                  type="number"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({...newProject, budget: parseInt(e.target.value) || 0})}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                  placeholder="Enter total project budget"
                />
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Budget Planned Card */}
                <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-sm transition">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Budget Planned</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight text-gray-900">
                    IDR {newProject.budget.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Spent Card */}
                <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-sm transition">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Spent</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight text-red-500">
                    IDR {((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)).toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {newProject.budget > 0 ? Math.round((((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)) / newProject.budget) * 100) : 0}% of total
                  </p>
                </div>

                {/* Remaining Card */}
                <div className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-sm transition">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-500">Remaining</span>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight text-green-600">
                    IDR {(newProject.budget - ((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0))).toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {newProject.budget > 0 ? Math.round(((newProject.budget - ((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0))) / newProject.budget) * 100) : 0}% available
                  </p>
                </div>
              </div>

              {/* Budget Usage Overview */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Budget Usage Overview</div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-red-400 to-red-600"
                    style={{ 
                      width: newProject.budget > 0 ? 
                        Math.min((((newProject.outsource || 0) + (newProject.costOther || 0) + (newProject.costOvertime || 0) + (newProject.costManPower || 0)) / newProject.budget) * 100, 100) + '%' 
                      : '0%'
                    }}
                  ></div>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Breakdown</h3>
                  
                  <div className="space-y-1">
                    {/* Outsource */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Outsource</span>
                      <input
                        type="number"
                        value={newProject.outsource || 0}
                        onChange={(e) => setNewProject({...newProject, outsource: parseInt(e.target.value) || 0})}
                        className="w-40 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                        placeholder="0"
                      />
                    </div>

                    {/* Cost Other */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Cost Other</span>
                      <input
                        type="number"
                        value={newProject.costOther || 0}
                        onChange={(e) => setNewProject({...newProject, costOther: parseInt(e.target.value) || 0})}
                        className="w-40 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                        placeholder="0"
                      />
                    </div>

                    {/* Cost Overtime */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-100">
                      <span className="text-sm text-gray-700">Cost Overtime</span>
                      <input
                        type="number"
                        value={newProject.costOvertime || 0}
                        onChange={(e) => setNewProject({...newProject, costOvertime: parseInt(e.target.value) || 0})}
                        className="w-40 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                        placeholder="0"
                      />
                    </div>

                    {/* Cost Man Power */}
                    <div className="flex items-center justify-between py-4">
                      <span className="text-sm text-gray-700">Cost Man Power</span>
                      <input
                        type="number"
                        value={newProject.costManPower || 0}
                        onChange={(e) => setNewProject({...newProject, costManPower: parseInt(e.target.value) || 0})}
                        className="w-40 text-right rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400"
                        placeholder="0"
                      />
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
            {/* Main Section Title Only */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pending Items</h2>

            {/* Add Item Button - Moved to right side of container */}
            <div className="flex justify-end mb-4">
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
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            {/* Container - No inner title */}
            <div className="bg-white rounded-xl border border-gray-200">
              {newProject.pendingItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">Belum ada item yang dibuat</p>
                  <p className="text-sm text-gray-500">Tambahkan item untuk mulai tracking pending project.</p>
                </div>
              ) : (
                <div>
                  {/* Table Header - Direct start, no inner card title */}
                  <div className="grid grid-cols-[220px_120px_1fr] gap-x-4 items-center py-3 px-4 text-sm font-semibold text-gray-600 border-b">
                    <div>Type</div>
                    <div className="text-center">Total</div>
                    <div>Note</div>
                  </div>

                  {/* Data Rows */}
                  <div className="grid grid-cols-[220px_120px_1fr] gap-x-4 items-center py-4 px-4 text-sm font-normal hover:bg-gray-50">
                    <div className="text-gray-900">Decisions</div>
                    <div className="text-center">
                      {newProject.pendingItems.filter(item => item.itemName === 'Decision' && !item.completed).length}
                    </div>
                    <div className="text-gray-600">
                      {newProject.pendingItems
                        .filter(item => item.itemName === 'Decision' && !item.completed)
                        .map(item => item.assignedPerson || `No description (due ${item.dueDate || 'no date'})`)
                        .join(', ') || '—'}
                    </div>
                  </div>

                  <div className="grid grid-cols-[220px_120px_1fr] gap-x-4 items-center py-4 px-4 text-sm font-normal hover:bg-gray-50">
                    <div className="text-gray-900">Actions</div>
                    <div className="text-center">
                      {newProject.pendingItems.filter(item => item.itemName === 'Actions' && !item.completed).length}
                    </div>
                    <div className="text-gray-600">
                      {newProject.pendingItems
                        .filter(item => item.itemName === 'Actions' && !item.completed)
                        .map(item => item.assignedPerson || `No description (due ${item.dueDate || 'no date'})`)
                        .join(', ') || '—'}
                    </div>
                  </div>

                  <div className="grid grid-cols-[220px_120px_1fr] gap-x-4 items-center py-4 px-4 text-sm font-normal hover:bg-gray-50">
                    <div className="text-gray-900">Change Requests</div>
                    <div className="text-center">
                      {newProject.pendingItems.filter(item => item.itemName === 'Change Request' && !item.completed).length}
                    </div>
                    <div className="text-gray-600">
                      {newProject.pendingItems
                        .filter(item => item.itemName === 'Change Request' && !item.completed)
                        .map(item => item.assignedPerson || `No description (due ${item.dueDate || 'no date'})`)
                        .join(', ') || '—'}
                    </div>
                  </div>

                  {/* Hidden Edit Section - Only shown when there are items */}
                  {newProject.pendingItems.length > 0 && (
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="px-4 pb-2">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Edit Items</h4>
                        <div className="space-y-2">
                          {newProject.pendingItems.map((item, index) => (
                            <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={(e) => {
                                  const updatedItems = [...newProject.pendingItems]
                                  updatedItems[index].completed = e.target.checked
                                  setNewProject({...newProject, pendingItems: updatedItems})
                                }}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                              />
                              <select
                                value={item.itemName}
                                onChange={(e) => {
                                  const updatedItems = [...newProject.pendingItems]
                                  updatedItems[index].itemName = e.target.value
                                  setNewProject({...newProject, pendingItems: updatedItems})
                                }}
                                className={`px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 ${
                                  item.completed ? 'bg-gray-50 text-gray-500 line-through' : ''
                                }`}
                              >
                                <option value="">Select type...</option>
                                <option value="Decision">Decision</option>
                                <option value="Actions">Actions</option>
                                <option value="Change Request">Change Request</option>
                              </select>
                              <input
                                type="text"
                                value={item.assignedPerson}
                                onChange={(e) => {
                                  const updatedItems = [...newProject.pendingItems]
                                  updatedItems[index].assignedPerson = e.target.value
                                  setNewProject({...newProject, pendingItems: updatedItems})
                                }}
                                className={`flex-1 px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 ${
                                  item.completed ? 'bg-gray-50 text-gray-500' : ''
                                }`}
                                placeholder="Note/description"
                              />
                              <input
                                type="text"
                                value={item.dueDate}
                                onChange={(e) => {
                                  const updatedItems = [...newProject.pendingItems]
                                  updatedItems[index].dueDate = e.target.value
                                  setNewProject({...newProject, pendingItems: updatedItems})
                                }}
                                className={`w-24 px-2 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-red-200 focus:border-red-400 ${
                                  item.completed ? 'bg-gray-50 text-gray-500' : ''
                                }`}
                                placeholder="Due date"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedItems = newProject.pendingItems.filter((_, itemIndex) => itemIndex !== index)
                                  setNewProject({...newProject, pendingItems: updatedItems})
                                }}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
                          issue.status === 'in-progress' ? 'bg-red-100 text-red-800' :
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
