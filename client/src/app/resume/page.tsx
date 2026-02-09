'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Calendar, MapPin, Briefcase, GraduationCap, Code, Award, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { projectService, skillService } from '@/services/api';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/Avatar';

export default function ResumePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch user data and apply saved appearance
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserData({
            displayName: user.user_metadata?.display_name || 'Rao Sahab',
            avatarUrl: user.user_metadata?.avatar_url || '',
            bio: user.user_metadata?.bio || 'Passionate full-stack engineer with expertise in building scalable web applications and creating exceptional user experiences. Specializing in modern technologies and pixel-perfect design implementation.'
          });
          
          // Apply saved appearance colors
          if (user.user_metadata?.appearance?.accentColor) {
            document.documentElement.style.setProperty('--primary', user.user_metadata.appearance.accentColor);
            const primaryColor = user.user_metadata.appearance.accentColor;
            const r = parseInt(primaryColor.slice(1, 3), 16);
            const g = parseInt(primaryColor.slice(3, 5), 16);
            const b = parseInt(primaryColor.slice(5, 7), 16);
            document.documentElement.style.setProperty('--accent-violet', primaryColor);
            document.documentElement.style.setProperty('--accent-pink', `rgb(${Math.min(255, r + 30)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Fetch data
  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getAll
  });

  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: skillService.getAll
  });

  const projects = projectsData?.data || [];
  const skills = skillsData?.data || [];

  // Filter active projects
  const featuredProjects = projects.filter((p: any) => p.status === 'active' || p.status === 'completed').slice(0, 6);

  const downloadResume = () => {
    try {
      // Direct path to the resume file in public directory
      const resumeUrl = '/resume.pdf';
      
      // Create download link with correct filename
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'resume.pdf';
      link.style.display = 'none';
      
      // Add to DOM, click, then remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback - open in new tab
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Download Button */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            Professional Resume
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadResume}
            className="group relative px-6 py-3 bg-gradient-to-r from-primary to-accent-pink text-white font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            Download Resume
            <ExternalLink size={16} className="opacity-70" />
          </motion.button>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <Avatar 
                src={userData?.avatarUrl}
                alt="Rao Sahab Profile Photo"
                size={128}
                gradientRing={false}
                glow={false}
                showFallback={true}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
              />
            </motion.div>
            <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
              Rao Sahab
            </h1>
            <h2 className="text-2xl text-gray-300 mb-6 font-light">
              Senior Full Stack Developer & UI/UX Designer
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {userData?.bio || 'Passionate full-stack engineer with expertise in building scalable web applications and creating exceptional user experiences. Specializing in modern technologies and pixel-perfect design implementation.'}
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Code className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-white">Technical Skills</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.slice(0, 12).map((skill: any, index: number) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {skill.icon && (
                    <div className="text-2xl" dangerouslySetInnerHTML={{ __html: skill.icon }} />
                  )}
                  <span className="text-white font-medium">{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Work Experience */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-white">Work Experience</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Senior Full Stack Developer</h3>
                  <p className="text-primary font-medium">Tech Innovations Inc.</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} />
                  <span>Jan 2022 - Present</span>
                </div>
              </div>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li className="list-disc">Led development of scalable web applications serving 100K+ users</li>
                <li className="list-disc">Implemented modern React architecture with TypeScript and Next.js</li>
                <li className="list-disc">Designed and developed responsive UI components with Tailwind CSS</li>
                <li className="list-disc">Collaborated with cross-functional teams to deliver high-quality products</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Frontend Developer</h3>
                  <p className="text-primary font-medium">Digital Solutions Ltd.</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar size={16} />
                  <span>Mar 2020 - Dec 2021</span>
                </div>
              </div>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li className="list-disc">Developed responsive web interfaces using React and Vue.js</li>
                <li className="list-disc">Created design systems and component libraries</li>
                <li className="list-disc">Optimized application performance and user experience</li>
                <li className="list-disc">Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project: any, index: number) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                    <span 
                      key={`${project._id}-tech-${i}`}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary hover:text-accent-pink transition-colors text-sm font-medium"
                  >
                    View Project →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-primary" size={28} />
            <h2 className="text-3xl font-bold text-white">Education</h2>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Bachelor of Technology</h3>
                <p className="text-primary font-medium">Computer Science & Engineering</p>
                <p className="text-gray-400">Indian Institute of Technology</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar size={16} />
                <span>2016 - 2020</span>
              </div>
            </div>
            <p className="text-gray-300">
              Specialized in Software Engineering and Human-Computer Interaction. 
              Graduated with honors and completed capstone project on AI-powered web applications.
            </p>
          </div>
        </motion.section>
      </main>

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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}