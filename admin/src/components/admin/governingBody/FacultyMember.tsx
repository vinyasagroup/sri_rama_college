import {
  User,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import imageCompression from "browser-image-compression";

import {
  getFaculty,
  saveFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/services/facultyApi";

import { API_BASE_URL } from "@/config/constants";
import Pagination from "@/components/admin/pagination/Pagination";
const FacultyMember = () => {
  const facultyPageRef = useRef<HTMLDivElement>(null);
  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  const photoRef =
    useRef<HTMLInputElement | null>(null);

  const [facultyMembers, setFacultyMembers] =
    useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
const membersPerPage = 5;

const totalPages = Math.ceil(
  facultyMembers.length / membersPerPage
);

const startIndex = (currentPage - 1) * membersPerPage;

const currentFacultyMembers = facultyMembers.slice(
  startIndex,
  startIndex + membersPerPage
);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(Math.max(1, totalPages));
  }
}, [currentPage, totalPages]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [oldPhoto, setOldPhoto] =
    useState("");

const [formData, setFormData] = useState({
  faculty_quote: "",
  faculty_photo: null as File | null,
});

  // ==============================
  // IMAGE CHANGE
  // ==============================

  const handlePhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    let finalFile = file;

    // Compress image if larger than 200KB
    if (file.size > 200 * 1024) {
      try {
        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };

        finalFile = await imageCompression(
          file,
          options
        );

        alert(
          `Image compressed from ${Math.round(
            file.size / 1024
          )}KB to ${Math.round(
            finalFile.size / 1024
          )}KB`
        );
      } catch (error) {
        console.log(error);
        alert("Image compression failed");
        return;
      }
    }

    setFormData({
      ...formData,
     faculty_photo: finalFile
    });

    setPhotoPreview(
      URL.createObjectURL(finalFile)
    );
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.faculty_photo && !editingId) {
      alert("Please upload faculty image");
      return;
    }

    if (!formData.faculty_quote.trim()) {
      alert("Please enter faculty quote");
      return;
    }

    try {
      const data = new FormData();

      data.append(
  "faculty_quote",
  formData.faculty_quote
);

if (formData.faculty_photo) {
  data.append(
    "faculty_photo",
    formData.faculty_photo
  );
}

data.append(
  "oldPhoto",
  oldPhoto
);

      if (editingId) {
        await updateFaculty(
          editingId,
          data
        );

        alert("Faculty Updated");
      } else {
        await saveFaculty(data);

        alert("Faculty Saved");
      }

      await fetchFaculty();
      setCurrentPage(1);
      // Reset
      setEditingId(null);
      setOldPhoto("");
      setPhotoPreview(null);

      setFormData({
        faculty_quote: "",
        faculty_photo: null,
      });

      if (photoRef.current) {
        photoRef.current.value = "";
      }

    } catch (error) {
      console.log(error);
      alert("Save Failed");
    }
  };

  // ==============================
  // FETCH
  // ==============================

  const fetchFaculty = async () => {
    try {
      const res = await getFaculty();

      setFacultyMembers(
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ==============================
  // UI
  // ==============================

  return (
   <div
  ref={facultyPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* HEADER */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <User className="h-8 w-8 text-orange-600" />
          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Faculty Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Faculty Member
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add faculty image and quote.
            </p>

          </div>

        </div>
      </div>

      {/* FORM */}
      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-3">

              {/* PHOTO */}
              <div className="flex flex-col items-center">

                <div
                  onClick={() =>
                    photoRef.current?.click()
                  }
                  className="flex h-30 w-30 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50"
                >

                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Faculty"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-orange-400" />
                  )}

                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={photoRef}
                  onChange={handlePhotoChange}
                />

                <button
                  type="button"
                  onClick={() =>
                    photoRef.current?.click()
                  }
                  className="mt-3 flex items-center gap-1 text-sm text-slate-600 hover:text-orange-600"
                >
                  <Upload size={16} />
                  Upload Faculty Image
                </button>

              </div>

              {/* QUOTE */}
              <div className="col-span-2">

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Faculty Quote
                </label>

                <textarea
                  rows={6}
                  placeholder="Enter faculty quote"
                  value={formData.faculty_quote}
                  onChange={(e) =>
                    setFormData({
  ...formData,
  faculty_quote: e.target.value,
})
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
                  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"      />

              </div>

            </div>

            {/* SAVE */}
            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
            >
              <Save className="mr-2 h-4 w-4" />

              {editingId
                ? "Update Faculty"
                : "Save Faculty"}
            </Button>

          </form>

        </CardContent>

      </Card>

      {/* TABLE */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Faculty Members
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage faculty image and quote.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[800px]">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left font-semibold">
                    PHOTO
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    QUOTE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentFacultyMembers.map(
  (item: any) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50"
                    >

                      {/* PHOTO */}
                      <td className="px-6 py-4">
  <div className="h-16 w-16 overflow-hidden rounded-xl border">
    <img
      src={`${API_BASE_URL}/files/${encodeURIComponent(
        item.faculty_photo
      )}`}
      alt="Faculty"
      className="h-full w-full object-cover"
    />
  </div>
</td>
                     <td className="max-w-xl px-6 py-4">
  {item.faculty_quote}
</td>

                      {/* ACTION */}
                      <td className="px-6 py-4">

                        <div className="flex gap-3">

                          {/* EDIT */}
                          <Button
                            type="button"
                            variant="outline"
                            className="border-orange-300 text-orange-600"
                            onClick={() => {

  setFormData({
    faculty_quote: item.faculty_quote,
    faculty_photo: null,
  });

  setEditingId(
    String(item.id)
  );

  setOldPhoto(
    item.faculty_photo
  );

  setPhotoPreview(
    `${API_BASE_URL}/files/${encodeURIComponent(
      item.faculty_photo
    )}`
  );

 setTimeout(() => {
  facultyPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

}}
>
                            <PencilLine className="mr-2 h-4 w-4" />
                            Edit
                          </Button>

                          {/* DELETE */}
                          <Button
                            type="button"
                            variant="outline"
                            className="border-red-300 text-red-600"
                            onClick={async () => {

                              if (
                                window.confirm(
                                  "Delete Faculty?"
                                )
                              ) {

                                await deleteFaculty(
                                  String(item.id)
                                );

                                await fetchFaculty();

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
          <div className="border-t px-6 py-4">
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</div>

        </CardContent>

      </Card>

    </div>
  );
};

export default FacultyMember;