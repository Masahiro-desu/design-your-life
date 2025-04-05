'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

export function ClerkAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const clerkTheme = theme === 'dark' ? dark : undefined;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
        elements: {
          formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
          card: 'bg-background',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
} 