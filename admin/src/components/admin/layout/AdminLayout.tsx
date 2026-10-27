import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/admin/layout/AdminHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminFooter from "@/components/admin/layout/AdminFooter";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout flex h-screen w-full max-w-full flex-col overflow-hidden bg-white text-black">
      {/* Header */}
      <div className="shrink-0 w-full">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:shrink-0 overflow-hidden border-r bg-white">
          <AdminSidebar />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Overlay */}
            <button
              type="button"
              aria-label="Close sidebar overlay"
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="relative h-full w-[82vw] max-w-[280px] overflow-hidden bg-white shadow-xl">
              <AdminSidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Section */}
        <div className="flex flex-1 min-w-0 min-h-0 flex-col overflow-hidden">
          <main className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden p-3 sm:p-4 md:p-6">
            <div className="w-full min-w-0">
              <Outlet />
            </div>
          </main>

          <div className="shrink-0 w-full border-t bg-white">
            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;