'use client';

import { CheckCircle, PlusCircle, Users, FileText, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'task' | 'project' | 'team' | 'document';
}

const activities: ActivityItem[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Chen',
      avatar: 'SC'
    },
    action: 'completed task',
    target: 'Update project documentation',
    timestamp: '2 minutes ago',
    type: 'task'
  },
  {
    id: '2',
    user: {
      name: 'Mike Johnson',
      avatar: 'MJ'
    },
    action: 'created project',
    target: 'Mobile App Redesign',
    timestamp: '15 minutes ago',
    type: 'project'
  },
  {
    id: '3',
    user: {
      name: 'Emma Davis',
      avatar: 'ED'
    },
    action: 'joined team',
    target: 'Development Team',
    timestamp: '1 hour ago',
    type: 'team'
  },
  {
    id: '4',
    user: {
      name: 'Alex Kim',
      avatar: 'AK'
    },
    action: 'uploaded document',
    target: 'Q4 Report.pdf',
    timestamp: '2 hours ago',
    type: 'document'
  },
  {
    id: '5',
    user: {
      name: 'Lisa Wang',
      avatar: 'LW'
    },
    action: 'updated task',
    target: 'Fix navigation bug',
    timestamp: '3 hours ago',
    type: 'task'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'task':
      return CheckCircle;
    case 'project':
      return PlusCircle;
    case 'team':
      return Users;
    case 'document':
      return FileText;
    default:
      return Clock;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'task':
      return 'text-green-500 bg-green-50';
    case 'project':
      return 'text-blue-500 bg-blue-50';
    case 'team':
      return 'text-purple-500 bg-purple-50';
    case 'document':
      return 'text-orange-500 bg-orange-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
};

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <button className="text-sm text-red-600 hover:text-red-700 font-medium mr-1">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          const iconColors = getActivityColor(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              {/* User Avatar */}
              <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                {activity.user.avatar}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${iconColors}`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user.name}</span>
                    <span className="text-gray-600"> {activity.action} </span>
                    <span className="font-medium">{activity.target}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
