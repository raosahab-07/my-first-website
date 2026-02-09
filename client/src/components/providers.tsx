'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster } from 'sonner';
import { VisualConfigProvider } from '@/contexts/VisualConfigContext';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <VisualConfigProvider>
        {children}
      </VisualConfigProvider>
      <Toaster position="top-right" theme="dark" richColors />
    </QueryClientProvider>
  );
}
