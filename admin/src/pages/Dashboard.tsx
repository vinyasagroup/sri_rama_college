import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  LayoutDashboard,
} from "lucide-react";

import AdmissionChart from "@/components/admin/dashboard/AdmissionChart";
import RecentApplications from "@/components/admin/dashboard/RecentApplications";
import CourseWiseStats from "@/components/admin/dashboard/CourseWiseStats";

import { Card, CardContent } from "@/components/ui/card";
import { getDashboardCounts } from "@/services/dashboardApi";

interface DashboardCounts {
  totalApplications: number;
  newAdmissions: number;
  approved: number;
  pending: number;
}

const Dashboard: React.FC = () => {
  const [counts, setCounts] = useState<DashboardCounts>({
    totalApplications: 0,
    newAdmissions: 0,
    approved: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboardCounts = async () => {
    try {
      const response = await getDashboardCounts();
      setCounts(response.data);
    } catch (error) {
      console.error("Failed to load dashboard counts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardCounts();
  }, []);

  const stats = [
    {
      title: "Total Applications",
      value: counts.totalApplications,
      icon: <FileText className="h-5 w-5 text-orange-600" />,
    },
    {
      title: "New Admissions",
      value: counts.newAdmissions,
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Approved",
      value: counts.approved,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Pending",
      value: counts.pending,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
    },
  ];

  return (
    <div className="w-full min-w-0 overflow-x-hidden space-y-6 p-4 sm:p-6">

      {/* =========================================
          DASHBOARD HEADER
      ========================================= */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        {/* Orange → Yellow top line */}
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          {/* Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <LayoutDashboard className="h-8 w-8 text-orange-600" />
          </div>

          {/* Header Content */}
          <div>

            {/* Badge */}
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Dashboard
            </span>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h1>

            {/* Description */}
            <p className="mt-1 text-sm text-slate-600">
              Welcome back! Here's your admission summary.
            </p>

          </div>
        </div>
      </div>

      {/* =========================================
          STATISTICS
      ========================================= */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={loading ? "..." : item.value}
            icon={item.icon}
          />
        ))}
      </div>

      {/* =========================================
          CHARTS
      ========================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Admission Chart */}
        <div className="xl:col-span-2">
          <AdmissionChart />
        </div>

        {/* Course Wise Statistics */}
        <div>
          <CourseWiseStats />
        </div>

      </div>

      {/* =========================================
          RECENT APPLICATIONS
      ========================================= */}
      <RecentApplications />

    </div>
  );
};

export default Dashboard;


/* =========================================
   STATISTICS CARD
========================================= */

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const StatsCard = ({
  title,
  value,
  icon,
}: StatsCardProps) => {
  return (
    <Card className="rounded-2xl border shadow-sm">

      <CardContent className="flex items-center justify-between px-5">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
          {icon}
        </div>

      </CardContent>

    </Card>
  );
};