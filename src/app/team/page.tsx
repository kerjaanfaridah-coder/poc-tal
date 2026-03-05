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

  // Empty team schedule data
  const [teamScheduleData, setTeamScheduleData] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  // Add schedule modal state
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    projectName: '',
    title: '',
    location: '',
    assigned: [],
    date: '',
    time: ''
  });
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [assigneeSearch, setAssigneeSearch] = useState('');

  // Real-time team workload data
  const [teamWorkload, setTeamWorkload] = useState([
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

  // Calculate summary stats
  const totalMembers = teamWorkload.length;
  const totalActivities = Object.values(teamScheduleData).reduce((sum, day) => sum + day.length, 0);
  
  // Define weekly capacity
  const WEEKLY_CAPACITY = 10;

  // Calculate real-time workload for each team member
  const calculateMemberWorkload = (memberId) => {
    let taskCount = 0;
    
    // Count tasks assigned to this member from all schedules
    Object.values(teamScheduleData).forEach(daySchedules => {
      daySchedules.forEach(schedule => {
        if (schedule.assigned.includes(memberId)) {
          taskCount++;
        }
      });
    });
    
    return taskCount;
  };

  // Calculate total tasks in the week
  const totalWeeklyTasks = Object.values(teamScheduleData).reduce((sum, daySchedules) => sum + daySchedules.length, 0);

  // Update team workload with real-time data
  const updatedTeamWorkload = teamWorkload.map(member => ({
    ...member,
    tasks: calculateMemberWorkload(member.name)
  }));

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
    if (newSchedule.projectName && newSchedule.title && newSchedule.location && newSchedule.assigned.length > 0 && newSchedule.date) {
      const scheduleId = `schedule-${Date.now()}`;
      
      // Auto-detect day from date
      const selectedDate = new Date(newSchedule.date);
      const dayIndex = selectedDate.getDay();
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const detectedDay = days[dayIndex];
      
      // Format date for display
      const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // Get assigned member names
      const assignedNames = newSchedule.assigned.map(memberId => {
        const member = teamWorkload.find(m => m.id === memberId);
        return member ? member.name : '';
      }).filter(name => name).join(', ');
      
      const scheduleToAdd = {
        id: scheduleId,
        title: newSchedule.title,
        project: newSchedule.projectName,
        location: newSchedule.location,
        assigned: assignedNames,
        date: formattedDate,
        time: newSchedule.time || 'TBD'
      };

      setTeamScheduleData(prev => {
        // Ensure the day array exists
        const currentDaySchedules = prev[detectedDay as keyof typeof prev] || [];
        return {
          ...prev,
          [detectedDay]: [...currentDaySchedules, scheduleToAdd]
        };
      });

      // Reset form and close modal
      setNewSchedule({
        projectName: '',
        title: '',
        location: '',
        assigned: [],
        date: '',
        time: ''
      });
      setShowAssigneeDropdown(false);
      setAssigneeSearch('');
      setShowAddScheduleModal(false);
    }
  };

  // Helper functions for assignee management
  const handleAddAssignee = (memberId) => {
    if (newSchedule.assigned.length >= 3) {
      alert('Maximum 3 team members per schedule.');
      return;
    }
    if (!newSchedule.assigned.includes(memberId)) {
      setNewSchedule({...newSchedule, assigned: [...newSchedule.assigned, memberId]});
    }
    setShowAssigneeDropdown(false);
    setAssigneeSearch('');
  };

  const handleRemoveAssignee = (memberId) => {
    setNewSchedule({...newSchedule, assigned: newSchedule.assigned.filter(id => id !== memberId)});
  };

  const getFilteredTeamMembers = () => {
    return teamWorkload.filter(member => 
      member.name.toLowerCase().includes(assigneeSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(assigneeSearch.toLowerCase())
    );
  };

  const getSelectedAssignees = () => {
    return newSchedule.assigned.map(memberId => {
      const member = teamWorkload.find(m => m.id === memberId);
      return member || null;
    }).filter(Boolean);
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
                      
                      {/* Project Name */}
                      <h4 className="font-bold text-slate-900 text-xs mb-1 pr-8">
                        {schedule.project}
                      </h4>
                      
                      {/* Task Title */}
                      <h5 className="font-medium text-slate-800 text-xs mb-3 line-clamp-2 pr-8">
                        {schedule.title}
                      </h5>
                      
                      {/* Location */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-slate-500">📍</span>
                        <span className="text-xs text-slate-600">{schedule.location}</span>
                      </div>
                      
                      {/* Assigned Person */}
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-xs text-slate-500">👤</span>
                        <span className="text-xs text-slate-600">{schedule.assigned}</span>
                      </div>
                      
                      {/* Time */}
                      {schedule.time && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-slate-500">🕒</span>
                          <span className="text-xs text-slate-600">{schedule.time}</span>
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
            <h3 className="text-xl font-semibold text-slate-900">Team Members</h3>
            <p className="text-sm text-slate-500">Team workload and task distribution</p>
          </div>
        </div>

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
                <label className="block text-xs font-bold text-slate-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={newSchedule.projectName}
                  onChange={(e) => setNewSchedule({...newSchedule, projectName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name..."
                />
              </div>

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
                <label className="block text-xs font-bold text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newSchedule.location}
                  onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Assigned To</label>
                <div className="space-y-2">
                  {/* Selected Assignees */}
                  <div className="flex flex-wrap gap-2">
                    {getSelectedAssignees().map((member) => (
                      <div key={member.id} className="inline-flex items-center gap-1 bg-slate-100 rounded-lg px-2 py-1 text-xs">
                        <span className="w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{member.avatar}</span>
                        </span>
                        <span className="text-slate-700">{member.name}</span>
                        <button
                          onClick={() => handleRemoveAssignee(member.id)}
                          className="text-slate-400 hover:text-red-500 ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {newSchedule.assigned.length < 3 && (
                      <button
                        onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
                        className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 rounded-lg px-2 py-1 text-xs hover:bg-blue-100 transition-colors"
                      >
                        <span>+</span>
                        <span>Add member</span>
                      </button>
                    )}
                  </div>

                  {/* Dropdown */}
                  {showAssigneeDropdown && (
                    <div className="relative">
                      <div className="absolute z-10 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-hidden">
                        {/* Search */}
                        <div className="p-2 border-b border-slate-200">
                          <input
                            type="text"
                            placeholder="Search team member..."
                            value={assigneeSearch}
                            onChange={(e) => setAssigneeSearch(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        </div>
                        
                        {/* Team Members List */}
                        <div className="max-h-32 overflow-y-auto">
                          {getFilteredTeamMembers().map((member) => (
                            <button
                              key={member.id}
                              onClick={() => handleAddAssignee(member.id)}
                              className="w-full flex items-center gap-3 p-2 hover:bg-slate-50 transition-colors text-left"
                              disabled={newSchedule.assigned.includes(member.id)}
                            >
                              <span className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-xs">{member.avatar}</span>
                              </span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-slate-900">{member.name}</div>
                                <div className="text-xs text-slate-600">{member.role}</div>
                              </div>
                              {newSchedule.assigned.includes(member.id) && (
                                <span className="text-xs text-green-600">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
