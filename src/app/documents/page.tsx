'use client';

import { useState } from 'react';
import { Search, Filter, Plus, FileText, Eye, Download, Edit, Upload, Calendar, Tag } from 'lucide-react';
import ConsistentLayout from '@/components/layout/ConsistentLayout';
import jsPDF from 'jspdf';

export default function DocumentsPage() {
  // Template data
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'BAST Template',
      description: 'Berita Acara Serah Terima Project',
      category: 'Handover',
      lastUpdated: 'Mar 12, 2026',
      fileName: 'bast-template.docx'
    }
  ]);

  // Modal state
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'Handover',
    description: '',
    fileName: ''
  });
  const [documentData, setDocumentData] = useState({
    projectName: '',
    clientName: '',
    location: '',
    completionDate: '',
    projectDescription: '',
    technicianTeam: '',
    systemInstalled: '',
    notes: '',
    clientRepresentative: '',
    companyPIC: ''
  });

  // Available projects data
  const availableProjects = [
    { id: '1', name: 'Home Theater – Thrisna Lounge', client: 'Thrisna Private Lounge', location: 'Jakarta', completionDate: '20 Mar 2026', pic: 'Jovan', technicians: 'Alwan, Robi, Andry' },
    { id: '2', name: 'Conference Room – Office Project', client: 'Tech Company Indonesia', location: 'Jakarta', completionDate: '15 Mar 2026', pic: 'Sujadi', technicians: 'Eka, Sopian' },
    { id: '3', name: 'Lighting Installation – Hotel', client: 'Grand Hotel Jakarta', location: 'Jakarta', completionDate: '10 Mar 2026', pic: 'Jovan', technicians: 'Alwan, Robi' }
  ];

  // Categories
  const categories = ['All', 'Handover', 'Technical', 'Client'];

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group templates by category
  const groupedTemplates = categories.filter(cat => cat !== 'All').map(category => ({
    category,
    templates: filteredTemplates.filter(template => template.category === category)
  }));

  // Add new template
  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.description && newTemplate.fileName) {
      const template = {
        id: Date.now().toString(),
        name: newTemplate.name,
        description: newTemplate.description,
        category: newTemplate.category,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        fileName: newTemplate.fileName
      };
      
      setTemplates([...templates, template]);
      setNewTemplate({ name: '', category: 'Handover', description: '', fileName: '' });
      setShowAddTemplateModal(false);
    }
  };

  // Preview template function
  const handlePreviewTemplate = (template: any) => {
    alert(`Preview functionality for ${template.name}\n\nThis will show a preview of the template layout and content structure.`);
  };

  // Edit template function
  const handleEditTemplate = (template: any) => {
    alert(`Edit functionality for ${template.name}\n\nThis will open an editor to modify the template content and structure.`);
  };
  const handleUseTemplate = (template: any) => {
    setSelectedTemplate(template);
    setShowDocumentModal(true);
    setSelectedProject('');
    setDocumentData({
      projectName: '',
      clientName: '',
      location: '',
      completionDate: '',
      projectDescription: '',
      technicianTeam: '',
      systemInstalled: '',
      notes: '',
      clientRepresentative: '',
      companyPIC: ''
    });
  };

  // Handle project selection
  const handleProjectSelection = (projectId: any) => {
    const project = availableProjects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(projectId);
      setDocumentData({
        projectName: project.name,
        clientName: project.client,
        location: project.location,
        completionDate: project.completionDate,
        projectDescription: '', // Using empty string since description property doesn't exist
        technicianTeam: project.technicians,
        systemInstalled: '', // Using empty string since type property doesn't exist
        notes: '',
        clientRepresentative: project.pic || '',
        companyPIC: ''
      });
    }
  };

  // Generate document function
  const handleGenerateDocument = () => {
    if (!selectedTemplate) {
      alert('Please select a template first');
      return;
    }
    
    const fileName = `${(selectedTemplate as any)?.name?.replace(' Template', '') || 'Document'} - ${documentData.projectName.replace(/\s+/g, ' ')} - ${documentData.completionDate}.pdf`;
    
    // Create PDF document
    const doc = new jsPDF();
    
    // Set font sizes and positions
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    
    // Company Header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('POC Technology', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Audio Visual & Lighting Solutions', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Document Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text((selectedTemplate as any)?.name?.toUpperCase() || 'DOCUMENT', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Document type specific content
    let documentContent = '';
    
    // Only BAST Template is available
    documentContent = generateBastContent();
    
    // Add document content
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitContent = doc.splitTextToSize(documentContent, pageWidth - 2 * margin);
    doc.text(splitContent, margin, yPosition);
    yPosition += splitContent.length * 7 + 20;
    
    // Signature Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SIGNATURE SECTION', margin, yPosition);
    yPosition += 10;
    
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 20;
    
    // Signature boxes
    const signatureWidth = 80;
    const signatureHeight = 40;
    const signatureY = yPosition;
    
    // Client Representative
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Client Representative:', margin, signatureY - 10);
    doc.rect(margin, signatureY, signatureWidth, signatureHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(documentData.clientRepresentative || '_________________', margin, signatureY + signatureHeight + 10);
    
    // Company Representative
    const companyX = pageWidth - margin - signatureWidth;
    doc.setFont('helvetica', 'bold');
    doc.text('Company Representative:', companyX, signatureY - 10);
    doc.rect(companyX, signatureY, signatureWidth, signatureHeight);
    doc.setFont('helvetica', 'normal');
    doc.text(documentData.companyPIC, companyX, signatureY + signatureHeight + 10);
    
    // Generated date at bottom
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: 'center' });
    
    // Save the PDF
    doc.save(fileName);
    
    alert(`${(selectedTemplate as any)?.name || 'Document'} PDF document generated: ${fileName}`);
    setShowDocumentModal(false);
  };

  // Content generator for BAST Template
  const generateBastContent = () => {
    return `
BERITA ACARA SERAH TERIMA

Pada hari ini telah dilakukan serah terima pekerjaan instalasi sistem sesuai dengan spesifikasi yang telah disepakati antara pihak penyedia jasa dan pihak klien.

PROJECT DETAILS
================

Project Name: ${documentData.projectName}
Client: ${documentData.clientName}
Location: ${documentData.location}
Completion Date: ${documentData.completionDate}
PIC: ${documentData.companyPIC}
Technician Team: ${documentData.technicianTeam}

SYSTEM INSTALLED
================

${documentData.systemInstalled}

PROJECT DESCRIPTION
==================

${documentData.projectDescription}

STATEMENT
=========

Pekerjaan telah diselesaikan dengan baik dan sistem telah diuji serta berfungsi sesuai spesifikasi.

NOTES
=====

${documentData.notes}
    `;
  };

  // Get category color
  const getCategoryColor = (category: any) => {
    if (!category) return 'bg-gray-100 text-gray-800 border-gray-200';
    switch(category) {
      case 'Handover': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Technical': return 'bg-green-100 text-green-800 border-green-200';
      case 'Client': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ConsistentLayout 
      title="Documents" 
      subtitle="Manage document templates for project handover and technical documentation"
    >
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search template name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Template Button */}
        <button
          onClick={() => setShowAddTemplateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>

      {/* Template Categories */}
      <div className="space-y-8">
        {groupedTemplates.map(({ category, templates }) => (
          templates.length > 0 && (
            <div key={category}>
              {/* Category Title */}
              <h3 className="text-lg font-semibold text-slate-900 mb-4">{category} Documents</h3>
              
              {/* Template Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                    {/* Template Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-base leading-tight">{template.name}</h4>
                        <p className="text-sm text-slate-600 leading-tight mt-1">{template.description}</p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(template.category)}`}>
                        <Tag className="w-3 h-3 mr-1" />
                        {template.category}
                      </span>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <Calendar className="w-3 h-3" />
                      Updated {template.lastUpdated}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePreviewTemplate(template)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </button>
                      <button 
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <Download className="w-3 h-3" />
                        Use Template
                      </button>
                      <button 
                        onClick={() => handleEditTemplate(template)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Add Template Modal */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Template</h3>
            
            <div className="space-y-4">
              {/* Template Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Template Name</label>
                <input
                  type="text"
                  placeholder="BAST Template"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
                <select
                  value={newTemplate.category}
                  onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Handover">Handover</option>
                  <option value="Technical">Technical</option>
                  <option value="Client">Client</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter template description..."
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Upload File */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Upload Template File</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-1">Drop file here or click to upload</p>
                  <p className="text-xs text-slate-500">Allowed files: .docx, .pdf, .xlsx</p>
                  <input
                    type="file"
                    accept=".docx,.pdf,.xlsx"
                    onChange={(e) => setNewTemplate({...newTemplate, fileName: e.target.files?.[0]?.name || ''})}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-block mt-2 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors"
                  >
                    Choose File
                  </label>
                  {newTemplate.fileName && (
                    <p className="text-xs text-slate-600 mt-2">Selected: {newTemplate.fileName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddTemplateModal(false);
                  setNewTemplate({ name: '', category: 'Handover', description: '', fileName: '' });
                }}
                className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTemplate}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm"
              >
                Add Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Generation Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Generate Document</h3>
            
            <div className="space-y-4">
              {/* Project Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => handleProjectSelection(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a project...</option>
                  {availableProjects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
              </div>

              {/* Project Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={documentData.projectName}
                  onChange={(e) => setDocumentData({...documentData, projectName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Client Name</label>
                <input
                  type="text"
                  value={documentData.clientName}
                  onChange={(e) => setDocumentData({...documentData, clientName: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  value={documentData.location}
                  onChange={(e) => setDocumentData({...documentData, location: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Completion Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Completion Date</label>
                <input
                  type="text"
                  value={documentData.completionDate}
                  onChange={(e) => setDocumentData({...documentData, completionDate: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Project Description</label>
                <textarea
                  value={documentData.projectDescription}
                  onChange={(e) => setDocumentData({...documentData, projectDescription: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Technician Team */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Technician Team</label>
                <input
                  type="text"
                  value={documentData.technicianTeam}
                  onChange={(e) => setDocumentData({...documentData, technicianTeam: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* System Installed */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">System Installed</label>
                <textarea
                  value={documentData.systemInstalled}
                  onChange={(e) => setDocumentData({...documentData, systemInstalled: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Notes / Remarks</label>
                <textarea
                  value={documentData.notes}
                  onChange={(e) => setDocumentData({...documentData, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              {/* Signature Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Client Representative</label>
                  <input
                    type="text"
                    value={documentData.clientRepresentative}
                    onChange={(e) => setDocumentData({...documentData, clientRepresentative: e.target.value})}
                    placeholder="Enter client representative name"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Company PIC</label>
                  <input
                    type="text"
                    value={documentData.companyPIC}
                    onChange={(e) => setDocumentData({...documentData, companyPIC: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDocumentModal(false);
                  setSelectedTemplate(null);
                  setSelectedProject('');
                }}
                className="flex-1 px-4 py-2 text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateDocument}
                disabled={!selectedProject || !documentData.projectName || !selectedTemplate}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate {(selectedTemplate as any)?.name ? (selectedTemplate as any).name.replace(' Template', '') : 'Document'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConsistentLayout>
  );
}
