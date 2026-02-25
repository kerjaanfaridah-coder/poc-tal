'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/forms/ProjectForm';
import { Card, CardContent } from '@/components/ui/card';
import { useProjects } from '@/contexts/ProjectContext';
import PageHeader from '@/components/ui/PageHeader';

export default function NewProjectPage() {
  const router = useRouter();
  const { addProject } = useProjects();

  const handleProjectSubmit = (project: any) => {
    console.log('New project created:', project);
    
    // Add project to global state
    addProject(project);
    
    // Redirect to projects page
    router.push('/projects');
  };

  const handleProjectCancel = () => {
    router.push('/projects');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <PageHeader 
        title="Add New Project" 
        subtitle="Create a new project with our guided workflow"
      />

      <ProjectForm
        onSubmit={handleProjectSubmit}
        onCancel={handleProjectCancel}
      />
    </div>
  );
}
