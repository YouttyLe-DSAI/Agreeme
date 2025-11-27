// src/components/auth-layout.tsx
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    // Container chính
    <div className="flex h-screen w-full overflow-hidden bg-[#0B0E24]">
      
      {/* -------------------------------------------------------
        CỘT TRÁI (ĐÃ KHÔI PHỤC LẠI GIAO DIỆN CŨ)
        -------------------------------------------------------
      */}
      <div className="hidden flex-col justify-center px-16 xl:pl-32 lg:flex lg:w-[65%] relative z-10">
        
        {/* Logo - Quay về kiểu hộp chữ nhật đơn giản */}
        <div className="mb-12">
          <div className="flex items-center gap-3">
            {/* Khung LOGO */}
            <div className="flex h-10 w-20 items-center justify-center rounded-md border border-gray-700 bg-[#161930] text-xs font-bold tracking-wider text-white">
              LOGO
            </div>
            {/* Chữ AGREEME - Font Serif */}
            <h1 className="text-xl font-bold tracking-[0.2em] text-white font-serif">AGREEME</h1>
          </div>
        </div>
        
        {/* Text Nội dung - Quay về chữ HELLO to */}
        <div className="max-w-2xl">
          <h2 className="mb-6 font-serif text-7xl font-bold leading-tight tracking-tight text-white">
            HELLO,
          </h2>
          <p className="text-xl font-light text-gray-300 leading-relaxed max-w-lg">
            Welcome to the AI Contract Analysis platform.
            <br />
            Streamline your legal workflow today.
          </p>
        </div>

        {/* Nền trang trí (Giữ lại để đỡ trống) */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* -------------------------------------------------------
        CỘT PHẢI (GIỮ NGUYÊN CODE BẠN VỪA GỬI)
        -------------------------------------------------------
      */}
      <div className="flex flex-col justify-end w-full h-full relative z-20 pr-16 xl:pr-24 lg:w-[35%]">
        
        {/* KHUNG TRẮNG CHÍNH 
            - h-[92%]: Theo code của bạn để tạo khoảng hở trên.
            - rounded-t-[3rem]: Bo tròn góc trên.
        */}
        <div className="w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto bg-white rounded-t-[2rem] rounded-b-none p-20 lg:p-12 shadow-[0_-30px_70px_-15px_rgba(0,0,0,0.4)] flex flex-col h-[92%] font-sans">
            
            {/* Nội dung Form */}
            <div className="flex-1 flex flex-col justify-center">
               {children}
            </div>

        </div>
      </div>
    </div>
  );
}