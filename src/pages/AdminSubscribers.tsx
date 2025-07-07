
import React from 'react';
import AdminSubscribers from '@/components/AdminSubscribers';
import { ThemeProvider } from '@/contexts/ThemeContext';

const AdminSubscribersPage = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <AdminSubscribers />
      </div>
    </ThemeProvider>
  );
};

export default AdminSubscribersPage;
