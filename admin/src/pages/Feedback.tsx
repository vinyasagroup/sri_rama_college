import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import FeedbackDetails from "@/components/admin/feedback/FeedbackDetails";
import { getFeedbacks } from "@/services/feedbackApi";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await getFeedbacks();
      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-6">

      {/* Feedback Header */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        {/* Orange top gradient line */}
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          {/* Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <MessageSquare className="h-8 w-8 text-orange-600" />
          </div>

          {/* Header Content */}
          <div>

            {/* Badge */}
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Feedback Management
            </span>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-900">
              Student Feedback
            </h1>

            {/* Description */}
            <p className="mt-1 text-sm text-slate-600">
              View and manage student feedback.
            </p>

          </div>

        </div>

      </div>

      {/* Feedback Details */}
      <FeedbackDetails feedbacks={feedbacks} />

    </div>
  );
};

export default Feedback;