# 📂 Báo cáo Bàn giao Dự án: AI Contract Analyzer (AGREEME)
 
**Ngày cập nhật:** 27/11/2025  
**Trạng thái:** Frontend Prototype (Giao diện hoàn thiện + Logic giả lập LocalStorage)

---
## 1. Tổng quan Dự án
**AI Contract Analyzer** là nền tảng SaaS giúp người dùng:
1.  Tải lên hợp đồng để AI phân tích rủi ro pháp lý.
2.  Chat với trợ lý AI để hỏi đáp về nội dung hợp đồng.
3.  Sử dụng các mẫu hợp đồng có sẵn để soạn thảo nhanh.
### 🛠 Tech Stack
-   **Core:** Next.js 14 (App Router), TypeScript.
-   **Styling:** Tailwind CSS.
-   **UI Library:** Shadcn UI (Radix UI), Lucide React (Icons).
-   **State/Form Management:** React Hook Form, Zod.
-   **Mock Backend:** Sử dụng `localStorage` trình duyệt để giả lập Database.
---
## 2. Cấu trúc Dự án (Project Structure)
Dưới đây là sơ đồ cây thư mục và giải thích chức năng của từng phần chính:
```text
ai-contract-analyzer/
├── src/
│   ├── app/                        # App Router (Chứa các trang & Routing)
│   │   ├── login/                  # Trang Đăng nhập (Logic check user từ localStorage)
│   │   ├── signup/                 # Trang Đăng ký (Logic lưu user vào localStorage)
│   │   ├── forgot-password/        # Trang Quên mật khẩu (UI Only)
│   │   ├── profile/                # Trang Thông tin cá nhân (Xem/Sửa thông tin)
│   │   ├── templates/              # Trang Danh sách mẫu hợp đồng
│   │   │   └── [id]/               # Trang Soạn thảo chi tiết (Dynamic Route)
│   │   ├── analysis/               # [CORE FEATURE] Trang Phân tích hợp đồng
│   │   ├── layout.tsx              # Root Layout (Fonts, Metadata)
│   │   └── page.tsx                # Trang chủ (Landing Page)
│   ├── components/                 # Các thành phần tái sử dụng
│   │   ├── ui/                     # Shadcn UI Components (Button, Input, Card, Tabs...)
│   │   ├── auth-layout.tsx         # Layout 2 cột dùng cho Login/Signup
│   │   ├── dashboard-layout.tsx    # Layout chứa Sidebar + Content (Dùng cho các trang chức năng)
│   │   ├── navbar.tsx              # Thanh điều hướng (Dùng cho Landing Page)
│   │   └── sidebar.tsx             # Menu bên trái (Dùng cho Dashboard)
│   └── lib/                        # Các hàm tiện ích (utils.ts)
├── public/                         # Assets tĩnh (Images, Favicon)
└── ...
3. Các tính năng đã hoàn thiện (Completed Features)
A. Authentication (Xác thực)
Đăng ký ( Cho phép người dùng nhập thông tin. Dữ liệu được lưu vào usersDB trong localStorage.)
Đăng nhập ( Kiểm tra email/password khớp với usersDB. Nếu đúng, lưu session vào currentUser.)
Cơ chế bảo vệ: Nếu chưa đăng nhập, người dùng không thể vào các trang chức năng (như Profile, Analysis).
B. Landing Page (/)
Giao diện giới thiệu sản phẩm (Hero, Features, FAQ, Footer).
Navbar: Có logic kiểm tra trạng thái đăng nhập.
Chưa đăng nhập: Hiện nút Login/Register.
Đã đăng nhập: Hiện Dropdown Menu (Profile, Settings, Logout).


C. Dashboard & Layout
Đã chuyển đổi từ Navbar truyền thống sang Sidebar Layout (Menu bên trái) cho các trang chức năng sâu bên trong.
Sidebar: Bao gồm các mục Upload, Repository, Analysis, Templates, Settings. Hiển thị thông tin User ở góc dưới.
D. Tính năng Phân tích Hợp đồng (/analysis) - Core Feature
Đây là tính năng phức tạp nhất, bao gồm:
Upload Flow: Giao diện kéo thả file hoặc chọn file. Có giả lập Loading bar (Progress) khi AI phân tích.
Dashboard Phân tích (Split Screen):
Cột trái: Xem nội dung hợp đồng (Giả lập Document Viewer với các điểm highlight rủi ro).
Cột phải (Công cụ AI): Sử dụng Tabs để chuyển đổi:
Tab Báo cáo: Chấm điểm pháp lý, cảnh báo điều khoản thiếu.
Tab Gợi ý sửa: So sánh Before/After của điều khoản rủi ro.
Tab Trợ lý AI: Chatbot hỏi đáp ngữ cảnh.




Lưu tiến trình (Save/Load):
Cho phép lưu trạng thái làm việc (File đang xem, lịch sử chat) vào localStorage.
Tự động khôi phục phiên làm việc khi người dùng tải lại trang.


E. Mẫu Hợp đồng (/templates)
Hiển thị danh sách các mẫu hợp đồng phổ biến.
Trang chi tiết soạn thảo: Form nhập liệu bên trái, Live Preview văn bản hợp đồng bên phải.

