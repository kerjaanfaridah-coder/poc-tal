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
      case 'COMPLETE': return 'bg-green-100 text-green-800 border-green-200'
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Phase Progress</h1>
            <p className="text-gray-600">Track and monitor project phase progress with detailed task breakdown</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Phase Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(phaseSummaries).map(([phase, summary]) => (
          <Card key={phase} className="bg-white shadow-sm border border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Phase {phase}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePhase(phase)}
                  className="p-1 hover:bg-gray-100"
                >
                  {summary.isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Tasks:</span>
                  <span className="text-sm font-medium text-gray-900">{summary.totalTasks}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${getProgressColor(summary.overallProgress)}`}>
                    {summary.overallProgress}%
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Complete: {summary.completedTasks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Progress: {summary.inProgressTasks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-gray-600">Not Started: {summary.notStartedTasks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-600">Overdue: {summary.overdueTasks}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                {phases.map((task, index) => (
                  <motion.tr
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-left">
                      <div className="flex items-center gap-2">
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
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
