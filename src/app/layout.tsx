import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Providers from './providers';
import Link from 'next/link';
import ThemeButton from './components/ThemeButton';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
     
      <SessionProvider session={session}>
       
      <body className={inter.className}>{children}</body>
      </SessionProvider>
      
    </html>
  )
}