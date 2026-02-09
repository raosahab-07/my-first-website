'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageSquare,
    Trash2,
    Mail,
    MailOpen,
    Clock,
    User,
    Search,
    Filter,
    CheckCircle2,
    Loader2,
    Eye,
    Reply,
    Archive,
    ShieldCheck,
    MoreHorizontal
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function AdminMessages() {
    const queryClient = useQueryClient();
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Messages
    const { data: messages = [], isLoading } = useQuery<any[]>({
        queryKey: ['messages'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return data || [];
        }
    });

    // Set initial selection
    React.useEffect(() => {
        if (messages.length > 0 && !selectedMessage) {
            setSelectedMessage(messages[0]);
        }
    }, [messages, selectedMessage]);

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('messages').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            toast.success('Transmission purged');
            setSelectedMessage(null);
        }
    });

    const filteredMessages = messages.filter((msg: any) =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col gap-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Signal Monitor</h1>
                    <p className="text-foreground/40 mt-1 font-medium text-sm">Intercepting and managing incoming audience transmissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative group w-full sm:w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Filter signals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-all font-medium"
                        />
                    </div>
                    <button className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl text-foreground/40 hover:text-foreground transition-all">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-grow flex gap-6 overflow-hidden">
                {/* Inbox List */}
                <div className="w-full md:w-[380px] bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden flex flex-col">
                    <div className="px-5 py-4 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">Transmission Log</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{filteredMessages.length}</span>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        {isLoading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="p-5 border-b border-white/[0.02] animate-pulse flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0" />
                                    <div className="flex-grow space-y-2">
                                        <div className="h-3 bg-white/5 rounded w-1/2" />
                                        <div className="h-2 bg-white/5 rounded w-full" />
                                    </div>
                                </div>
                            ))
                        ) : filteredMessages.length > 0 ? (
                            filteredMessages.map((msg: any) => (
                                <button
                                    key={msg.id}
                                    onClick={() => setSelectedMessage(msg)}
                                    className={cn(
                                        "w-full p-5 border-b border-white/[0.02] flex gap-4 text-left transition-all relative group",
                                        selectedMessage?.id === msg.id ? "bg-white/[0.03]" : "hover:bg-white/[0.01]"
                                    )}
                                >
                                    {selectedMessage?.id === msg.id && (
                                        <motion.div layoutId="active-signal" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                    )}
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all",
                                        selectedMessage?.id === msg.id ? "bg-primary/10 border-primary/20 text-primary" : "bg-white/5 border-white/5 text-foreground/20 group-hover:text-foreground/40"
                                    )}>
                                        <User size={18} />
                                    </div>
                                    <div className="flex-grow overflow-hidden">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className="font-bold text-xs tracking-tight text-foreground truncate">{msg.name}</span>
                                            <span className="text-[9px] text-foreground/20 font-bold uppercase">{new Date(msg.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <p className="text-[11px] text-foreground/40 line-clamp-1 font-medium">{msg.message}</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-20 text-center flex flex-col items-center gap-3">
                                <Mail size={32} className="text-foreground/5" />
                                <p className="text-xs text-foreground/20 font-medium italic">Signals quiet.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Signal Decryption (Preview) */}
                <div className="hidden md:flex flex-grow bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden flex-col shadow-2xl relative">
                    <AnimatePresence mode="wait">
                        {selectedMessage ? (
                            <motion.div
                                key={selectedMessage.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex flex-col h-full"
                            >
                                <div className="p-8 border-b border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/10 to-secondary/10 border border-white/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                                            <User size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold tracking-tight text-foreground">{selectedMessage.name}</h2>
                                            <p className="text-xs text-primary/60 font-bold uppercase tracking-wider">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => deleteMutation.mutate(selectedMessage.id)}
                                            disabled={deleteMutation.isPending}
                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-foreground/20 flex items-center justify-center hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all group"
                                        >
                                            {deleteMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} className="group-hover:scale-110 transition-transform" />}
                                        </button>
                                        <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-foreground/20 flex items-center justify-center hover:text-foreground hover:bg-white/10 transition-all">
                                            <Archive size={18} />
                                        </button>
                                        <button className="h-10 px-5 rounded-xl bg-white text-black text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-white/5 hover:bg-white/90 transition-all flex items-center gap-2">
                                            <Reply size={14} />
                                            Respond
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-grow p-10 overflow-y-auto custom-scrollbar">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-foreground/20 uppercase tracking-[0.2em] mb-10">
                                        <ShieldCheck size={14} className="text-emerald-500/50" />
                                        <span>Verified Signal • {new Date(selectedMessage.created_at).toLocaleString()}</span>
                                    </div>
                                    <p className="text-base text-foreground/80 leading-relaxed font-medium whitespace-pre-wrap max-w-2xl">
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                <div className="p-6 border-t border-white/[0.05] bg-white/[0.01] flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                            <span>Encryption Active</span>
                                        </div>
                                        <div className="w-[1px] h-3 bg-white/5" />
                                        <span>Latency: 4ms</span>
                                    </div>
                                    <button className="p-2 text-foreground/20 hover:text-foreground transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex-grow flex items-center justify-center text-foreground/5 flex-col gap-4" key="none">
                                <motion.div
                                    animate={{ 
                                        scale: [1, 1.1, 1],
                                        opacity: [0.1, 0.2, 0.1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <MailOpen size={80} />
                                </motion.div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Standby for Transmission Selection</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
