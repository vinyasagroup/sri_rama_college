import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast.ts";
import {Star,CheckCircle,Loader2,} from "lucide-react";
import { saveFeedback } from "@/services/feedbackApi";
export default function FeedbackPage() {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.message ||
      rating === 0
    ) {
      alert("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await saveFeedback({
        name: form.name,
        email: form.email,
        course: form.course,
        rating,
        message: form.message,
      });

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        course: "",
        message: "",
      });

      setRating(0);    
      toast({
        title: "Feedback Submitted 🎉",
        description:
          "Thank you! Your feedback helps us improve.",
        duration: 3000,
      });
    } catch (error) {
      console.log(error);
      alert("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Student Feedback Portal
        </h1>

        <p className="mt-2 sm:mt-3 px-2 text-sm sm:text-base text-gray-600 leading-6">
          Help us improve your college experience with your valuable feedback.
        </p>
      </motion.div>

      {/* Success State */}
      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-10 text-center"
        >
          <CheckCircle
            className="mx-auto text-green-500"
            size={56}
          />

          <h2 className="text-xl sm:text-2xl font-semibold mt-4 text-gray-900">
            Thank You!
          </h2>

          <p className="text-sm sm:text-base text-gray-600 mt-2 leading-6">
            Your feedback has been submitted successfully.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
        >
          {/* Form Card */}
          <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-2xl sm:rounded-3xl border border-gray-200 bg-white">
            <CardContent className="p-5 sm:p-6 md:p-8 lg:p-10 space-y-5 sm:space-y-6">

              {/* Name */}
              <div>
                <label className="block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
                  Full Name *
                </label>

                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="h-10 sm:h-11 md:h-12 bg-gray-100 border-none rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
                  Email *
                </label>

                <Input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="h-10 sm:h-11 md:h-12 bg-gray-100 border-none rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
                  Course
                </label>

                <Input
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="Enter your course"
                  className="h-10 sm:h-11 md:h-12 bg-gray-100 border-none rounded-lg sm:rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block mb-2 text-sm sm:text-base font-medium text-gray-700">
                  Rating *
                </label>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={26}
                      className={`cursor-pointer transition-transform hover:scale-110 sm:hover:scale-125 ${
                        star <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-1.5 sm:mb-2 text-sm sm:text-base font-medium text-gray-700">
                  Your Feedback *
                </label>

                <Textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your feedback here..."
                  className="min-h-[110px] sm:min-h-[130px] md:min-h-[150px] resize-none bg-gray-100 border-none rounded-lg sm:rounded-xl text-sm sm:text-base leading-6 focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-11 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-10 sm:mt-12 md:mt-16 text-center max-w-xl mx-auto"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">
          We Listen. We Improve.
        </h2>

        <p className="px-4 text-sm sm:text-base text-gray-600 leading-6">
          Your feedback directly shapes the future of our college experience.
        </p>
      </motion.div>

    </div>
  );
}
