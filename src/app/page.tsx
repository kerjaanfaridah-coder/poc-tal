'use client';

import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function DashboardPage() {
  return (
    <ConsistentLayout title="Dashboard" subtitle="Welcome back! Here's what's happening with your projects today.">
      {/* Empty Dashboard */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-12 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 text-slate-400">📊</div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Dashboard Coming Soon</h3>
        <p className="text-slate-600">Dashboard content is being prepared</p>
      </div>
    </ConsistentLayout>
  );
}
