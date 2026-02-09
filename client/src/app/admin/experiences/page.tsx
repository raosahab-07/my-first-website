'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Briefcase, Calendar, Building2, MapPin, CheckCircle2, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ExperienceModal } from '@/components/admin/ExperienceModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function AdminExperiences() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState<any>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const { data: experiences = [], isLoading } = useQuery({
        queryKey: ['experiences'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('experiences')
                .select('*')
                .order('order', { ascending: true });
            if (error) throw error;
            return data || [];
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('experiences').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['experiences'] });
            toast.success('Career landmark removed');
            setDeleteConfirm(null);
        }
    });

    const handleSave = async (expData: any) => {
        const promise = editingExperience 
            ? supabase.from('experiences').update(expData).eq('id', editingExperience.id)
            : supabase.from('experiences').insert([expData]);
        
        const { error } = await promise;
        if (error) throw error;
        
        queryClient.invalidateQueries({ queryKey: ['experiences'] });
        toast.success(editingExperience ? 'Timeline adjusted' : 'New landmark established');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Zap size={12} fill="currentColor" />
                        <span>Professional Timeline</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Career Landmarks</h1>
                    <p className="text-foreground/40 font-medium text-sm">Chronicle your professional evolution and achievements.</p>
                </div>
                <button 
                    onClick={() => { setEditingExperience(null); setIsModalOpen(true); }} 
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/5"
                >
                    <Plus size={18} /> Record Milestone
                </button>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/[0.01] border-b border-white/[0.05]">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Role & Institution</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Duration</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Classification</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {isLoading ? (
                            Array(4).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-8 py-8"><div className="h-10 bg-white/5 rounded-xl w-full" /></td>
                                </tr>
                            ))
                        ) : experiences.map((exp: any, index: number) => (
                            <motion.tr 
                                key={exp.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-white/[0.01] transition-colors group"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-foreground/20 group-hover:text-primary group-hover:border-primary/20 transition-all">
                                            <Building2 size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm tracking-tight text-foreground">{exp.title}</h3>
                                            <p className="text-[11px] text-foreground/30 font-bold uppercase tracking-widest mt-0.5">{exp.company}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2 text-foreground/40 font-medium text-[11px]">
                                        <Calendar size={12} className="text-primary/40" />
                                        <span>{exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={cn(
                                        "px-3 py-1 border text-[10px] font-bold uppercase tracking-widest rounded-lg",
                                        exp.type === 'work' ? "bg-blue-500/5 border-blue-500/10 text-blue-400" : "bg-purple-500/5 border-purple-500/10 text-purple-400"
                                    )}>
                                        {exp.type}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {deleteConfirm === exp.id ? (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => deleteMutation.mutate(exp.id)}
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
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => { setEditingExperience(exp); setIsModalOpen(true); }}
                                                className="p-2 rounded-lg hover:bg-white/5 text-foreground/40 hover:text-foreground transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(exp.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-foreground/40 hover:text-red-400 transition-all"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {!isLoading && experiences.length === 0 && (
                    <div className="p-20 text-center text-foreground/10 italic font-medium text-sm">Timeline empty. No career milestones recorded.</div>
                )}
            </div>

            <ExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                experience={editingExperience}
            />
        </div>
    );
}
