import React from "react";
import { FileText, Trophy } from "lucide-react";
import NIRFDocument from "../components/nirf/NIRFDocument";

const NIRF: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-5">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl px-5 sm:px-8 py-5 text-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white/20">
            <Trophy className="w-7 h-7 text-white" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              NIRF
            </h1>

            <p className="text-orange-100 text-xs sm:text-sm mt-0.5">
              National Institutional Ranking Framework Documents
            </p>
          </div>
        </div>
      </div>

      {/* Tab */}
      <div className="flex gap-1 border-b border-gray-200">
        <button
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold
          rounded-t-lg border-b-2 transition-all -mb-px border-orange-500 text-orange-600 bg-orange-50"
        >
          <FileText className="w-4 h-4" />
          NIRF Documents
        </button>
      </div>

      {/* Content */}
      <div>
        <NIRFDocument />
      </div>

    </div>
  );
};

export default NIRF;