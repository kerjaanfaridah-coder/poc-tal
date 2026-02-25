'use client';

import { useState } from 'react';
import { Plus, Search, Mail, Phone, MapPin, MoreHorizontal, Users, Crown, Shield } from 'lucide-react';

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Project Manager',
      department: 'Management',
      avatar: 'SC',
      status: 'Active',
      joinDate: '2022-03-15',
      projects: 8,
      performance: 95
    },
    {
      id: 2,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: 'MJ',
      status: 'Active',
      joinDate: '2021-07-20',
      projects: 12,
      performance: 88
    },
    {
      id: 3,
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      role: 'UX Designer',
      department: 'Design',
      avatar: 'ED',
      status: 'Active',
      joinDate: '2022-11-10',
      projects: 6,
      performance: 92
    },
    {
      id: 4,
      name: 'Alex Kim',
      email: 'alex.kim@company.com',
      role: 'Frontend Developer',
      department: 'Engineering',
      avatar: 'AK',
      status: 'On Leave',
      joinDate: '2023-01-05',
      projects: 4,
      performance: 85
    },
    {
      id: 5,
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      role: 'Backend Developer',
      department: 'Engineering',
      avatar: 'LW',
      status: 'Active',
      joinDate: '2022-09-12',
      projects: 10,
      performance: 90
    },
    {
      id: 6,
      name: 'Tom Wilson',
      email: 'tom.wilson@company.com',
      role: 'QA Engineer',
      department: 'Quality',
      avatar: 'TW',
      status: 'Active',
      joinDate: '2021-12-01',
      projects: 15,
      performance: 87
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 80) return 'text-blue-600';
    if (performance >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRoleIcon = (role: string) => {
    if (role.includes('Manager')) return Crown;
    if (role.includes('Lead') || role.includes('Senior')) return Shield;
    return Users;
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Team</h1>
            <p className="text-gray-600">Manage your team members and track their performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">18</p>
                  <p className="text-sm text-blue-600 mt-2">+2 new this month</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Now</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">15</p>
                  <p className="text-sm text-green-600 mt-2">83% active rate</p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Departments</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
                  <p className="text-sm text-gray-600 mt-2">Across teams</p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Performance</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">89%</p>
                  <p className="text-sm text-green-600 mt-2">+3% improvement</p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
                  <Users className="w-4 h-4" />
                  Departments
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Plus className="w-4 h-4" />
                  Add Member
                </button>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role);
              
              return (
                <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{member.department}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <RoleIcon className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Projects: {member.projects}</span>
                        <span className="text-gray-600">Joined: {member.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
    </div>
  );
}
