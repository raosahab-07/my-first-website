'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (skill: any) => Promise<void>;
    skill?: any;
}

export function SkillModal({ isOpen, onClose, onSave, skill }: SkillModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        level: 80,
        category: '',
        icon: '',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (skill) {
            setFormData({
                name: skill.name || '',
                level: skill.level || 80,
                category: skill.category || '',
                icon: skill.icon || '',
                order: skill.order || 0
            });
        } else {
            setFormData({
                name: '',
                level: 80,
                category: '',
                icon: '',
                order: 0
            });
        }
        setError('');
    }, [skill, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await onSave(formData);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Failed to save skill');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="glass-card max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-[var(--background)] border-b border-[var(--border)] p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-outfit text-[var(--foreground)]">
                        {skill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--glass-bg)] rounded-xl transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Skill Name *</label>
                        <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            placeholder="React, TypeScript, etc."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Expertise Level ({formData.level}%)</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.level}
                            onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                            className="w-full h-2 bg-[var(--border)] rounded-full appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                        <div className="flex justify-between text-xs text-[var(--foreground)]/40 px-1">
                            <span>Beginner</span>
                            <span>Expert</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Category *</label>
                        <input
                            required
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            placeholder="Frontend, Backend, Design, etc."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Icon (Optional)</label>
                        <input
                            type="text"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            placeholder="Lucide icon name or URL"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Order</label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)] font-medium hover:bg-[var(--glass-bg)] transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Saving...
                                </>
                            ) : (
                                'Save Skill'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
