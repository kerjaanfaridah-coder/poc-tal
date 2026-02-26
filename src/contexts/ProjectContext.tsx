'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'in-progress' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high';
  startDate: string;
  deadline: string;
  location: string;
  pm: string;
  pic: string;
  picRole: string;
  budget: number;
  team: string[];
  phases: Array<{
    id: string;
    name: string;
    owner: string;
    progress: number;
    status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  }>;
  pendingItems: Array<{
    id: string;
    itemName: string;
    dueDate: string;
    assignedPerson: string;
    completed: boolean;
  }>;
  issues: Array<{
    id: string;
    title: string;
    severity: 'low' | 'medium' | 'high';
    assignedTo: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
  }>;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Load projects from localStorage
const loadProjectsFromStorage = (): Project[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('projects');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
  }
  
  // Return default data if no stored data
  return [
    {
      id: '1',
      name: 'Mobile Banking App',
      description: 'Complete mobile banking application with secure transactions and user management',
      status: 'in-progress',
      priority: 'high',
      startDate: '2024-01-15',
      deadline: '2024-03-15',
      location: 'Jakarta',
      pm: 'John Doe',
      pic: 'Sarah Wilson',
      picRole: 'Project Manager',
      budget: 150000000,
      team: ['John Doe', 'Sarah Wilson', 'Mike Johnson', 'Emily Chen'],
      phases: [
        {
          id: 'phase-1',
          name: 'Phase 1 - Requirements',
          owner: 'John Doe',
          progress: 100,
          status: 'completed'
        },
        {
          id: 'phase-2',
          name: 'Phase 2 - Design',
          owner: 'Sarah Wilson',
          progress: 85,
          status: 'in-progress'
        },
        {
          id: 'phase-3',
          name: 'Phase 3 - Development',
          owner: 'Mike Johnson',
          progress: 60,
          status: 'in-progress'
        }
      ],
      pendingItems: [
        {
          id: 'pending-1',
          itemName: 'Security Audit',
          dueDate: '2024-02-20',
          assignedPerson: 'Emily Chen',
          completed: false
        },
        {
          id: 'pending-2',
          itemName: 'API Documentation',
          dueDate: '2024-02-25',
          assignedPerson: 'Mike Johnson',
          completed: false
        }
      ],
      issues: [
        {
          id: 'issue-1',
          title: 'Payment Gateway Integration',
          severity: 'high',
          assignedTo: 'Mike Johnson',
          status: 'in-progress'
        }
      ]
    },
    {
      id: '2',
      name: 'E-Commerce Platform',
      description: 'Modern e-commerce platform with inventory management and payment processing',
      status: 'in-progress',
      priority: 'medium',
      startDate: '2024-02-01',
      deadline: '2024-05-01',
      location: 'Surabaya',
      pm: 'Lisa Anderson',
      pic: 'Tom Wilson',
      picRole: 'Tech Lead',
      budget: 200000000,
      team: ['Lisa Anderson', 'Tom Wilson', 'David Lee', 'Jessica Brown'],
      phases: [
        {
          id: 'phase-1',
          name: 'Phase 1 - Planning',
          owner: 'Lisa Anderson',
          progress: 100,
          status: 'completed'
        },
        {
          id: 'phase-2',
          name: 'Phase 2 - Architecture',
          owner: 'Tom Wilson',
          progress: 75,
          status: 'in-progress'
        }
      ],
      pendingItems: [
        {
          id: 'pending-3',
          itemName: 'Database Schema Design',
          dueDate: '2024-02-15',
          assignedPerson: 'Tom Wilson',
          completed: false
        }
      ],
      issues: [
        {
          id: 'issue-2',
          title: 'Performance Optimization',
          severity: 'medium',
          assignedTo: 'David Lee',
          status: 'open'
        }
      ]
    },
    {
      id: '3',
      name: 'HR Management System',
      description: 'Comprehensive HR management system with payroll and attendance tracking',
      status: 'on-hold',
      priority: 'medium',
      startDate: '2024-01-10',
      deadline: '2024-04-10',
      location: 'Bandung',
      pm: 'Robert Taylor',
      pic: 'Amanda Martinez',
      picRole: 'HR Manager',
      budget: 80000000,
      team: ['Robert Taylor', 'Amanda Martinez', 'Chris Evans'],
      phases: [
        {
          id: 'phase-1',
          name: 'Phase 1 - Analysis',
          owner: 'Robert Taylor',
          progress: 90,
          status: 'in-progress'
        }
      ],
      pendingItems: [
        {
          id: 'pending-4',
          itemName: 'Legal Compliance Review',
          dueDate: '2024-02-10',
          assignedPerson: 'Amanda Martinez',
          completed: false
        }
      ],
      issues: []
    }
  ];
};

// Save projects to localStorage
const saveProjectsToStorage = (projects: Project[]) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('projects', JSON.stringify(projects));
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
  }
};

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);

  // Load projects from localStorage on mount
  useEffect(() => {
    const loadedProjects = loadProjectsFromStorage();
    setProjects(loadedProjects);
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    saveProjectsToStorage(projects);
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, projectData: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...projectData } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}
