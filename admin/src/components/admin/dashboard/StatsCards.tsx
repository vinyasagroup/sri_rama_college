import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, CheckCircle, XCircle } from "lucide-react";

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: "Total Applications",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "positive",
      color: "bg-blue-500",
    },
    {
      title: "Pending Review",
      value: "456",
      icon: FileText,
      change: "+5%",
      changeType: "positive",
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: "567",
      icon: CheckCircle,
      change: "+18%",
      changeType: "positive",
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: "211",
      icon: XCircle,
      change: "-3%",
      changeType: "negative",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="w-full overflow-hidden rounded-xl border shadow-sm"
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-start justify-between px-3 pt-3 pb-1">
            <CardTitle className="text-xs sm:text-sm font-medium">
              {stat.title}
            </CardTitle>

            {/* 🔥 Icon moved more up */}
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-lg -mt-1 ${stat.color}`}
            >
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="px-3 pb-3 pt-1">
            <div className="text-base sm:text-xl font-bold">
              {stat.value}
            </div>

            <p
              className={`text-[10px] sm:text-xs ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;