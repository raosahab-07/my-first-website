'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Experience() {
    return (
        <section className="py-20 px-6 md:px-12 bg-surface/50 border-y border-white/5" id="about">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold text-white">
                            Engineering with <span className="text-gradient">Purpose</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            With over 8 years of experience in full-stack development, I bridge the gap between complex backend logic and fluid frontend experiences. I don't just write code; I build solutions that scale, perform, and delight users.
                        </p>
                        
                        <div className="flex gap-4 pt-4">
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white tracking-tighter">8+</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Years Exp.</span>
                            </div>
                            <div className="w-px h-16 bg-white/10 mx-4" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white tracking-tighter">40+</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Projects</span>
                            </div>
                            <div className="w-px h-16 bg-white/10 mx-4" />
                            <div className="flex flex-col">
                                <span className="text-4xl font-bold text-white tracking-tighter">12</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">Awards</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden bg-[#131118] border border-white/5 group shadow-2xl"
                    >
                        {/* Decorative Code Block Header */}
                        <div className="absolute top-0 left-0 w-full bg-[#1e1b24] p-3 flex gap-2 border-b border-white/5 z-10">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        
                        <div className="p-6 pt-14 font-mono text-sm text-gray-400 overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity">
                            <p><span className="text-accent-violet">const</span> <span className="text-blue-400">createExperience</span> = <span className="text-yellow-300">async</span> (&#123; <span className="text-orange-300">user</span>, <span className="text-orange-300">design</span> &#125;) =&gt; &#123;</p>
                            <p className="pl-4"><span className="text-gray-500">// Initialize premium feel</span></p>
                            <p className="pl-4"><span className="text-accent-violet">await</span> design.<span className="text-blue-400">apply</span>(&#123;</p>
                            <p className="pl-8">theme: <span className="text-green-400">&apos;dark&apos;</span>,</p>
                            <p className="pl-8">interactivity: <span className="text-green-400">&apos;fluid&apos;</span>,</p>
                            <p className="pl-8">accessibility: <span className="text-accent-pink">true</span></p>
                            <p className="pl-4">&#125;);</p>
                            <p className="pl-4"><span className="text-accent-violet">return</span> <span className="text-blue-400">new</span> Product(user);</p>
                            <p>&#125;;</p>
                            <br />
                            <p className="text-gray-500">// Ready to deploy?</p>
                            <p className="animate-pulse">_</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
