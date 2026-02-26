'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Plus, Edit, Trash2, ExternalLink } from 'lucide-react'

interface PhaseTask {
  id: string
  taskId: string
  taskName: string
  assignedTo: string
  startDate: string
  endDate: string
  status: 'COMPLETE' | 'IN PROGRESS' | 'NOT STARTED' | 'OVERDUE'
  achievement: {
    complete: number
    ongoing: number
    notStarted: number
    total: number
  }
  noted: string
  evidenceLink?: string
  phase: 'E1' | 'E2' | 'E3' | 'E4'
}

interface PhaseSummary {
  phase: string
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  notStartedTasks: number
  overdueTasks: number
  overallProgress: number
  isExpanded: boolean
}

export default function PhaseProgressPage() {
  const [phases, setPhases] = useState<PhaseTask[]>([
    // E1 Phase Tasks
    {
      id: '1',
      taskId: 'E1-001',
      taskName: 'Site Survey and Analysis',
      assignedTo: 'Jovan',
      startDate: '2024-01-15',
      endDate: '2024-01-20',
      status: 'COMPLETE',
      achievement: { complete: 100, ongoing: 0, notStarted: 0, total: 100 },
      noted: 'Site survey completed successfully',
      evidenceLink: 'https://example.com/evidence1',
      phase: 'E1'
    },
    {
      id: '2',
      taskId: 'E1-002',
      taskName: 'Design Documentation',
      assignedTo: 'Alwan',
      startDate: '2024-01-18',
      endDate: '2024-01-25',
      status: 'COMPLETE',
      achievement: { complete: 100, ongoing: 0, notStarted: 0, total: 100 },
      noted: 'All design documents approved',
      evidenceLink: 'https://example.com/evidence2',
      phase: 'E1'
    },
    {
      id: '3',
      taskId: 'E1-003',
      taskName: 'Material Procurement',
      assignedTo: 'Robi',
      startDate: '2024-01-22',
      endDate: '2024-01-30',
      status: 'IN PROGRESS',
      achievement: { complete: 75, ongoing: 25, notStarted: 0, total: 100 },
      noted: 'Materials partially delivered',
      evidenceLink: 'https://example.com/evidence3',
      phase: 'E1'
    },

    // E2 Phase Tasks
    {
      id: '4',
      taskId: 'E2-001',
      taskName: 'Foundation Work',
      assignedTo: 'Sujadi',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      status: 'IN PROGRESS',
      achievement: { complete: 60, ongoing: 40, notStarted: 0, total: 100 },
      noted: 'Foundation 60% completed',
      evidenceLink: 'https://example.com/evidence4',
      phase: 'E2'
    },
    {
      id: '5',
      taskId: 'E2-002',
      taskName: 'Structural Framework',
      assignedTo: 'Andry',
      startDate: '2024-02-10',
      endDate: '2024-02-25',
      status: 'NOT STARTED',
      achievement: { complete: 0, ongoing: 0, notStarted: 100, total: 100 },
      noted: 'Waiting for foundation completion',
      phase: 'E2'
    },

    // E3 Phase Tasks
    {
      id: '6',
      taskId: 'E3-001',
      taskName: 'Electrical Installation',
      assignedTo: 'Eka',
      startDate: '2024-03-01',
      endDate: '2024-03-20',
      status: 'NOT STARTED',
      achievement: { complete: 0, ongoing: 0, notStarted: 100, total: 100 },
      noted: 'Scheduled after structural completion',
      phase: 'E3'
    },
    {
      id: '7',
      taskId: 'E3-002',
      taskName: 'Plumbing Work',
      assignedTo: 'Sopian',
      startDate: '2024-03-05',
      endDate: '2024-03-18',
      status: 'OVERDUE',
      achievement: { complete: 30, ongoing: 20, notStarted: 50, total: 100 },
      noted: 'Delayed due to material shortage',
      evidenceLink: 'https://example.com/evidence7',
      phase: 'E3'
    },

    // E4 Phase Tasks
    {
      id: '8',
      taskId: 'E4-001',
      taskName: 'Interior Finishing',
      assignedTo: 'Sobirin',
      startDate: '2024-03-25',
      endDate: '2024-04-10',
      status: 'NOT STARTED',
      achievement: { complete: 0, ongoing: 0, notStarted: 100, total: 100 },
      noted: 'Final phase pending',
      phase: 'E4'
    },
    {
      id: '9',
      taskId: 'E4-002',
      taskName: 'Final Inspection',
      assignedTo: 'Puji',
      startDate: '2024-04-05',
      endDate: '2024-04-15',
      status: 'NOT STARTED',
      achievement: { complete: 0, ongoing: 0, notStarted: 100, total: 100 },
      noted: 'Scheduled for project completion',
      phase: 'E4'
    }
  ])

  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['E1', 'E2', 'E3', 'E4']))

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETE': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'IN PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'NOT STARTED': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'OVERDUE': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'text-green-600 bg-green-50'
    if (percentage > 0) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const phaseSummaries = useMemo(() => {
    const summaries: { [key: string]: PhaseSummary } = {}
    
    phases.forEach(task => {
      if (!summaries[task.phase]) {
        summaries[task.phase] = {
          phase: task.phase,
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          notStartedTasks: 0,
          overdueTasks: 0,
          overallProgress: 0,
          isExpanded: expandedPhases.has(task.phase)
        }
      }
      
      const summary = summaries[task.phase]
      summary.totalTasks++
      
      switch (task.status) {
        case 'COMPLETE': summary.completedTasks++; break
        case 'IN PROGRESS': summary.inProgressTasks++; break
        case 'NOT STARTED': summary.notStartedTasks++; break
        case 'OVERDUE': summary.overdueTasks++; break
      }
    })

    // Calculate overall progress for each phase
    Object.keys(summaries).forEach(phase => {
      const summary = summaries[phase]
      const phaseTasks = phases.filter(t => t.phase === phase)
      const totalAchievement = phaseTasks.reduce((sum, task) => sum + task.achievement.complete, 0)
      summary.overallProgress = Math.round(totalAchievement / phaseTasks.length)
    })

    return summaries
  }, [phases, expandedPhases])

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => {
      const newSet = new Set(prev)
      if (newSet.has(phase)) {
        newSet.delete(phase)
      } else {
        newSet.add(phase)
      }
      return newSet
    })
  }

  const renderPhaseRow = (phase: string, summary: PhaseSummary) => (
    <motion.tr
      key={`summary-${phase}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-blue-50 border-b border-blue-200 font-semibold"
    >
      <td className="px-4 py-3 text-left">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => togglePhase(phase)}
            className="p-1 hover:bg-blue-100"
          >
            {summary.isExpanded ? (
              <ChevronDown className="w-4 h-4 text-blue-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-blue-600" />
            )}
          </Button>
          <span className="text-blue-900">Phase {phase}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-center text-blue-900">{summary.totalTasks} tasks</td>
      <td className="px-4 py-3 text-center text-blue-900">{summary.completedTasks}</td>
      <td className="px-4 py-3 text-center text-blue-900">{summary.inProgressTasks}</td>
      <td className="px-4 py-3 text-center text-blue-900">{summary.notStartedTasks}</td>
      <td className="px-4 py-3 text-center text-blue-900">{summary.overdueTasks}</td>
      <td className="px-4 py-3 text-center">
        <span className={`px-2 py-1 rounded text-sm font-medium ${getProgressColor(summary.overallProgress)}`}>
          {summary.overallProgress}%
        </span>
      </td>
      <td className="px-4 py-3 text-center text-blue-900">
        {summary.completedTasks}/{summary.totalTasks}
      </td>
      <td className="px-4 py-3 text-center text-blue-900">
        {summary.inProgressTasks}/{summary.totalTasks}
      </td>
      <td className="px-4 py-3 text-center text-blue-900">
        {summary.notStartedTasks}/{summary.totalTasks}
      </td>
      <td className="px-4 py-3 text-center text-blue-900">
        {summary.overdueTasks}/{summary.totalTasks}
      </td>
      <td className="px-4 py-3 text-left text-blue-900">Phase Summary</td>
      <td className="px-4 py-3 text-center">
        <Button variant="ghost" size="sm" className="p-1 hover:bg-blue-100">
          <Edit className="w-4 h-4 text-blue-600" />
        </Button>
      </td>
    </motion.tr>
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Phase Progress Detail</h1>
            <p className="text-gray-600">Track and monitor project phase progress with detailed task breakdown</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="bg-blue-600">
          <CardTitle className="text-lg font-semibold text-white">Phase Progress Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50 border-b border-blue-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-900 border-r border-blue-200">Tasks</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-900 border-r border-blue-200">Assigned To</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900 border-r border-blue-200">Start</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900 border-r border-blue-200">End</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900 border-r border-blue-200">Days</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900 border-r border-blue-200">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900 border-r border-blue-200" colSpan={4}>
                    Achievement %
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-blue-900 border-r border-blue-200">Noted</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-blue-900">Evidence / Link</th>
                </tr>
                <tr className="bg-blue-25 border-b border-blue-200">
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200">C</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200">O</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200">I</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200">N</th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700 border-r border-blue-200"></th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-blue-700"></th>
                </tr>
              </thead>
              <tbody>
                {['E1', 'E2', 'E3', 'E4'].map(phase => {
                  const summary = phaseSummaries[phase]
                  const phaseTasks = phases.filter(task => task.phase === phase)
                  
                  return (
                    <React.Fragment key={phase}>
                      {/* Phase Summary Row */}
                      {renderPhaseRow(phase, summary)}
                      
                      {/* Phase Task Rows */}
                      {summary.isExpanded && phaseTasks.map((task, index) => (
                        <motion.tr
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 text-left">
                            <div className="flex items-center gap-2 pl-6">
                              <span className="text-sm font-medium text-gray-900">{task.taskId}</span>
                              <span className="text-sm text-gray-600">{task.taskName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-left text-sm text-gray-900">{task.assignedTo}</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{task.startDate}</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{task.endDate}</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{calculateDays(task.startDate, task.endDate)}</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className={`text-xs font-medium ${getStatusColor(task.status)}`}>
                              {task.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{task.achievement.complete}%</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{task.achievement.ongoing}%</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{task.achievement.notStarted}%</td>
                          <td className="px-4 py-3 text-center text-sm text-gray-900">{task.achievement.total}%</td>
                          <td className="px-4 py-3 text-left text-sm text-gray-600 max-w-xs truncate" title={task.noted}>
                            {task.noted}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {task.evidenceLink ? (
                              <a
                                href={task.evidenceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Evidence
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
