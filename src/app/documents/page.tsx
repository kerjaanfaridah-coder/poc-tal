'use client';

import { useState } from 'react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Download,
  Folder,
  File,
  Calendar,
  User,
  Clock,
  BarChart3,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function DocumentsPage() {
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock document templates data
  const [templates] = useState([
    {
      id: '1',
      name: 'BAST',
      description: 'Berita Acara Serah Terima',
      category: 'Project Handover',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-10',
      usageCount: 45,
      icon: '📋'
    },
    {
      id: '2',
      name: 'Service Report',
      description: 'Laporan hasil pekerjaan service',
      category: 'Service',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-08',
      usageCount: 32,
      icon: '🔧'
    },
    {
      id: '3',
      name: 'Inspection Report',
      description: 'Laporan hasil inspeksi',
      category: 'Inspection',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-12',
      usageCount: 28,
      icon: '🔍'
    },
    {
      id: '4',
      name: 'Installation Report',
      description: 'Laporan instalasi peralatan',
      category: 'Service',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-05',
      usageCount: 15,
      icon: '⚙️'
    },
    {
      id: '5',
      name: 'Handover Document',
      description: 'Dokumen serah terima',
      category: 'Project Handover',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-09',
      usageCount: 22,
      icon: '📄'
    },
    {
      id: '6',
      name: 'Maintenance Report',
      description: 'Laporan maintenance rutin',
      category: 'Service',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-11',
      usageCount: 18,
      icon: '🛠️'
    },
    {
      id: '7',
      name: 'Safety Report',
      description: 'Laporan keselamatan kerja',
      category: 'Inspection',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-07',
      usageCount: 12,
      icon: '⚠️'
    },
    {
      id: '8',
      name: 'Quality Control',
      description: 'Dokumen quality control',
      category: 'Inspection',
      fields: ['Project Name', 'Client', 'Location', 'Date', 'PIC'],
      lastUpdated: '2024-03-06',
      usageCount: 20,
      icon: '✅'
    }
  ]);

  // Mock statistics
  const totalTemplates = templates.length;
  const documentsGenerated = 156;
  const mostUsedTemplate = templates.reduce((prev, current) => 
    current.usageCount > prev.usageCount ? current : prev
  );
  const lastGenerated = '2024-03-15';

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories
  const categories = ['all', 'Project Handover', 'Service', 'Inspection'];

  return (
    <ConsistentLayout 
      title="Documents" 
      subtitle="Create and manage reusable document templates for your projects."
    >
      {/* Page Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
            <p className="text-sm text-slate-600">Create and manage reusable document templates for your projects.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          
          <button
            onClick={() => setShowNewTemplateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{totalTemplates}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Total Templates</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">available</p>
                <p className="text-sm font-bold text-blue-600">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <Download className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{documentsGenerated}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Documents Generated</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">total</p>
                <p className="text-sm font-bold text-green-600">Generated</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{mostUsedTemplate.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Most Used Template</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{mostUsedTemplate.usageCount} uses</p>
                <p className="text-sm font-bold text-purple-600">Popular</p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{lastGenerated}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-600 font-semibold">Last Generated</p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">date</p>
                <p className="text-sm font-bold text-orange-600">Recent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm font-medium text-slate-700">Category:</span>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      {/* Document Templates Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Document Templates</h3>
            <p className="text-sm text-slate-500">Reusable templates for generating project documents</p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                {/* Template Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{template.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-base leading-tight">{template.name}</h4>
                    <p className="text-xs text-slate-600 leading-tight mt-1">{template.description}</p>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                    {template.category}
                  </span>
                </div>

                {/* Fields */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-2">Fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.map((field, index) => (
                      <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Updated: {template.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <BarChart3 className="w-3 h-3" />
                    <span>{template.usageCount} uses</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-50 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                    <Download className="w-3 h-3" />
                    <span>Generate</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Template Modal */}
      {showNewTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">New Document Template</h3>
              <button
                onClick={() => setShowNewTemplateModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ❌
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Template Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template name..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter template description..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
                <select className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Project Handover">Project Handover</option>
                  <option value="Service">Service</option>
                  <option value="Inspection">Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Icon</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter emoji icon..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNewTemplateModal(false)}
                className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowNewTemplateModal(false)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsistentLayout>
  );
}
