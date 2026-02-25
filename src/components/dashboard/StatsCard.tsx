'use client';

import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  dominant?: boolean;
  sparklineData?: number[];
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  dominant = false,
  sparklineData = [65, 70, 68, 75, 72, 78, 82, 80, 85, 88]
}: StatsCardProps) {
  const TrendIcon = changeType === 'positive' ? TrendingUp : TrendingDown;
  
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 hover:-translate-y-1 ${
      dominant ? 'shadow-lg bg-gradient-to-br from-white to-red-50/50' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className={`font-bold text-gray-900 mb-3 ${dominant ? 'text-3xl' : 'text-2xl'}`}>{value}</p>
          
          {/* Sparkline */}
          <div className="flex items-center gap-2 -mt-1">
            <svg width="60" height="20" className="opacity-60">
              <polyline
                fill="none"
                stroke={changeType === 'positive' ? '#10b981' : '#ef4444'}
                strokeWidth="2"
                points={sparklineData.map((val, i) => `${i * 6},${20 - val * 0.2}`).join(' ')}
              />
            </svg>
            <p className={`text-xs font-medium flex items-center gap-1 ${
              changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendIcon className="w-3 h-3" />
              {change}
            </p>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          dominant ? 'bg-red-500 shadow-lg' : 'bg-red-50'
        }`}>
          <Icon className={`w-6 h-6 ${dominant ? 'text-white' : 'text-red-500'}`} />
        </div>
      </div>
    </div>
  );
}
