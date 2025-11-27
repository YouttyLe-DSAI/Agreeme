"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  UploadCloud, 
  FolderOpen, 
  FileSearch, 
  LayoutTemplate, 
  Settings, 
  LogOut,
  User as UserIcon,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { icon: UploadCloud, label: "Upload", href: "/analysis" }, // Tạm thời trỏ về analysis (trạng thái upload)
  { icon: FolderOpen, label: "Repository", href: "/repository" },
  { icon: FileSearch, label: "Analysis", href: "/analysis" },
  { icon: LayoutTemplate, label: "Templates", href: "/templates" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-[#0B0E24] text-white flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-50">
      {/* 1. LOGO */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-gray-800 cursor-pointer" onClick={() => router.push('/')}>
        <div className="flex h-8 w-12 items-center justify-center rounded bg-blue-600 text-[10px] font-bold shadow-lg">
          LOGO
        </div>
        <span className="text-xl font-bold tracking-wider text-blue-500 font-sans">AGREEME</span>
      </div>

      {/* 2. MENU ITEMS */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
              {item.label}
              {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* 3. USER PROFILE (BOTTOM) */}
      <div className="p-4 border-t border-gray-800">
        {user ? (
          <div className="flex items-center gap-3 bg-[#15182e] p-3 rounded-xl border border-gray-700">
            <Avatar className="h-9 w-9 border border-gray-600">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-blue-600 text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email || "user@example.com"}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-bold transition-colors">
              Đăng nhập
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}