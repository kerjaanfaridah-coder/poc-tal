'use client';

import StatsCard from '@/components/dashboard/StatsCard';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import TaskDistribution from '@/components/dashboard/TaskDistribution';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';
import PageHeader from '@/components/ui/PageHeader';
import { 
  FolderKanban, 
  CheckSquare, 
  Users, 
  TrendingUp 
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your projects and tasks"
      />
      
      {/* Stats Cards Grid - First card dominant */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Projects"
          value="24"
          change="+12% from last month"
          changeType="positive"
          icon={FolderKanban}
          dominant={true}
        />
        <StatsCard
          title="Active Tasks"
          value="142"
          change="+8% from last month"
          changeType="positive"
          icon={CheckSquare}
        />
        <StatsCard
          title="Team Members"
          value="18"
          change="+2% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Completion Rate"
          value="87%"
          change="+5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Main Content Grid - Charts + Activity + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8">
        {/* Charts Section - 8 columns */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectProgress />
            <TaskDistribution />
          </div>
          
          {/* Recent Activity - Full width below charts */}
          <RecentActivity />
        </div>

        {/* Upcoming Deadlines - 4 columns */}
        <div className="lg:col-span-4">
          <UpcomingDeadlines />
        </div>
      </div>
    </div>
  );
}
