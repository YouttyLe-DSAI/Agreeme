"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Camera, Plus, X } from "lucide-react";

// Import các UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar"; // Giả sử bạn tách Navbar ra, nếu chưa thì giữ nguyên layout
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tags, setTags] = useState<string[]>(["Hợp đồng lao động", "Kinh doanh"]); // Lĩnh vực mẫu
  const [tagInput, setTagInput] = useState("");

  // React Hook Form setup
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      fullName: "Lê Minh Tuấn",
      email: "leminhtuan111504@gmail.com",
      phone: "0901234567",
      address: "123 Đường ABC",
      city: "HCM",
      dob: "2000-10-23", // Định dạng YYYY-MM-DD cho input date
      gender: "male",
      companyName: "Công ty TNHH ABC",
      companyAddress: "456 Đường XYZ",
      companyPhone: "0283999999",
      taxId: "0312345678",
      businessType: "TNHH",
      businessField: "Công nghệ thông tin",
    },
  });

  // Load thông tin user từ localStorage (nếu có)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (!storedUser) {
      router.push("/login"); // Chưa đăng nhập thì đá về login
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Cập nhật form theo user đăng nhập (nếu muốn logic đồng bộ)
      setValue("fullName", parsedUser.name || "Lê Minh Tuấn");
      setValue("email", parsedUser.email || "leminhtuan111504@gmail.com");
    }
  }, [router, setValue]);

  // Xử lý thêm Tags (Lĩnh vực quan tâm)
  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = (data: any) => {
    console.log("Updated Profile Data:", { ...data, interests: tags });
    alert("Cập nhật thông tin thành công!");
    
    // Cập nhật lại tên hiển thị trên Navbar nếu đổi tên
    if (user) {
        const updatedUser = { ...user, name: data.fullName };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        window.location.reload(); // Refresh để Navbar cập nhật
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 
         LƯU Ý: Nếu Navbar của bạn nằm ở file layout.tsx thì không cần gọi ở đây.
         Nếu chưa có Navbar ở layout, bạn có thể import component Navbar vào đây.
      */}
      
      <div className="max-w-5xl mx-auto pt-10 px-6">
        <h1 className="text-3xl font-bold text-[#0B0E24] mb-8">Thông tin tài khoản</h1>

        {/* --- KHỐI 1: THÔNG TIN GÓI ĐĂNG KÝ (READ ONLY) --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Gói dịch vụ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Tài khoản</p>
                    <p className="font-medium text-gray-900 truncate" title={user.email}>{user.email}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Gói đăng ký</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Miễn phí
                    </span>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Số người sử dụng</p>
                    <p className="font-medium text-gray-900">1 người / thời điểm</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase font-semibold">Ngày đăng ký</p>
                    <p className="font-medium text-gray-900">14:24 23/10/2025</p>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* --- KHỐI 2: THÔNG TIN CÁ NHÂN --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col md:flex-row gap-10">
                    
                    {/* Cột trái: Avatar */}
                    <div className="flex flex-col items-center space-y-4 md:w-1/4">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                                <img 
                                    src="https://github.com/shadcn.png" 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white w-8 h-8" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{watch("fullName")}</h3>
                            <p className="text-sm text-gray-500 truncate max-w-[180px]">{user.email}</p>
                        </div>
                        <Button type="button" variant="outline" className="w-full text-xs">
                            Tải ảnh đại diện
                        </Button>
                        <p className="text-[10px] text-gray-400 text-center">Dung lượng ảnh dưới 10Mb</p>
                    </div>

                    {/* Cột phải: Form nhập liệu */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên</Label>
                            <Input id="fullName" {...register("fullName")} className="bg-gray-50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register("email")} disabled className="bg-gray-100 text-gray-500 cursor-not-allowed" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input id="phone" {...register("phone")} className="bg-gray-50" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dob">Ngày sinh</Label>
                            <Input type="date" id="dob" {...register("dob")} className="bg-gray-50 block" />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input id="address" {...register("address")} className="bg-gray-50" />
                        </div>

                        <div className="space-y-2">
                            <Label>Tỉnh/Thành phố</Label>
                            <Select defaultValue="HCM" onValueChange={(val) => setValue("city", val)}>
                                <SelectTrigger className="bg-gray-50">
                                    <SelectValue placeholder="Chọn tỉnh thành" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="HCM">TP. Hồ Chí Minh</SelectItem>
                                    <SelectItem value="HN">Hà Nội</SelectItem>
                                    <SelectItem value="DN">Đà Nẵng</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Giới tính</Label>
                            <Select defaultValue="male" onValueChange={(val) => setValue("gender", val)}>
                                <SelectTrigger className="bg-gray-50">
                                    <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Nam</SelectItem>
                                    <SelectItem value="female">Nữ</SelectItem>
                                    <SelectItem value="other">Khác</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Lĩnh vực quan tâm (Tags Input) */}
                        <div className="space-y-2 md:col-span-2">
                            <Label>Lĩnh vực văn bản quan tâm</Label>
                            <div className="flex gap-2 mb-2">
                                <Input 
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Nhập lĩnh vực (VD: Lao động, Thương mại...)" 
                                    className="bg-gray-50"
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                />
                                <Button type="button" onClick={handleAddTag} size="icon" className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-100">
                                        <span>{tag}</span>
                                        <X 
                                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                                            onClick={() => handleRemoveTag(tag)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- KHỐI 3: THÔNG TIN DOANH NGHIỆP --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    Thông tin doanh nghiệp
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="companyName">Tên công ty</Label>
                        <Input id="companyName" {...register("companyName")} placeholder="Tên công ty, đơn vị công tác" className="bg-gray-50" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="companyAddress">Địa chỉ công ty</Label>
                        <Input id="companyAddress" {...register("companyAddress")} placeholder="Địa chỉ công ty, đơn vị công tác" className="bg-gray-50" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyPhone">Số điện thoại công ty</Label>
                        <Input id="companyPhone" {...register("companyPhone")} className="bg-gray-50" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taxId">Mã số thuế</Label>
                        <Input id="taxId" {...register("taxId")} className="bg-gray-50" />
                    </div>

                    <div className="space-y-2">
                        <Label>Loại hình doanh nghiệp</Label>
                        <Select defaultValue="TNHH" onValueChange={(val) => setValue("businessType", val)}>
                            <SelectTrigger className="bg-gray-50">
                                <SelectValue placeholder="Chọn loại hình" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="TNHH">Công ty TNHH</SelectItem>
                                <SelectItem value="CP">Công ty Cổ phần</SelectItem>
                                <SelectItem value="DNTN">Doanh nghiệp tư nhân</SelectItem>
                                <SelectItem value="NN">Doanh nghiệp Nhà nước</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="businessField">Lĩnh vực hoạt động</Label>
                        <Input id="businessField" {...register("businessField")} className="bg-gray-50" />
                    </div>
                </div>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="flex justify-end gap-4 pb-10">
                <Button type="button" variant="outline" onClick={() => router.back()}>Hủy bỏ</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 min-w-[150px]">
                    Lưu thay đổi
                </Button>
            </div>

        </form>
      </div>
    </div>
  );
}