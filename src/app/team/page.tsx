'use client';

import { useState } from 'react';
import { Calendar, Users, Clock, User, Activity, CheckCircle, Target, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TeamPage() {
  // Simple team schedule data
  const teamScheduleData = {
    Monday: [
      { id: '1', title: 'Install Speaker', project: 'Home Theater – Thrishna Lounge', assigned: 'Technician', time: '08:00 – 10:00' },
      { id: '2', title: 'Testing System', project: 'Conference Room', assigned: 'Engineer', time: '14:00 – 16:00' }
    ],
    Tuesday: [
      { id: '3', title: 'Network Setup', project: 'Office Building', assigned: 'IT Specialist', time: '09:00 – 12:00' },
      { id: '4', title: 'Equipment Check', project: 'Main Hall', assigned: 'Technician', time: '13:00 – 15:00' },
      { id: '5', title: 'Client Meeting', project: 'Board Room', assigned: 'Project Manager', time: '16:00 – 17:00' }
    ],
    Wednesday: [
      { id: '6', title: 'Security Installation', project: 'Entrance', assigned: 'Security Team', time: '10:00 – 14:00' },
      { id: '7', title: 'Sound Calibration', project: 'Auditorium', assigned: 'Audio Engineer', time: '15:00 – 18:00' }
    ],
    Thursday: [
      { id: '8', title: 'Maintenance Check', project: 'All Rooms', assigned: 'Maintenance', time: '08:00 – 12:00' },
      { id: '9', title: 'Training Session', project: 'Training Room', assigned: 'Trainer', time: '13:00 – 17:00' }
    ],
    Friday: [
      { id: '10', title: 'Final Inspection', project: 'Project Site', assigned: 'Inspector', time: '09:00 – 11:00' },
      { id: '11', title: 'Report Preparation', project: 'Office', assigned: 'Admin', time: '14:00 – 16:00' },
      { id: '12', title: 'Team Review', project: 'Meeting Room', assigned: 'Team Lead', time: '16:00 – 18:00' }
    ]
  };

  // Simple team workload data
  const teamWorkload = [
    { id: '1', name: 'John Doe', role: 'Project Manager', tasks: 12, completed: 8, avatar: '👨‍💼' },
    { id: '2', name: 'Sarah Johnson', role: 'Senior Developer', tasks: 18, completed: 12, avatar: '👩‍💻' },
    { id: '3', name: 'Mike Chen', role: 'UI/UX Designer', tasks: 15, completed: 10, avatar: '🎨' },
    { id: '4', name: 'Emily Davis', role: 'QA Engineer', tasks: 20, completed: 15, avatar: '🔍' }
  ];

  // Calculate summary stats
  const totalMembers = teamWorkload.length;
  const totalActivities = Object.values(teamScheduleData).reduce((sum, day) => sum + day.length, 0);
  const totalTasksAssigned = teamWorkload.reduce((sum, member) => sum + member.tasks, 0);
  const totalTasksCompleted = teamWorkload.reduce((sum, member) => sum + member.completed, 0);

  return (
    <ConsistentLayout title="Team" subtitle="Team schedule and workload overview">
      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{totalMembers}</p>
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
              <p className="text-3xl font-bold text-slate-900">{totalActivities}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Weekly Activities</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">scheduled</p>
                <p className="text-sm font-bold text-green-600">Busy</p>
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
              <p className="text-3xl font-bold text-slate-900">{totalTasksAssigned}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Tasks Assigned</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">total</p>
                <p className="text-sm font-bold text-purple-600">Pending</p>
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
              <p className="text-3xl font-bold text-slate-900">{totalTasksCompleted}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Tasks Completed</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">done</p>
                <p className="text-sm font-bold text-orange-600">Success</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Schedule Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Team Schedule</h3>
              <p className="text-sm text-slate-500">Weekly team activities</p>
            </div>
          </div>
          
          {/* Header Controls */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search schedule..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-5 h-5" />
              Add Schedule
            </button>
          </div>
        </div>

        {/* Board Layout */}
        <div className="grid grid-cols-5 gap-5">
          {Object.entries(teamScheduleData).map(([day, schedules]) => (
            <div key={day} className="min-h-[400px]">
              {/* Column Header */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-3 mb-3">
                <h4 className="font-semibold text-slate-900 text-center">{day}</h4>
                <p className="text-xs text-slate-600 text-center">{schedules.length} activities</p>
              </div>

              {/* Schedule Cards */}
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <div key={schedule.id} className="group">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                      {/* Task Title */}
                      <h5 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
                        {schedule.title}
                      </h5>
                      
                      {/* Project/Location */}
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {schedule.project}
                      </p>
                      
                      {/* Assigned Person */}
                      <div className="flex items-center gap-1 mb-2">
                        <User className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-600">{schedule.assigned}</span>
                      </div>
                      
                      {/* Time */}
                      {schedule.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{schedule.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
            <p className="text-sm text-slate-500">Task distribution per team member</p>
          </div>
        </div>

        <div className="space-y-4">
          {teamWorkload.map((member) => {
            const completionPercentage = (member.completed / member.tasks) * 100;
            return (
              <div key={member.id} className="group">
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="text-2xl">{member.avatar}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{member.name}</div>
                      <div className="text-sm text-slate-600">{member.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-slate-900">{member.tasks}</div>
                      <div className="text-xs text-slate-600">total tasks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-600">{member.completed}</div>
                      <div className="text-xs text-slate-600">completed</div>
                    </div>
                    <div className="w-32">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500" 
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
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
