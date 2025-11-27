"use client";

import React, { useState, useEffect } from "react";
// [UPDATE 1] Import DashboardLayout thay vì Navbar
import DashboardLayout from "@/components/dashboard-layout"; 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { 
  UploadCloud, FileText, AlertTriangle, CheckCircle, 
  Sparkles, Send, ArrowRight, ShieldAlert, BookOpen, Scale,
  Save, Trash2
} from "lucide-react";

type Message = {
    id: number;
    role: "ai" | "user";
    content: string;
};

export default function AnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(""); 
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
        id: 1,
        role: "ai",
        content: "Chào bạn, tôi đã phân tích xong hợp đồng. Tôi phát hiện một số điều khoản về Phạt vi phạm có thể trái luật. Bạn có muốn tôi giải thích chi tiết không?"
    }
  ]);

  // --- LOGIC LOAD/SAVE/RESET GIỮ NGUYÊN ---
  useEffect(() => {
    const savedSession = localStorage.getItem("analysisSession");
    if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setFileName(parsed.fileName);
        setMessages(parsed.messages);
        setAnalysisDone(true);
        setLastSaved(parsed.timestamp);
        const fakeFile = new File([""], parsed.fileName, { type: "application/pdf" });
        setFile(fakeFile);
    }
  }, []);

  const handleSaveProgress = () => {
    if (!file && !fileName) return;
    const sessionData = {
        fileName: file ? file.name : fileName,
        messages: messages,
        timestamp: new Date().toLocaleTimeString("vi-VN") + " " + new Date().toLocaleDateString("vi-VN")
    };
    localStorage.setItem("analysisSession", JSON.stringify(sessionData));
    setLastSaved(sessionData.timestamp);
    alert("Đã lưu tiến trình làm việc thành công!");
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ tiến trình và làm lại từ đầu?")) {
        localStorage.removeItem("analysisSession");
        setFile(null);
        setFileName("");
        setAnalysisDone(false);
        setMessages([{ id: 1, role: "ai", content: "Chào bạn, tôi đã phân tích xong hợp đồng..."}]);
        setLastSaved(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisDone(true);
      }, 2500);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newUserMsg: Message = { id: Date.now(), role: "user", content: chatInput };
    setMessages((prev) => [...prev, newUserMsg]);
    setChatInput("");
    setTimeout(() => {
        const aiResponse: Message = { 
            id: Date.now() + 1, 
            role: "ai", 
            content: "Tôi đã ghi nhận yêu cầu: \"" + chatInput + "\". Hiện tại tôi đang cập nhật lại bản phân tích dựa trên phản hồi của bạn." 
        };
        setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // --- BẮT ĐẦU RENDER UI ---
  return (
    // [UPDATE 2] Bọc toàn bộ bằng DashboardLayout
    <DashboardLayout>
      
      {/* Tiêu đề trang (Optional) */}
      {!analysisDone && (
         <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Upload & Phân tích</h1>
            <p className="text-gray-500">Tải lên hợp đồng để AI bắt đầu làm việc.</p>
         </div>
      )}

      {/* --- TRẠNG THÁI 1: UPLOAD SCREEN --- */}
      {!analysisDone && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)]">
          <Card className="w-full max-w-2xl p-12 text-center border-dashed border-2 border-gray-300 hover:border-blue-500 transition-colors bg-white shadow-sm">
            <div className="flex flex-col items-center gap-6">
              <div className="bg-blue-50 p-6 rounded-full ring-8 ring-blue-50/50">
                <UploadCloud className="w-16 h-16 text-blue-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-800">Kéo thả hoặc chọn tệp tin</h2>
                <p className="text-gray-500 text-sm">Hỗ trợ PDF, DOCX (Tối đa 10MB)</p>
              </div>
              
              {isAnalyzing ? (
                <div className="w-full max-w-xs space-y-4 mt-4">
                    <div className="flex justify-between text-xs font-semibold text-blue-600">
                        <span>Đang xử lý...</span>
                        <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-blue-100" indicatorColor="bg-blue-600" />
                    <p className="text-xs text-gray-400 animate-pulse">Đang quét rủi ro pháp lý...</p>
                </div>
              ) : (
                <div className="mt-4">
                    <label htmlFor="upload-contract" className="cursor-pointer group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#0B0E24] rounded-full shadow-lg hover:bg-blue-900 transition-all hover:scale-105">
                        <span className="mr-2">Tải tài liệu lên</span>
                        <UploadCloud className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
                        <input id="upload-contract" type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileUpload} />
                    </label>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* --- TRẠNG THÁI 2: DASHBOARD ANALYSIS --- */}
      {analysisDone && (
        // [UPDATE 3] Chỉnh height full màn hình trừ đi padding của layout
        <div className="flex flex-col lg:flex-row h-[calc(100vh-48px)] gap-6 overflow-hidden">
            
            {/* === CỘT TRÁI: DOCUMENT VIEWER === */}
            <div className="w-full lg:w-3/5 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                {/* Header File */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded">
                            <FileText className="text-red-600 w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 truncate max-w-[250px] text-sm">{fileName}</h2>
                            <p className="text-xs text-gray-500">
                                {lastSaved ? `Đã lưu: ${lastSaved}` : "Chưa lưu"}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleReset} title="Xóa">
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </Button>
                        <Button size="sm" onClick={handleSaveProgress} className="bg-blue-600 hover:bg-blue-700 h-8 text-xs">
                            <Save className="w-3 h-3 mr-1" /> Lưu
                        </Button>
                    </div>
                </div>
                
                {/* Nội dung Hợp đồng (Scroll) */}
                <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                    <div className="bg-white shadow-lg p-10 min-h-full mx-auto max-w-[800px] text-sm leading-7 text-justify font-serif text-gray-800">
                         {/* ... (Nội dung hợp đồng giữ nguyên như code cũ) ... */}
                        <div className="text-center font-bold text-base mb-6">
                            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>Độc lập - Tự do - Hạnh phúc
                        </div>
                        <p className="font-bold text-center text-lg">HỢP ĐỒNG CUNG ỨNG DỊCH VỤ</p>
                        <p><strong>ĐIỀU 1. ĐỊNH NGHĨA</strong></p>
                        <p>Trong Hợp đồng này, các từ ngữ dưới đây được hiểu như sau...</p>
                        <p><strong>ĐIỀU 2. PHẠM VI CÔNG VIỆC</strong></p>
                        <p>Bên B đồng ý cung cấp dịch vụ tư vấn giải pháp phần mềm cho Bên A theo các yêu cầu kỹ thuật đính kèm tại Phụ lục 1.</p>

                        <div className="relative group my-2">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-red-500 rounded-full"></div>
                            <p className="bg-red-50 p-2 rounded border border-red-100">
                                <strong>ĐIỀU 3. PHẠT VI PHẠM</strong><br/>
                                Nếu Bên B chậm tiến độ quá 03 ngày, Bên B sẽ phải chịu phạt <strong>20% tổng giá trị hợp đồng</strong> cho mỗi ngày chậm trễ.
                            </p>
                            <span className="absolute right-2 top-2 text-[10px] uppercase font-bold bg-red-600 text-white px-1.5 rounded">Rủi ro cao</span>
                        </div>

                        <p><strong>ĐIỀU 4. THANH TOÁN</strong></p>
                        <div className="relative group my-2">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-yellow-500 rounded-full"></div>
                            <p className="bg-yellow-50 p-2 rounded border border-yellow-100">
                                Bên A sẽ thanh toán cho Bên B trong vòng <strong>90 ngày</strong> kể từ ngày nhận được hóa đơn hợp lệ.
                            </p>
                        </div>
                        <p><strong>ĐIỀU 5. BẤT KHẢ KHÁNG</strong></p>
                        <p>Hai bên được miễn trừ trách nhiệm trong trường hợp thiên tai, hỏa hoạn...</p>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <p key={i} className="text-gray-300 mt-2">Nội dung giả lập dòng {i+1}...</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* === CỘT PHẢI: CÔNG CỤ PHÂN TÍCH === */}
            <div className="w-full lg:w-2/5 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                    <div className="px-2 pt-2 border-b bg-gray-50">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="report">Báo cáo</TabsTrigger>
                            <TabsTrigger value="enhance">Gợi ý sửa</TabsTrigger>
                            <TabsTrigger value="chat">Trợ lý AI</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* Tab 1: Báo cáo */}
                    <TabsContent value="report" className="flex-1 p-0 m-0 overflow-hidden">
                        <ScrollArea className="h-full p-6">
                             {/* ... (Nội dung báo cáo giữ nguyên) ... */}
                             <div className="space-y-6">
                                <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-[#0B0E24] text-white">
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-blue-100 text-sm font-medium">Điểm an toàn pháp lý</p>
                                                <h3 className="text-4xl font-bold mt-1">72<span className="text-xl text-blue-200">/100</span></h3>
                                            </div>
                                            <ShieldAlert className="w-10 h-10 text-blue-200 opacity-50" />
                                        </div>
                                        <Progress value={85} className="h-1.5 bg-blue-900" indicatorColor="bg-blue-300" />
                                    </CardContent>
                                </Card>
                                <div className="space-y-3">
                                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Thiếu sót</h3>
                                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>Cảnh báo</AlertTitle>
                                        <AlertDescription className="text-xs">Thiếu điều khoản "Bảo hành" & "Giải quyết tranh chấp".</AlertDescription>
                                    </Alert>
                                </div>
                             </div>
                        </ScrollArea>
                    </TabsContent>

                    {/* Tab 2: Gợi ý sửa */}
                    <TabsContent value="enhance" className="flex-1 p-0 m-0 overflow-hidden">
                        <ScrollArea className="h-full p-6">
                             {/* ... (Nội dung gợi ý giữ nguyên) ... */}
                             <div className="space-y-4">
                                <h3 className="font-bold text-gray-800">Đề xuất chỉnh sửa</h3>
                                <Card className="border-purple-200">
                                    <CardHeader className="bg-purple-50 py-2"><CardTitle className="text-sm">Điều 3: Phạt vi phạm</CardTitle></CardHeader>
                                    <CardContent className="p-3 text-sm space-y-2">
                                        <div className="bg-red-50 p-2 border border-red-100 text-gray-600 line-through">phạt 20% giá trị</div>
                                        <div className="bg-green-50 p-2 border border-green-100 font-medium text-gray-800">phạt 8% giá trị</div>
                                        <Button className="w-full h-8 text-xs bg-purple-600">Áp dụng</Button>
                                    </CardContent>
                                </Card>
                             </div>
                        </ScrollArea>
                    </TabsContent>

                    {/* Tab 3: Chat */}
                    <TabsContent value="chat" className="flex-1 p-0 m-0 flex flex-col overflow-hidden">
                        <ScrollArea className="flex-1 p-4 bg-white">
                            <div className="space-y-4 pb-4">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            msg.role === 'ai' ? 'bg-blue-100' : 'bg-indigo-100 text-indigo-700 font-bold text-xs'
                                        }`}>
                                            {msg.role === 'ai' ? <Sparkles className="w-4 h-4 text-blue-600" /> : 'ME'}
                                        </div>
                                        <div className={`p-3 rounded-xl text-sm shadow-sm max-w-[85%] leading-relaxed ${
                                            msg.role === 'ai' 
                                            ? 'bg-gray-100 text-gray-800 rounded-bl-none' 
                                            : 'bg-[#0B0E24] text-white rounded-br-none'
                                        }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-3 border-t bg-gray-50">
                            <div className="relative flex items-center gap-2">
                                <Input 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Hỏi AI..." 
                                    className="pr-10 bg-white border-gray-200 focus-visible:ring-blue-500" 
                                />
                                <Button size="icon" onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 h-10 w-10 shrink-0">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      )}
    </DashboardLayout>
  );
}