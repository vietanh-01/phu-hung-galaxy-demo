import React from 'react';
import { Sidebar } from './_components/Sidebar';
import { SignOutButton } from './_components/SignOutButton';
import { auth } from '../../auth';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Admin - Phú Hưng Galaxy',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-center" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, {session?.user?.name || 'Admin'}</h1>
          <SignOutButton />
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 