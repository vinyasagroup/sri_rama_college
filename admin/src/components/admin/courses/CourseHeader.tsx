import { BookOpen } from "lucide-react";

const CourseHeader = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

      <div className="px-5 py-5 md:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 ring-1 ring-orange-100">
            <BookOpen className="h-6 w-6 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Course Management
            </span>
            <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
              Add Course Details
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Add all course information in one simple form and manage added
              courses below.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;