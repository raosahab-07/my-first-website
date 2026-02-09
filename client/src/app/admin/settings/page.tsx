'use client';

import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Shield, Mail, Loader2, Globe, Share2, Save, Trash2, ShieldCheck, Zap, Palette, Monitor, Image as ImageIcon } from 'lucide-react';
import { uploadAvatarImage, validateImageFile, testBucketAccess } from '@/lib/uploadImage';
import { supabase } from '@/lib/supabase';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/Avatar';
import { useVisualConfig, COLOR_PRESETS } from '@/contexts/VisualConfigContext';

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const { config, isLoading: configLoading, updateConfig } = useVisualConfig();

    // Form states
    const [profileData, setProfileData] = useState({ 
        displayName: '', 
        email: '',
        avatarUrl: '',
        bio: '',
        role: 'Super Administrator'
    });
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
    const [seoData, setSeoData] = useState({
        siteTitle: 'Rao Sahab | Portfolio',
        description: 'Premium portfolio and executive dashboard.',
        keywords: 'developer, full-stack, design',
        ogImage: ''
    });

    useEffect(() => {
        setMounted(true);
        
        // Apply saved colors on initial load
        if (typeof window !== 'undefined') {
            const savedAccentColor = localStorage.getItem('accent-color');
            if (savedAccentColor) {
                applyColorsGlobally(savedAccentColor);
            }
        }
        
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Check localStorage first for most recent avatar
                let avatarUrl = '';
                if (typeof window !== 'undefined') {
                    avatarUrl = localStorage.getItem('user-avatar-url') || '';
                }
                
                // Fall back to user metadata if localStorage is empty
                if (!avatarUrl) {
                    avatarUrl = user.user_metadata?.avatar_url || '';
                }
                
                setProfileData({
                    displayName: user.user_metadata?.display_name || '',
                    email: user.email || '',
                    avatarUrl: avatarUrl,
                    bio: user.user_metadata?.bio || '',
                    role: user.user_metadata?.role || 'Super Administrator'
                });
                
                // Appearance is now handled by global config, no local state needed
                
                // Apply colors globally on page load
                applyColorsGlobally(config.accentColor);
            }
        };
        fetchUser();
    }, []);

    const applyColorsGlobally = (color: string) => {
        // Update CSS variables for immediate visual feedback
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--color-primary', color);
        document.documentElement.style.setProperty('--color-accent-violet', color);
        
        // Generate complementary colors
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        // Set complementary colors
        const pinkColor = `rgb(${Math.min(255, r + 30)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`;
        document.documentElement.style.setProperty('--color-accent-pink', pinkColor);
        document.documentElement.style.setProperty('--accent-pink', pinkColor);
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update email if changed
            const { data: { user } } = await supabase.auth.getUser();
            if (profileData.email !== user?.email) {
                const { error: emailError } = await supabase.auth.updateUser({
                    email: profileData.email
                });
                if (emailError) throw emailError;
                toast.success('Email update initiated. Check your inbox.');
            }

            const { error } = await supabase.auth.updateUser({
                data: { 
                    display_name: profileData.displayName,
                    avatar_url: profileData.avatarUrl,
                    bio: profileData.bio,
                    role: profileData.role
                }
            });
            if (error) throw error;
            
            // Also update localStorage for immediate availability
            if (typeof window !== 'undefined') {
                localStorage.setItem('user-avatar-url', profileData.avatarUrl);
            }
            
            toast.success('Identity Matrix Updated');
        } catch (err: any) {
            toast.error(err.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAppearance = async () => {
        setLoading(true);
        try {
            toast.success('Visual changes deployed successfully');
        } catch (err: any) {
            toast.error('Failed to deploy visual changes: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Access tokens do not match');
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: passwordData.newPassword
            });
            if (error) throw error;
            toast.success('Security protocol updated');
            setPasswordData({ newPassword: '', confirmPassword: '' });
        } catch (err: any) {
            toast.error(err.message || 'Security update failed');
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', name: 'Profile', icon: User },
        { id: 'appearance', name: 'Display', icon: Palette },
        { id: 'images', name: 'Images', icon: ImageIcon },
        { id: 'security', name: 'Security', icon: Shield },
        { id: 'seo', name: 'SEO', icon: Globe },
    ];

    if (!mounted) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <header className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-primary font-black text-[11px] uppercase tracking-[0.4em]">
                    <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <SettingsIcon size={14} className="animate-spin-slow" />
                    </div>
                    <span>SYSTEM CONFIGURATION</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Control Panel</h1>
                <p className="text-foreground/50 font-medium text-base max-w-2xl">Manage your administrative environment, visual preferences, and digital presence with precision.</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full lg:w-80 space-y-2">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-sm font-bold transition-all duration-300 border",
                                activeTab === tab.id 
                                    ? "bg-gradient-to-r from-primary/15 to-purple-500/10 text-white shadow-lg border-primary/30" 
                                    : "text-foreground/50 hover:text-white hover:bg-white/[0.03] border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg transition-colors",
                                activeTab === tab.id ? "bg-primary/20" : "bg-white/5"
                            )}>
                                <tab.icon size={20} className={activeTab === tab.id ? "text-primary" : "text-foreground/40"} />
                            </div>
                            <div className="text-left">
                                <div className={cn(
                                    "font-bold",
                                    activeTab === tab.id ? "text-white" : "text-foreground/50"
                                )}>{tab.name}</div>
                                <div className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider mt-1",
                                    activeTab === tab.id ? "text-primary/70" : "text-foreground/30"
                                )}>
                                    {tab.id === 'profile' && 'User Management'}
                                    {tab.id === 'appearance' && 'Visual Settings'}
                                    {tab.id === 'images' && 'Media Assets'}
                                    {tab.id === 'security' && 'Access Control'}
                                    {tab.id === 'seo' && 'Search Optimization'}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-grow glass-panel rounded-[2.5rem] border-white/5 bg-surface/30 shadow-2xl overflow-hidden min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="p-10 lg:p-12"
                        >
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSaveProfile} className="space-y-10">
                                    <div className="flex items-center gap-8 mb-12">
                                        <div className="relative group">
                                            <Avatar 
                                                src={profileData.avatarUrl} 
                                                alt="Rao Sahab Profile Photo"
                                                size={128}
                                                gradientRing={true}
                                                glow={true}
                                                dynamicColors={true}
                                            />
                                            <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-full backdrop-blur-sm">
                                                <Share2 size={24} className="text-white" />
                                                <input 
                                                    type="file" 
                                                    className="hidden" 
                                                    accept="image/*"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            try {
                                                                // Validate file
                                                                const validationError = validateImageFile(file);
                                                                if (validationError) {
                                                                    toast.error(validationError);
                                                                    return;
                                                                }

                                                                // Show uploading state
                                                                toast.loading('Uploading avatar...', { id: 'avatar-upload' });

                                                                // Upload avatar
                                                                const publicUrl = await uploadAvatarImage(file);
                                                                
                                                                // Update profile data
                                                                setProfileData({...profileData, avatarUrl: publicUrl});
                                                                // Save to localStorage for persistence
                                                                if (typeof window !== 'undefined') {
                                                                    localStorage.setItem('user-avatar-url', publicUrl);
                                                                }
                                                                
                                                                toast.success('Avatar uploaded successfully!', { id: 'avatar-upload' });
                                                            } catch (error: any) {
                                                                toast.error(error.message || 'Upload failed', { id: 'avatar-upload' });
                                                                console.error('Avatar upload error:', error);
                                                            }
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white">Identity Matrix</h3>
                                            <p className="text-sm text-foreground/40 font-medium">Manage your global administrative metadata.</p>
                                            <div className="flex items-center gap-4 mt-4">
                                                <button 
                                                    onClick={async () => {
                                                        toast.loading('Testing bucket access...', { id: 'bucket-test' });
                                                        const result = await testBucketAccess();
                                                        if (result.success) {
                                                            toast.success('✅ ' + result.message, { id: 'bucket-test' });
                                                        } else {
                                                            toast.error('❌ ' + result.error, { id: 'bucket-test' });
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Test Bucket Access
                                                </button>
                                                <button 
                                                    onClick={() => {
                                                        // Set default Rao Shab image
                                                        const imageUrl = '/rao-shab.jpg';
                                                        setProfileData({...profileData, avatarUrl: imageUrl});
                                                        // Save to localStorage for persistence
                                                        if (typeof window !== 'undefined') {
                                                            localStorage.setItem('user-avatar-url', imageUrl);
                                                        }
                                                        toast.success('✅ Rao Shab image loaded!', { id: 'default-image' });
                                                    }}
                                                    className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-500 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Load Rao Shab Image
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Official Name</label>
                                            <input
                                                value={profileData.displayName}
                                                onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                                placeholder="Rao Sahab"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Administrative Email</label>
                                            <input
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                                placeholder="raushanyadav2028.r@gmail.com"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">System Role</label>
                                            <input
                                                value={profileData.role}
                                                onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                                placeholder="Super Administrator"
                                            />
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Professional Bio</label>
                                            <textarea
                                                value={profileData.bio}
                                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none min-h-[120px] resize-none"
                                                placeholder="Describe your technical philosophy..."
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="btn-primary w-fit px-10 group"
                                    >
                                        {loading ? <Loader2 size={18} className="animate-spin" /> : (
                                            <>
                                                <Save size={18} />
                                                <span>Update Identity</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}

                            {activeTab === 'appearance' && (
                                <div className="space-y-12">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-glow-primary">
                                            <Palette size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white">Visual Engine</h3>
                                            <p className="text-sm text-foreground/40 font-medium">Customize the platform aesthetic to your preference.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Accent Protocol</label>
                                            <div className="flex flex-wrap gap-4">
                                                {COLOR_PRESETS.map((c) => (
                                                    <button
                                                        key={c.name}
                                                        onClick={async () => {
                                                            await updateConfig({ accentColor: c.color });
                                                        }}
                                                        className={cn(
                                                            "group relative size-12 rounded-xl border-2 transition-all duration-300",
                                                            config.accentColor === c.color 
                                                                ? "border-white scale-110 shadow-lg shadow-primary/50" 
                                                                : "border-transparent opacity-70"
                                                        )}
                                                        style={{ backgroundColor: c.color }}
                                                    >
                                                        {config.accentColor === c.color && (
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="size-2 bg-white rounded-full shadow-lg" />
                                                            </div>
                                                        )}
                                                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {c.name}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Interface Style</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {['glass', 'solid'].map((style) => (
                                                        <button
                                                            key={style}
                                                            onClick={async () => {
                                                                await updateConfig({ uiMode: style as 'glass' | 'solid' });
                                                            }}
                                                            className={cn(
                                                                "p-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest",
                                                                config.uiMode === style
                                                                    ? "bg-primary/10 border-primary text-primary"
                                                                    : "bg-white/5 border-white/5 text-foreground/40 hover:text-white"
                                                            )}
                                                        >
                                                            {style}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Motion Velocity</label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {['slow', 'normal'].map((v) => (
                                                        <button
                                                            key={v}
                                                            onClick={async () => {
                                                                await updateConfig({ motionVelocity: v as 'slow' | 'normal' | 'fast' });
                                                            }}
                                                            className={cn(
                                                                "p-4 rounded-2xl border transition-all text-xs font-bold uppercase tracking-widest",
                                                                config.motionVelocity === v
                                                                    ? "bg-primary/10 border-primary text-primary"
                                                                    : "bg-white/5 border-white/5 text-foreground/40 hover:text-white"
                                                            )}
                                                        >
                                                            {v}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleSaveAppearance}
                                        disabled={loading}
                                        className="btn-primary w-fit px-10"
                                    >
                                        <Zap size={18} fill="currentColor" />
                                        <span>Deploy Visual Changes</span>
                                    </button>
                                </div>
                            )}

                            {activeTab === 'images' && (
                                <div className="space-y-12">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="size-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shadow-glow-primary">
                                            <ImageIcon size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white">Website Images</h3>
                                            <p className="text-sm text-foreground/40 font-medium">Manage images used throughout your portfolio website.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Hero Profile Image */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-white">Hero Profile Image</h4>
                                            <div className="relative group">
                                                <div className="w-full h-64 rounded-2xl bg-gradient-to-tr from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center text-primary overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-500">
                                                    {profileData.avatarUrl ? (
                                                        <img src={profileData.avatarUrl} alt="Current Profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User size={48} />
                                                    )}
                                                </div>
                                                <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-sm">
                                                    <div className="text-center text-white">
                                                        <Share2 size={24} className="mx-auto mb-2" />
                                                        <span className="text-sm font-medium">Change Image</span>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                try {
                                                                    const validationError = validateImageFile(file);
                                                                    if (validationError) {
                                                                        toast.error(validationError);
                                                                        return;
                                                                    }

                                                                    toast.loading('Uploading profile image...', { id: 'profile-upload' });
                                                                    const publicUrl = await uploadAvatarImage(file);
                                                                    setProfileData({...profileData, avatarUrl: publicUrl});
                                                                    // Save to localStorage for persistence
                                                                    if (typeof window !== 'undefined') {
                                                                        localStorage.setItem('user-avatar-url', publicUrl);
                                                                    }
                                                                    toast.success('Profile image updated!', { id: 'profile-upload' });
                                                                } catch (error: any) {
                                                                    toast.error(error.message || 'Upload failed', { id: 'profile-upload' });
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                            <p className="text-sm text-foreground/40">This image appears in the hero section of your portfolio</p>
                                        </div>

                                        {/* Project Images Section */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-bold text-white">Project Images</h4>
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                                                <p className="text-sm text-foreground/40">Upload images for your projects. These will be used in the projects section.</p>
                                                <button 
                                                    className="w-full px-4 py-3 bg-primary/10 border border-primary/20 text-primary rounded-xl hover:bg-primary/20 transition-colors font-medium"
                                                    onClick={() => toast.info('Project image management coming soon!')}
                                                >
                                                    Manage Project Images
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <form onSubmit={handlePasswordChange} className="space-y-10">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="size-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                                            <Shield size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white">Security Protocol</h3>
                                            <p className="text-sm text-foreground/40 font-medium">Manage your administrative access tokens.</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">New Access Token</label>
                                            <input
                                                type="password"
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Confirm Token</label>
                                            <input
                                                type="password"
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="h-14 px-10 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-all shadow-xl shadow-red-500/20 flex items-center gap-3"
                                    >
                                        <ShieldCheck size={18} />
                                        Refortify Access
                                    </button>
                                </form>
                            )}

                            {activeTab === 'seo' && (
                                <div className="space-y-10">
                                    <div className="flex items-center gap-6 mb-12">
                                        <div className="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                            <Globe size={32} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-white">Meta Discovery</h3>
                                            <p className="text-sm text-foreground/40 font-medium">Optimize your digital footprint for search matrixes.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Site Title</label>
                                            <input
                                                value={seoData.siteTitle}
                                                onChange={(e) => setSeoData({...seoData, siteTitle: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Meta Description</label>
                                            <textarea
                                                value={seoData.description}
                                                onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none min-h-[100px] resize-none"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 ml-1">Neural Keywords</label>
                                            <input
                                                value={seoData.keywords}
                                                onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:border-primary/50 transition-all outline-none"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => toast.success('Meta Matrix Synced')}
                                        className="h-14 px-10 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
                                    >
                                        <Monitor size={18} />
                                        Optimize Discovery
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/10 rounded-[3rem] p-12 mt-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trash2 size={120} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 text-red-500 mb-4">
                        <Shield size={24} />
                        <h3 className="text-xl font-black tracking-tight uppercase tracking-widest">Termination Zone</h3>
                    </div>
                    <p className="text-sm text-foreground/40 font-medium mb-8 max-w-xl">
                        Warning: Deleting your administrative presence will permanently revoke your access to the executive dashboard and clear all neural associations.
                    </p>
                    <button 
                        onClick={() => toast.error('Termination Requires Root Verification')}
                        className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-all duration-500"
                    >
                        Terminate Administrative Session
                    </button>
                </div>
            </div>
        </div>
    );
}
