  import {Trophy,Save,PencilLine,Trash2,} from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
 import React, { useState, useEffect, useRef } from "react";
  import {getAchievements,saveAchievement,updateAchievement,deleteAchievement,} from "@/services/achievementApi";
  import { API_BASE_URL } from "@/config/constants";
  import imageCompression from "browser-image-compression";
import Pagination from "@/components/admin/pagination/Pagination";

const AchievementsForm = () => {
  const achievementPageRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
      achieverName: "",
      year: "",
      description: "",
      file_name: null as File | null,
    });

const [achievements, setAchievements] =useState<any[]>([]);
// ================= PAGINATION =================

const [currentPage, setCurrentPage] = useState(1);

const achievementsPerPage = 10;

const totalPages = Math.ceil(
  achievements.length / achievementsPerPage
);

const startIndex = (currentPage - 1) * achievementsPerPage;

const currentAchievements = achievements.slice(
  startIndex,
  startIndex + achievementsPerPage
);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

// Reset page when records are deleted
useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(Math.max(1, totalPages));
  }
}, [currentPage, totalPages]);
  const [editingId, setEditingId] =useState<string | null>(null);
  const [oldFile, setOldFile] =useState("");
    const fetchAchievements =
    async () => {

      try {

        const res =
          await getAchievements();

        setAchievements(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAchievements();

  }, []);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "achieverName",
          formData.achieverName
        );

        data.append(
          "year",
          formData.year
        );

        data.append(
          "description",
          formData.description
        );

        if (formData.file_name) {

          data.append(
            "file",
            formData.file_name
          );

        }

        data.append(
          "oldFile",
          oldFile
        );

        if (
          editingId
        ) {

          await updateAchievement(
            editingId,
            data
          );

          alert(
            "Achievement Updated"
          );

        } else {

          await saveAchievement(
            data
          );

          alert(
            "Achievement Saved"
          );

        }

        fetchAchievements();

        setEditingId(
          null
        );

        setOldFile("");

        setFormData({
          achieverName: "",
          year: "",
          description: "",
          file_name: null,
        });

      } catch (error) {

        console.log(error);

        alert(
          "Save Failed"
        );

      }

    };

    return (
    <div ref={achievementPageRef} className="space-y-8 p-2 sm:p-4">
        {/* Header */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

          <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

          <div className="flex items-start gap-4 p-7">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>

            <div>

              <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                Admin Achievement Management
              </span>

              <h1 className="text-2xl font-bold text-slate-900">
                Add Achievement
              </h1>

              <p className="mt-1 text-sm text-slate-600">
                Add achiever details and supporting documents.
              </p>

            </div>

          </div>

        </div>

        {/* Form */}
        <Card className="rounded-3xl">

          <CardContent className="p-6">

            <form onSubmit={handleSubmit} className="space-y-6">

              <div>

                <label className="mb-2 block font-medium">
                  Achiever Name
                </label>

                <Input
                  placeholder="Enter achiever name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
                  value={formData.achieverName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      achieverName: e.target.value,
                      
                    })
                  }
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Year
                </label>

                <Input
                  placeholder="Ex: 2024-25"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year: e.target.value,
                    })
                  }
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Description
                </label>

                <textarea
  rows={3}
  placeholder="Enter achievement description"
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Upload Document
                </label>
<Input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    let finalFile = file;

    if (file.size > 200 * 1024) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };

        finalFile = await imageCompression(file, options);

        alert(
          `Document compressed from ${Math.round(
            file.size / 1024
          )}KB to ${Math.round(
            finalFile.size / 1024
          )}KB`
        );
      } catch (error) {
        console.error(error);
        alert("Failed to compress document");
        return;
      }
    }

    setFormData({
      ...formData,
      file_name: finalFile,
    });
  }}
  className="
  w-full
  h-10
  rounded-lg
  border border-gray-300
  bg-white
  px-4
  outline-none
  file:mr-4
  file:rounded-md
  file:border-0
  file:bg-gray-100
  file:px-3
  file:py-1
  file:text-sm
  file:font-medium
  file:text-gray-700
  hover:file:bg-gray-200
  focus:border-gray-300
  focus:outline-none
  focus:ring-0
"
/>
              </div>

              <Button
                type="submit"
                className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Save className="mr-2 h-4 w-4" />
              {
  editingId
  ? "Update Achievement"
  : "Save Achievement"
  }
              </Button>

            </form>

          </CardContent>

        </Card>

        {/* Table */}
        <Card className="rounded-3xl">

          <CardContent className="p-0">

            <div className="border-b p-6">

              <h2 className="text-2xl font-bold text-slate-900">
                Added Achievements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage achievement records.
              </p>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead>

                  <tr className="border-b bg-slate-50">

                    <th className="px-6 py-4 text-left font-semibold">
                      ACHIEVER NAME
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      YEAR
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      DESCRIPTION
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      DOCUMENT
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      ACTION
                    </th>

                  </tr>

                </thead>

                <tbody>
              
{currentAchievements.map(
  (item: any) => (

      <tr
        key={item.id}
        className="border-b hover:bg-slate-50"
      >  

        <td className="px-6 py-4">
          {item.achiever_name}
        </td>

        <td className="px-6 py-4">
          {item.year}
        </td>

        <td className="px-6 py-4">
          {item.description}
        </td>

        <td className="px-6 py-4">

    <a href={`${API_BASE_URL}/files/${encodeURIComponent(item.file_name)}`}
    target="_blank"
    rel="noreferrer"
    className="text-blue-600 underline"
  >
    View Document
  </a>

        </td>

        <td className="px-6 py-4">

          <div className="flex gap-2">

            <Button
              type="button"
              variant="outline"
              className="border-orange-300 text-orange-600"
              onClick={() => {

                setFormData({
                  achieverName:
                    item.achiever_name,
                  year:
                    item.year,
                  description:
                    item.description,
                  file_name: null,
                });

                setEditingId(
                  String(item.id)
                );

           setOldFile(item.file_name);

setTimeout(() => {
  achievementPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

              }}
            >
              <PencilLine className="mr-2 h-4 w-4" />
              Edit
            </Button>

            <Button
              type="button"
              variant="outline"
              className="border-red-300 text-red-600"
              onClick={async () => {

                if (
                  window.confirm(
                    "Delete Achievement?"
                  )
                ) {

                  await deleteAchievement(
                    String(item.id)
                  );

                  fetchAchievements();

                }

              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>

          </div>

        </td>

      </tr>

    )
  )}

                </tbody>

                     </table>

            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

          </CardContent>

        </Card>

      </div>
    );
  };

  export default AchievementsForm;