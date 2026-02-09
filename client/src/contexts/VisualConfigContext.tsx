'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Define the visual configuration interface
export interface VisualConfig {
  accentColor: string;
  uiMode: 'glass' | 'solid';
  motionVelocity: 'slow' | 'normal' | 'fast';
  brandText: string;
}

// Default configuration
const DEFAULT_CONFIG: VisualConfig = {
  accentColor: '#7C3AED', // Vibrant violet
  uiMode: 'glass',
  motionVelocity: 'normal',
  brandText: 'Welcome Buddy'
};

// Preset color options for the admin panel
export const COLOR_PRESETS = [
  { name: 'Violet', color: '#7C3AED' },
  { name: 'Emerald', color: '#10B981' },
  { name: 'Amber', color: '#F59E0B' },
  { name: 'Crimson', color: '#EF4444' },
  { name: 'Cyan', color: '#06B6D4' },
  { name: 'Pink', color: '#EC4899' },
  { name: 'Indigo', color: '#6366F1' },
  { name: 'Teal', color: '#14B8A6' },
  { name: 'Orange', color: '#F97316' },
  { name: 'Purple', color: '#A855F7' }
];

// Context value interface
interface VisualConfigContextType {
  config: VisualConfig;
  isLoading: boolean;
  updateConfig: (newConfig: Partial<VisualConfig>) => Promise<void>;
  applyConfigGlobally: (config: VisualConfig) => void;
  resetToDefaults: () => Promise<void>;
}

// Create the context
const VisualConfigContext = createContext<VisualConfigContextType | undefined>(undefined);

// Provider component
export function VisualConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<VisualConfig>(DEFAULT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  // Apply configuration to CSS variables and global styles with fail-safe behavior
  const applyConfigGlobally = useCallback((newConfig: VisualConfig) => {
    if (typeof window === 'undefined') return;

    try {
      // Apply accent color with validation
      if (/^#[0-9A-F]{6}$/i.test(newConfig.accentColor)) {
        document.documentElement.style.setProperty('--primary', newConfig.accentColor);
        document.documentElement.style.setProperty('--color-primary', newConfig.accentColor);
        document.documentElement.style.setProperty('--color-accent-violet', newConfig.accentColor);
        
        // Generate complementary colors
        const r = parseInt(newConfig.accentColor.slice(1, 3), 16);
        const g = parseInt(newConfig.accentColor.slice(3, 5), 16);
        const b = parseInt(newConfig.accentColor.slice(5, 7), 16);
        
        const pinkColor = `rgb(${Math.min(255, r + 30)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`;
        document.documentElement.style.setProperty('--color-accent-pink', pinkColor);
        document.documentElement.style.setProperty('--accent-pink', pinkColor);
        
        // Set dynamic gradient variables
        document.documentElement.style.setProperty('--gradient-start', newConfig.accentColor);
        document.documentElement.style.setProperty('--gradient-end', pinkColor);
        
        // Set glow color with alpha channel
        const glowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        document.documentElement.style.setProperty('--glow-color', glowColor);
      }
      
      // Apply UI mode (glass/solid) with validation
      if (newConfig.uiMode === 'glass' || newConfig.uiMode === 'solid') {
        document.documentElement.setAttribute('data-ui-mode', newConfig.uiMode);
      }
      
      // Apply motion velocity with validation
      const validVelocities = ['slow', 'normal', 'fast'] as const;
      if (validVelocities.includes(newConfig.motionVelocity)) {
        const durations = {
          slow: '0.6s',
          normal: '0.3s',
          fast: '0.15s'
        };
        document.documentElement.style.setProperty('--motion-duration', durations[newConfig.motionVelocity]);
      }
      
      // Apply brand text (ensure it's not empty)
      if (newConfig.brandText && newConfig.brandText.trim()) {
        // Brand text is consumed by components, not CSS
      }
      
      // Save to localStorage for immediate availability
      localStorage.setItem('visual-config', JSON.stringify(newConfig));
      
    } catch (error) {
      console.error('Error applying visual configuration:', error);
      // Apply safe defaults on error
      document.documentElement.setAttribute('data-ui-mode', 'glass');
      document.documentElement.style.setProperty('--primary', '#7C3AED');
      document.documentElement.style.setProperty('--motion-duration', '0.3s');
    }
  }, []);

  // Fetch configuration from database with enhanced fail-safe behavior
  const fetchConfig = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to get user-specific config first
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError) {
        console.warn('Auth error, falling back to localStorage:', authError.message);
      } else if (user?.user_metadata?.visual_config) {
        const userConfig = user.user_metadata.visual_config;
        // Validate config structure
        const validatedConfig = {
          accentColor: typeof userConfig.accentColor === 'string' && /^#[0-9A-F]{6}$/i.test(userConfig.accentColor) 
            ? userConfig.accentColor 
            : DEFAULT_CONFIG.accentColor,
          uiMode: userConfig.uiMode === 'glass' || userConfig.uiMode === 'solid' 
            ? userConfig.uiMode 
            : DEFAULT_CONFIG.uiMode,
          motionVelocity: ['slow', 'normal', 'fast'].includes(userConfig.motionVelocity) 
            ? userConfig.motionVelocity 
            : DEFAULT_CONFIG.motionVelocity,
          brandText: typeof userConfig.brandText === 'string' && userConfig.brandText.trim() 
            ? userConfig.brandText 
            : DEFAULT_CONFIG.brandText
        };
        
        setConfig(validatedConfig);
        applyConfigGlobally(validatedConfig);
        return;
      }
      
      // Check localStorage as fallback
      const localConfig = localStorage.getItem('visual-config');
      if (localConfig) {
        try {
          const parsedConfig = JSON.parse(localConfig);
          // Validate localStorage config
          const validatedConfig = {
            accentColor: typeof parsedConfig.accentColor === 'string' && /^#[0-9A-F]{6}$/i.test(parsedConfig.accentColor) 
              ? parsedConfig.accentColor 
              : DEFAULT_CONFIG.accentColor,
            uiMode: parsedConfig.uiMode === 'glass' || parsedConfig.uiMode === 'solid' 
              ? parsedConfig.uiMode 
              : DEFAULT_CONFIG.uiMode,
            motionVelocity: ['slow', 'normal', 'fast'].includes(parsedConfig.motionVelocity) 
              ? parsedConfig.motionVelocity 
              : DEFAULT_CONFIG.motionVelocity,
            brandText: typeof parsedConfig.brandText === 'string' && parsedConfig.brandText.trim() 
              ? parsedConfig.brandText 
              : DEFAULT_CONFIG.brandText
          };
          
          setConfig(validatedConfig);
          applyConfigGlobally(validatedConfig);
          return;
        } catch (parseError) {
          console.warn('Invalid localStorage config, using defaults');
        }
      }
      
      // Apply defaults
      setConfig(DEFAULT_CONFIG);
      applyConfigGlobally(DEFAULT_CONFIG);
      
    } catch (error) {
      console.error('Critical error fetching visual configuration:', error);
      // Apply safe defaults - never break the UI
      setConfig(DEFAULT_CONFIG);
      applyConfigGlobally(DEFAULT_CONFIG);
    } finally {
      setIsLoading(false);
    }
  }, [applyConfigGlobally]);

  // Update configuration
  const updateConfig = useCallback(async (newConfig: Partial<VisualConfig>) => {
    try {
      const updatedConfig = { ...config, ...newConfig };
      setConfig(updatedConfig);
      
      // Apply immediately
      applyConfigGlobally(updatedConfig);
      
      // Save to database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.auth.updateUser({
          data: { 
            visual_config: updatedConfig 
          }
        });
        
        if (error) {
          throw error;
        }
        
        toast.success('Visual configuration updated successfully');
      }
      
    } catch (error: any) {
      console.error('Error updating visual configuration:', error);
      toast.error('Failed to update visual configuration: ' + error.message);
      // Revert to previous config on error
      applyConfigGlobally(config);
    }
  }, [config, applyConfigGlobally]);

  // Reset to defaults
  const resetToDefaults = useCallback(async () => {
    try {
      await updateConfig(DEFAULT_CONFIG);
      toast.success('Configuration reset to defaults');
    } catch (error) {
      toast.error('Failed to reset configuration');
    }
  }, [updateConfig]);

  // Initialize on mount
  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  // Apply config when it changes
  useEffect(() => {
    if (!isLoading) {
      applyConfigGlobally(config);
    }
  }, [config, isLoading, applyConfigGlobally]);

  const contextValue: VisualConfigContextType = {
    config,
    isLoading,
    updateConfig,
    applyConfigGlobally,
    resetToDefaults
  };

  return (
    <VisualConfigContext.Provider value={contextValue}>
      {children}
    </VisualConfigContext.Provider>
  );
}

// Hook to use the visual config context
export function useVisualConfig() {
  const context = useContext(VisualConfigContext);
  if (context === undefined) {
    throw new Error('useVisualConfig must be used within a VisualConfigProvider');
  }
  return context;
}