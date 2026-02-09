'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image: string;
        tags: string[];
        link?: string;
    };
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group card-gradient-border rounded-xl p-[1px] h-full transition-transform duration-300"
        >
            <div className="bg-surface rounded-[11px] h-full overflow-hidden flex flex-col">
                {/* Image Container */}
                <div className="aspect-video w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-accent-violet transition-colors">
                            {project.title}
                        </h3>
                        <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-2 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                            <span 
                                key={tag}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider font-semibold text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
