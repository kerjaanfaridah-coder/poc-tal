'use client';

import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Calendar, 
  FileText, 
  Settings 
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-200">
        <img
          src="/poc-technology-black.png"
          alt="POC Technology"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <li key={index}>
                <button
                  onClick={() => handleMenuClick(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">JD</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
