
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Pagination from "@/components/admin/pagination/Pagination";

interface Feedback {
  id: string;
  name: string;
  email: string;
  course: string;
  rating: number;
  message: string;
  created_at: string;
}

interface Props {
  feedbacks: Feedback[];
}

const FeedbackDetails = ({ feedbacks }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const feedbacksPerPage = 10;
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  const startIndex = (currentPage - 1) * feedbacksPerPage;

  const currentFeedbacks = feedbacks.slice(
    startIndex,
    startIndex + feedbacksPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  return (
    <Card className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse text-left">
            {/* Table Heading */}
            <thead className="bg-slate-50">
              <tr className="text-sm font-semibold uppercase text-slate-900">
                <th className="px-4 py-5">SL.NO</th>
                <th className="px-4 py-5">NAME</th>
                <th className="px-4 py-5">EMAIL</th>
                <th className="px-4 py-5">COURSE</th>
                <th className="px-4 py-5">FEEDBACK</th>
                <th className="px-4 py-5">RATING</th>
                <th className="px-4 py-5">DATE</th>
              </tr>
            </thead>

            {/* Feedback Records */}
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentFeedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No Feedback Available
                  </td>
                </tr>
              ) : (
                currentFeedbacks.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-sm text-slate-900 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-4 py-6">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-4 py-6 font-medium">
                      {item.name}
                    </td>

                    <td className="px-4 py-6 text-slate-600">
                      {item.email}
                    </td>

                    <td className="px-4 py-6">
                      {item.course || "N/A"}
                    </td>

                    <td className="max-w-[280px] whitespace-normal break-words px-4 py-6">
                      {item.message}
                    </td>

                    <td className="px-4 py-6">
                      <div className="flex items-center gap-1 whitespace-nowrap">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                        <span className="ml-1 font-medium">
                          {item.rating}/5
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-6 text-slate-600">
                      {new Date(item.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CardContent>
    </Card>
  );
};

export default FeedbackDetails;
