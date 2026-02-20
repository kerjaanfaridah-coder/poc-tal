'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SidebarItem {
  id: string
  label: string
  icon: string
  href: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    href: '/dashboard'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '📁',
    href: '/',
    children: [
      {
        id: 'projects-list',
        label: 'All Projects',
        icon: '📋',
        href: '/'
      },
      {
        id: 'add-project',
        label: 'Add Project',
        icon: '➕',
        href: '/projects/add'
      }
    ]
  },
  {
    id: 'schedule',
    label: 'Schedule Team Project',
    icon: '📅',
    href: '/schedule'
  }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen flex flex-col transition-all duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center pt-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src="/Logo POC Technology Black.png" 
              alt="POC Technology Logo" 
              className="h-12 w-auto max-w-[160px]"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200"></div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expandedItems.includes(item.id)
            
            return (
              <div key={item.id}>
                <motion.button
                  onClick={() => {
                    if (hasChildren) {
                      toggleExpanded(item.id)
                    } else {
                      router.push(item.href)
                    }
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 h-11 rounded-xl text-left transition-all duration-200 shadow-sm hover:shadow-md",
                    isActive(item.href)
                      ? "bg-red-600 text-white shadow-lg shadow-red-500/20"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <span className="font-medium text-sm flex-1">{item.label}</span>
                  {hasChildren && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
                
                {/* Submenu */}
                {hasChildren && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 mt-1"
                  >
                    {item.children?.map((child) => (
                      <motion.button
                        key={child.id}
                        onClick={() => router.push(child.href)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 h-10 rounded-lg text-left transition-all duration-200",
                          isActive(child.href)
                            ? "bg-red-100 text-red-700"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span className="text-xs">{child.icon}</span>
                        </div>
                        <span className="font-medium text-sm">{child.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7 7" />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>© 2024 POC Technology</p>
          <p>Project Management System</p>
        </div>
      </div>
    </div>
  )
}
