"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { AuthLayout } from "@/components/auth-layout";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  account: z.string().min(2, "Tên hiển thị quá ngắn"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không đúng định dạng"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu nhập lại không khớp",
  path: ["confirmPassword"],
});

export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // [UPDATE] Logic Đăng ký lưu vào Database giả
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 1. Lấy danh sách user hiện có (nếu chưa có thì tạo mảng rỗng)
    const existingUsers = JSON.parse(localStorage.getItem("usersDB") || "[]");

    // 2. Kiểm tra xem email đã tồn tại chưa (Optional)
    const isExist = existingUsers.some((u: any) => u.email === values.email);
    if (isExist) {
        alert("Email này đã được đăng ký!");
        return;
    }

    // 3. Tạo user mới 
    // [LƯU Ý QUAN TRỌNG]: Map 'account' thành 'name' để trang Login dễ lấy
    const newUser = {
      name: values.account, 
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    // 4. Lưu vào mảng usersDB và cập nhật localStorage
    existingUsers.push(newUser);
    localStorage.setItem("usersDB", JSON.stringify(existingUsers));

    // 5. Thông báo và chuyển hướng về Login
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    router.push("/login"); 
  }

  return (
    <AuthLayout>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">Sign Up</h2>
        <p className="mt-2 text-gray-500">It's free and only takes a minute.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {/* User Name */}
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">User Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nguyen Van A" {...field} className="h-11 bg-gray-50 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Phone</FormLabel>
                <FormControl>
                  <Input placeholder="0901234567" {...field} className="h-11 bg-gray-50 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@company.com" {...field} className="h-11 bg-gray-50 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-gray-50 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="h-11 bg-gray-50 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-[#0f1128] hover:bg-black h-12 text-base font-semibold mt-2">
            Create Account
          </Button>
        </form>
      </Form>

      <div className="relative my-6 text-center text-xs uppercase text-gray-400">
        <span className="bg-white px-2">OR REGISTER WITH</span>
      </div>

      <Button variant="outline" className="w-full gap-2 h-11 border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
        <GoogleIcon /> Google
      </Button>

      <div className="mt-6 text-center text-sm text-gray-500">
        Already have an account? <Link href="/login" className="font-bold text-blue-600 hover:underline">Log In</Link>
      </div>
    </AuthLayout>
  );
}