'use client';

import { Search, Bell, Plus, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();

  const handleNewProject = () => {
    router.push('/projects/new');
  };

  return (
    <div className="h-20 bg-white flex items-center justify-end px-6 ml-64">
      <div className="flex items-center gap-4">
        {/* Search Bar - Reduced width */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects, tasks, team..."
            className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-64"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* New Project Button */}
        <button 
          onClick={handleNewProject}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>

        {/* User Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">JD</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
              
              <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </button>
              
              <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <div className="mt-1 pt-1">
                <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
