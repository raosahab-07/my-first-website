'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { ProjectCard } from '@/components/project-card';
import { useQuery } from '@tanstack/react-query';
import { api, projectService } from '@/services/api';

export function Projects() {
    const { data: response } = useQuery({
        queryKey: ['projects'],
        queryFn: projectService.getAll
    });

    const [showScrollTop, setShowScrollTop] = useState(false);

    // Handle scroll to top button visibility
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const projectsList = response?.data || [];
    // Filtering active projects for the grid
    const featuredProjects = projectsList.filter((p: any) => p.status === 'active' || p.status === 'completed').slice(0, 6);

    return (
        <section className="px-6 md:px-12 py-24 bg-background relative" id="projects">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Selected Work</h2>
                        <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                            A collection of projects that define my journey in digital product design and engineering.
                        </p>
                    </motion.div>
                    
                    <motion.a 
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-white hover:text-accent-violet transition-colors flex items-center gap-2 font-medium group cursor-pointer"
                    >
                        View all projects
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project: any, index: number) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProjectCard 
                                project={{
                                    title: project.title,
                                    description: project.description,
                                    image: project.imageUrl || '/project-placeholder.jpg',
                                    tags: project.technologies,
                                    link: project.liveUrl
                                }} 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                    opacity: showScrollTop ? 1 : 0, 
                    scale: showScrollTop ? 1 : 0.8,
                    y: showScrollTop ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 size-14 rounded-full bg-primary hover:bg-accent-violet text-white shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
        </section>
    );
}
