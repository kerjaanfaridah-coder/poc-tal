'use client';

import { 
  BarChart4, 
  TrendingUp, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Calendar,
  Activity,
  Target,
  AlertTriangle,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ChevronRight,
  Plus,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function DashboardPage() {
  const router = useRouter();

  // Sample data for dashboard overview
  const projectsOverview = {
    total: 24,
    active: 8,
    completed: 12,
    onHold: 4
  };

  const tasksOverview = {
    total: 156,
    inProgress: 45,
    completed: 89,
    overdue: 22
  };

  const teamOverview = {
    totalMembers: 12,
    activeMembers: 10,
    workloadDistribution: [
      { name: 'John Doe', workload: 75 },
      { name: 'Sarah Johnson', workload: 89 },
      { name: 'Mike Chen', workload: 83 },
      { name: 'Emily Davis', workload: 90 }
    ]
  };

  const projectsByDeadline = [
    { month: 'January', count: 3 },
    { month: 'February', count: 5 },
    { month: 'March', count: 4 },
    { month: 'April', count: 2 },
    { month: 'May', count: 7 }
  ];

  const upcomingSchedule = [
    { type: 'task', title: 'Complete API Documentation', date: '2024-03-12', priority: 'high' },
    { type: 'deadline', title: 'Website Redesign Project', date: '2024-03-15', priority: 'medium' },
    { type: 'meeting', title: 'Team Standup Meeting', date: '2024-03-13', priority: 'low' },
    { type: 'task', title: 'Code Review for Feature X', date: '2024-03-14', priority: 'high' }
  ];

  const analyticsSnapshot = {
    productivity: 87,
    efficiency: 92,
    completionRate: 78,
    teamSatisfaction: 85
  };

  const recentReports = [
    { title: 'Monthly Performance Report', date: '2024-03-01', type: 'performance' },
    { title: 'Project Status Summary', date: '2024-02-28', type: 'project' },
    { title: 'Team Workload Analysis', date: '2024-02-25', type: 'workload' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getScheduleIcon = (type: string) => {
    switch (type) {
      case 'task': return CheckSquare;
      case 'deadline': return Clock;
      case 'meeting': return Users;
      default: return Calendar;
    }
  };

  return (
    <ConsistentLayout title="Dashboard" subtitle="Central overview of your entire system">
      {/* Row 1: Projects Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Projects Overview</h2>
          <button
            onClick={() => router.push('/projects')}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            View all projects
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{projectsOverview.total}</div>
            <div className="text-sm text-slate-600">Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Active</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{projectsOverview.active}</div>
            <div className="text-sm text-slate-600">Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{projectsOverview.completed}</div>
            <div className="text-sm text-slate-600">Projects</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-slate-600">On Hold</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{projectsOverview.onHold}</div>
            <div className="text-sm text-slate-600">Projects</div>
          </div>
        </div>
      </div>

      {/* Row 2: Tasks Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Tasks Overview</h2>
          <button
            onClick={() => router.push('/tasks')}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            View all tasks
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-slate-600">Total</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{tasksOverview.total}</div>
            <div className="text-sm text-slate-600">Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-slate-600">In Progress</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{tasksOverview.inProgress}</div>
            <div className="text-sm text-slate-600">Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-slate-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{tasksOverview.completed}</div>
            <div className="text-sm text-slate-600">Tasks</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-slate-600">Overdue</span>
            </div>
            <div className="text-2xl font-bold text-slate-900">{tasksOverview.overdue}</div>
            <div className="text-sm text-slate-600">Tasks</div>
          </div>
        </div>
      </div>

      {/* Row 3: Projects by Deadline Month */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Projects by Deadline</h2>
          <button
            onClick={() => router.push('/projects')}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            View projects
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-4">
            {projectsByDeadline.map((month) => (
              <div key={month.month} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="font-medium text-slate-900">{month.month}</div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(month.count / 7) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-20 text-right">{month.count} projects</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Team Workload */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Team Workload</h2>
          <button
            onClick={() => router.push('/team')}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            View team details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{teamOverview.totalMembers}</div>
              <div className="text-sm text-slate-600">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{teamOverview.activeMembers}</div>
              <div className="text-sm text-slate-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round((teamOverview.activeMembers / teamOverview.totalMembers) * 100)}%</div>
              <div className="text-sm text-slate-600">Active Rate</div>
            </div>
          </div>
          <div className="space-y-3">
            {teamOverview.workloadDistribution.map((member) => (
              <div key={member.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900 w-32">{member.name}</span>
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        member.workload >= 90 ? 'bg-red-500' :
                        member.workload >= 75 ? 'bg-orange-500' :
                        member.workload >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${member.workload}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-12 text-right">{member.workload}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5: Upcoming Schedule */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Upcoming Schedule</h2>
          <button
            onClick={() => router.push('/calendar')}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            View calendar
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="space-y-3">
            {upcomingSchedule.map((item, index) => {
              const Icon = getScheduleIcon(item.type);
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="text-sm text-slate-600">{item.date}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 6: Analytics Snapshot + Reports Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analytics Snapshot */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Analytics Snapshot</h2>
            <button
              onClick={() => router.push('/analytics')}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              View analytics
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analyticsSnapshot.productivity}%</div>
                <div className="text-sm text-slate-600">Productivity</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analyticsSnapshot.efficiency}%</div>
                <div className="text-sm text-slate-600">Efficiency</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analyticsSnapshot.completionRate}%</div>
                <div className="text-sm text-slate-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{analyticsSnapshot.teamSatisfaction}%</div>
                <div className="text-sm text-slate-600">Team Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Summary */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Recent Reports</h2>
            <button
              onClick={() => router.push('/reports')}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
            >
              View all reports
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{report.title}</div>
                      <div className="text-sm text-slate-600">{report.date}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded">
                    {report.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsistentLayout>
  );
}
