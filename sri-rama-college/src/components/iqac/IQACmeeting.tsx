import React, {
  useState,
  useEffect,
} from "react";

import { SendHorizontal } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  getIQACDocuments,
} from "@/services/documentIqacApi";

import { API_BASE_URL } from "@/config/constants";

const IQACMeeting: React.FC = () => {

  const [documents, setDocuments] =
    useState<any[]>([]);

  const [years, setYears] =
    useState<string[]>([]);

  const [selectedYear, setSelectedYear] =
    useState("");

  const fetchDocuments =
    async () => {

      try {

        const res =
          await getIQACDocuments();

        setDocuments(
          res.data
        );

        const uniqueYears = [
          ...new Set(
            res.data.map(
              (item: any) =>
                item.year
            )
          ),
        ];

        setYears(
          uniqueYears as string[]
        );

        if (
          uniqueYears.length > 0
        ) {
          setSelectedYear(
            String(
              uniqueYears[0]
            )
          );
        }

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchDocuments();

  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

      {/* Sidebar */}
      <div className="lg:w-52 shrink-0">

        <p className="text-[11px] font-bold text-orange-600 uppercase tracking-widest mb-2 px-1">
          Select Year
        </p>

        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">

          {years.map((year) => (

            <button
              key={year}
              onClick={() =>
                setSelectedYear(
                  year
                )
              }
              className={`shrink-0 lg:w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                selectedYear === year
                  ? "bg-orange-500 text-white border-orange-500 shadow"
                  : "bg-gray-50 hover:bg-orange-50 border-gray-200 text-gray-700 hover:border-orange-300"
              }`}
            >
              {year}
            </button>

          ))}

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Objectives */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm">

          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">

            <h3 className="text-lg sm:text-2xl font-bold bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
              Objectives
            </h3>

          </div>

          <div className="p-4 sm:p-5">

            <ul className="space-y-3 text-base text-gray-700">

              {[
                "To assure institutional functioning is more focused and clear in order to enhance the quality.",
                "To internalize quality culture and good practices.",
                "To ensure coordination among the functional units of the Institution.",
                "To offer a solid foundation for decision-making in order to enhance institutional performance.",
                "To serve as an adaptive system for HEI quality improvements.",
                "To develop a structured internal communication and documentation framework.",
              ].map(
                (
                  objective,
                  index
                ) => (

                  <li
                    key={index}
                    className="flex gap-3"
                  >

                    <SendHorizontal className="mt-1 h-5 w-5 text-orange-500 shrink-0" />

                    <span className="text-justify">
                      {objective}
                    </span>

                  </li>

                )
              )}

            </ul>

          </div>

        </div>

        {/* IQAC Documents */}
        <Card className="overflow-hidden rounded-2xl border border-gray-200 !bg-white !text-gray-900 shadow-sm">

  {/* Header */}
 <div className="border-b border-gray-200 bg-gray-50 p-5">

    <h2 className="text-lg sm:text-2xl font-bold bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
      IQAC Documents - {selectedYear}
    </h2>

  </div>

  <CardContent className="p-0">

            <div className="divide-y">

             {documents
  .filter(
    (item: any) =>
      item.year === selectedYear
  )
  .map((item: any) => (
    <div
      key={item.id}
      className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >

      {/* Document Name - always visible */}
      <h3 className="font-medium text-gray-900">
        {item.category}
      </h3>

      {/* View Button */}
      <button
        type="button"
        disabled={item.status !== "Active"}
        onClick={() => {
          if (item.status !== "Active") return;

          window.open(
            `${API_BASE_URL}/files/${encodeURIComponent(
              item.file_name
            )}`,
            "_blank"
          );
        }}
        className={`rounded-lg px-4 py-2 text-sm font-medium text-white ${
          item.status === "Active"
            ? "bg-orange-500 hover:bg-orange-600 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        View
      </button>

    </div>
  ))}

              {documents.filter(
                (item: any) =>
                  item.year === selectedYear
              ).length === 0 && (

                <div className="bg-white p-6 text-center text-gray-500">
                  No IQAC Documents Available
                </div>

              )}

            </div>

          </CardContent>

        </Card>

      </div>

    </div>
  );
};

export default IQACMeeting;