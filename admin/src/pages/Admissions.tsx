import React, {
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  Users,
  FileText,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import ApplicationTable, {
  type Applicant,
} from "@/components/admin/admissions/ApplicationTable";

import ApplicationDetails from "@/components/admin/admissions/ApplicationDetails";

import {
  getApplications,
  updateApplicationStatus,
} from "@/services/applicationApi";

const Admissions: React.FC = () => {
const location = useLocation();
  const [applicants, setApplicants] =
    useState<Applicant[]>([]);

  const [selectedApplicant, setSelectedApplicant] =
    useState<Applicant | null>(null);

  const stats = useMemo(() => {

    return {

      total: applicants.length,

      documents: applicants.reduce(
        (sum, applicant) =>
          sum + applicant.documents.length,
        0
      ),

      verified: applicants.filter(
        (a) =>
          a.verification === "Verified"
      ).length,

      pending: applicants.filter(
        (a) => a.status === "Pending"
      ).length,

    };

  }, [applicants]);

  const updateStatus = async (
    id: string,
    status: Applicant["status"]
  ) => {

    try {

      await updateApplicationStatus(
        id,
        status
      );

      setApplicants((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setSelectedApplicant((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              status,
            }
          : prev
      );

      alert("Status Updated");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  const fetchApplications =
    async () => {

      try {

       const res = await getApplications();

const applicationData = Array.isArray(res.data)
  ? res.data
  : [];

const formatted: Applicant[] = applicationData.map((item: any) => ({
  id: String(item.id),

  applicationNo: `APP-${item.id}`,

  submittedDate: item.created_at,

  // Course
  applicationFor: item.application_for,

  // Personal
  fullName: item.full_name,
  gender: item.gender,
  dob: item.dob,
  email: item.email,
  phone: item.phone,
  nationality: item.nationality,
  motherTongue: item.mother_tongue,
  languages: item.languages,
  placeOfBirth: item.place_of_birth,
  state: item.state,
  religion: item.religion,
  caste: item.caste,
  category: item.category,

  // Family details
  maritalStatus: item.marital_status,
  fatherName: item.father_name,
  fatherOccupation: item.father_occupation,
  fatherPhone: item.father_phone,

  motherName: item.mother_name,
  motherOccupation: item.mother_occupation,
  motherPhone: item.mother_phone,

  guardianName: item.guardian_name,
  guardianPhone: item.guardian_phone,

  parentIncome: item.parent_income,
  hostelApplied: item.hostel_applied,
  studyStatus: item.study_status,
  computerLiteracy: item.computer_literacy,

  // SSLC
  sslcSchool: item.sslc_school,
  sslcBoard: item.sslc_board,
  sslcPercentage: item.sslc_percentage,
  sslcYear: item.sslc_year,

  // PUC
  pucSchool: item.puc_school,
  pucBoard: item.puc_board,
  pucPercentage: item.puc_percentage,
  pucYear: item.puc_year,

  verification: "Pending",

  status: item.status || "Pending",

  documents: [],
}));
          console.log("Formatted applicants:", formatted);

    setApplicants(formatted);

  } catch (error) {
    console.log("Failed to fetch applications:", error);
  }

    };

  useEffect(() => {

    fetchApplications();

  }, []);

 useEffect(() => {
  const applicationId = location.state?.applicationId;

  console.log("Application ID from notification:", applicationId);
  console.log("Applicants:", applicants);

  if (!applicationId || applicants.length === 0) {
    return;
  }

  const applicant = applicants.find(
    (item) => String(item.id) === String(applicationId)
  );

  console.log("Found applicant:", applicant);

  if (applicant) {
    setSelectedApplicant(applicant);
  }
}, [applicants, location.state]);

  return (

    <div className="space-y-6 p-4 sm:p-6">
{/* Admissions Header */}
<div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

  {/* Orange top gradient line */}
  <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

  <div className="flex items-start gap-4 p-7">

    {/* Icon */}
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
      <Users className="h-8 w-8 text-orange-600" />
    </div>

    {/* Header Content */}
    <div>

      {/* Badge */}
      <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
        Admin Admissions Management
      </span>

      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900">
        Admissions Management
      </h1>

      {/* Description */}
      <p className="mt-1 text-sm text-slate-600">
        Manage student applications.
      </p>

    </div>

  </div>

</div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        <StatsCard
          title="Total Applications"
          value={stats.total}
          icon={
            <Users className="h-5 w-5 text-orange-600" />
          }
        />

        <StatsCard
          title="Documents"
          value={stats.documents}
          icon={
            <FileText className="h-5 w-5 text-orange-600" />
          }
        />

        <StatsCard
          title="Verified"
          value={stats.verified}
          icon={
            <ShieldCheck className="h-5 w-5 text-green-600" />
          }
        />

        <StatsCard
          title="Pending"
          value={stats.pending}
          icon={
            <Clock3 className="h-5 w-5 text-yellow-600" />
          }
        />

      </div>

      <ApplicationTable
        applicants={applicants}
        selectedApplicant={selectedApplicant}
        onViewDetails={setSelectedApplicant}
      />

      {selectedApplicant && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-2xl bg-white">

            <ApplicationDetails
              applicant={selectedApplicant}
              onUpdateStatus={updateStatus}
              onClose={() =>
                setSelectedApplicant(null)
              }
            />

          </div>

        </div>

      )}

    </div>

  );

};

const StatsCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) => {

  return (

    <Card className="rounded-2xl">

      <CardContent className="flex items-center justify-between p-5">

        <div>

          <p className="text-sm text-slate-500">

            {title}

          </p>

          <h2 className="text-2xl font-bold">

            {value}

          </h2>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">

          {icon}

        </div>

      </CardContent>

    </Card>

  );

};

export default Admissions;