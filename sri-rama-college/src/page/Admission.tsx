import React from "react";
import ApplicationForm from "@/components/admission/Admissionform";
import Eligibility from "@/components/admission/Eligibility";

const Admission: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Eligibility />
      <ApplicationForm />
    </div>
  );
};

export default Admission;