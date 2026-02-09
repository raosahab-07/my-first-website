'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, Upload, Link as LinkIcon, Globe, Lock, Eye, EyeOff, Layout, ListTodo, CheckCircle2 } from 'lucide-react';
import { uploadProjectImage, validateImageFile } from '@/lib/uploadImage';
import { slugify, cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (project: any) => Promise<void>;
    project?: any;
}

export function ProjectModal({ isOpen, onClose, onSave, project }: ProjectModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
        tech_stack: '',
        image: '',
        live_url: '',
        status: 'published',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [uploadMode, setUploadMode] = useState<'upload' | 'url'>('upload');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                slug: project.slug || '',
                description: project.description || '',
                category: project.category || '',
                tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
                image: project.image || '',
                live_url: project.live_url || '',
                status: project.status || 'published',
                order: project.order || 0
            });
            setPreviewImage(project.image || '');
        } else {
            setFormData({
                title: '',
                slug: '',
                description: '',
                category: '',
                tech_stack: '',
                image: '',
                live_url: '',
                status: 'published',
                order: 0
            });
            setPreviewImage('');
        }
        setError('');
    }, [project, isOpen]);

    // Auto-generate slug from title
    useEffect(() => {
        if (!project && formData.title) {
            setFormData(prev => ({ ...prev, slug: slugify(formData.title) }));
        }
    }, [formData.title, project]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validationError = validateImageFile(file);
        if (validationError) {
            setError(validationError);
            return;
        }

        setUploading(true);
        try {
            const imageUrl = await uploadProjectImage(file);
            setFormData({ ...formData, image: imageUrl });
            setPreviewImage(imageUrl);
        } catch (err: any) {
            setError(err.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                ...formData,
                tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(s => s)
            };
            await onSave(data);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Save failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[60] p-4 sm:p-6 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-[#0A0B10] border border-white/[0.05] max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-[2rem] flex flex-col shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <Layout size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold tracking-tight">
                                    {project ? 'Refine Artifact' : 'Deploy New Artifact'}
                                </h2>
                                <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest">
                                    {project ? `ID: ${project.id.slice(0, 8)}` : 'Drafting Stage'}
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-foreground/20 hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-8">
                        {/* Status & Visibility */}
                        <div className="flex flex-wrap gap-4">
                            <div 
                                onClick={() => setFormData({...formData, status: 'published'})}
                                className={cn(
                                    "flex-1 flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer",
                                    formData.status === 'published' ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400" : "bg-white/[0.01] border-white/[0.05] text-foreground/20"
                                )}
                            >
                                <div className={cn("w-2 h-2 rounded-full", formData.status === 'published' ? "bg-emerald-400 animate-pulse" : "bg-foreground/20")} />
                                <span className="text-xs font-bold uppercase tracking-widest">Published</span>
                                {formData.status === 'published' && <Eye size={14} className="ml-auto" />}
                            </div>
                            <div 
                                onClick={() => setFormData({...formData, status: 'draft'})}
                                className={cn(
                                    "flex-1 flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer",
                                    formData.status === 'draft' ? "bg-yellow-500/5 border-yellow-500/20 text-yellow-500" : "bg-white/[0.01] border-white/[0.05] text-foreground/20"
                                )}
                            >
                                <div className={cn("w-2 h-2 rounded-full", formData.status === 'draft' ? "bg-yellow-400" : "bg-foreground/20")} />
                                <span className="text-xs font-bold uppercase tracking-widest">Draft</span>
                                {formData.status === 'draft' && <EyeOff size={14} className="ml-auto" />}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Title & Slug */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">Artifact Title</label>
                                    <input
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm focus:border-primary/50 transition-all outline-none"
                                        placeholder="Project Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">URL Path (Slug)</label>
                                    <input
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm focus:border-primary/50 transition-all outline-none font-mono text-[11px]"
                                        placeholder="project-slug"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">Brief Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm focus:border-primary/50 transition-all outline-none min-h-[100px] resize-none"
                                    placeholder="Executive summary of the project..."
                                />
                            </div>

                            {/* Tech & Links */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">Technology Stack</label>
                                    <div className="relative group">
                                        <ListTodo className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary" size={14} />
                                        <input
                                            value={formData.tech_stack}
                                            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                                            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-primary/50 transition-all outline-none"
                                            placeholder="React, Next.js, Tail..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">Live URL</label>
                                    <div className="relative group">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary" size={14} />
                                        <input
                                            type="url"
                                            value={formData.live_url}
                                            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                                            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-9 pr-4 py-3 text-sm focus:border-primary/50 transition-all outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 ml-1">Visual Identity</label>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => setUploadMode('upload')} className={cn("px-2 py-1 rounded-md text-[9px] font-bold uppercase transition-all", uploadMode === 'upload' ? "bg-white text-black" : "text-foreground/40 hover:text-foreground")}>Upload</button>
                                        <button type="button" onClick={() => setUploadMode('url')} className={cn("px-2 py-1 rounded-md text-[9px] font-bold uppercase transition-all", uploadMode === 'url' ? "bg-white text-black" : "text-foreground/40 hover:text-foreground")}>URL</button>
                                    </div>
                                </div>
                                
                                {uploadMode === 'upload' ? (
                                    <label className="block w-full border-2 border-dashed border-white/[0.05] rounded-2xl p-8 hover:border-primary/30 transition-all cursor-pointer bg-white/[0.01]">
                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                        <div className="flex flex-col items-center gap-2">
                                            {uploading ? <Loader2 className="animate-spin text-primary" size={24} /> : <Upload className="text-foreground/20" size={24} />}
                                            <p className="text-[11px] font-bold text-foreground/40">Drop artifact visual or click to browse</p>
                                        </div>
                                    </label>
                                ) : (
                                    <input 
                                        type="url" 
                                        value={formData.image} 
                                        onChange={(e) => { setFormData({...formData, image: e.target.value}); setPreviewImage(e.target.value); }}
                                        className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3 text-sm focus:border-primary/50 transition-all outline-none"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                )}

                                {previewImage && (
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.05]">
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => { setFormData({...formData, image: ''}); setPreviewImage(''); }}
                                            className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white/60 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-[11px] font-bold bg-red-400/5 p-3 rounded-lg border border-red-400/20">{error}</p>}
                    </form>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/[0.05] bg-white/[0.01] flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 font-bold text-xs hover:bg-white/10 transition-all">Cancel</button>
                        <button 
                            onClick={handleSubmit}
                            disabled={loading || uploading}
                            className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                            {project ? 'Refine Changes' : 'Deploy Artifact'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
