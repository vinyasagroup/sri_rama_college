import React, { useEffect, useState } from "react";
import {
  Eye,
  Download,
} from "lucide-react";
import Pagination from "@/components/admin/pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

/* ================= TYPES ================= */

export interface Applicant {
  id: string;
  applicationNo: string;
  submittedDate: string;

  // Course
  applicationFor: string;

  // Personal Details
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  nationality: string;
  motherTongue: string;
  languages: string;
  placeOfBirth: string;
  state: string;
  religion: string;
  caste: string;
  category: string;

  // Family Details
  maritalStatus: string;

  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;

  motherName: string;
  motherOccupation: string;
  motherPhone: string;

  guardianName: string;
  guardianPhone: string;

  parentIncome: string;
  hostelApplied: string;
  studyStatus: string;
  computerLiteracy: string;

  // SSLC / 10th
  sslcSchool: string;
  sslcBoard: string;
  sslcPercentage: string;
  sslcYear: string;

  // PUC / 10+2
  pucSchool: string;
  pucBoard: string;
  pucPercentage: string;
  pucYear: string;

  // Status
  verification: "Verified" | "Pending" | "Rejected";

  status:
    | "Pending"
    | "Approved"
    | "Rejected"
    | "Under Review";

  documents: {
    name: string;
    status: "Uploaded" | "Missing" | "Verified";
  }[];
}

/* ================= PROPS ================= */

interface Props {
  applicants: Applicant[];
  selectedApplicant: Applicant | null;
  onViewDetails: (applicant: Applicant) => void;
}

/* ================= COMPONENT ================= */

const ApplicationTable: React.FC<Props> = ({
  applicants,
  onViewDetails,
}) => {
  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);

  const applicationsPerPage = 10;

  const totalPages = Math.ceil(
    applicants.length / applicationsPerPage
  );

  const startIndex =
    (currentPage - 1) * applicationsPerPage;

  const currentApplicants = applicants.slice(
    startIndex,
    startIndex + applicationsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /* ================= RESET PAGE ================= */

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(Math.max(1, totalPages));
  }
}, [currentPage, totalPages]);
  /* ================= PDF DOWNLOAD ================= */

  const downloadPDF = (applicant: Applicant) => {
    const win = window.open("", "_blank");

    if (!win) return;

    win.document.write(`
      <html>
      <head>
        <title>${applicant.applicationNo}</title>

        <style>
          body{
            font-family:Arial,sans-serif;
            padding:30px;
            color:#333;
          }

          h1{
            text-align:center;
            color:#ea580c;
            margin-bottom:5px;
          }

          h2{
            margin-top:25px;
            color:#ea580c;
            border-bottom:2px solid #ea580c;
            padding-bottom:6px;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
          }

          td{
            border:1px solid #ddd;
            padding:10px;
          }

          td:first-child{
            width:35%;
            font-weight:bold;
            background:#f8fafc;
          }
        </style>

      </head>

      <body>

        <h1>Sri Rama First Grade College</h1>

        <p style="text-align:center">
          Admission Application Form
        </p>

        <h2>Application Details</h2>

        <table>

          <tr>
            <td>Application Number</td>
            <td>${applicant.applicationNo}</td>
          </tr>

          <tr>
            <td>Application For</td>
            <td>${applicant.applicationFor}</td>
          </tr>

          <tr>
            <td>Submitted Date</td>
            <td>${new Date(
              applicant.submittedDate
            ).toLocaleString()}</td>
          </tr>

        </table>

        <h2>Personal Details</h2>

        <table>

          <tr>
            <td>Full Name</td>
            <td>${applicant.fullName}</td>
          </tr>

          <tr>
            <td>Gender</td>
            <td>${applicant.gender}</td>
          </tr>

          <tr>
            <td>Date of Birth</td>
            <td>${applicant.dob}</td>
          </tr>

          <tr>
            <td>Email</td>
            <td>${applicant.email}</td>
          </tr>

          <tr>
            <td>Phone</td>
            <td>${applicant.phone}</td>
          </tr>

          <tr>
            <td>Nationality</td>
            <td>${applicant.nationality}</td>
          </tr>

          <tr>
            <td>Mother Tongue</td>
            <td>${applicant.motherTongue}</td>
          </tr>

          <tr>
            <td>Languages</td>
            <td>${applicant.languages}</td>
          </tr>

          <tr>
            <td>Place Of Birth</td>
            <td>${applicant.placeOfBirth}</td>
          </tr>

          <tr>
            <td>State</td>
            <td>${applicant.state}</td>
          </tr>

          <tr>
            <td>Religion</td>
            <td>${applicant.religion}</td>
          </tr>

          <tr>
            <td>Caste</td>
            <td>${applicant.caste}</td>
          </tr>

          <tr>
            <td>Category</td>
            <td>${applicant.category}</td>
          </tr>

        </table>

        <h2>SSLC Details</h2>

        <table>

          <tr>
            <td>School</td>
            <td>${applicant.sslcSchool}</td>
          </tr>

          <tr>
            <td>Board</td>
            <td>${applicant.sslcBoard}</td>
          </tr>

          <tr>
            <td>Percentage</td>
            <td>${applicant.sslcPercentage}</td>
          </tr>

          <tr>
            <td>Year</td>
            <td>${applicant.sslcYear}</td>
          </tr>

        </table>

        <h2>PUC Details</h2>

        <table>

          <tr>
            <td>College</td>
            <td>${applicant.pucSchool}</td>
          </tr>

          <tr>
            <td>Board</td>
            <td>${applicant.pucBoard}</td>
          </tr>

          <tr>
            <td>Percentage</td>
            <td>${applicant.pucPercentage}</td>
          </tr>

          <tr>
            <td>Year</td>
            <td>${applicant.pucYear}</td>
          </tr>

        </table>

        <h2>Admission Status</h2>

        <table>

          <tr>
            <td>Status</td>
            <td>${applicant.status}</td>
          </tr>

          <tr>
            <td>Verification</td>
            <td>${applicant.verification}</td>
          </tr>

        </table>

        <script>
          window.onload=function(){
            window.print();
          }
        </script>

      </body>
      </html>
    `);

    win.document.close();
  };

  /* ================= UI ================= */

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-0">

        <div className="border-b p-5">
          <h2 className="text-lg font-bold">
            Applications
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            <thead className="bg-gray-50">
              <tr>
                <Th>Name</Th>
                <Th>Course</Th>
                <Th>Contact</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>

            <tbody>
              {currentApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="border-t"
                >
                  <Td>
                    {applicant.fullName}
                  </Td>

                  <Td>
                    {applicant.applicationFor}
                  </Td>

                  <Td>
                    {applicant.phone}
                  </Td>

                  <Td>
                    {applicant.submittedDate}
                  </Td>

                  <Td>
                    {applicant.status}
                  </Td>

                  <Td>
                    <div className="flex gap-2">

                      <Button
                        size="sm"
                        onClick={() =>
                          onViewDetails(applicant)
                        }
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          downloadPDF(applicant)
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>

      </CardContent>
    </Card>
  );
};

/* ================= HELPERS ================= */

const Th = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <th className="px-4 py-3 text-left text-sm font-semibold">
    {children}
  </th>
);

const Td = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <td className="px-4 py-3 text-sm">
    {children}
  </td>
);

export default ApplicationTable;