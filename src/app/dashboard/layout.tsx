// import Image from "next/image";
import { Sidebar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      
      <div className="flex">

      <Sidebar />

        <div className="p-2 w-full text-slate-900 flex-1">
          { children }
        </div>
      </div>
    </div>
  );
}
