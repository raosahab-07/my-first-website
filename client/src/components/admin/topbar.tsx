'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Search,
    Bell,
    ChevronRight,
    Command,
    User,
    Plus,
    LayoutGrid,
    Menu,
    PlusCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Notification {
    id: number;
    title: string;
    time: string;
    read: boolean;
}

export function AdminTopbar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
        
        // Simulate notifications
        const mockNotifications = [
            { id: 1, title: 'New Message Received', time: '2 minutes ago', read: false },
            { id: 2, title: 'Project Deployment Successful', time: '1 hour ago', read: true },
            { id: 3, title: 'Weekly Report Ready', time: '1 day ago', read: false }
        ];
        setNotifications(mockNotifications);
    }, []);

    const breadcrumbs = pathname
        .split('/')
        .filter((path: string) => path)
        .map((path: string, index: number, arr: string[]) => {
            const href = `/${arr.slice(0, index + 1).join('/')}`;
            const label = path.charAt(0).toUpperCase() + path.slice(1);
            return { label, href, isLast: index === arr.length - 1 };
        });

    return (
        <header className="h-16 border-b border-white/5 bg-background/80 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <button className="md:hidden text-foreground/40 hover:text-white transition-colors">
                    <Menu size={20} />
                </button>
                
                {/* Breadcrumbs */}
                <nav className="hidden sm:flex items-center text-sm font-medium">
                    <div className="flex items-center gap-2 text-foreground/40">
                        <Link href="/admin/dashboard" className="hover:text-white transition-colors cursor-pointer">Home</Link>
                        <ChevronRight size={14} className="text-foreground/10" />
                    </div>
                    {breadcrumbs.map((crumb, i) => (
                        <div key={crumb.href} className="flex items-center gap-2">
                            <span className={cn(
                                "transition-colors cursor-pointer",
                                crumb.isLast ? "text-white font-bold" : "text-foreground/40 hover:text-white"
                            )}>
                                {crumb.label}
                            </span>
                            {!crumb.isLast && <ChevronRight size={14} className="text-foreground/10" />}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
                {/* Search - Sigma 3 style with functionality */}
                <div className="relative hidden md:block group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-primary transition-colors">
                        <Search size={16} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search system..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-9 w-64 bg-surface/50 border border-white/5 rounded-lg pl-10 pr-12 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-surface transition-all"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && searchTerm.trim()) {
                                console.log('Searching for:', searchTerm);
                                // Implement search logic here
                            }
                        }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center">
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-foreground/30 uppercase tracking-tighter">⌘</kbd>
                        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-foreground/30 uppercase tracking-tighter">K</kbd>
                    </div>
                </div>

                <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                    <div className="relative">
                        <button 
                            className="relative p-2 rounded-lg text-foreground/40 hover:text-white hover:bg-white/5 transition-all"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell size={20} />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="absolute top-2 right-2 size-2 rounded-full bg-primary border-2 border-background" />
                            )}
                        </button>
                        
                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-12 w-80 bg-surface border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="p-4 border-b border-white/5">
                                    <h3 className="text-white font-bold text-sm">Notifications</h3>
                                    <p className="text-foreground/40 text-xs mt-1">{notifications.filter(n => !n.read).length} unread</p>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.map(notification => (
                                        <div 
                                            key={notification.id} 
                                            className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer ${!notification.read ? 'bg-primary/5' : ''}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-white text-sm font-medium">{notification.title}</p>
                                                    <p className="text-foreground/40 text-xs mt-1">{notification.time}</p>
                                                </div>
                                                {!notification.read && (
                                                    <div className="size-2 rounded-full bg-primary mt-1" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center border-t border-white/5">
                                    <button className="text-foreground/40 text-xs hover:text-white transition-colors">
                                        View All Notifications
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-all shadow-xl shadow-white/5"
                        onClick={() => {
                            // Add your mission creation logic here
                            console.log('Creating new mission...');
                        }}
                    >
                        <PlusCircle size={16} />
                        <span className="hidden sm:inline text-[10px] uppercase tracking-widest">New Mission</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
