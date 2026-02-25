'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  workload: number
  skills: string[]
}

interface ScheduleItem {
  id: string
  projectId: string
  projectName: string
  teamMemberId: string
  teamMemberName: string
  task: string
  date: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  estimatedHours: number
}

export default function ScheduleTeamProject() {
  const assignmentTeamMembers = [
    { name: 'Jovan', role: 'Engineer' },
    { name: 'Alwan', role: 'Engineer' },
    { name: 'Robi', role: 'Engineer' },
    { name: 'Sujadi', role: 'Site Manager' },
    { name: 'Andry', role: 'Technician' },
    { name: 'Eka', role: 'Technician' },
    { name: 'Sopian', role: 'Technician' },
    { name: 'Sobirin', role: 'Technician' },
    { name: 'Puji', role: 'Technician' }
  ]

  const [schedules, setSchedules] = useState<ScheduleItem[]>([])

  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    return { weekStart: startOfWeek, weekEnd: endOfWeek }
  })
  const [selectedProject, setSelectedProject] = useState('all')
  const [showAddSchedule, setShowAddSchedule] = useState(false)

  const [newSchedule, setNewSchedule] = useState({
    projectName: '',
    teamMemberId: '',
    task: '',
    date: '',
    status: 'scheduled' as 'scheduled' | 'in-progress' | 'completed' | 'cancelled',
    priority: 'medium' as 'low' | 'medium' | 'high',
    estimatedHours: 0
  })

  const projectOptions = Array.from(new Set(schedules.map(s => s.projectName))).sort()

  const filteredSchedules = schedules.filter(schedule => {
    const projectMatch = selectedProject === 'all' || schedule.projectName === selectedProject
    return projectMatch
  })

  const handleAddSchedule = () => {
    const schedule: ScheduleItem = {
      id: Date.now().toString(),
      projectId: '',
      projectName: newSchedule.projectName,
      teamMemberId: newSchedule.teamMemberId,
      teamMemberName: newSchedule.teamMemberId,
      task: newSchedule.task,
      date: newSchedule.date,
      status: newSchedule.status,
      priority: newSchedule.priority,
      estimatedHours: newSchedule.estimatedHours
    }
    setSchedules([...schedules, schedule])
    setNewSchedule({
      projectName: '',
      teamMemberId: '',
      task: '',
      date: '',
      status: 'scheduled',
      priority: 'medium',
      estimatedHours: 0
    })
    setShowAddSchedule(false)
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options).replace(',', '')
  }

  
  return (
  <div className="p-6">
    {/* Header */}
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Schedule Team Project</h1>
            <p className="text-gray-600">Create and manage weekly team schedules for each project</p>
          </div>
            <Button 
              onClick={() => setShowAddSchedule(true)}
              className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg"
            >
              + Add Schedule
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Week</label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={`${formatDate(selectedWeek.weekStart)} - ${formatDate(selectedWeek.weekEnd)}`}
                onClick={() => (document.getElementById('week-picker') as HTMLInputElement)?.showPicker?.()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Select week"
              />
              <input
                id="week-picker"
                type="date"
                className="absolute inset-0 opacity-0 pointer-events-none"
                value={selectedWeek.weekStart.toISOString().split('T')[0]}
                onChange={(e) => {
                  const picked = new Date(e.target.value)
                  const dayOfWeek = picked.getDay()
                  const startOfWeek = new Date(picked)
                  startOfWeek.setDate(picked.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
                  const endOfWeek = new Date(startOfWeek)
                  endOfWeek.setDate(startOfWeek.getDate() + 6)
                  setSelectedWeek({ weekStart: startOfWeek, weekEnd: endOfWeek })
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Projects</option>
              {projectOptions.map((projectName) => (
                <option key={projectName} value={projectName}>{projectName}</option>
              ))}
            </select>
          </div>
                  </div>

        {/* Schedule List */}
        <Card className="bg-white shadow-sm border border-gray-200 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Schedule List Weekly</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Team Member</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Project</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Task</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Hours</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Priority</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-900 border-b border-gray-200">Status</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-900 border-b border-gray-200 whitespace-nowrap w-px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedules.map((schedule, index) => (
                    <motion.tr
                      key={schedule.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white hover:bg-gray-50 border-b border-gray-200"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">👤</span>
                          <span className="font-medium text-gray-900">{schedule.teamMemberName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-900">{schedule.projectName}</td>
                      <td className="px-4 py-3 text-gray-900">{schedule.task}</td>
                      <td className="px-4 py-3 text-gray-900">{schedule.date}</td>
                      <td className="px-4 py-3 text-gray-900">{schedule.estimatedHours}h</td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{schedule.priority}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900">{schedule.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            const ok = window.confirm('Are you sure you want to delete this schedule?')
                            if (!ok) return
                            setSchedules((prev) => prev.filter((s) => s.id !== schedule.id))
                          }}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-red-600 text-white text-xs font-medium hover:bg-red-700 transition-colors"
                          aria-label="Delete schedule"
                        >
                          🗑️
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add Schedule Modal */}
        {showAddSchedule && (
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
                <CardTitle className="text-2xl font-bold text-gray-900">Add New Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                      <input
                        type="text"
                        value={newSchedule.projectName}
                        onChange={(e) => setNewSchedule({...newSchedule, projectName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter project name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Member</label>
                      <select
                        value={newSchedule.teamMemberId}
                        onChange={(e) => setNewSchedule({...newSchedule, teamMemberId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Team Member</option>
                        {assignmentTeamMembers.map((member) => (
                          <option key={member.name} value={member.name}>
                            {member.name} - {member.role}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Task Description</label>
                      <input
                        type="text"
                        value={newSchedule.task}
                        onChange={(e) => setNewSchedule({...newSchedule, task: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter task description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={newSchedule.date}
                        onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={newSchedule.status}
                        onChange={(e) =>
                          setNewSchedule({
                            ...newSchedule,
                            status: e.target.value as 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        value={newSchedule.priority}
                        onChange={(e) => setNewSchedule({...newSchedule, priority: e.target.value as 'low' | 'medium' | 'high'})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                      <input
                        type="number"
                        value={newSchedule.estimatedHours}
                        onChange={(e) => setNewSchedule({...newSchedule, estimatedHours: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter estimated hours"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end mt-6">
                  <Button 
                    onClick={() => setShowAddSchedule(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleAddSchedule}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </motion.div>
          </motion.div>
        )}
      </div>
  )
}
