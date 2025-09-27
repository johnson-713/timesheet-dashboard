import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-0 bg-[#F8F8F8]">
        {children}
      </main>
    </div>
  );
}
