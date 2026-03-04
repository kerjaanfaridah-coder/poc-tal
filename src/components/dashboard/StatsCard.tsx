'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  dominant?: boolean;
  glassmorphism?: boolean;
  sparklineData?: number[];
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  dominant = false,
  glassmorphism = false,
  sparklineData = [65, 70, 68, 75, 72, 78, 82, 80, 85, 88]
}: StatsCardProps) {
  const TrendIcon = changeType === 'positive' ? TrendingUp : TrendingDown;
  
  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
      glassmorphism 
        ? 'bg-white bg-opacity-80 backdrop-blur-lg border border-white border-opacity-20 shadow-lg hover:shadow-xl' 
        : `bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 ${
            dominant ? 'shadow-lg bg-gradient-to-br from-white to-red-50/50' : ''
          }`
    }`}>
      {/* Glassmorphism overlay effect */}
      {glassmorphism && (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent opacity-60 pointer-events-none"></div>
      )}
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium mb-2 ${
            glassmorphism ? 'text-gray-700' : 'text-gray-600'
          }`}>{title}</p>
          <p className={`font-bold mb-3 ${
            dominant ? 'text-3xl' : 'text-2xl'
          } ${
            glassmorphism ? 'text-gray-900' : 'text-gray-900'
          }`}>{value}</p>
          
          {/* Modern Sparkline */}
          <div className="flex items-center gap-2 -mt-1">
            <div className="relative">
              <svg width="60" height="20" className="opacity-60">
                <defs>
                  <linearGradient id={`gradient-${changeType}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={changeType === 'positive' ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={changeType === 'positive' ? '#10b981' : '#ef4444'} stopOpacity="1" />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke={`url(#gradient-${changeType})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={sparklineData.map((val, i) => `${i * 6},${20 - val * 0.2}`).join(' ')}
                />
              </svg>
              {/* Glow effect */}
              <div className={`absolute inset-0 blur-sm ${
                changeType === 'positive' ? 'bg-green-400' : 'bg-red-400'
              } opacity-20`}></div>
            </div>
            <p className={`text-xs font-medium flex items-center gap-1 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendIcon className="w-3 h-3" />
              {change}
            </p>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          glassmorphism 
            ? 'bg-white bg-opacity-50 backdrop-blur-sm border border-white border-opacity-30 shadow-md'
            : dominant 
              ? 'bg-red-500 shadow-lg' 
              : 'bg-red-50'
        }`}>
          <Icon className={`w-6 h-6 transition-colors duration-300 ${
            glassmorphism 
              ? 'text-red-500' 
              : dominant 
                ? 'text-white' 
                : 'text-red-500'
          }`} />
        </div>
      </div>
    </div>
  );
}
