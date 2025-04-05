'use client';

import { ClerkAuthProvider } from './clerk-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ClerkAuthProvider>
        {children}
      </ClerkAuthProvider>
    </ThemeProvider>
  );
} 