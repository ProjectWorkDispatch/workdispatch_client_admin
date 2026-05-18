import { useState } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "../layout/SideBar.jsx";
import { Outlet } from "react-router-dom";

export const DashboardContainer = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-x-hidden">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="md:ml-64 min-h-screen flex flex-col">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};