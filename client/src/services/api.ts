import { supabase } from '@/lib/supabase';
import axios from 'axios';


export const projectService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('order', { ascending: true });
        if (error) throw error;
        return { data };
    },
    getOne: async (id: string) => {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return { data };
    },
};

export const skillService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('order', { ascending: true });
        if (error) throw error;
        return { data };
    },
};

export const experienceService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('order', { ascending: true });
        if (error) throw error;
        return { data };
    },
};

export const messageService = {
    send: async (payload: any) => {
        const { data, error } = await supabase
            .from('messages')
            .insert([payload]);
        if (error) throw error;
        return { data };
    },
    delete: async (id: string) => {
        const { data, error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return { data };
    },
};


export const aiService = {
    analyzeResume: async (resumeText: string) => {
        const response = await axios.post('/api/ai/analyze-resume', { resumeText });
        return response.data;
    },
    suggestSkills: async () => ({ data: [] }),
    recommendProjects: async () => ({ data: [] }),
};

