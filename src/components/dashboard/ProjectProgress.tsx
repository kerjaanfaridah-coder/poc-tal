'use client';

import { ChevronDown, BarChart3 } from 'lucide-react';

export default function ProjectProgress() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Project Progress</h2>
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 mr-1">
          Last 7 days
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      {/* Skeleton Chart Style */}
      <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 relative overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full relative">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full border-t border-gray-300"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-full border-l border-gray-300"
                style={{ left: `${(i + 1) * 16.66}%` }}
              />
            ))}
          </div>
        </div>
        
        {/* Area Chart Skeleton */}
        <svg className="w-full h-full relative z-10" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Area */}
          <path
            d="M 0,160 Q 50,120 100,100 T 200,80 Q 250,70 300,90 T 400,60 L 400,200 L 0,200 Z"
            fill="url(#areaGradient)"
          />
          
          {/* Line */}
          <path
            d="M 0,160 Q 50,120 100,100 T 200,80 Q 250,70 300,90 T 400,60"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
          
          {/* Data Points */}
          {[0, 100, 200, 300, 400].map((x, i) => (
            <circle
              key={i}
              cx={x}
              cy={[160, 100, 80, 90, 60][i]}
              r="4"
              fill="#ef4444"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
        
        {/* Loading Animation */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Live data</span>
        </div>
      </div>
    </div>
  );
}
