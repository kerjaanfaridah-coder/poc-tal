'use client';

import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import DeleteConfirmModal from '@/components/ui/DeleteConfirmModal';

interface WeeklySchedule {
  id: string;
  memberId: string;
  projectName: string;
  task: string;
  startDate: string;
  endDate: string;
  hours: number;
  priority: string;
  status: string;
}

interface TeamWorkload {
  memberId: string;
  memberName: string;
  totalHours: number;
  projectCount: number;
  taskCount: number;
  schedules: WeeklySchedule[];
}

export default function TeamPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weeklySchedules, setWeeklySchedules] = useState<WeeklySchedule[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; projectName: string } | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    memberId: '',
    projectName: '',
    task: '',
    startDate: '',
    endDate: '',
    hours: 0,
    priority: 'medium',
    status: 'planned'
  });

  // Load schedules from localStorage on mount
  useEffect(() => {
    const savedSchedules = localStorage.getItem('weeklySchedules');
    if (savedSchedules) {
      try {
        const parsedSchedules = JSON.parse(savedSchedules);
        setWeeklySchedules(parsedSchedules);
      } catch (error) {
        console.error('Error loading schedules from localStorage:', error);
      }
    }
  }, []);

  // Save schedules to localStorage whenever they change
  useEffect(() => {
    if (weeklySchedules.length > 0) {
      localStorage.setItem('weeklySchedules', JSON.stringify(weeklySchedules));
    }
  }, [weeklySchedules]);

  // Sample data
  const teamMembers = [
    { id: '1', name: 'Jovan', role: 'Senior Engineer' },
    { id: '2', name: 'Alwan', role: 'Lighting Engineer' },
    { id: '3', name: 'Robi', role: 'Audio Visual Engineer' },
    { id: '4', name: 'Sujadi', role: 'Site Coordinator' },
    { id: '5', name: 'Andre', role: 'Technician' },
    { id: '6', name: 'Eka', role: 'Technician' },
    { id: '7', name: 'Sopian', role: 'Technician' },
    { id: '8', name: 'Sobirin', role: 'Technician' },
    { id: '9', name: 'Puji', role: 'Technician' }
  ];

  const projects = [
    { id: '1', name: 'Website Redesign' },
    { id: '2', name: 'Mobile App' },
    { id: '3', name: 'Database Migration' },
    { id: '4', name: 'API Development' }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getWeekRange = () => {
    const startOfWeek = new Date(currentWeek);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return `${startOfWeek.toLocaleDateString('en-US', options)} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const handleAddSchedule = () => {
    if (newSchedule.memberId && newSchedule.projectName && newSchedule.task && newSchedule.startDate && newSchedule.endDate && newSchedule.hours > 0) {
      const schedule: WeeklySchedule = {
        id: Date.now().toString(),
        ...newSchedule
      };
      setWeeklySchedules([...weeklySchedules, schedule]);
      setNewSchedule({
        memberId: '',
        projectName: '',
        task: '',
        startDate: '',
        endDate: '',
        hours: 0,
        priority: 'medium',
        status: 'planned'
      });
      setShowAddForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDeleteSchedule = (id: string) => {
    const schedule = weeklySchedules.find(s => s.id === id);
    
    if (schedule) {
      setDeleteConfirm({
        id: schedule.id,
        projectName: schedule.projectName
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      setWeeklySchedules(weeklySchedules.filter(schedule => schedule.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  // Calculate team workload
  const calculateTeamWorkload = (): TeamWorkload[] => {
    const workloadMap = new Map<string, TeamWorkload>();

    teamMembers.forEach(member => {
      workloadMap.set(member.id, {
        memberId: member.id,
        memberName: member.name,
        totalHours: 0,
        projectCount: 0,
        taskCount: 0,
        schedules: []
      });
    });

    weeklySchedules.forEach(schedule => {
      const workload = workloadMap.get(schedule.memberId);
      if (workload) {
        workload.totalHours += schedule.hours;
        workload.taskCount += 1;
        workload.schedules.push(schedule);
        
        const uniqueProjects = new Set(workload.schedules.map(s => s.projectName));
        workload.projectCount = uniqueProjects.size;
      }
    });

    return Array.from(workloadMap.values()).filter(w => w.totalHours > 0);
  };

  const teamWorkload = calculateTeamWorkload();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Team</h1>
        <p className="text-base text-gray-500 mt-2">
          Manage and track your team schedules and workload
        </p>
      </div>

      {/* Week Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Schedule Team Weekly
          </h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateWeek('prev')}
              className="text-red-500"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 px-3 py-1 rounded-md bg-gray-50">
              {getWeekRange()}
            </span>
            <button 
              onClick={() => navigateWeek('next')}
              className="text-red-500"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Schedule
        </button>
      </div>

      {/* Add Schedule Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Member</label>
              <select
                value={newSchedule.memberId}
                onChange={(e) => setNewSchedule({ ...newSchedule, memberId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select member...</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={newSchedule.projectName}
                onChange={(e) => setNewSchedule({ ...newSchedule, projectName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter project name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task</label>
              <input
                type="text"
                value={newSchedule.task}
                onChange={(e) => setNewSchedule({ ...newSchedule, task: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter task description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={newSchedule.startDate}
                onChange={(e) => setNewSchedule({ ...newSchedule, startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={newSchedule.endDate}
                onChange={(e) => setNewSchedule({ ...newSchedule, endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                type="number"
                min="0.5"
                max="24"
                step="0.5"
                value={newSchedule.hours}
                onChange={(e) => setNewSchedule({ ...newSchedule, hours: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={newSchedule.priority}
                onChange={(e) => setNewSchedule({ ...newSchedule, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newSchedule.status}
                onChange={(e) => setNewSchedule({ ...newSchedule, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                setShowAddForm(false);
                setNewSchedule({
                  memberId: '',
                  projectName: '',
                  task: '',
                  startDate: '',
                  endDate: '',
                  hours: 0,
                  priority: 'medium',
                  status: 'planned'
                });
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSchedule}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Save Schedule
            </button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {weeklySchedules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No schedules added yet</p>
          </div>
        ) : (
          <div>
            {/* HEADER ROW */}
            <div className="grid grid-cols-[180px_220px_2fr_120px_120px_70px_100px_100px_60px] gap-4 items-center pb-3 border-b border-gray-100 text-sm font-bold text-gray-700">
              <div>Team Member</div>
              <div>Project</div>
              <div>Task</div>
              <div>Start Date</div>
              <div>End Date</div>
              <div>Hours</div>
              <div>Priority</div>
              <div>Status</div>
              <div></div>
            </div>

            {/* LIST ROWS */}
            {weeklySchedules.map((schedule) => {
              const member = teamMembers.find(m => m.id === schedule.memberId);
              
              return (
                <div 
                  key={schedule.id} 
                  className="grid grid-cols-[180px_220px_2fr_120px_120px_70px_100px_100px_60px] gap-4 items-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* COL 1: Avatar + Member Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-normal flex-shrink-0">
                      {member?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-normal text-gray-900 truncate">{member?.name}</span>
                  </div>

                  {/* COL 2: Project Name */}
                  <div className="text-sm font-normal text-gray-900 truncate">
                    {schedule.projectName}
                  </div>

                  {/* COL 3: Task Title */}
                  <div className="text-sm font-normal text-gray-900 truncate" title={schedule.task}>
                    {schedule.task}
                  </div>

                  {/* COL 4: Start Date */}
                  <div className="text-sm text-gray-500">
                    {schedule.startDate}
                  </div>

                  {/* COL 5: End Date */}
                  <div className="text-sm text-gray-500">
                    {schedule.endDate}
                  </div>

                  {/* COL 6: Hours */}
                  <div className="text-sm text-gray-500">
                    {schedule.hours}h
                  </div>

                  {/* COL 7: Priority Badge */}
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600">
                      {schedule.priority.charAt(0).toUpperCase() + schedule.priority.slice(1)}
                    </span>
                  </div>

                  {/* COL 8: Status Badge */}
                  <div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>

                  {/* COL 9: Delete Button */}
                  <div>
                    <button
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete schedule"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Team Workload Section */}
      {teamWorkload.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Workload Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamWorkload.map((workload) => (
              <div key={workload.memberId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {workload.memberName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{workload.memberName}</h3>
                      <p className="text-xs text-gray-500">{teamMembers.find(m => m.id === workload.memberId)?.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Hours:</span>
                    <span className="text-sm font-semibold text-gray-900">{workload.totalHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Projects:</span>
                    <span className="text-sm font-medium text-gray-900">{workload.projectCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasks:</span>
                    <span className="text-sm font-medium text-gray-900">{workload.taskCount}</span>
                  </div>
                </div>

                {/* Workload Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Workload</span>
                    <span className="text-xs text-gray-500">{Math.round((workload.totalHours / 40) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        workload.totalHours > 40 ? 'bg-red-500' : 
                        workload.totalHours > 30 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((workload.totalHours / 40) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Based on 40h/week</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        projectName={deleteConfirm?.projectName || ''}
      />
    </div>
  );
}
