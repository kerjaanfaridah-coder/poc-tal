'use client';

import { Calendar, AlertCircle, Clock } from 'lucide-react';

interface DeadlineItem {
  id: string;
  title: string;
  projectName: string;
  dueDate: string;
  urgency: 'urgent' | 'soon' | 'normal';
  assignee: string;
}

const deadlines: DeadlineItem[] = [
  {
    id: '1',
    title: 'Complete API integration',
    projectName: 'Mobile App Redesign',
    dueDate: 'Today, 5:00 PM',
    urgency: 'urgent',
    assignee: 'Sarah Chen'
  },
  {
    id: '2',
    title: 'Review design mockups',
    projectName: 'Website Revamp',
    dueDate: 'Tomorrow, 2:00 PM',
    urgency: 'urgent',
    assignee: 'Mike Johnson'
  },
  {
    id: '3',
    title: 'Submit Q4 report',
    projectName: 'Analytics Dashboard',
    dueDate: 'Dec 28, 11:59 PM',
    urgency: 'soon',
    assignee: 'Emma Davis'
  },
  {
    id: '4',
    title: 'Client presentation prep',
    projectName: 'Mobile App Redesign',
    dueDate: 'Dec 30, 10:00 AM',
    urgency: 'soon',
    assignee: 'Alex Kim'
  },
  {
    id: '5',
    title: 'Code review session',
    projectName: 'Backend Migration',
    dueDate: 'Jan 2, 3:00 PM',
    urgency: 'normal',
    assignee: 'Lisa Wang'
  }
];

const getUrgencyConfig = (urgency: DeadlineItem['urgency']) => {
  switch (urgency) {
    case 'urgent':
      return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-700',
        badge: 'bg-red-500 text-white',
        icon: AlertCircle,
        label: 'Urgent'
      };
    case 'soon':
      return {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-700',
        badge: 'bg-yellow-500 text-white',
        icon: Clock,
        label: 'Soon'
      };
    default:
      return {
        bg: 'bg-gray-50 border-gray-200',
        text: 'text-gray-700',
        badge: 'bg-gray-500 text-white',
        icon: Calendar,
        label: 'Normal'
      };
  }
};

export default function UpcomingDeadlines() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
        <button className="text-sm text-red-600 hover:text-red-700 font-medium mr-1">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {deadlines.map((deadline) => {
          const config = getUrgencyConfig(deadline.urgency);
          const Icon = config.icon;
          
          return (
            <div 
              key={deadline.id} 
              className={`p-4 rounded-lg border ${config.bg} hover:shadow-sm transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 truncate">
                    {deadline.title}
                  </h3>
                  <p className="text-xs text-gray-600 opacity-70">
                    {deadline.projectName}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.badge} flex-shrink-0`}>
                  {config.label}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-3 h-3 ${config.text}`} />
                  <span className={`text-xs font-medium ${config.text}`}>
                    {deadline.dueDate}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">
                      {deadline.assignee.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">
                    {deadline.assignee}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
