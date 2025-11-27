"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  LogOut, 
  ChevronDown,
  User as UserIcon,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"VI" | "ENG">("ENG");
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsMenuOpen(false);
    router.push("/login");
  };

  const handleGoToProfile = () => {
    setIsMenuOpen(false);
    router.push("/profile");
  };

  if (!mounted) return null;

  return (
    <nav className="flex items-center justify-between h-24 px-10 bg-[#0B0E24] text-white sticky top-0 z-50 shadow-md transition-all">
      
      {/* [UPDATE] Đã gắn link điều hướng thực tế */}
      <div className="flex gap-10 text-base font-medium text-gray-300">
        <Link 
          href="/templates" 
          className="hover:text-white hover:underline underline-offset-8 decoration-2 transition-all"
        >
          Templates
        </Link>
        <Link 
          href="/analysis" 
          className="hover:text-white hover:underline underline-offset-8 decoration-2 transition-all"
        >
          Analysis
        </Link>
        <Link 
          href="#" 
          className="hover:text-white hover:underline underline-offset-8 decoration-2 transition-all"
        >
          FAQ
        </Link>
      </div>

      {/* Center Logo - Click về trang chủ */}
      <div className="flex items-center gap-3 absolute left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={() => router.push('/')}>
        <div className="flex h-10 w-16 items-center justify-center rounded bg-blue-600 text-xs font-bold shadow-lg shadow-blue-900/50">
          LOGO
        </div>
        <span className="text-2xl font-bold tracking-wider text-blue-500 font-sans">AGREEME</span>
      </div>

      {/* Right Section */}
      <div className="flex gap-6 items-center">
        <div className="flex items-center bg-[#15182e] p-1 rounded-full border border-gray-700">
            <button 
                onClick={() => setLang("VI")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    lang === "VI" ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
            >
                VI
            </button>
            <button 
                onClick={() => setLang("ENG")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    lang === "ENG" ? "bg-blue-600 text-white shadow-md" : "text-gray-400 hover:text-gray-200"
                }`}
            >
                ENG
            </button>
        </div>

        {user ? (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center bg-[#1c1f3a] rounded-full border p-1.5 gap-3 pl-5 transition-all duration-200 ${
                isMenuOpen ? "border-blue-500 shadow-blue-500/20 shadow-lg" : "border-gray-700 hover:border-gray-500"
              }`}
            >
                <div className="flex flex-col items-end leading-none">
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Welcome</span>
                    <span className="font-bold text-sm text-blue-400 truncate max-w-[100px]">{user.name}</span>
                </div>
                
                <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-inner">
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <div className={`pr-2 transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1c1f3a] border border-gray-700 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 z-50 overflow-hidden">
                <div className="px-4 py-2 border-b border-gray-700/50 mb-1">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-bold text-white truncate">{user.name}</p>
                </div>

                <button 
                  onClick={handleGoToProfile}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <UserIcon className="w-4 h-4" /> Profile
                </button>
                
                <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-blue-600 hover:text-white flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                
                <div className="h-px bg-gray-700/50 my-1 mx-2"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center gap-2 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <Button className="rounded-full bg-blue-600 hover:bg-blue-500 text-white h-10 px-8 font-semibold shadow-lg shadow-blue-900/20 transition-all hover:scale-105">
              Login / Register
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}