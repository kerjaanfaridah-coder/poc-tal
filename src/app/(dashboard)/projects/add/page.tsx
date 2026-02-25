'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function AddProjectPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('project-info')
  const [budgetData, setBudgetData] = useState({
    planned: '',
    outsource: '',
    costOther: '',
    costOvertime: '',
    costManPower: ''
  })

  // Helper function for formatting Rupiah
  const formatRupiah = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '')
    return cleanValue ? `Rp. ${parseInt(cleanValue).toLocaleString('id-ID')}` : ''
  }

  const handleInputChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '')
    const formattedValue = cleanValue ? `Rp. ${parseInt(cleanValue).toLocaleString('id-ID')}` : ''
    setBudgetData(prev => ({ ...prev, [field]: formattedValue }))
  }

  // Calculate budget summary
  const calculateBudgetSummary = () => {
    const planned = parseInt(budgetData.planned.replace(/[^\d]/g, '') || '0')
    const outsource = parseInt(budgetData.outsource.replace(/[^\d]/g, '') || '0')
    const costOther = parseInt(budgetData.costOther.replace(/[^\d]/g, '') || '0')
    const costOvertime = parseInt(budgetData.costOvertime.replace(/[^\d]/g, '') || '0')
    const costManPower = parseInt(budgetData.costManPower.replace(/[^\d]/g, '') || '0')
    
    const totalActual = outsource + costOther + costOvertime + costManPower
    const totalDifference = planned - totalActual
    
    return {
      totalPlanned: planned,
      totalActual: totalActual,
      totalDifference: totalDifference
    }
  }

  const handleAddProject = (projectData: any) => {
    const newProject = {
      ...projectData,
      id: Date.now().toString(),
      budget: {
        planned: parseInt(budgetData.planned.replace(/[^\d]/g, '') || '0'),
        outsource: parseInt(budgetData.outsource.replace(/[^\d]/g, '') || '0'),
        costOther: parseInt(budgetData.costOther.replace(/[^\d]/g, '') || '0'),
        costOvertime: parseInt(budgetData.costOvertime.replace(/[^\d]/g, '') || '0'),
        costManPower: parseInt(budgetData.costManPower.replace(/[^\d]/g, '') || '0')
      }
    }
    setProjects([...projects, newProject])
    
    // Save to localStorage for all projects page to display
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    existingProjects.push(newProject)
    localStorage.setItem('projects', JSON.stringify(existingProjects))
    
    console.log('Project created:', newProject)
    alert('Project created successfully!')
    
    // Redirect to all projects page to see summary
    window.location.href = '/dashboard'
  }

  const handleCancel = () => {
    console.log('Project creation cancelled')
  }

  return (
  <div className="flex-1 w-full px-8 xl:px-12 py-6 bg-gray-50 min-h-screen">
    {/* Header Section with Title and Buttons */}
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Project</h1>
            <p className="text-gray-600">Create a new project with detailed information, phases, budget, and tasks</p>
          </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleAddProject({
                  name: '',
                  location: '',
                  pm: '',
                  pic: '',
                  picRole: '',
                  due: '',
                  status: 'in-progress',
                  progress: 0,
                  budget: 0,
                  team: [],
                  phases: [],
                  pendingItems: [],
                  issues: [],
                  outstandingTasks: []
                })}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 border-b border-gray-200">
            {[
              { id: 'project-info', label: 'Project Information' },
              { id: 'phase-progress', label: 'Phase Progress Table' },
              { id: 'budget', label: 'Budget' },
              { id: 'pending-items', label: 'Pending Items' },
              { id: 'issues', label: 'Issues' },
              { id: 'outstanding-tasks', label: 'Outstanding Tasks' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            {activeTab === 'project-info' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter project name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIC Internal</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter PIC Internal name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIC Site</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter PIC Site name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIC Site (Role)</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter PIC Site role"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'phase-progress' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Phase Progress Table</h2>
                <div className="border border-gray-200 rounded-lg p-8">
                  <div className="text-center">
                    <p className="text-gray-600">Phase progress table will be displayed here</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'budget' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 w-16">No</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Budget</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nominal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">1</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Planned</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                            placeholder="0"
                            value={budgetData.planned || ''}
                            onChange={(e) => handleInputChange('planned', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">2</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Outsource</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                            placeholder="0"
                            value={budgetData.outsource}
                            onChange={(e) => handleInputChange('outsource', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">3</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Cost Other</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                            placeholder="0"
                            value={budgetData.costOther}
                            onChange={(e) => handleInputChange('costOther', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">4</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Cost Overtime</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                            placeholder="0"
                            value={budgetData.costOvertime}
                            onChange={(e) => handleInputChange('costOvertime', e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-900">5</td>
                        <td className="px-4 py-3 text-sm text-gray-900">Cost Man Power</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-right"
                            placeholder="0"
                            value={budgetData.costManPower}
                            onChange={(e) => handleInputChange('costManPower', e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-6 p-4 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-gray-600">Total Planned</div>
                        <div className="font-bold text-gray-900">{formatRupiah(calculateBudgetSummary().totalPlanned.toString())}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Total Actual</div>
                        <div className="font-bold text-gray-900">{formatRupiah(calculateBudgetSummary().totalActual.toString())}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">Total Difference</div>
                        <div className={`font-bold ${calculateBudgetSummary().totalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {calculateBudgetSummary().totalDifference >= 0 ? '+' : '-'}{formatRupiah(Math.abs(calculateBudgetSummary().totalDifference).toString())}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pending-items' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Items</h2>
                <div className="border border-gray-200 rounded-lg p-8">
                  <p className="text-gray-600 text-center">No pending items added yet.</p>
                </div>
              </div>
            )}

            {activeTab === 'issues' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Issues</h2>
                <div className="border border-gray-200 rounded-lg p-8">
                  <p className="text-gray-600 text-center">No issues added yet.</p>
                </div>
              </div>
            )}

            {activeTab === 'outstanding-tasks' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Outstanding Tasks</h2>
                <div className="border border-gray-200 rounded-lg p-8">
                  <p className="text-gray-600 text-center">No outstanding tasks added yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
