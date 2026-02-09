'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

interface ExperienceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (experience: any) => Promise<void>;
    experience?: any;
}

export function ExperienceModal({ isOpen, onClose, onSave, experience }: ExperienceModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        start_date: '',
        end_date: '',
        is_current: false,
        type: 'work',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (experience) {
            setFormData({
                title: experience.title || '',
                company: experience.company || '',
                location: experience.location || '',
                description: experience.description || '',
                start_date: experience.start_date || '',
                end_date: experience.end_date || '',
                is_current: experience.is_current || false,
                type: experience.type || 'work',
                order: experience.order || 0
            });
        } else {
            setFormData({
                title: '',
                company: '',
                location: '',
                description: '',
                start_date: '',
                end_date: '',
                is_current: false,
                type: 'work',
                order: 0
            });
        }
        setError('');
    }, [experience, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('Saving experience data:', formData);
            await onSave(formData);
            onClose();
        } catch (err: any) {
            console.error('Error saving experience:', err);
            setError(err.message || 'Failed to save experience');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-[var(--background)] border-b border-[var(--border)] p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold font-outfit text-[var(--foreground)]">
                        {experience ? 'Edit Experience' : 'Add New Experience'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--glass-bg)] rounded-xl transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--foreground)]/60">Title *</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--foreground)]/60">Company/Org *</label>
                            <input
                                required
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                                placeholder="Tech Corp"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            placeholder="Remote / City, Country"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--foreground)]/60">Start Date *</label>
                            <input
                                required
                                type="date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--foreground)]/60">End Date</label>
                            <input
                                type="date"
                                value={formData.end_date}
                                disabled={formData.is_current}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="is-current"
                            checked={formData.is_current}
                            onChange={(e) => setFormData({ ...formData, is_current: e.target.checked, end_date: e.target.checked ? 'Present' : '' })}
                            className="w-4 h-4 text-[var(--primary)]"
                        />
                        <label htmlFor="is-current" className="text-sm text-[var(--foreground)]/60">This is my current position</label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[var(--foreground)]/60">Type *</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all"
                            >
                                <option value="work">Work</option>
                                <option value="education">Education</option>
                            </select>
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
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-[var(--foreground)]/60">Description *</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 focus:border-[var(--primary)] outline-none transition-all min-h-[120px] resize-y"
                            placeholder="Describe your achievements and responsibilities..."
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
                                'Save Experience'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
