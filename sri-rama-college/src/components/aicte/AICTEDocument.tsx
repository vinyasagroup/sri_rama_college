import React, {
  useEffect,
  useState,
} from "react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { FileText } from "lucide-react";

import { API_BASE_URL } from "@/config/constants";

const AICTEDocument: React.FC = () => {

  const [documents, setDocuments] =
    useState<any[]>([]);

  const fetchDocuments = async () => {

    try {

      const res = await fetch(
        API_BASE_URL + "/api/aicte"
      );

      const data = await res.json();

      setDocuments(data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDocuments();

  }, []);

  return (

    <Card className="overflow-hidden rounded-2xl border border-gray-200 !bg-white !text-gray-900 shadow-sm">

      {/* Header */}
      <div className="border-b bg-gray-50 p-5">

        <h2 className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-lg font-bold sm:text-2xl">
          AICTE Documents
        </h2>

      </div>


      <CardContent className="!bg-white p-0">

        <div className="divide-y divide-gray-200 bg-white">

          {documents.length > 0 ? (

            documents.map((item: any) => (

              <div
                key={item.id}
                className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >

                {/* ================= DOCUMENT NAME ================= */}
                <div className="flex items-center gap-3">

                  <div className="rounded-lg bg-orange-100 p-2">

                    <FileText className="h-5 w-5 text-orange-600" />

                  </div>


                  <div>

                    <h3 className="font-semibold text-slate-900">
                      AICTE Document
                    </h3>

                    <p className="text-sm text-slate-500">
                      Academic Year : {item.aictedoc_year}
                    </p>

                  </div>

                </div>


                {/* ================= VIEW BUTTON ================= */}

                <button
                  type="button"
                  disabled={item.status !== "Active"}
                  onClick={() => {

                    if (item.status !== "Active") {
                      return;
                    }

                    window.open(
                      `${API_BASE_URL}/files/${encodeURIComponent(
                        item.aictedoc_url
                      )}`,
                      "_blank"
                    );

                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
                    item.status === "Active"
                      ? "cursor-pointer bg-orange-500 hover:bg-orange-600"
                : "cursor-not-allowed bg-gray-400"
                  }`}
                >

                  View Document

                </button>

              </div>

            ))

          ) : (

            <div className="p-8 text-center text-gray-500">

              No AICTE Documents Available

            </div>

          )}

        </div>

      </CardContent>

    </Card>

  );

};

export default AICTEDocument;