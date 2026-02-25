'use client';

import { MoreHorizontal, PieChart } from 'lucide-react';

export default function TaskDistribution() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Task Distribution</h2>
        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg mr-1">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Skeleton Chart Style */}
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 relative overflow-hidden">
        {/* Pie Chart Skeleton */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Pie Chart */}
          <g transform="translate(120, 100)">
            {/* Segment 1 - 40% */}
            <path
              d="M 0,0 L 60,0 A 60,60 0 0,1 18.54,57.06 Z"
              fill="url(#gradient1)"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            
            {/* Segment 2 - 30% */}
            <path
              d="M 0,0 L 18.54,57.06 A 60,60 0 0,1 -48.54,35.27 Z"
              fill="url(#gradient2)"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            
            {/* Segment 3 - 20% */}
            <path
              d="M 0,0 L -48.54,35.27 A 60,60 0 0,1 -48.54,-35.27 Z"
              fill="url(#gradient3)"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
            
            {/* Segment 4 - 10% */}
            <path
              d="M 0,0 L -48.54,-35.27 A 60,60 0 0,1 60,0 Z"
              fill="url(#gradient4)"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          </g>
          
          {/* Legend */}
          <g transform="translate(220, 60)">
            <rect x="0" y="0" width="12" height="12" fill="url(#gradient1)" rx="2" />
            <text x="18" y="10" className="text-xs fill-gray-700">Development (40%)</text>
            
            <rect x="0" y="20" width="12" height="12" fill="url(#gradient2)" rx="2" />
            <text x="18" y="30" className="text-xs fill-gray-700">Design (30%)</text>
            
            <rect x="0" y="40" width="12" height="12" fill="url(#gradient3)" rx="2" />
            <text x="18" y="50" className="text-xs fill-gray-700">Testing (20%)</text>
            
            <rect x="0" y="60" width="12" height="12" fill="url(#gradient4)" rx="2" />
            <text x="18" y="70" className="text-xs fill-gray-700">Review (10%)</text>
          </g>
        </svg>
        
        {/* Loading Animation */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Real-time</span>
        </div>
      </div>
    </div>
  );
}
