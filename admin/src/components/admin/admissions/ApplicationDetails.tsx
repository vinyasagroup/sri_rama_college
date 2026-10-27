import React, { useState } from "react";
import type { Applicant } from "./ApplicationTable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {BookOpen,User,FileText,CheckCircle,Clock3,XCircle,Send,X,
} from "lucide-react";

  import { CalendarDays } from "lucide-react";

interface Props {
  applicant: Applicant;
  onUpdateStatus: (id: string, status: Applicant["status"]) => void;
  onClose: () => void;
}

const ApplicationDetails: React.FC<Props> = ({
  applicant,
  onUpdateStatus,
  onClose,
}) => {
  const [status, setStatus] = useState<Applicant["status"]>(applicant.status);

  const handleUpdate = () => {
    onUpdateStatus(applicant.id, status);
  };

  return (
    <Card className="rounded-2xl border-0 shadow-none">
      <CardContent className="p-0">
     

<div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-5">
  <div>
    <h2 className="text-xl font-bold text-slate-900">
      Application Form Details
    </h2>
    <p className="text-sm text-slate-500">
      Full admission details of {applicant.fullName}
    </p>
  </div>

  <div className="flex items-center gap-3">
    <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
        <CalendarDays className="h-5 w-5 text-orange-600" />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-orange-600">
          Submitted On
        </p>
        <p className="text-sm font-bold text-slate-900 whitespace-nowrap">
  {new Date(applicant.submittedDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}
</p> 
      </div>
    </div>

    <button
      onClick={onClose}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-red-50 hover:text-red-600"
    >
      <X className="h-5 w-5" />
    </button>
  </div>
</div>

        <div className="space-y-6 p-5">
          <FormSection
            icon={<BookOpen className="h-5 w-5 text-orange-600" />}
            title="Step 1 — Course"
            rows={[
              ["Application No", applicant.applicationNo],
              ["Application For", applicant.applicationFor],
             
              ["Submitted Date", applicant.submittedDate],
            ]}
          />

          <FormSection
            icon={<User className="h-5 w-5 text-orange-600" />}
            title="Step 2 — Personal"
            rows={[
              ["Full Name", applicant.fullName],
              ["Gender", applicant.gender],
              ["Date of Birth", applicant.dob],
              ["Email ID", applicant.email],
              ["Phone Number", applicant.phone],
              ["Nationality", applicant.nationality],
              ["Mother Tongue", applicant.motherTongue],
              ["Languages", applicant.languages],
              ["Place of Birth", applicant.placeOfBirth],
              ["State", applicant.state],
              ["Religion", applicant.religion],
              ["Caste", applicant.caste],
              ["Category", applicant.category],
            ]}
          />

<FormSection
  icon={<User className="h-5 w-5 text-orange-600" />}
  title="Step 3 — Family Details"
  rows={[
    ["Father Name", applicant.fatherName],
    ["Father Occupation", applicant.fatherOccupation],
    ["Father Phone", applicant.fatherPhone],
    ["Mother Name", applicant.motherName],
    ["Mother Occupation", applicant.motherOccupation],
    ["Mother Phone", applicant.motherPhone],
    ["Guardian Name", applicant.guardianName],
    ["Guardian Phone", applicant.guardianPhone],
    ["Parent Income", applicant.parentIncome],
    ["Hostel Applied", applicant.hostelApplied],
    ["Study Status", applicant.studyStatus],
    ["Computer Literacy", applicant.computerLiteracy],
  ]}
/>
          <FormSection
            icon={<FileText className="h-5 w-5 text-orange-600" />}
            title="Step 3 — SSLC / 10th"
            rows={[
              ["School Name & Address", applicant.sslcSchool],
              ["Board / University", applicant.sslcBoard],
              ["Percentage & Class", applicant.sslcPercentage],
              ["Year of Passing", applicant.sslcYear],
            ]}
          />

          <FormSection
            icon={<FileText className="h-5 w-5 text-orange-600" />}
            title="Step 4 — PUC / 10+2"
            rows={[
              ["College Name & Address", applicant.pucSchool],
              ["Board / University", applicant.pucBoard],
              ["Percentage & Class", applicant.pucPercentage],
              ["Year of Passing", applicant.pucYear],
            ]}
          />


          <div className="rounded-2xl border border-slate-200 p-5">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Documents & Status
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {applicant.documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {doc.name}
                  </span>
                  <DocBadge status={doc.status} />
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatusInfo
                icon={<CheckCircle className="h-4 w-4 text-green-600" />}
                label="Verification"
                value={applicant.verification}
              />
              <StatusInfo
                icon={<Clock3 className="h-4 w-4 text-yellow-600" />}
                label="Current Status"
                value={applicant.status}
              />
              <StatusInfo
                icon={<XCircle className="h-4 w-4 text-red-600" />}
                label="Missing Docs"
                value={String(
                  applicant.documents.filter((d) => d.status === "Missing")
                    .length
                )}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
            <h3 className="mb-3 text-lg font-bold text-slate-900">
              Update Admission Status
            </h3>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as Applicant["status"])
                }
                className="w-full rounded-xl border border-orange-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>

              <Button
                onClick={handleUpdate}
                className="gap-2 bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-4 w-4" />
                Update
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FormSection = ({
  title,
  icon,
  rows,
}: {
  title: string;
  icon: React.ReactNode;
  rows: string[][];
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-4">
        {icon}
        <h3 className="font-bold text-slate-900">{title}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              {label}
            </label>
            <div className="min-h-[44px] rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusInfo = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
};

const DocBadge = ({ status }: { status: string }) => {
  const cls =
    status === "Verified"
      ? "bg-green-50 text-green-700 border-green-200"
      : status === "Missing"
      ? "bg-red-50 text-red-700 border-red-200"
      : "bg-yellow-50 text-yellow-700 border-yellow-200";

  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      {status}
    </span>
  );
};

export default ApplicationDetails;