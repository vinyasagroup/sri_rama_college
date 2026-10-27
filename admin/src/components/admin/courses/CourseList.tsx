import { Pencil, Trash2, BookOpen, Clock3, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CourseItem } from "./types";

interface CourseListProps {
  courses: CourseItem[];
  onEdit: (course: CourseItem) => void;
  onDelete: (id: string) => void;
}
const CourseList = ({ courses, onEdit, onDelete }: CourseListProps) => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Added Courses</h2>
          <p className="mt-1 text-sm text-slate-500">
            Edit or delete courses from the list below.
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">
            <p className="text-sm text-slate-500">No courses added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-orange-200 hover:bg-orange-50/30"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 ring-1 ring-orange-100">
                        <BookOpen className="h-5 w-5 text-orange-600" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-slate-900">
                          {course.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Key: {course.courseKey}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <div className="mb-2 flex items-center gap-2 text-slate-500">
                          <Clock3 className="h-4 w-4" />
                          <span className="text-xs font-medium uppercase tracking-wide">
                            Duration
                          </span>
                        </div>
                       <p className="text-sm font-semibold text-slate-900 whitespace-pre-line">
  {course.duration}
</p>
                      </div>

                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <div className="mb-2 flex items-center gap-2 text-slate-500">
                          <Users className="h-4 w-4" />
                          <span className="text-xs font-medium uppercase tracking-wide">
                            Intake
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {course.intake}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
                        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                          Subjects
                        </div>
                        <p className="text-sm font-semibold text-slate-900">
                          {course.subjects.filter(Boolean).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onEdit(course)}
                      className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onDelete(course.id)}
                      className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseList;