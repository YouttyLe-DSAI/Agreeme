"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TemplateEditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  // State giả lập dữ liệu hợp đồng
  const [formData, setFormData] = useState({
    partyA: "",
    partyB: "",
    salary: "",
    startDate: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />

      {/* Toolbar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between sticky top-24 z-40">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại
            </Button>
            <h2 className="font-bold text-gray-800">Soạn thảo: Hợp đồng lao động</h2>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" /> Lưu nháp
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" /> Xuất PDF
            </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-140px)] overflow-hidden">
        
        {/* LEFT: FORM INPUT */}
        <div className="w-full lg:w-1/3 bg-white border-r overflow-y-auto p-6 shadow-sm z-10">
            <h3 className="font-bold text-lg mb-6 text-blue-600">Thông tin hợp đồng</h3>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Bên A (Người sử dụng lao động)</Label>
                    <Input name="partyA" placeholder="Tên công ty..." onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label>Bên B (Người lao động)</Label>
                    <Input name="partyB" placeholder="Họ và tên..." onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label>Mức lương chính (VNĐ)</Label>
                    <Input name="salary" placeholder="VD: 15.000.000" onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                    <Label>Ngày bắt đầu làm việc</Label>
                    <Input type="date" name="startDate" onChange={handleInputChange} />
                </div>
            </div>
        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="w-full lg:w-2/3 bg-gray-100 p-8 overflow-y-auto flex justify-center">
            <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg p-[20mm] text-sm leading-relaxed text-justify">
                {/* Nội dung giả lập hợp đồng */}
                <h1 className="text-center font-bold text-xl mb-2">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                <p className="text-center font-bold mb-8">Độc lập - Tự do - Hạnh phúc</p>
                
                <h2 className="text-center font-bold text-lg mb-6">HỢP ĐỒNG LAO ĐỘNG</h2>
                
                <p className="mb-4">Hôm nay, ngày ... tháng ... năm ..., tại ... chúng tôi gồm:</p>
                
                <p className="font-bold mb-1">BÊN A: {formData.partyA || "...................."}</p>
                <p className="mb-4">Đại diện cho Công ty/Doanh nghiệp.</p>

                <p className="font-bold mb-1">BÊN B: {formData.partyB || "...................."}</p>
                <p className="mb-4">Sinh ngày: ... CMND/CCCD số: ...</p>

                <p className="mb-2">Hai bên thỏa thuận ký kết hợp đồng lao động với các điều khoản sau:</p>

                <h3 className="font-bold mt-4 mb-2">Điều 1: Công việc và địa điểm làm việc</h3>
                <p>1. Bên B sẽ làm việc cho bên A bắt đầu từ ngày <span className="font-bold">{formData.startDate || "..."}</span>.</p>
                
                <h3 className="font-bold mt-4 mb-2">Điều 2: Chế độ lương thưởng</h3>
                <p>1. Mức lương chính: <span className="font-bold">{formData.salary || "..."} VNĐ/tháng</span>.</p>
                <p>2. Được hưởng các chế độ bảo hiểm theo quy định của pháp luật Việt Nam.</p>

                <p className="mt-8 italic text-gray-400 text-center">[... Các điều khoản khác ...]</p>
            </div>
        </div>
      </div>
    </div>
  );
}