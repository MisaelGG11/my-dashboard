'use client';

import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMenuItemProps {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}

export function SidebarMenuItem({
  path,
  icon,
  title,
  subTitle,
}: SidebarMenuItemProps) {
  const currentPath = usePathname();

  return (
    <Link
      href={path}
      className={
        `w-full px-2 flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150 rounded-md 
        ${currentPath === path ?'bg-blue-800': ''}`
      }
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {subTitle}
        </span>
      </div>
    </Link>
  );
}
