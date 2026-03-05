'use client';

import { useState } from 'react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';
import { Users, Activity, CheckCircle, Target } from 'lucide-react';

export default function DashboardPage() {
  // Import team workload data from Team page (same data)
  const [teamWorkload] = useState([
    { id: '1', name: 'Jovan', role: 'Senior Engineer', tasks: 8, completed: 5, avatar: 'J', status: 'active' },
    { id: '2', name: 'Alwan', role: 'Lighting Engineer', tasks: 6, completed: 4, avatar: 'A', status: 'active' },
    { id: '3', name: 'Robi', role: 'Audio Visual Engineer', tasks: 7, completed: 3, avatar: 'R', status: 'active' },
    { id: '4', name: 'Sujadi', role: 'Site Coordinator', tasks: 12, completed: 9, avatar: 'S', status: 'active' },
    { id: '5', name: 'Andry', role: 'Technician', tasks: 10, completed: 7, avatar: 'A', status: 'active' },
    { id: '6', name: 'Eka', role: 'Technician', tasks: 9, completed: 6, avatar: 'E', status: 'active' },
    { id: '7', name: 'Sopian', role: 'Technician', tasks: 8, completed: 5, avatar: 'S', status: 'active' },
    { id: '8', name: 'Sobirin', role: 'Technician', tasks: 7, completed: 4, avatar: 'S', status: 'active' },
    { id: '9', name: 'Puji', role: 'Technician', tasks: 6, completed: 3, avatar: 'P', status: 'active' },
    { id: '10', name: 'Dany', role: 'Maintenance', tasks: 5, completed: 2, avatar: 'D', status: 'active' }
  ]);

  // Empty team schedule data (same as Team page)
  const [teamScheduleData] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Define weekly capacity (same as Team page)
  const WEEKLY_CAPACITY = 10;

  // Calculate total tasks in the week (same as Team page)
  const totalWeeklyTasks = Object.values(teamScheduleData).reduce((sum, day) => sum + day.length, 0);

  // Calculate real-time workload for each team member (same as Team page)
  const calculateMemberWorkload = (memberName) => {
    let taskCount = 0;
    
    // Count tasks assigned to this member from all schedules
    Object.values(teamScheduleData).forEach(daySchedules => {
      daySchedules.forEach(schedule => {
        if (schedule.assigned.includes(memberName)) {
          taskCount++;
        }
      });
    });
    
    return taskCount;
  };

  // Update team workload with real-time data (same as Team page)
  const updatedTeamWorkload = teamWorkload.map(member => ({
    ...member,
    tasks: calculateMemberWorkload(member.name)
  }));

  return (
    <ConsistentLayout title="Dashboard" subtitle="Team workload overview and project status">
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{updatedTeamWorkload.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Total Members</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">team size</p>
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
                <Activity className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{totalWeeklyTasks}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Tasks This Week</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">scheduled</p>
                <p className="text-sm font-bold text-green-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{updatedTeamWorkload.reduce((sum, member) => sum + member.tasks, 0)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Tasks Assigned</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">total assigned</p>
                <p className="text-sm font-bold text-purple-600">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{updatedTeamWorkload.reduce((sum, member) => sum + member.completed, 0)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Tasks Completed</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">total done</p>
                <p className="text-sm font-bold text-orange-600">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Workload Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Team Workload</h3>
            <p className="text-sm text-slate-500">Team workload and task distribution</p>
          </div>
        </div>

        {/* Team Workload Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {updatedTeamWorkload.map((member) => {
            const workloadPercentage = totalWeeklyTasks > 0 ? Math.min((member.tasks / totalWeeklyTasks) * 100, 100) : 0;
            const progressColor = workloadPercentage <= 40 ? 'from-green-400 to-green-600' : 
                               workloadPercentage <= 80 ? 'from-orange-400 to-orange-600' : 
                               'from-red-400 to-red-600';
            
            return (
              <div key={member.id} className="group">
                <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
                  {/* Card Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                      <span className="text-white font-bold text-sm">{member.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-base leading-tight">{member.name}</div>
                      <div className="text-xs text-slate-500 leading-tight truncate">{member.role}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-xs text-slate-600 capitalize">{member.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tasks Information */}
                  <div className="mb-3">
                    <div className="text-xs text-slate-500 mb-1">Tasks This Week</div>
                    <div className="text-2xl font-bold text-slate-900">{member.tasks}</div>
                  </div>

                  {/* Workload Progress */}
                  <div className="mt-auto">
                    <div className="text-xs text-slate-500 mb-2">Workload</div>
                    <div className="w-full">
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${progressColor} rounded-full transition-all duration-500`} 
                          style={{ width: `${workloadPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-600 mt-2 text-center font-medium">{workloadPercentage.toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ConsistentLayout>
  );
}
