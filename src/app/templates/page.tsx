"use client";

import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock Data: Danh sách mẫu hợp đồng
const templates = [
  {
    id: "hd-lao-dong",
    title: "Hợp đồng lao động",
    category: "Nhân sự",
    description: "Mẫu hợp đồng tiêu chuẩn cho nhân viên chính thức, bao gồm các điều khoản về lương, thưởng và bảo hiểm.",
    popular: true,
  },
  {
    id: "hd-thue-nha",
    title: "Hợp đồng thuê nhà",
    category: "Bất động sản",
    description: "Dành cho cá nhân hoặc tổ chức thuê văn phòng, nhà ở. Đầy đủ pháp lý bảo vệ quyền lợi hai bên.",
    popular: true,
  },
  {
    id: "hd-dich-vu",
    title: "Hợp đồng cung cấp dịch vụ",
    category: "Thương mại",
    description: "Dùng cho freelancer hoặc công ty agency cung cấp dịch vụ marketing, thiết kế, lập trình...",
    popular: false,
  },
  {
    id: "nda",
    title: "Thỏa thuận bảo mật (NDA)",
    category: "Pháp lý",
    description: "Văn bản cam kết không tiết lộ thông tin mật giữa hai bên đối tác.",
    popular: false,
  },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-10 px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B0E24]">Thư viện mẫu hợp đồng</h1>
          <p className="text-gray-500 mt-2">Chọn một mẫu để bắt đầu soạn thảo hợp đồng chuẩn pháp lý chỉ trong vài phút.</p>
        </div>

        {/* Grid Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-all cursor-pointer border-gray-200 group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">{template.category}</Badge>
                  {template.popular && <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200"><Star className="w-3 h-3 mr-1 fill-orange-700" /> Phổ biến</Badge>}
                </div>
                <CardTitle className="text-xl text-[#0B0E24] group-hover:text-blue-600 transition-colors">
                  {template.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center border border-dashed border-gray-300">
                    <FileText className="w-10 h-10 text-gray-400" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/templates/${template.id}`} className="w-full">
                  <Button className="w-full bg-white text-[#0B0E24] border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600">
                    Sử dụng mẫu này <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}