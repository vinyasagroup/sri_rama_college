import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Your enquiry has been submitted successfully!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-orange-600 mb-4 sm:mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <input
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <textarea
          name="message"
          placeholder="Write your message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 outline-none resize-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 text-sm sm:text-base font-semibold text-white transition hover:bg-orange-600"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
};

export default ContactForm;