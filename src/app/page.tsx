"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { addProject as addProjectToFirebase, updateProject, deleteProject as deleteProjectFromFirebase } from "@/lib/firestore";
import { RealtimeIndicator } from "@/components/RealtimeIndicator";
import { useFirebase } from "@/components/FirebaseProvider";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface Note {
  text: string;
  status: "done" | "progress" | "problem";
  due: string;
  notes?: string;
  service?: string;
  createdAt?: Date;
}

interface Project {
  id?: string;
  name: string;
  location: string;
  pm: string;
  pic: string;
  picRole: string;
  due: string;
  notes: Note[];
  createdAt?: Date;
  updatedAt?: Date;
}

const initialProjects: Project[] = [
  {
    name: "Thrisna Private Lounge",
    location: "Jakarta",
    pm: "Bapak Andi",
    pic: "Pak Jhon",
    picRole: "Technician",
    due: "12 Feb 2026",
    notes: [
      { text: "Buat dudukan speaker L-CENTER-R", status: "done", due: "10 Feb 2026" },
      { text: "Perlu Multiplex 18mm ukuran 80x50", status: "progress", due: "11 Feb 2026" },
      { text: "Cek bracket Atmos Krix", status: "problem", due: "12 Feb 2026" },
    ],
  },
];

function getProjectStatus(project: Project): "done" | "progress" | "urgent" {
  if (!project.notes.length) return "progress";
  const allDone = project.notes.every((n) => n.status === "done");
  const hasProblem = project.notes.some((n) => n.status === "problem");
  if (allDone) return "done";
  if (hasProblem) return "urgent";
  return "progress";
}

function StatusBadge({ status }: { status: string }) {
  if (status === "urgent") return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">Urgent</Badge>;
  if (status === "done") return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">Done</Badge>;
  return <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0 shadow-lg">Progress</Badge>;
}

function TaskBadge({ status }: { status: string }) {
  if (status === "done") return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md text-xs">Done</Badge>;
  if (status === "problem") return <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-md text-xs">Problem</Badge>;
  return <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white border-0 shadow-md text-xs">Progress</Badge>;
}

function isLate(taskDue: string, projectDue: string): boolean {
  if (!taskDue || !projectDue) return false;
  const task = new Date(taskDue);
  const project = new Date(projectDue);
  return task > project;
}

function hasLateTask(project: Project): boolean {
  if (!project?.notes?.length) return false;
  return project.notes.some((n) => isLate(n.due, project.due));
}

export default function DashboardDemo() {
  const { user, loading: authLoading, logout } = useAuth();
  const { projects, loading, error } = useFirebase();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    location: "",
    pm: "",
    due: "",
    pic: "",
    picRole: "",
  });

  const [initialTasks, setInitialTasks] = useState<Note[]>([]);
  const [newInitialTask, setNewInitialTask] = useState("");
  const [initialTaskStatus, setInitialTaskStatus] = useState<"done" | "progress" | "problem">("progress");
  const [initialTaskDue, setInitialTaskDue] = useState("");
  const [initialTaskNotes, setInitialTaskNotes] = useState("");
  const [initialTaskService, setInitialTaskService] = useState("");
  const [initialTaskUrgency, setInitialTaskUrgency] = useState("medium");

  const [newTask, setNewTask] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskService, setTaskService] = useState("");
  const [taskStatus, setTaskStatus] = useState<"done" | "progress" | "problem">("progress");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  function handleAddProject() {
    if (!form.name) return;

    const newProject = {
      name: form.name,
      location: form.location,
      pm: form.pm,
      due: form.due,
      pic: form.pic,
      picRole: form.picRole,
      notes: initialTasks,
    };

    addProjectToFirebase(newProject);
    setShowAddForm(false);
    setForm({ name: "", location: "", pm: "", due: "", pic: "", picRole: "" });
    setInitialTasks([]);
    setNewInitialTask("");
    setInitialTaskStatus("progress");
    setInitialTaskDue("");
    setInitialTaskNotes("");
  }

  function addInitialTask() {
    if (!newInitialTask.trim()) return;
    const task: Note = {
      text: newInitialTask,
      status: initialTaskStatus,
      due: initialTaskDue,
      notes: initialTaskNotes,
      service: initialTaskUrgency
    };
    setInitialTasks([...initialTasks, task]);
    setNewInitialTask("");
    setInitialTaskDue("");
    setInitialTaskNotes("");
    setInitialTaskStatus("progress");
    setInitialTaskUrgency("medium");
  }

  function removeInitialTask(index: number) {
    setInitialTasks(initialTasks.filter((_, i) => i !== index));
  }

  function updateInitialTaskStatus(index: number, status: "done" | "progress" | "problem") {
    const updatedTasks = [...initialTasks];
    updatedTasks[index].status = status;
    setInitialTasks(updatedTasks);
  }

  function addTask() {
    if (!newTask.trim() || !selectedProject) return;

    const updatedProject = {
      ...selectedProject,
      notes: [...selectedProject.notes, { text: newTask, status: taskStatus, due: taskDue, service: taskService }],
    };

    updateProject(selectedProject.id!, updatedProject);
    setNewTask("");
    setTaskDue("");
    setTaskNotes("");
    setTaskService("");
    setTaskStatus("progress");
  }

  function updateTaskStatus(index: number, value: "done" | "progress" | "problem") {
    if (!selectedProject) return;
    const updatedNotes = [...selectedProject.notes];
    updatedNotes[index].status = value;
    updateProject(selectedProject.id!, { ...selectedProject, notes: updatedNotes });
  }

  function deleteTask(index: number) {
    if (!selectedProject) return;
    const updatedNotes = selectedProject.notes.filter((_, i) => i !== index);
    updateProject(selectedProject.id!, { ...selectedProject, notes: updatedNotes });
  }

  function deleteProject(id: string) {
    if (!id) return;
    deleteProjectFromFirebase(id);
    if (selectedProject?.id === id) setSelectedProject(null);
  }

  function exportToPDF() {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("POCTAL - Laporan Keseluruhan", 14, 20);
    
    // Add export date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 30);
    
    let yPosition = 50;
    
    projects.forEach((project, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Project header
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${project.name}`, 14, yPosition);
      
      // Project details
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      yPosition += 10;
      doc.text(`Location: ${project.location}`, 20, yPosition);
      yPosition += 6;
      doc.text(`PM: ${project.pm}`, 20, yPosition);
      yPosition += 6;
      doc.text(`PIC: ${project.pic} (${project.picRole})`, 20, yPosition);
      yPosition += 6;
      doc.text(`Due Date: ${project.due}`, 20, yPosition);
      yPosition += 6;
      
      const projectStatus = getProjectStatus(project);
      let statusColor = [0, 0, 0];
      if (projectStatus === "done") statusColor = [0, 128, 0];
      else if (projectStatus === "progress") statusColor = [255, 165, 0];
      else if (projectStatus === "urgent") statusColor = [255, 0, 0];
      
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(`Status: ${projectStatus.toUpperCase()}`, 20, yPosition);
      doc.setTextColor(0, 0, 0);
      
      yPosition += 10;
      
      // Tasks
      if (project.notes.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Tasks:", 20, yPosition);
        yPosition += 8;
        
        project.notes.forEach((note, taskIndex) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.text(`${taskIndex + 1}. ${note.text}`, 25, yPosition);
          
          // Task status and due date
          let taskStatusColor = [0, 0, 0];
          if (note.status === "done") taskStatusColor = [0, 128, 0];
          else if (note.status === "progress") taskStatusColor = [255, 165, 0];
          else if (note.status === "problem") taskStatusColor = [255, 0, 0];
          
          doc.setTextColor(taskStatusColor[0], taskStatusColor[1], taskStatusColor[2]);
          doc.text(`[${note.status.toUpperCase()}]`, 140, yPosition);
          
          doc.setTextColor(100, 100, 100);
          doc.text(`Due: ${note.due}`, 170, yPosition);
          
          // Check if late
          const taskIsLate = isLate(note.due, project.due);
          if (taskIsLate) {
            doc.setTextColor(255, 0, 0);
            doc.text("(LATE)", 220, yPosition);
          }
          
          doc.setTextColor(0, 0, 0);
          yPosition += 6;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text("No tasks assigned", 25, yPosition);
      }
      
      yPosition += 15;
    });
    
    // Save the PDF
    doc.save(`poctal-projects-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-800 text-lg">Loading from Firebase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">Error loading data: {error}</p>
          <Button onClick={() => window.location.reload()} className="bg-red-700 hover:bg-red-800 text-white">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
      <header className="mb-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="w-16 h-16 flex items-center justify-center"
              >
                <img src="/logo-poc.png" alt="Dashboard Project POC Technology Logo" className="w-16 h-16 object-contain" />
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">Dashboard Project POC Technology</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
                <Button 
                  onClick={exportToPDF}
                  className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
                >
                  📄 Export
                </Button>
                <Button 
                  onClick={logout}
                  className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
                >
                  Logout
                </Button>
              </div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <RealtimeIndicator />
          </div>
        </motion.div>
      </header>
      
      {!selectedProject && (
        <>
         
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-slate-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">Total Project</p>
                    <div className="w-8 h-8 bg-gray-900/20 rounded-lg flex items-center justify-center border border-gray-900/30">
                      <span className="text-white text-sm font-bold">📊</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{projects.length}</h2>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">Progress</p>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                      <span className="text-amber-400 text-sm font-bold">⏳</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{projects.filter((p)=>getProjectStatus(p)==="progress").length}</h2>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">Urgent</p>
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                      <span className="text-red-400 text-sm font-bold">🚨</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{projects.filter((p)=>getProjectStatus(p)==="urgent").length}</h2>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">Done</p>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                      <span className="text-green-400 text-sm font-bold">✅</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{projects.filter((p)=>getProjectStatus(p)==="done").length}</h2>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-2xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Project List</h3>
                  <Button 
                    size="sm" 
                    onClick={()=>setShowAddForm(!showAddForm)}
                    className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
                  >
                    + Add Project
                  </Button>
                </div>

                {showAddForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600"
                  >
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Project Name</label>
                      <input 
                        className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                        value={form.name} 
                        onChange={(e)=>setForm({...form,name:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Location</label>
                      <input 
                        className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                        value={form.location} 
                        onChange={(e)=>setForm({...form,location:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Project Manager</label>
                      <input 
                        className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                        value={form.pm} 
                        onChange={(e)=>setForm({...form,pm:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Due Date</label>
                      <input 
                        type="date"
                        className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                        value={form.due} 
                        onChange={(e)=>setForm({...form,due:e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">PIC</label>
                      <input className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" value={form.pic} onChange={(e)=>setForm({...form,pic:e.target.value})}/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">PIC Role</label>
                      <input className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" value={form.picRole} onChange={(e)=>setForm({...form,picRole:e.target.value})}/>
                    </div>
                  </motion.div>
                )}

                {showAddForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-slate-600 mt-4"
                  >
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-5 h-5 bg-red-700 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs">+</span>
                      </span>
                      Add Initial Tasks
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Task Description</label>
                        <input 
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={newInitialTask} 
                          onChange={(e)=>setNewInitialTask(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Due Date</label>
                        <input 
                          type="date"
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={initialTaskDue} 
                          onChange={(e)=>setInitialTaskDue(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Level Urgency</label>
                        <select 
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={initialTaskUrgency} 
                          onChange={(e)=>setInitialTaskUrgency(e.target.value)}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div className="flex flex-col justify-end">
                        <label className="block text-sm font-medium text-white mb-2">Notes</label>
                        <input 
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={initialTaskNotes} 
                          onChange={(e)=>setInitialTaskNotes(e.target.value)} 
                        />
                        <Button 
                          onClick={addInitialTask}
                          className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 h-12 rounded-xl font-semibold mt-2"
                        >
                          Add Task
                        </Button>
                      </div>
                    </div>

                    {initialTasks.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-white">Initial Tasks ({initialTasks.length}):</h5>
                        {initialTasks.map((task, index)=> (
                          <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white">{task.text}</p>
                              <p className="text-xs text-white">Due: {task.due}</p>
                              {task.notes && (
                                <p className="text-xs text-white italic mt-1">Notes: {task.notes}</p>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              <TaskBadge status={task.status}/>
                              <select 
                                className="flex h-8 rounded-lg border border-slate-600 bg-slate-700/80 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                                value={task.status} 
                                onChange={(e)=>updateInitialTaskStatus(index, e.target.value as "done" | "progress" | "problem")}
                              >
                                <option value="done">Done</option>
                                <option value="progress">Progress</option>
                                <option value="problem">Problem</option>
                              </select>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={()=>removeInitialTask(index)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 h-8 w-8 p-0"
                              >
                                🗑️
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {showAddForm && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="flex justify-center"
                  >
                    <Button 
                      onClick={handleAddProject}
                      className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 h-12 rounded-xl font-semibold px-8"
                    >
                      Save Project with {initialTasks.length} Task{initialTasks.length !== 1 ? 's' : ''}
                    </Button>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {projects.map((project, index)=> (
                    <motion.div 
                      key={project.id} 
                      initial={{ opacity: 0, x: -20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-600 shadow-lg hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-lg font-semibold text-white">{project.name}</p>
                          {hasLateTask(project)&&<span className="text-red-400 text-lg animate-pulse">⚠️</span>}
                        </div>
                        <p className="text-sm text-white flex items-center gap-2">
                          <span className="inline-flex items-center gap-1">
                            <span className="w-4 h-4 bg-gray-900/20 rounded-full flex items-center justify-center border border-gray-900/30">
                              <span className="text-white text-xs">📍</span>
                            </span>
                            {project.location}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-4 h-4 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                              <span className="text-purple-400 text-xs">👤</span>
                            </span>
                            PM: {project.pm}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                              <span className="text-green-400 text-xs">👥</span>
                            </span>
                            PIC: {project.pic}
                          </span>
                          <span className="text-slate-500">•</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-4 h-4 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30">
                              <span className="text-orange-400 text-xs">📅</span>
                            </span>
                            Due: {project.due}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <StatusBadge status={getProjectStatus(project)}/>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={()=>setEditingProject(project)}
                          className="border-gray-300 text-white hover:bg-gray-600/20 hover:border-gray-500 hover:text-gray-300 transition-all duration-200 mr-2"
                        >
                          ✏️ Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={()=>setSelectedProject(project)}
                          className="border-red-600 text-red-400 hover:bg-red-600/20 hover:border-red-500 hover:text-red-300 transition-all duration-200"
                        >
                          Detail
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={()=>deleteProject(project.id!)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                        >
                          🗑️
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {editingProject && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input 
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.name} 
                  onChange={(e)=>setEditingProject({...editingProject,name:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input 
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.location} 
                  onChange={(e)=>setEditingProject({...editingProject,location:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager</label>
                <input 
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.pm} 
                  onChange={(e)=>setEditingProject({...editingProject,pm:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input 
                  type="date"
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.due} 
                  onChange={(e)=>setEditingProject({...editingProject,due:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIC</label>
                <input 
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.pic} 
                  onChange={(e)=>setEditingProject({...editingProject,pic:e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PIC Role</label>
                <input 
                  className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                  value={editingProject.picRole} 
                  onChange={(e)=>setEditingProject({...editingProject,picRole:e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button 
                onClick={()=>setEditingProject(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white border-0 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  updateProject(editingProject.id!, editingProject);
                  setEditingProject(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 transition-all duration-300"
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {selectedProject && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
          <Button 
            onClick={()=>setSelectedProject(null)}
            className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
          >
            ← Back to Projects
          </Button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-black/90 backdrop-blur-sm border border-slate-700 shadow-2xl">
              <CardContent className="p-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-600">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">{selectedProject.name}</h2>
                    <div className="space-y-2">
                      <p className="text-white flex items-center gap-2">
                        <span className="w-5 h-5 bg-gray-900/20 rounded-full flex items-center justify-center border border-gray-900/30">
                          <span className="text-white text-xs">📍</span>
                        </span>
                        {selectedProject.location}
                      </p>
                      <p className="text-white flex items-center gap-2">
                        <span className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <span className="text-purple-400 text-xs">👤</span>
                        </span>
                        PM: {selectedProject.pm}
                      </p>
                      <p className="text-white flex items-center gap-2">
                        <span className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                          <span className="text-green-400 text-xs">🔧</span>
                        </span>
                        PIC: {selectedProject.pic} ({selectedProject.picRole})
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={getProjectStatus(selectedProject)}/>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-6 rounded-2xl border border-slate-600">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-700 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">+</span>
                      </span>
                      Add New Task
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-white mb-2">Task Description</label>
                        <input 
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={newTask} 
                          onChange={(e)=>setNewTask(e.target.value)} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">Due Date</label>
                        <input 
                          type="date"
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={taskDue} 
                          onChange={(e)=>setTaskDue(e.target.value)} 
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-white mb-2">Notes</label>
                        <input 
                          className="flex h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-medium placeholder:text-gray-500 text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                          value={taskNotes} 
                          onChange={(e)=>setTaskNotes(e.target.value)} 
                        />
                      </div>
                      <Button 
                        onClick={addTask}
                        className="bg-red-700 hover:bg-red-800 text-white border-0 shadow-lg hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 h-12 rounded-xl font-semibold"
                      >
                        Add Task
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-700 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📋</span>
                      </span>
                      Site Notes & Tasks
                    </h3>
                    <div className="space-y-3">
                      {selectedProject.notes.map((note,index)=> (
                        <motion.div 
                          key={index} 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01, y: -1 }}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600 shadow-md hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300"
                        >
                          <div className="flex-1">
                            <p className={`font-medium text-white ${isLate(note.due,selectedProject.due)?"text-red-400":""}`}>
                              {note.text}
                            </p>
                            <p className={`text-sm ${isLate(note.due,selectedProject.due)?"text-red-500":"text-white"}`}>
                              Due: {note.due}
                            </p>
                            {note.notes && (
                              <p className="text-xs text-white italic mt-1">Notes: {note.notes}</p>
                            )}
                          </div>
                          <div className="flex gap-2 items-center">
                            <TaskBadge status={note.status}/>
                            <select 
                              className="flex h-10 rounded-lg border border-slate-600 bg-slate-700/80 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200" 
                              value={note.status} 
                              onChange={(e)=>updateTaskStatus(index, e.target.value as "done" | "progress" | "problem")}
                            >
                              <option value="done">Done</option>
                              <option value="progress">Progress</option>
                              <option value="problem">Problem</option>
                            </select>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={()=>deleteTask(index)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                            >
                              🗑️
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                      {selectedProject.notes.length === 0 && (
                        <div className="text-center py-12 text-white">
                          <span className="text-4xl mb-2 block">📝</span>
                          <p>No tasks yet. Add your first task above!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
