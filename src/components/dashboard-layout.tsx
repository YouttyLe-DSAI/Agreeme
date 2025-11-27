import React from "react";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar cố định bên trái */}
      <Sidebar />
      
      {/* Phần nội dung chính (Main Content) */}
      {/* ml-64: Để đẩy nội dung sang phải tránh bị Sidebar che mất */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}