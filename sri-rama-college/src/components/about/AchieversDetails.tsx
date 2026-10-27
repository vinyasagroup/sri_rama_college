import { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAchievements } from "@/services/achievementApi";
import { API_BASE_URL } from "@/config/constants";

export default function AchieversDetails() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Pagination state — declare before using it
  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
      : true
  );

  const studentsPerPage = isDesktop ? 10 : 4;

  const totalPages = Math.ceil(
    students.length / studentsPerPage
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = students.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    setTimeout(() => {
      document.getElementById("college-achievers")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  // Fetch achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getAchievements();
        setStudents(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAchievements();
  }, []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Reset page when screen size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [isDesktop]);

  // Keep current page valid if data changes
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);


  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 pt-6 pb-16">

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.12),transparent_35%)]" />

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-orange-200/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-orange-600 sm:text-4xl md:text-5xl">
            College Achievers
          </h2>

          <p className="mt-3 text-sm text-gray-600 sm:text-base md:text-lg">
            Celebrating Excellence & Academic Success
          </p>
        </div>

        {/* Achievers Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {currentStudents.length > 0 ? (
  currentStudents.map((student, index) => (

              <Card
                key={student.id || index}
                className="
                  h-full
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                  border
                  border-orange-200
                  !bg-white
                  !text-gray-900
                  p-0
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >

                {/* Image */}
                <div className="relative overflow-hidden">

                  <img
                    src={`${API_BASE_URL}/files/${encodeURIComponent(
                      student.file || student.file_name
                    )}`}
                    alt={student.achiever_name}
                    className="
                      h-[140px]
                      w-full
                      object-cover
                      transition-transform
                      duration-300
                      hover:scale-105
                    "
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-image.jpg";
                    }}
                  />

                  {/* Year */}
                  <div
                    className="
                      absolute
                      left-2
                      top-2
                      flex
                      items-center
                      gap-1
                      rounded-full
                      bg-orange-600
                      px-2
                      py-1
                      text-[10px]
                      font-semibold
                      text-white
                    "
                  >
                    <Trophy size={11} />
                    <span>{student.year || "2025"}</span>
                  </div>

                </div>

                {/* Content */}
              <CardContent className="flex h-[170px] flex-col !bg-white p-3">
  {/* Name */}
  <h2 className="min-h-[40px] line-clamp-2 text-sm font-bold leading-5 text-gray-900">
    {student.achiever_name}
  </h2>

  {/* Description */}
  <p className="mt-1 line-clamp-3 text-xs leading-5 text-gray-600">
    {student.description}
  </p>

  {/* Read More */}
  <button
    type="button"
    onClick={() => setSelectedStudent(student)}
    className="mt-auto self-start pt-2 text-xs font-semibold text-orange-600 transition hover:text-orange-700 hover:underline"
  >
    Read More →
  </button>
</CardContent>

              </Card>

            ))

          ) : (
            <div className="col-span-full py-16 text-center text-lg text-gray-500">
              No achievements found.
            </div>

          )}

        </div>

      </div>
      {/* Achiever Details Popup */}
{selectedStudent && (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
    onClick={() => setSelectedStudent(null)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="achiever-popup-title"
      className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={() => setSelectedStudent(null)}
        aria-label="Close achiever details"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-orange-600 transition hover:bg-orange-500 hover:text-white"
      >
        <X size={20} />
      </button>

      {/* Image */}
      <img
        src={`${API_BASE_URL}/files/${encodeURIComponent(
          selectedStudent.file || selectedStudent.file_name
        )}`}
        alt={selectedStudent.achiever_name}
        className="h-64 w-full rounded-xl object-cover sm:h-72"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-image.jpg";
        }}
      />

      {/* Year */}
      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-600">
        <Trophy size={17} />
        <span>{selectedStudent.year || "2025"}</span>
      </div>

      {/* Name */}
      <h2
        id="achiever-popup-title"
        className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl"
      >
        {selectedStudent.achiever_name}
      </h2>

      {/* Full Description */}
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
        {selectedStudent.description || "No description available."}
      </p>

      {/* Close Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setSelectedStudent(null)}
          className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
)}

{/* Pagination */}
{totalPages > 1 && (
  <div className="mt-10 mb-6 flex flex-col items-center justify-center gap-4">
    <p className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-semibold text-gray-700">
        {startIndex + 1}
      </span>
      {" - "}
      <span className="font-semibold text-gray-700">
        {Math.min(startIndex + studentsPerPage, students.length)}
      </span>
      {" of "}
      <span className="font-semibold text-gray-700">
        {students.length}
      </span>{" "}
      achievers
    </p>

    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() =>
          handlePageChange(Math.max(currentPage - 1, 1))
        }
        disabled={currentPage === 1}
        className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-9 w-9 rounded-xl text-sm font-semibold transition ${
              currentPage === page
                ? "bg-orange-500 text-white shadow-md"
                : "border border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() =>
          handlePageChange(
            Math.min(currentPage + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
)}

    </section>
    
  );
}