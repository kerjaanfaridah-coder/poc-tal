'use client';

import { useState } from 'react';
import { Calendar, Users, Clock, User, Activity, CheckCircle, Target, TrendingUp, Plus, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TeamPage() {
  // Week navigation state
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  // Calculate week dates
  const getWeekDates = (offset: number = 0) => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1 + (offset * 7)); // Adjust to Monday
    
    const weekDates = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push({
        day: days[i],
        date: date,
        dateString: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    
    return weekDates;
  };

  const currentWeekDates = getWeekDates(currentWeekOffset);

  // Real-time team schedule data
  const [teamScheduleData, setTeamScheduleData] = useState({
    Monday: [
      { id: '1', title: 'Morning Standup', project: 'Conference Room A', assigned: 'Sarah Johnson', time: '09:00 – 09:30', date: 'Mar 11' },
      { id: '2', title: 'Client Presentation', project: 'Board Room', assigned: 'John Doe', time: '10:00 – 11:30', date: 'Mar 11' },
      { id: '3', title: 'Code Review', project: 'Development Team', assigned: 'Mike Chen', time: '14:00 – 15:00', date: 'Mar 11' }
    ],
    Tuesday: [
      { id: '4', title: 'Design Review', project: 'Design Lab', assigned: 'Emily Davis', time: '10:00 – 11:00', date: 'Mar 12' },
      { id: '5', title: 'Sprint Planning', project: 'Meeting Room B', assigned: 'John Doe', time: '13:00 – 14:30', date: 'Mar 12' },
      { id: '6', title: 'Security Audit', project: 'Server Room', assigned: 'IT Team', time: '15:00 – 17:00', date: 'Mar 12' }
    ],
    Wednesday: [
      { id: '7', title: 'Product Demo', project: 'Client Office', assigned: 'Sarah Johnson', time: '11:00 – 12:00', date: 'Mar 13' },
      { id: '8', title: 'Team Building', project: 'Activity Center', assigned: 'All Team', time: '14:00 – 16:00', date: 'Mar 13' }
    ],
    Thursday: [
      { id: '9', title: 'Stakeholder Meeting', project: 'Executive Office', assigned: 'John Doe', time: '09:00 – 10:30', date: 'Mar 14' },
      { id: '10', title: 'Performance Review', project: 'HR Department', assigned: 'Emily Davis', time: '13:00 – 15:00', date: 'Mar 14' },
      { id: '11', title: 'Infrastructure Update', project: 'Data Center', assigned: 'IT Team', time: '16:00 – 18:00', date: 'Mar 14' }
    ],
    Friday: [
      { id: '12', title: 'Weekly Retrospective', project: 'Team Room', assigned: 'All Team', time: '10:00 – 11:00', date: 'Mar 15' },
      { id: '13', title: 'Client Workshop', project: 'Training Room', assigned: 'Mike Chen', time: '13:00 – 16:00', date: 'Mar 15' },
      { id: '14', title: 'Deploy Production', project: 'Production Server', assigned: 'DevOps Team', time: '17:00 – 19:00', date: 'Mar 15' }
    ],
    Saturday: [
      { id: '15', title: 'System Maintenance', project: 'Server Room', assigned: 'IT Team', time: '08:00 – 12:00', date: 'Mar 16' }
    ],
    Sunday: []
  });

  // Add schedule modal state
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    title: '',
    project: '',
    assigned: '',
    time: '',
    day: 'Monday'
  });

  // Real-time team workload data
  const [teamWorkload, setTeamWorkload] = useState([
    { id: '1', name: 'Sarah Johnson', role: 'Senior Developer', tasks: 8, completed: 5, avatar: '�‍�', status: 'active' },
    { id: '2', name: 'John Doe', role: 'Project Manager', tasks: 12, completed: 9, avatar: '�‍�', status: 'active' },
    { id: '3', name: 'Mike Chen', role: 'UI/UX Designer', tasks: 6, completed: 4, avatar: '🎨', status: 'active' },
    { id: '4', name: 'Emily Davis', role: 'QA Engineer', tasks: 10, completed: 7, avatar: '🔍', status: 'active' },
    { id: '5', name: 'Alex Turner', role: 'DevOps Engineer', tasks: 15, completed: 12, avatar: '🔧', status: 'active' },
    { id: '6', name: 'Lisa Wang', role: 'Product Owner', tasks: 5, completed: 3, avatar: '�', status: 'active' }
  ]);

  // Calculate summary stats
  const totalMembers = teamWorkload.length;
  const totalActivities = Object.values(teamScheduleData).reduce((sum, day) => sum + day.length, 0);

  // Format week range display
  const formatWeekRange = () => {
    const startDate = currentWeekDates[0].date;
    const endDate = currentWeekDates[6].date;
    const startFormat = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endFormat = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startFormat} – ${endFormat}`;
  };

  // Add new schedule function
  const handleAddSchedule = () => {
    if (newSchedule.title && newSchedule.project && newSchedule.assigned) {
      const scheduleId = `schedule-${Date.now()}`;
      const dayIndex = currentWeekDates.findIndex(d => d.day === newSchedule.day);
      const scheduleDate = dayIndex >= 0 ? currentWeekDates[dayIndex].dateString : 'TBD';
      
      const scheduleToAdd = {
        id: scheduleId,
        title: newSchedule.title,
        project: newSchedule.project,
        assigned: newSchedule.assigned,
        time: newSchedule.time || 'TBD',
        date: scheduleDate
      };

      setTeamScheduleData(prev => {
        // Ensure the day array exists
        const currentDaySchedules = prev[newSchedule.day as keyof typeof prev] || [];
        return {
          ...prev,
          [newSchedule.day]: [...currentDaySchedules, scheduleToAdd]
        };
      });

      // Reset form and close modal
      setNewSchedule({
        title: '',
        project: '',
        assigned: '',
        time: '',
        day: 'Monday'
      });
      setShowAddScheduleModal(false);
    }
  };

  
  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentWeekOffset(prev => prev - 1);
  };

  const goToNextWeek = () => {
    setCurrentWeekOffset(prev => prev + 1);
  };

  const goToCurrentWeek = () => {
    setCurrentWeekOffset(0);
  };

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
              <p className="text-3xl font-bold text-slate-900">{totalActivities}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Total Activities</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">this week</p>
                <p className="text-sm font-bold text-purple-600">Active</p>
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
              <p className="text-3xl font-bold text-slate-900">{totalMembers}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Team Members</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">available</p>
                <p className="text-sm font-bold text-orange-600">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Schedule Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        {/* Header with Week Navigation */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Team Schedule</h3>
                <p className="text-sm text-slate-500">{formatWeekRange()}</p>
              </div>
            </div>
            
            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousWeek}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={goToCurrentWeek}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentWeekOffset === 0 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Current Week
              </button>
              <button
                onClick={goToNextWeek}
                className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
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
            <button 
              onClick={() => setShowAddScheduleModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Schedule
            </button>
          </div>
        </div>

        {/* Board Layout */}
        <div className="grid grid-cols-7 gap-3">
          {currentWeekDates.map((weekDay) => (
            <div key={weekDay.day} className="min-h-[400px]">
              {/* Column Header */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-3 mb-3">
                <h4 className="font-semibold text-slate-900 text-center">{weekDay.day}</h4>
                <p className="text-xs text-slate-600 text-center">{weekDay.dateString}</p>
                <p className="text-xs text-slate-500 text-center mt-1">
                  {teamScheduleData[weekDay.day as keyof typeof teamScheduleData]?.length || 0} activities
                </p>
              </div>

              {/* Schedule Cards */}
              <div className="space-y-3">
                {(teamScheduleData[weekDay.day as keyof typeof teamScheduleData] || []).map((schedule) => (
                  <div key={schedule.id} className="group">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer relative">
                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          const daySchedules = teamScheduleData[weekDay.day as keyof typeof teamScheduleData] || [];
                          
                          setTeamScheduleData(prev => ({
                            ...prev,
                            [weekDay.day]: daySchedules.filter(s => s.id !== schedule.id)
                          }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        🗑️
                      </button>
                      
                      {/* Task Title */}
                      <h5 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 pr-8">
                        {schedule.title}
                      </h5>
                      
                      {/* Project/Location */}
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {schedule.project}
                      </p>
                      
                      {/* Date */}
                      <div className="flex items-center gap-1 mb-2">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-600">{schedule.date}</span>
                      </div>
                      
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

      
      {/* Add Schedule Modal */}
      {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">Add New Schedule</h3>
              <button
                onClick={() => setShowAddScheduleModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ❌
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Task Title</label>
                <input
                  type="text"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Project/Location</label>
                <input
                  type="text"
                  value={newSchedule.project}
                  onChange={(e) => setNewSchedule({...newSchedule, project: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project or location..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  value={newSchedule.assigned}
                  onChange={(e) => setNewSchedule({...newSchedule, assigned: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter assignee name..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Time (Optional)</label>
                <input
                  type="text"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 09:00 – 11:00"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Day</label>
                <select
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({...newSchedule, day: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddScheduleModal(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchedule}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg"
              >
                Add Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsistentLayout>
  );
}
