import React, { useEffect, useState } from "react";
import { getRecentApplications } from "@/services/applicationApi";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut, Search, Menu, X } from "lucide-react";

import logo from "@/assets/logo 2026.jpg"; // Update path

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  
const [applications, setApplications] = useState<any[]>([]);
const [showNotifications, setShowNotifications] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

const fetchApplications = async () => {
  try {
    const data = await getRecentApplications();

    if (Array.isArray(data)) {
      setApplications(data);
    } else if (Array.isArray(data?.data)) {
      setApplications(data.data);
    } else {
      setApplications([]);
    }
  } catch (error) {
    console.error("Failed to fetch applications:", error);
  }
};

useEffect(() => {
  fetchApplications();

  // Check for new applications periodically
  const interval = setInterval(() => {
    fetchApplications();
  }, 30000); // every 30 seconds

  return () => clearInterval(interval);
}, []);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };
//Search 
  const filteredApplications = applications.filter((application) => {
  const search = searchTerm.toLowerCase().trim();

  if (!search) return false;

  return (
    application.full_name?.toLowerCase().includes(search) ||
    application.application_for?.toLowerCase().includes(search) ||
    String(application.id).includes(search) ||
    `app-${application.id}`.toLowerCase().includes(search) ||
    application.phone?.toLowerCase().includes(search) ||
    application.email?.toLowerCase().includes(search)
  );
});

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="flex h-auto min-h-16 w-full items-center justify-between px-2 py-2 sm:px-4 md:px-6">

{/* LEFT */}
<div className="flex min-w-0 flex-1 items-center gap-2">

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full border bg-white p-[2px] flex items-center justify-center shrink-0">
              <img
                src={logo}
                alt="College Logo"
                loading="eager"
                decoding="async"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <span className="block truncate text-[10px] sm:text-sm md:text-base font-bold text-gray-800">
                Sri Rama First Grade College
              </span>

              <p className="truncate text-[9px] sm:text-xs text-gray-500">
                Hanuman Nagara, Kalladka
              </p>
            </div>
          </Link>

          
     {/* Search */}
<div className="relative hidden sm:block w-[280px] md:w-[600px] ml-20 lg:ml-20">
  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

  <Input
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Search student..."
    className="h-10 pl-10 w-full rounded-lg border border-gray-300 bg-white px-8 py-3 focus:border-orange-500 focus:outline-none"
              
  />

  {/* Search Results */}
  {searchTerm.trim() && (
    <div className="absolute left-0 right-0 top-12 z-[200] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

      {filteredApplications.length > 0 ? (
        <div className="max-h-[350px] overflow-y-auto">

          {filteredApplications.map((application) => (
            <button
              key={application.id}
              type="button"
              className="w-full border-b px-4 py-3 text-left transition hover:bg-orange-50"
              onClick={() => {
                setSearchTerm("");

                navigate("/admissions", {
                  state: {
                    applicationId: String(application.id),
                  },
                });
              }}
            >
              <div className="flex items-center gap-3">

                {/* Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Search className="h-4 w-4 text-orange-600" />
                </div>

                {/* Student Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {application.full_name}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {application.application_for}
                  </p>

                  <p className="mt-1 text-[11px] text-gray-400">
                    Application No: APP-{application.id}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {application.status || "Pending"}
                </span>

              </div>
            </button>
          ))}

        </div>
      ) : (
        <div className="px-4 py-8 text-center">

          <Search className="mx-auto mb-2 h-7 w-7 text-gray-300" />

          <p className="text-sm font-medium text-gray-500">
            No applications found
          </p>

          <p className="mt-1 text-xs text-gray-400">
            Try searching by student name or application number.
          </p>

        </div>
      )}

    </div>
  )}
</div>

        </div>

        {/* RIGHT */}
        <div className="ml-2 flex shrink-0 items-center gap-1 sm:gap-3">

          {/* Search icon mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

        {/* Notifications */}
<div className="relative">
  <Button
    variant="ghost"
    size="icon"
    className="relative"
    onClick={() => setShowNotifications((prev) => !prev)}
  >
    <Bell className="h-5 w-5" />

    {applications.length > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
        {applications.length > 99 ? "99+" : applications.length}
      </span>
    )}
  </Button>

  {/* Notification Dropdown */}
  {showNotifications && (
    <div className="absolute right-0 top-12 z-[100] w-[340px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
  {/* Left */}
  <div>
    <h3 className="text-sm font-semibold text-gray-900">
      Notifications
    </h3>

    <p className="text-xs text-gray-500">
      {applications.length} application
      {applications.length !== 1 ? "s" : ""}
    </p>
  </div>

  {/* Right */}
  <div className="flex items-center gap-2">
    {applications.length > 0 && (
      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
        New
      </span>
    )}

    {/* Close Button */}
    <button
      type="button"
      onClick={() => setShowNotifications(false)}
      className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
      aria-label="Close notifications"
    >
      <X className="h-4 w-4" />
    </button>
  </div>
</div>

      {/* Applications */}
      <div className="max-h-[350px] overflow-y-auto">
        {applications.length > 0 ? (
         applications.map((application: any) => (
           <div
  key={application.id}
  className="cursor-pointer border-b px-4 py-3 transition hover:bg-orange-50"
  onClick={() => {
    console.log("Clicked application:", application);

    setShowNotifications(false);

   navigate("/admissions", {
  state: {
    applicationId: String(application.id),
  },
});
  }}
>
              <div className="flex items-start gap-3">
                
                {/* Icon */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Bell className="h-4 w-4 text-orange-600" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
  <p className="text-sm font-semibold text-gray-900">
    {application.full_name || "New student application"}
  </p>

  <p className="mt-1 text-[11px] text-gray-400">
    Application No: APP-{application.id}
  </p>
</div>

                {/* New indicator */}
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              </div>
            </div>
          ))
        ) : (
          <div className="px-4 py-10 text-center">
            <Bell className="mx-auto mb-2 h-8 w-8 text-gray-300" />

            <p className="text-sm font-medium text-gray-500">
              No new applications
            </p>

            <p className="mt-1 text-xs text-gray-400">
              New admission applications will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
  
    </div>
  )}
</div>

          {/* Profile */}

 <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-black text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">
                  Admin
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;