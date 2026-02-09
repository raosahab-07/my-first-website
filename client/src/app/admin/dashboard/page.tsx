'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    MessageSquare,
    TrendingUp,
    ShieldCheck,
    ArrowUpRight,
    Zap,
    Rocket,
    BarChart3,
    History,
    MoreHorizontal,
    Plus,
    UserPlus,
    FileText,
    Activity,
    Sparkles,
    Layers,
    Cpu
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, trend, loading, sparklineType }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/5 bg-surface p-6 shadow-sm group hover:border-primary/20 transition-all duration-300"
    >
        <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">{title}</p>
            {trend && (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    {trend}
                </span>
            )}
        </div>
        <div className="mt-4 flex items-baseline gap-2 relative z-10">
            <h3 className="text-3xl font-black tracking-tight text-white tabular-nums">
                {loading ? "---" : value}
            </h3>
        </div>
        
        {/* Animated Sparkline simulation from Sigma 3 */}
        <div className="absolute bottom-0 left-0 right-0 h-12 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
            <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path 
                    d={sparklineType === 'wave' ? "M0,35 Q10,35 20,20 T40,25 T60,10 T80,30 T100,5" : "M0,30 C20,30 20,10 40,20 C60,30 60,5 100,0"} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="text-primary stroke-dash-draw animate-draw" 
                />
            </svg>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    const { data: counts, isLoading: countsLoading } = useQuery({
        queryKey: ['admin-counts'],
        queryFn: async () => {
            const [projects, messages, skills, experiences] = await Promise.all([
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('messages').select('*', { count: 'exact', head: true }),
                supabase.from('skills').select('*', { count: 'exact', head: true }),
                supabase.from('experiences').select('*', { count: 'exact', head: true }),
            ]);
            return {
                projects: projects.count || 0,
                messages: messages.count || 0,
                skills: skills.count || 0,
                experiences: experiences.count || 0
            };
        }
    });

    const activities = [
        { id: 1, title: 'Deployment successful', desc: 'Deployed commit 7d3a21 to main branch.', time: '10:42 AM', type: 'success' },
        { id: 2, title: 'Team invitation', desc: 'Sarah Jenkins joined the Engineering team.', time: '09:15 AM', type: 'primary' },
        { id: 3, title: 'Memory spike', desc: 'Server instance i-0a8b2c exceeded 85% memory.', time: '11:30 PM', type: 'warning' },
        { id: 4, title: 'Backup complete', desc: 'Automated daily backup of primary-db finished.', time: '04:00 AM', type: 'info' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header Section - Sigma 3 style */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]">
                    <Sparkles size={12} />
                    <span>Command Center</span>
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight">Executive Overview.</h1>
                <p className="text-sm text-foreground/40 font-medium">System status is optimal. All nodes reporting healthy.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Projects" value={counts?.projects || 0} trend="+2 this week" loading={countsLoading} sparklineType="wave" />
                <StatCard title="Signals Received" value={counts?.messages || 0} trend="5 unread" loading={countsLoading} />
                <StatCard title="Network Traffic" value="45.2k" trend="+12.5%" sparklineType="wave" />
                <StatCard title="Uptime Matrix" value="99.9%" trend="+0.1%" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Activity Timeline - Sigma 3 style */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white tracking-tight">Recent Operations</h3>
                        <button className="text-[10px] font-bold text-primary hover:text-white transition-colors uppercase tracking-[0.2em]">View All Logs</button>
                    </div>
                    <div className="rounded-[2.5rem] border border-white/5 bg-surface p-10 shadow-2xl relative overflow-hidden">
                        <div className="timeline-line" />
                        <div className="space-y-12 relative z-10">
                            {activities.map((item) => (
                                <div key={item.id} className="flex gap-8 group">
                                    <div className={cn(
                                        "relative flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-background transition-all group-hover:border-primary/40",
                                        item.type === 'success' && "text-emerald-500",
                                        item.type === 'primary' && "text-primary",
                                        item.type === 'warning' && "text-amber-500",
                                        item.type === 'info' && "text-blue-500"
                                    )}>
                                        <div className={cn("size-2 rounded-full", 
                                            item.type === 'success' ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-current shadow-[0_0_12px_rgba(124,59,237,0.3)]"
                                        )} />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-grow">
                                        <div className="flex justify-between items-center">
                                            <p className="text-base font-bold text-white group-hover:text-primary transition-colors">{item.title}</p>
                                            <span className="text-[10px] text-foreground/20 font-bold uppercase tracking-widest">{item.time}</span>
                                        </div>
                                        <p className="text-sm text-foreground/40 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Widgets */}
                <div className="space-y-10">
                    {/* Quick Actions */}
                    <div className="rounded-[2.5rem] border border-white/5 bg-surface p-8 shadow-2xl">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30 mb-8">Rapid Deploy</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'Invite', icon: UserPlus },
                                { name: 'Ship', icon: Rocket },
                                { name: 'Audit', icon: History },
                                { name: 'Report', icon: FileText },
                            ].map((action) => (
                                <button key={action.name} className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.05] hover:border-primary/20 transition-all group">
                                    <action.icon size={22} className="text-primary group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">{action.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Integrity Monitor */}
                    <div className="rounded-[2.5rem] border border-white/5 bg-surface p-8 shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/30">System Integrity</h3>
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
                                <div className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                                Stable
                            </div>
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: 'Database Cluster', status: 'Healthy', val: 92, icon: Layers },
                                { name: 'Storage Node', status: '85%', val: 85, icon: History },
                                { name: 'Neural Auth', status: '12ms', val: 100, icon: Cpu },
                            ].map((s) => (
                                <div key={s.name} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <s.icon size={12} className="text-foreground/20" />
                                            <span className="text-[11px] font-bold text-foreground/60">{s.name}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-foreground/30 uppercase">{s.status}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${s.val}%` }}
                                            className="h-full bg-primary/40 rounded-full" 
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
