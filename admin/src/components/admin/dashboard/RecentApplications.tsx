import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getRecentApplications } from "@/services/applicationApi";

interface Application {
  id: number;
  full_name: string;
  application_for: string;
}

const RecentApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await getRecentApplications();
      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="w-full rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Desktop */}
        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Course</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.full_name}</TableCell>
                  <TableCell>{app.application_for}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {applications.map((app) => (
            <div
              key={app.id}
              className="rounded-lg border p-3"
            >
              <p className="font-semibold">
                {app.id}
              </p>

              <p className="mt-1">
                {app.full_name}
              </p>

              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>{app.application_for}</span>
                <span>-</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplications;