'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

import "./globals.css";
import { Toaster } from '@/components/ui/sonner';




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [client] = useState(new QueryClient())
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={client}>
          {children}
          <Toaster/>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}

