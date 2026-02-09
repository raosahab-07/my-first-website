'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Command,
    User,
    Rocket,
    BarChart3,
    History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/Avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useVisualConfig } from '@/contexts/VisualConfigContext';

const menuItems = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Deployments', href: '/admin/projects', icon: Rocket },
    { name: 'Analytics', href: '/admin/experiences', icon: BarChart3 },
    { name: 'Logs', href: '/admin/skills', icon: History },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const { config } = useVisualConfig();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            toast.success('Successfully logged out');
            router.push('/admin');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className="h-screen bg-surface border-r border-white/5 flex flex-col sticky top-0 z-50 overflow-hidden shadow-2xl"
        >
            {/* Header */}
            <Link href="/admin/dashboard" className="h-16 flex items-center gap-3 px-6 border-b border-white/5 shrink-0 hover:bg-white/[0.03] transition-all cursor-pointer group">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:shadow-primary/40 transition-all">
                    <Command size={18} className="group-hover:scale-110 transition-transform" />
                </div>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className="font-black text-lg tracking-tight text-white">{config.brandText || 'Welcome Buddy'}</span>
                        <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">ADMIN PANEL</span>
                    </motion.div>
                )}
            </Link>

            {/* User Profile Card */}
            <div className="p-4 border-b border-white/[0.03]">
                <div className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.03] transition-all cursor-pointer group overflow-hidden border border-white/5 hover:border-white/10",
                    isCollapsed && "justify-center p-2"
                )}>
                    <Avatar
                        src={user?.user_metadata?.avatar_url}
                        size={40}
                        gradientRing={true}
                        glow={true}
                        dynamicColors={true}
                        className="ring-2 ring-white/20"
                    />
                    {!isCollapsed && (
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">
                                {user?.user_metadata?.display_name || 'Administrator'}
                            </span>
                            <span className="text-[10px] text-foreground/50 font-bold uppercase tracking-widest truncate mt-0.5">
                                SYSTEM ADMIN
                            </span>
                            {/* Status Indicator */}
                            <div className="flex items-center gap-2 mt-2">
                                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] text-foreground/40 font-medium hidden xl:block">ONLINE</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            onClick={() => {
                                if (window.innerWidth < 1024 && onClose) {
                                    onClose();
                                }
                            }}
                        >
                            <div className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative group cursor-pointer mb-1 tap-target",
                                isActive
                                    ? "text-primary bg-primary/15 border-l-4 border-primary shadow-sm"
                                    : "text-foreground/50 hover:text-white hover:bg-white/[0.03] border-l-4 border-transparent",
                                isCollapsed && "justify-center px-0 py-4"
                            )}>
                                <item.icon size={20} className={cn(isActive ? "text-primary" : "text-foreground/40 group-hover:text-foreground/70")} />
                                {!isCollapsed && (
                                    <span className="text-sm font-semibold tracking-tight">{item.name}</span>
                                )}
                                {isActive && !isCollapsed && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                                        initial={false}
                                        animate={{ height: '1.5rem' }}
                                    />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Storage Metric */}
            {!isCollapsed && (
                <div className="p-4">
                    <div className="rounded-2xl bg-white/[0.02] p-4 border border-white/5">
                        <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30">Storage Capacity</h4>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-lg font-bold text-white">85%</span>
                            <span className="text-[10px] text-foreground/20 font-medium mb-1">consumed</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                className="h-full rounded-full bg-primary shadow-[0_0_10px_rgba(124,59,237,0.5)]" 
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Actions */}
            <div className="p-3 border-t border-white/5 space-y-1">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/40 hover:text-white hover:bg-white/[0.02] transition-all",
                        isCollapsed && "justify-center"
                    )}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!isCollapsed && <span className="text-sm font-medium">Collapse Sidebar</span>}
                </button>
                <button
                    onClick={() => {
                        handleLogout();
                        if (window.innerWidth < 1024 && onClose) {
                            onClose();
                        }
                    }}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400/50 hover:text-red-400 hover:bg-red-400/5 transition-all",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span className="text-sm font-medium">Terminate Session</span>}
                </button>
            </div>
        </motion.aside>
    );
}
