"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Linkedin } from "lucide-react";

// Import UI Components
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// [QUAN TRỌNG] Import Navbar từ file component riêng
import { Navbar } from "@/components/navbar";

// =================================================================
// 1. HERO SECTION
// =================================================================
const Hero = () => {
  return (
    <section className="pt-24 pb-10 flex flex-col items-center text-center px-4">
      <h1 className="text-[#4F46E5] text-6xl md:text-8xl font-bold tracking-tight mb-4 drop-shadow-sm">
        AGREEME
      </h1>
      <h2 className="text-[#0B0E24] text-2xl md:text-3xl font-medium mb-4">
        Your AI Legal Assistant
      </h2>
      <p className="text-gray-500 max-w-2xl mb-10 leading-relaxed">
        Description: abcajsdhfqherflwbfiwghefiwheflihwelfnwlikedfhwebflwgclibwlivgblwit
        (Mô tả ngắn về sản phẩm của bạn tại đây - AI Contract Analysis Platform)
      </p>

      <div className="flex gap-6 mb-20">
        <Button className="bg-[#4F46E5] hover:bg-[#4338ca] text-white h-14 px-10 rounded-lg text-lg font-semibold shadow-xl shadow-indigo-200">
          Try now
        </Button>
        <Button variant="ghost" className="text-[#0B0E24] h-14 text-lg font-bold hover:bg-transparent hover:underline underline-offset-4">
          Learn more
        </Button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#2D2D44] text-white py-4 px-6 rounded-xl text-sm text-center shadow-lg hover:bg-[#363652] transition-colors cursor-default">
            Feature {i}: Lorem ipsum dolor sit amet consectetur.
          </div>
        ))}
      </div>
    </section>
  );
};

// =================================================================
// 2. FEATURE SECTION (Reusable)
// =================================================================
interface FeatureProps {
  title: string;
  description: string;
  imagePos: "left" | "right";
}

const Feature = ({ title, description, imagePos }: FeatureProps) => {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6 border-b border-gray-100 last:border-0">
      <div className={`flex flex-col md:flex-row items-center gap-16 ${imagePos === "right" ? "md:flex-row-reverse" : ""}`}>
        <div className="w-full md:w-1/2 h-72 md:h-96 bg-gray-200 rounded-2xl shadow-inner flex items-center justify-center text-gray-400">
            Image Area
        </div>
        <div className="w-full md:w-1/2 text-left space-y-6">
          <h3 className="text-[#0B0E24] text-3xl md:text-4xl font-bold leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-base">
            {description}
          </p>
          <Button className="bg-white border-2 border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white px-8 h-12 rounded-lg font-semibold transition-all">
            Explore Feature
          </Button>
        </div>
      </div>
    </section>
  );
};

// =================================================================
// 3. FAQ SECTION
// =================================================================
const FAQ = () => {
  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-[#0B0E24] text-3xl md:text-5xl font-bold mb-4">
          Any Question? We got you.
        </h2>
        <p className="text-gray-500 text-lg">
          Common questions about our AI analysis services.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <AccordionItem key={item} value={`item-${item}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-[#0B0E24] font-bold text-lg hover:no-underline py-6 px-2 hover:text-blue-600 transition-colors">
              Lorem ipsum dolor sit amet consectetur {item}?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 px-2 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

// =================================================================
// 4. FOOTER SECTION
// =================================================================
const Footer = () => {
  return (
    <footer className="bg-[#0B0E24] text-white pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex h-12 w-20 items-center justify-center rounded bg-blue-600 text-sm font-bold">
            LOGO
          </div>
          <h2 className="text-3xl font-bold text-blue-500 tracking-wide">AGREEME</h2>
          <p className="text-gray-400 text-sm">
            AI-powered contract analysis for modern businesses.
          </p>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-lg tracking-wider">CATEGORIES</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white hover:underline">Templates</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">Pricing</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">API Access</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">Enterprise</Link></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h4 className="font-bold text-lg tracking-wider">ABOUT US</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link href="#" className="hover:text-white hover:underline">Our Story</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">Careers</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">Blog</Link></li>
            <li><Link href="#" className="hover:text-white hover:underline">Contact</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-6 items-start md:items-end mt-4 md:mt-0">
          <div className="flex gap-4">
            <div className="bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <Facebook className="text-[#0B0E24] w-5 h-5" />
            </div>
            <div className="bg-white p-2.5 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
                <Linkedin className="text-[#0B0E24] w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
        &copy; 2024 AGREEME Inc. All rights reserved. Privacy Policy | Terms of Service
      </div>
    </footer>
  );
};

// =================================================================
// MAIN PAGE LAYOUT
// =================================================================
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 
        Sử dụng Component Navbar đã được tách riêng. 
        Component này xử lý toàn bộ logic Login, Logout, Dropdown Menu.
      */}
      <Navbar />
      
      <Hero />
      
      <div className="space-y-12 mt-12">
        <Feature 
          title="Review and Highlight Agreements"
          description="Automatically scan your contracts to identify key clauses, liabilities, and obligations. Our AI highlights potential risks so you can focus on what matters most."
          imagePos="left"
        />
        <Feature 
          title="Contract Generation"
          description="Generate legally binding contracts in seconds using our smart templates. customize clauses based on your specific business needs and industry standards."
          imagePos="right"
        />
        <Feature 
          title="Contract Analysis with AI & Enhancement"
          description="Get deep insights into your legal documents. Our AI suggests enhancements to improve clarity, enforceability, and mutual benefit for all parties involved."
          imagePos="left"
        />
      </div>
      
      <FAQ />
      
      <Footer />
    </main>
  );
}