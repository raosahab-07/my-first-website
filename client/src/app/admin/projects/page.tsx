'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Edit2,
    Trash2,
    ExternalLink,
    Search,
    Filter,
    MoreVertical,
    CheckCircle2,
    Clock,
    FileCode,
    ChevronDown,
    ArrowUpDown,
    Eye,
    EyeOff
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProjectModal } from '@/components/admin/ProjectModal';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function AdminProjects() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Fetch Projects using TanStack Query
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('order', { ascending: true });
            if (error) throw error;
            return data || [];
        }
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            toast.success('Project deleted successfully');
            setDeleteConfirm(null);
        },
        onError: (err: any) => {
            toast.error(err.message || 'Failed to delete project');
        }
    });

    const filteredProjects = projects.filter((p: any) => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const categories = ['all', ...new Set(projects.map((p: any) => p.category.toLowerCase()))];

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Project Arsenal</h1>
                    <p className="text-foreground/40 mt-1 font-medium text-sm">Manage and curate your professional portfolio artifacts.</p>
                </div>
                <button
                    onClick={() => { setEditingProject(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/5 group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    Deploy Project
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium placeholder:text-foreground/20"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <select 
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="appearance-none bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:border-primary/50 transition-all cursor-pointer capitalize"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-[#0A0B10]">{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/20 pointer-events-none" size={14} />
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/[0.05] bg-white/[0.01]">
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Artifact</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Configuration</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Visibility</th>
                                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {isLoading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-6 py-8">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-xl" />
                                                <div className="flex-grow space-y-2">
                                                    <div className="h-4 bg-white/5 rounded w-1/4" />
                                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredProjects.length > 0 ? (
                                filteredProjects.map((project: any, index: number) => (
                                    <motion.tr
                                        key={project.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group hover:bg-white/[0.01] transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/[0.05] bg-white/5 group-hover:border-primary/30 transition-colors">
                                                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-sm tracking-tight text-foreground">{project.title}</h3>
                                                    <p className="text-[11px] text-foreground/30 line-clamp-1 max-w-[180px] mt-0.5">{project.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-2">
                                                <span className="inline-flex w-fit px-2 py-0.5 bg-primary/5 border border-primary/10 text-[9px] font-bold uppercase tracking-wider text-primary rounded-md">
                                                    {project.category}
                                                </span>
                                                <div className="flex gap-1.5 overflow-hidden">
                                                    {project.tech_stack?.slice(0, 3).map((tech: string) => (
                                                        <span key={tech} className="text-[10px] text-foreground/20 whitespace-nowrap">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {project.status === 'draft' ? (
                                                    <>
                                                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500/80">Draft</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/80">Published</span>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-end items-center gap-2">
                                                <button 
                                                    onClick={() => { setEditingProject(project); setIsModalOpen(true); }}
                                                    className="p-2 rounded-lg hover:bg-white/5 text-foreground/40 hover:text-foreground transition-all"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                
                                                {deleteConfirm === project.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <button 
                                                            onClick={() => deleteMutation.mutate(project.id)}
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="p-2 rounded-lg hover:bg-white/5 text-foreground/40"
                                                        >
                                                            <Plus size={16} className="rotate-45" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => setDeleteConfirm(project.id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/10 text-foreground/40 hover:text-red-400 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-foreground/10">
                                                <FileCode size={24} />
                                            </div>
                                            <p className="text-sm text-foreground/20 italic font-medium">No projects found in this matrix.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={async (data: any) => {
                    const savePromise = editingProject 
                        ? supabase.from('projects').update(data).eq('id', editingProject.id)
                        : supabase.from('projects').insert([data]);
                    
                    const { error } = await savePromise;
                    if (error) throw error;
                    
                    queryClient.invalidateQueries({ queryKey: ['projects'] });
                    toast.success(editingProject ? 'Project refined' : 'Project deployed');
                }}
                project={editingProject}
            />
        </div>
    );
}
