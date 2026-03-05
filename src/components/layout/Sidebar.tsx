'use client';

import { 
  Home, 
  Users, 
  FolderKanban, 
  CheckSquare, 
  LayoutDashboard,
  FileText
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: CheckSquare, label: 'Tasks', href: '/tasks' },
  { icon: Users, label: 'Team', href: '/team' },
  { icon: FileText, label: 'Documents', href: '/documents' },
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
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold border border-red-200'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-900 font-medium'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-left">{item.label}</span>
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
