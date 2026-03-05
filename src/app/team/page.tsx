'use client';

import { useState } from 'react';
import { Calendar, Users, BarChart3, Clock, CheckCircle, AlertCircle, TrendingUp, User, Activity } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TeamPage() {
  const [selectedWeek, setSelectedWeek] = useState('current');

  // Sample team schedule data
  const teamSchedule = [
    {
      id: '1',
      date: '2024-03-11',
      day: 'Monday',
      activities: [
        { time: '09:00', member: 'John Doe', activity: 'Project Planning Meeting', type: 'meeting' },
        { time: '11:00', member: 'Sarah Johnson', activity: 'Code Review Session', type: 'review' },
        { time: '14:00', member: 'Mike Chen', activity: 'Client Presentation', type: 'presentation' },
        { time: '16:00', member: 'Emily Davis', activity: 'Sprint Retrospective', type: 'meeting' }
      ]
    },
    {
      id: '2',
      date: '2024-03-12',
      day: 'Tuesday',
      activities: [
        { time: '10:00', member: 'John Doe', activity: 'Development Work', type: 'development' },
        { time: '13:00', member: 'Sarah Johnson', activity: 'Team Standup', type: 'meeting' },
        { time: '15:00', member: 'Mike Chen', activity: 'Design Review', type: 'review' },
        { time: '17:00', member: 'Emily Davis', activity: 'Documentation Update', type: 'documentation' }
      ]
    },
    {
      id: '3',
      date: '2024-03-13',
      day: 'Wednesday',
      activities: [
        { time: '09:30', member: 'Sarah Johnson', activity: 'Feature Development', type: 'development' },
        { time: '11:30', member: 'Mike Chen', activity: 'Stakeholder Meeting', type: 'meeting' },
        { time: '14:30', member: 'Emily Davis', activity: 'Testing Phase', type: 'testing' },
        { time: '16:30', member: 'John Doe', activity: 'Performance Review', type: 'review' }
      ]
    },
    {
      id: '4',
      date: '2024-03-14',
      day: 'Thursday',
      activities: [
        { time: '10:00', member: 'Emily Davis', activity: 'Bug Fixing', type: 'development' },
        { time: '12:00', member: 'John Doe', activity: 'Lunch & Learn', type: 'learning' },
        { time: '14:00', member: 'Sarah Johnson', activity: 'API Integration', type: 'development' },
        { time: '16:00', member: 'Mike Chen', activity: 'Project Demo', type: 'presentation' }
      ]
    },
    {
      id: '5',
      date: '2024-03-15',
      day: 'Friday',
      activities: [
        { time: '09:00', member: 'Mike Chen', activity: 'Weekly Planning', type: 'meeting' },
        { time: '11:00', member: 'Emily Davis', activity: 'Code Deployment', type: 'deployment' },
        { time: '14:00', member: 'John Doe', activity: 'Team Building', type: 'team' },
        { time: '16:00', member: 'Sarah Johnson', activity: 'Sprint Planning', type: 'planning' }
      ]
    }
  ];

  // Sample team workload data
  const teamWorkload = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Project Manager',
      totalTasks: 12,
      completedTasks: 8,
      inProgressTasks: 3,
      pendingTasks: 1,
      workloadPercentage: 75,
      efficiency: 92
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      totalTasks: 18,
      completedTasks: 12,
      inProgressTasks: 4,
      pendingTasks: 2,
      workloadPercentage: 89,
      efficiency: 88
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'UI/UX Designer',
      totalTasks: 15,
      completedTasks: 10,
      inProgressTasks: 3,
      pendingTasks: 2,
      workloadPercentage: 83,
      efficiency: 90
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'QA Engineer',
      totalTasks: 20,
      completedTasks: 15,
      inProgressTasks: 3,
      pendingTasks: 2,
      workloadPercentage: 90,
      efficiency: 95
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'development': return 'bg-green-100 text-green-800 border-green-200';
      case 'review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'presentation': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'testing': return 'bg-red-100 text-red-800 border-red-200';
      case 'documentation': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'learning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'deployment': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'team': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'planning': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <ConsistentLayout title="Team" subtitle="Manage team schedule and workload">
      {/* Team Schedule Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Schedule</h2>
            <p className="text-slate-600">Weekly team activities and assignments</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedWeek('previous')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
              This Week
            </span>
            <button
              onClick={() => setSelectedWeek('next')}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6">
            <div className="space-y-4">
              {teamSchedule.map((day) => (
                <div key={day.id} className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <h3 className="font-semibold text-slate-900">{day.day}</h3>
                    <span className="text-sm text-slate-600">{day.date}</span>
                  </div>
                  <div className="space-y-2">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-slate-600 w-20">
                          <Clock className="w-4 h-4" />
                          {activity.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900 w-32">
                          <User className="w-4 h-4" />
                          {activity.member}
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActivityColor(activity.type)}`}>
                          {activity.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Workload Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Workload</h2>
            <p className="text-slate-600">Task distribution and workload analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-slate-600" />
            <span className="text-sm text-slate-600">Live Updates</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="p-6">
            <div className="space-y-6">
              {teamWorkload.map((member) => (
                <div key={member.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Efficiency</p>
                        <p className="text-lg font-bold text-green-600">{member.efficiency}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Workload</p>
                        <p className="text-lg font-bold text-slate-900">{member.workloadPercentage}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Workload Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Task Distribution</span>
                      <span className="text-sm text-slate-600">{member.totalTasks} tasks</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getWorkloadColor(member.workloadPercentage)}`}
                        style={{ width: `${member.workloadPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Task Breakdown */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{member.totalTasks}</div>
                      <div className="text-xs text-slate-600">Total Tasks</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{member.completedTasks}</div>
                      <div className="text-xs text-slate-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{member.inProgressTasks}</div>
                      <div className="text-xs text-slate-600">In Progress</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{member.pendingTasks}</div>
                      <div className="text-xs text-slate-600">Pending</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsistentLayout>
  );
}
