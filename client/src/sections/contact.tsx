'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                toast.success(result.message);
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
            console.error('Submission error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-background py-24 px-6 md:px-12 flex justify-center relative overflow-hidden" id="contact">
            {/* Decorative gradient blur (Sigma 3) */}
            <div className="absolute top-20 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="w-full max-w-[1024px] flex flex-col md:flex-row gap-16 relative z-10">
                <div className="flex-1 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">Get in Touch</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                            Let&apos;s build something <span className="text-gradient">extraordinary.</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                            I&apos;m currently available for freelance projects and open to full-time opportunities. If you have a project that needs some creative injection, let&apos;s chat.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-6 mt-4">
                        <motion.div 
                            className="flex items-center gap-4 group cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="size-12 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                <Mail className="text-white group-hover:text-primary transition-colors" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email Me</p>
                                <p className="text-white font-medium text-sm sm:text-base break-all sm:break-normal">raushanyadav2028.r@gmail.com</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className="flex items-center gap-4 group cursor-pointer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="size-12 rounded-full bg-surface border border-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                <Phone className="text-white group-hover:text-primary transition-colors" size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Call Me</p>
                                <p className="text-white font-medium">+91 95766 89637</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex-1">
                    <motion.form 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-surface/80 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        {/* Subtle top highlight */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-pink/50 to-primary opacity-50"></div>
                        
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="relative float-label-input">
                                <input 
                                    className="block w-full rounded-lg bg-background border border-white/10 px-4 pt-5 pb-2 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none peer" 
                                    id="name" 
                                    placeholder=" " 
                                    required 
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                <label 
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2" 
                                    htmlFor="name"
                                >
                                    Your Name
                                </label>
                            </div>

                            {/* Email Field */}
                            <div className="relative float-label-input">
                                <input 
                                    className="block w-full rounded-lg bg-background border border-white/10 px-4 pt-5 pb-2 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none peer" 
                                    id="email" 
                                    placeholder=" " 
                                    required 
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <label 
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2" 
                                    htmlFor="email"
                                >
                                    Email Address
                                </label>
                            </div>

                            {/* Subject Field */}
                            <div className="relative float-label-input">
                                <input 
                                    className="block w-full rounded-lg bg-background border border-white/10 px-4 pt-5 pb-2 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none peer" 
                                    id="subject" 
                                    placeholder=" " 
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                <label 
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2" 
                                    htmlFor="subject"
                                >
                                    Subject
                                </label>
                            </div>

                            {/* Message Field */}
                            <div className="relative float-label-input">
                                <textarea 
                                    className="block w-full rounded-lg bg-background border border-white/10 px-4 pt-5 pb-2 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none appearance-none peer resize-none" 
                                    id="message" 
                                    placeholder=" " 
                                    required 
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                                <label 
                                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2" 
                                    htmlFor="message"
                                >
                                    Your Message
                                </label>
                            </div>

                            <button 
                                className="group relative w-full overflow-hidden rounded-lg bg-primary py-3 px-4 text-white font-bold transition-all hover:bg-accent-violet focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={loading}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                                    {loading ? 'Sending...' : 'Send Message'}
                                    <Send size={18} />
                                </span>
                            </button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

