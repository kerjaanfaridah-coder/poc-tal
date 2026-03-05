'use client';

import { useState } from 'react';
import { Calendar, Users, Clock, User, Activity } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TeamPage() {
  // Simple team schedule data
  const teamSchedule = [
    { id: '1', day: 'Monday', date: '2024-03-11', activities: 4 },
    { id: '2', day: 'Tuesday', date: '2024-03-12', activities: 4 },
    { id: '3', day: 'Wednesday', date: '2024-03-13', activities: 4 },
    { id: '4', day: 'Thursday', date: '2024-03-14', activities: 4 },
    { id: '5', day: 'Friday', date: '2024-03-15', activities: 4 }
  ];

  // Simple team workload data
  const teamWorkload = [
    { id: '1', name: 'John Doe', role: 'Project Manager', tasks: 12, completed: 8 },
    { id: '2', name: 'Sarah Johnson', role: 'Senior Developer', tasks: 18, completed: 12 },
    { id: '3', name: 'Mike Chen', role: 'UI/UX Designer', tasks: 15, completed: 10 },
    { id: '4', name: 'Emily Davis', role: 'QA Engineer', tasks: 20, completed: 15 }
  ];

  return (
    <ConsistentLayout title="Team" subtitle="Team schedule and workload overview">
      {/* Team Schedule Section */}
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Schedule</h2>
          <p className="text-slate-600">Weekly team activities</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <div className="grid grid-cols-5 gap-4">
            {teamSchedule.map((day) => (
              <div key={day.id} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="font-semibold text-slate-900">{day.day}</div>
                <div className="text-sm text-slate-600 mb-2">{day.date}</div>
                <div className="text-2xl font-bold text-red-500">{day.activities}</div>
                <div className="text-xs text-slate-600">activities</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Workload Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Team Workload</h2>
          <p className="text-slate-600">Task distribution per team member</p>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6">
          <div className="space-y-4">
            {teamWorkload.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="font-semibold text-slate-900">{member.name}</div>
                  <div className="text-sm text-slate-600">{member.role}</div>
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
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(member.completed / member.tasks) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsistentLayout>
  );
}
