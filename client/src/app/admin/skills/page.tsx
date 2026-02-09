'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Code, Zap, BarChart, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SkillModal } from '@/components/admin/SkillModal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function AdminSkills() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<any>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    // Fetch Skills
    const { data: skills = [], isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('order', { ascending: true });
            if (error) throw error;
            return data || [];
        }
    });

    // Mutations
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('skills').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast.success('Skill removed from arsenal');
            setDeleteConfirm(null);
        }
    });

    const handleSave = async (skillData: any) => {
        const promise = editingSkill 
            ? supabase.from('skills').update(skillData).eq('id', editingSkill.id)
            : supabase.from('skills').insert([skillData]);
        
        const { error } = await promise;
        if (error) throw error;
        
        queryClient.invalidateQueries({ queryKey: ['skills'] });
        toast.success(editingSkill ? 'Skill optimized' : 'New skill acquired');
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">
                        <Zap size={12} fill="currentColor" />
                        <span>Capability Matrix</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Technical Arsenal</h1>
                    <p className="text-foreground/40 font-medium text-sm">Quantify and manage your digital proficiencies.</p>
                </div>
                <button 
                    onClick={() => { setEditingSkill(null); setIsModalOpen(true); }} 
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/90 transition-all shadow-lg shadow-white/5"
                >
                    <Plus size={18} /> Add Capability
                </button>
            </div>

            <div className="bg-white/[0.01] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-white/[0.01] border-b border-white/[0.05]">
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Competency</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Category</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Proficiency</th>
                            <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03]">
                        {isLoading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={4} className="px-8 py-6"><div className="h-8 bg-white/5 rounded-xl w-full" /></td>
                                </tr>
                            ))
                        ) : skills.map((skill: any, index: number) => (
                            <motion.tr 
                                key={skill.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-white/[0.01] transition-colors group"
                            >
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-primary/5 text-primary rounded-xl border border-primary/10 group-hover:scale-110 transition-transform">
                                            <Code size={18} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight text-foreground">{skill.name}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="px-3 py-1 bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-foreground/40 rounded-lg group-hover:text-primary transition-colors">
                                        {skill.category}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-grow max-w-[120px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-primary shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                                            />
                                        </div>
                                        <span className="text-[11px] font-bold text-foreground/40">{skill.level}%</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    {deleteConfirm === skill.id ? (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => deleteMutation.mutate(skill.id)}
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
                                                onClick={() => { setEditingSkill(skill); setIsModalOpen(true); }}
                                                className="p-2 rounded-lg hover:bg-white/5 text-foreground/40 hover:text-foreground transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(skill.id)}
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
                {!isLoading && skills.length === 0 && (
                    <div className="p-20 text-center text-foreground/10 italic font-medium text-sm">Arsenal clear. No capabilities indexed.</div>
                )}
            </div>

            <SkillModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                skill={editingSkill}
            />
        </div>
    );
}
