const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set in .env.local');
    process.exit(1);
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key Presence:', !!supabaseAnonKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PROJECTS = [
    {
        title: 'Nexus Social',
        description: 'A real-time collaboration platform for remote teams with built-in voice and video.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['React', 'Socket.io', 'WebRTC'],
        category: 'web',
        github_url: 'https://github.com/raushan-yadav',
        live_url: 'https://github.com/raushan-yadav',
        order: 1
    },
    {
        title: 'Aura Health',
        description: 'Personalized wellness tracking with AI-driven insights and meal recommendations.',
        image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['Flutter', 'TensorFlow', 'GraphQL'],
        category: 'mobile',
        github_url: 'https://github.com/raushan-yadav',
        live_url: 'https://github.com/raushan-yadav',
        order: 2
    },
    {
        title: 'Lumina UI Kit',
        description: 'A massive design system with over 500+ components for modern SaaS applications.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
        tech_stack: ['Figma', 'Tokens', 'SaaS'],
        category: 'design',
        github_url: 'https://github.com/raushan-yadav',
        live_url: 'https://github.com/raushan-yadav',
        order: 3
    }
];

const EXPERIENCES = [
    {
        title: 'Senior Full-Stack Developer',
        company: 'Tech Innovators',
        start_date: '2021',
        end_date: 'Present',
        description: 'Leading the development of AI-powered enterprise solutions and mentoring junior developers.',
        type: 'work',
        order: 1,
        is_current: true
    },
    {
        title: 'Full-Stack Developer',
        company: 'Nexus Softwares',
        start_date: '2019',
        end_date: '2021',
        description: 'Built scalable web applications using React and Node.js for global clients.',
        type: 'work',
        order: 2,
        is_current: false
    },
    {
        title: 'B.Tech in Computer Science',
        company: 'University of Technology',
        start_date: '2015',
        end_date: '2019',
        description: 'Specialized in Algorithms, Data Structures, and Software Engineering.',
        type: 'education',
        order: 3,
        is_current: false
    }
];

const SKILLS = [
    { name: 'React / Next.js', level: 95, category: 'Frontend', order: 1 },
    { name: 'TypeScript', level: 90, category: 'Languages', order: 2 },
    { name: 'Node.js / Express', level: 88, category: 'Backend', order: 3 },
    { name: 'MongoDB / PostgreSQL', level: 85, category: 'Database', order: 4 },
    { name: 'Tailwind CSS', level: 95, category: 'Frontend', order: 5 },
    { name: 'Python / AI', level: 80, category: 'Specialized', order: 6 },
    { name: 'Figma / UI Design', level: 85, category: 'Design', order: 7 },
    { name: 'AWS / Docker', level: 75, category: 'DevOps', order: 8 },
];

async function seed() {
    console.log('🌱 Starting seeding process...');

    try {
        // Clear existing data (optional, but good for idempotent seeding)
        // await supabase.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        // await supabase.from('experiences').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        // await supabase.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        console.log('Inserting projects...');
        const { error: projError } = await supabase.from('projects').insert(PROJECTS);
        if (projError) throw projError;

        console.log('Inserting experiences...');
        const { error: expError } = await supabase.from('experiences').insert(EXPERIENCES);
        if (expError) throw expError;

        console.log('Inserting skills...');
        const { error: skillError } = await supabase.from('skills').insert(SKILLS);
        if (skillError) throw skillError;

        console.log('✅ Seeding completed successfully!');
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
    }
}

seed();
