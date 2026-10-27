import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourseWiseStats } from "@/services/applicationApi";

interface Course {
  name: string;
  applications: number;
}

const CourseWiseStats: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourseStats();
  }, []);

  const fetchCourseStats = async () => {
    try {
      const res = await getCourseWiseStats();
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const maxApplications =
    courses.length > 0
      ? Math.max(...courses.map((c) => Number(c.applications)))
      : 1;

  return (
    <Card className="h-full w-full overflow-hidden rounded-2xl">
      <CardHeader>
        <CardTitle>Course-wise Applications</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Scrollable Course List */}
        <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
          {courses.map((course) => {
            const percentage = Math.round(
              (Number(course.applications) / maxApplications) * 100
            );

            return (
              <div
                key={course.name}
                className="space-y-2 rounded-lg border p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">
                    {course.name}
                  </span>

                  <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {course.applications} Applications
                  </span>
                </div>

                <Progress value={percentage} className="h-2" />

                <p className="text-xs text-muted-foreground">
                  {percentage}% of highest application count
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseWiseStats;