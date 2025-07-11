import Image from "next/image";
import { IoBrowsersOutline, IoCalculator, IoFootball, IoHeartCircleOutline, IoLogoReact } from "react-icons/io5";

import { SidebarMenuItem } from "@/components";

const menuItems = [
  {
    path: '/dashboard/main',
    icon: <IoBrowsersOutline size={32} />,
    title: 'Dashboard',
    subTitle: 'Data Overview',
  },
  {
    path: '/dashboard/counter',
    icon: <IoCalculator size={32} />,
    title: 'Counter',
    subTitle: 'Counter Client Side',
  },
  {
    path: '/dashboard/pokemons',
    icon: <IoFootball size={32} />,
    title: 'Pokemons',
    subTitle: 'Pokemon with Static Generation',
  },
  {
    path: '/dashboard/favoritos',
    icon: <IoHeartCircleOutline size={32} />,
    title: 'Favorites',
    subTitle: 'Global State with Redux',
  },
];

export function Sidebar() {
  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 w-72 left-0 h-screen overflow-y-scroll sticky top-0"
    >
      <div id="logo" className="my-4 px-4">
        <div className="flex items-end">
          <IoLogoReact className="text-4xl md:text-4xl text-blue-500 mr-2" />
          <span className="text-lg md:text-2xl font-bold text-white">Dash</span>
          <span className="text-blue-500 flex">8</span>.
        </div>
        <p className="text-slate-500 text-sm">
          Manage your actions and activities
        </p>
      </div>
      <div id="profile" className="px-4 py-10">
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <Image
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt="next-dashboard"
            />
          </span>
          <span className="text-sm md:text-base font-bold">Edward Tompson</span>
        </a>
      </div>
      <div id="nav" className="w-full px-4">

        {
          menuItems.map((item, index) => (
            <SidebarMenuItem
              key={index}
              path={item.path}
              icon={item.icon}
              title={item.title}
              subTitle={item.subTitle}
            />
          ))
        }
      </div>
    </div>
  );
}
