'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface Project {
  id: string
  name: string
  location: string
  pm: string
  pic: string
  picRole: string
  due: string
  status: 'done' | 'progress' | 'urgent'
  progress: number
  budget: number
  team: string[]
}

export default function DashboardOverview() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Thrisna Private Lounge',
      location: 'Jakarta',
      pm: 'Bapak Andi',
      pic: 'Pak Jhon',
      picRole: 'Technician',
      due: '12 Feb 2026',
      status: 'progress',
      progress: 65,
      budget: 150000000,
      team: ['John Doe', 'Jane Smith', 'Mike Johnson']
    },
    {
      id: '2',
      name: 'Office Building Project',
      location: 'Surabaya',
      pm: 'Ibu Siti',
      pic: 'Pak Budi',
      picRole: 'Engineer',
      due: '15 Mar 2026',
      status: 'done',
      progress: 100,
      budget: 200000000,
      team: ['Alice Brown', 'Bob Wilson', 'Charlie Davis']
    },
    {
      id: '3',
      name: 'Retail Store Renovation',
      location: 'Bandung',
      pm: 'Pak Ahmad',
      pic: 'Pak Eko',
      picRole: 'Architect',
      due: '20 Apr 2026',
      status: 'urgent',
      progress: 35,
      budget: 300000000,
      team: ['David Lee', 'Emma Wilson', 'Frank Miller']
    },
    {
      id: '4',
      name: 'Factory Installation',
      location: 'Medan',
      pm: 'Ibu Rina',
      pic: 'Pak Doni',
      picRole: 'Technician',
      due: '10 May 2026',
      status: 'progress',
      progress: 80,
      budget: 250000000,
      team: ['Grace Chen', 'Henry Wang', 'Ivy Martinez']
    }
  ])

  const [selectedTimeRange, setSelectedTimeRange] = useState('month')

  // Calculate overall statistics
  const calculateStats = () => {
    const totalProjects = projects.length
    const completedProjects = projects.filter(p => p.status === 'done').length
    const inProgressProjects = projects.filter(p => p.status === 'progress').length
    const urgentProjects = projects.filter(p => p.status === 'urgent').length
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
    const avgProgress = projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      urgentProjects,
      totalBudget,
      avgProgress,
      completionRate: totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0
    }
  }

  const stats = calculateStats()

  const StatusBadge = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'done':
          return 'bg-green-500 text-white'
        case 'progress':
          return 'bg-red-500 text-white'
        case 'urgent':
          return 'bg-red-500 text-white'
        default:
          return 'bg-gray-500 text-white'
      }
    }

    return <Badge className={getStatusColor(status)}>{status}</Badge>
  }

  const ProgressBar = ({ value, max, label }: { value: number; max: number; label: string }) => {
    const percentage = max > 0 ? (value / max) * 100 : 0
    
    return (
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{label}</span>
          <span className="font-medium text-gray-900">{value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Comprehensive project statistics and performance overview</p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                  <p className="text-3xl font-bold">{stats.totalProjects}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📁</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{stats.completedProjects}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold">{stats.inProgressProjects}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Urgent</p>
                  <p className="text-3xl font-bold">{stats.urgentProjects}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚨</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Project Performance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="text-2xl font-bold text-green-600">{stats.completionRate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Progress</span>
                  <span className="text-2xl font-bold text-blue-600">{stats.avgProgress.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Budget</span>
                  <span className="text-2xl font-bold text-gray-900">{stats.totalBudget.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Completed</span>
                  </div>
                  <span className="font-medium text-gray-900">{stats.completedProjects} projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">In Progress</span>
                  </div>
                  <span className="font-medium text-gray-900">{stats.inProgressProjects} projects</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Urgent</span>
                  </div>
                  <span className="font-medium text-gray-900">{stats.urgentProjects} projects</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Projects</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant={selectedTimeRange === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('week')}
                  className="text-xs"
                >
                  Week
                </Button>
                <Button 
                  variant={selectedTimeRange === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('month')}
                  className="text-xs"
                >
                  Month
                </Button>
                <Button 
                  variant={selectedTimeRange === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('year')}
                  className="text-xs"
                >
                  Year
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {projects.slice(0, 5).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📍 {project.location}</p>
                      <p>👤 {project.pm}</p>
                      <p>🔧 {project.pic}</p>
                      <p>📅 {project.due}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="text-lg font-bold text-blue-600">{project.progress}%</p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
