'use client';

import { useState } from 'react';
import { Plus, Search, Filter, Users, Mail, Phone, MapPin, Calendar, Star, Trophy, ArrowUpRight, TrendingUp, MoreHorizontal, Crown, Shield, Zap, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ConsistentLayout from '@/components/layout/ConsistentLayout';

export default function TeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const router = useRouter();

  // Sample team members data
  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Project Manager',
      department: 'Management',
      avatar: 'JD',
      joinDate: '2023-01-15',
      status: 'active',
      projects: 8,
      tasksCompleted: 142,
      performance: 98,
      location: 'New York, USA',
      phone: '+1 (555) 123-4567',
      skills: ['Leadership', 'Planning', 'Communication'],
      availability: 'available'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Senior Developer',
      department: 'Engineering',
      avatar: 'SJ',
      joinDate: '2023-03-20',
      status: 'active',
      projects: 6,
      tasksCompleted: 189,
      performance: 95,
      location: 'San Francisco, USA',
      phone: '+1 (555) 234-5678',
      skills: ['React', 'Node.js', 'TypeScript', 'Python'],
      availability: 'busy'
    },
    {
      id: '3',
      name: 'Mike Kim',
      email: 'mike.kim@company.com',
      role: 'UX Designer',
      department: 'Design',
      avatar: 'MK',
      joinDate: '2023-02-10',
      status: 'active',
      projects: 5,
      tasksCompleted: 156,
      performance: 92,
      location: 'Los Angeles, USA',
      phone: '+1 (555) 345-6789',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      availability: 'available'
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Marketing Manager',
      department: 'Marketing',
      avatar: 'ED',
      joinDate: '2023-04-05',
      status: 'active',
      projects: 4,
      tasksCompleted: 134,
      performance: 88,
      location: 'Chicago, USA',
      phone: '+1 (555) 456-7890',
      skills: ['SEO', 'Content Strategy', 'Analytics', 'Social Media'],
      availability: 'available'
    },
    {
      id: '5',
      name: 'Tom Wilson',
      email: 'tom.wilson@company.com',
      role: 'DevOps Engineer',
      department: 'Engineering',
      avatar: 'TW',
      joinDate: '2023-05-12',
      status: 'active',
      projects: 7,
      tasksCompleted: 167,
      performance: 91,
      location: 'Seattle, USA',
      phone: '+1 (555) 567-8901',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      availability: 'busy'
    },
    {
      id: '6',
      name: 'Lisa Chen',
      email: 'lisa.chen@company.com',
      role: 'Product Designer',
      department: 'Design',
      avatar: 'LC',
      joinDate: '2023-06-18',
      status: 'away',
      projects: 3,
      tasksCompleted: 98,
      performance: 87,
      location: 'Boston, USA',
      phone: '+1 (555) 678-9012',
      skills: ['UI Design', 'User Research', 'Wireframing', 'Design Systems'],
      availability: 'away'
    }
  ];

  const handleNewMember = () => {
    router.push('/team/new');
  };

  const handleDeleteMember = (memberId: string, memberName: string) => {
    if (confirm(`Are you sure you want to remove "${memberName}" from the team? This action cannot be undone.`)) {
      // Handle delete logic here
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role.toLowerCase().includes(selectedRole.toLowerCase());
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'away': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'busy': return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'away': return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      default: return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'away': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 95) return { color: 'bg-red-100 text-red-800 border-red-200', icon: <Crown className="w-3 h-3" />, text: 'Top Performer' };
    if (performance >= 90) return { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <Star className="w-3 h-3" />, text: 'Excellent' };
    if (performance >= 85) return { color: 'bg-green-100 text-green-800 border-green-200', icon: <Trophy className="w-3 h-3" />, text: 'Great' };
    return { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: <Target className="w-3 h-3" />, text: 'Good' };
  };

  return (
    <ConsistentLayout 
      title="Team" 
      subtitle="Manage your team members and track their performance"
      currentPage="team"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{teamMembers.length}</p>
                <p className="text-sm text-slate-600 font-medium">Total Members</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+3</p>
                <p className="text-xs text-slate-500">this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
                <p className="text-sm text-slate-600 font-medium">Active Now</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+2</p>
                <p className="text-xs text-slate-500">vs yesterday</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {teamMembers.filter(m => m.performance >= 90).length}
                </p>
                <p className="text-sm text-slate-600 font-medium">Top Performers</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+15%</p>
                <p className="text-xs text-slate-500">vs last month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length)}%
                </p>
                <p className="text-sm text-slate-600 font-medium">Avg Performance</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-600">+5%</p>
                <p className="text-xs text-slate-500">vs last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-80"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all duration-200 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              {['all', 'management', 'engineering', 'design', 'marketing'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedRole === role
                      ? 'bg-white text-red-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleNewMember}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => {
          const performanceBadge = getPerformanceBadge(member.performance);
          return (
            <div key={member.id} className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                      {getStatusIcon(member.status)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(member.availability)}`}>
                    {member.availability.charAt(0).toUpperCase() + member.availability.slice(1)}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${performanceBadge.color}`}>
                    {performanceBadge.icon}
                    {performanceBadge.text}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {member.joinDate}</span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Projects</span>
                  <span className="font-medium text-slate-900">{member.projects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Tasks Completed</span>
                  <span className="font-medium text-slate-900">{member.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Performance</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${member.performance}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-slate-900">{member.performance}%</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-slate-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 rounded-lg text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Department:</span>
                  <span className="font-medium text-slate-700">{member.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id, member.name)}
                    className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No team members found</h3>
          <p className="text-slate-600 mb-6">Get started by adding your first team member</p>
          <button
            onClick={handleNewMember}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            Add Member
          </button>
        </div>
      )}
    </ConsistentLayout>
  );
}
