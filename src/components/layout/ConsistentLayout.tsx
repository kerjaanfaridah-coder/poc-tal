'use client';

interface ConsistentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showSidebar?: boolean;
  currentPage?: string;
}

export default function ConsistentLayout({ 
  children, 
  title, 
  subtitle, 
  showSidebar = true, 
  currentPage = 'overview' 
}: ConsistentLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
              {subtitle && <p className="text-slate-600">{subtitle}</p>}
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-red-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-red-50 transition-all duration-200 flex items-center gap-2">
                Settings
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2">
                Quick Action
              </button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
