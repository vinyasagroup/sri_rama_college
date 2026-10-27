import {
  Users,
  User,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import React, {useState,useRef,useEffect,} from "react";

import {getGoverningBody,saveGoverningBody,updateGoverningBody,deleteGoverningBody,} from "@/services/governingBodyApi";
import imageCompression from "browser-image-compression"; 
import { API_BASE_URL } from "@/config/constants";
import Pagination from "@/components/admin/pagination/Pagination";
const GoverningBodyForm = () => {
   const governingBodyPageRef =
    useRef<HTMLDivElement>(null);
  const photoRef =
    useRef<HTMLInputElement | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    photo: null as File | null,
  });

  const [members, setMembers] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState<string | null>(null);
const [currentPage, setCurrentPage] = useState(1);
const membersPerPage = 5;

const totalPages = Math.ceil(members.length / membersPerPage);

const startIndex = (currentPage - 1) * membersPerPage;

const currentMembers = members.slice(
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

const [oldPhoto, setOldPhoto] =
  useState("");


  //Backend connection

  const fetchMembers =
  async () => {

    try {

      const res =
        await getGoverningBody();

      setMembers(
        res.data
      );

    } catch(error) {

      console.log(error);

    }

  };

useEffect(() => {

  fetchMembers();

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
        "name",
        formData.name
      );

      data.append(
        "role",
        formData.role
      );

      data.append(
        "content",
        formData.content
      );

      if (
        formData.photo
      ) {

        data.append(
          "photo",
          formData.photo
        );

      }

      data.append(
        "oldPhoto",
        oldPhoto
      );

      if (
        editingId
      ) {

        await updateGoverningBody(
          editingId,
          data
        );

        alert(
          "Member Updated"
        );

      } else {

        await saveGoverningBody(
          data
        );

        alert(
          "Member Saved"
        );

      }

     await fetchMembers();
setCurrentPage(1);

      setEditingId(
        null
      );

      setOldPhoto("");

      setPhotoPreview(
        null
      );

      setFormData({
        name: "",
        role: "",
        content: "",
        photo: null,
      });

    } catch(error) {

      console.log(error);

      alert(
        "Save Failed"
      );

    }

  };

const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // Compress if larger than 200KB
  if (file.size > 200 * 1024) {

    try {

      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      finalFile = await imageCompression(
        file,
        options
      );

      alert(
        `Photo compressed from ${Math.round(file.size / 1024)}KB to ${Math.round(finalFile.size / 1024)}KB`
      );

    } catch (error) {

      console.log(error);

      alert("Failed to compress image");

      return;

    }

  }

  setFormData({
    ...formData,
    photo: finalFile,
  });

  setPhotoPreview(
    URL.createObjectURL(finalFile)
  );

};
  return (
  <div
  ref={governingBodyPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <Users className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Governing Body Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Governing Body
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add and manage governing body members.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}
      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form onSubmit={handleSubmit}className="space-y-6">

            <div className="grid gap-6 md:grid-cols-3">

              {/* Photo Upload */}
              <div className="flex flex-col items-center">

                <div
                  onClick={() =>
                    photoRef.current?.click()
                  }
                  className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50"
                >
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="member"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-slate-400" />
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
                  className="mt-3 flex items-center gap-1 text-sm text-slate-600"
                >
                  <Upload size={16} />
                  Upload Photo
                </button>

              </div>

              {/* Fields */}
              <div className="col-span-2 space-y-5">

                <Input
                  placeholder="Member Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none
                   transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <Input
                  placeholder="Role / Designation"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
                  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <textarea
                  rows={6}
                  placeholder="Content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
                  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"                />

              </div>

            </div>

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Member
            </Button>

          </form>

        </CardContent>

      </Card>

      {/* Members Table */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Governing Body Members
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage governing body members.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left font-semibold">
                    PHOTO
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    NAME
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ROLE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    CONTENT
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

             <tbody>

{currentMembers.map(
  (item: any) => (

<tr
  key={item.id}
  className="border-b hover:bg-slate-50"
>

  <td className="px-6 py-4">

    <div className="h-12 w-12 overflow-hidden rounded-full border">

      <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(item.photo)}`}
  alt={item.name}
  className="h-full w-full object-cover"
/>

    </div>

  </td>

  <td className="px-6 py-4">
    {item.name}
  </td>

  <td className="px-6 py-4">
    {item.role}
  </td>

  <td className="px-6 py-4">
    {item.content}
  </td>

  <td className="px-6 py-4">

    <div className="flex gap-3">

      <Button
        type="button"
        variant="outline"
        className="border-orange-300 text-orange-600"
        onClick={() => {

          setFormData({
            name: item.name,
            role: item.role,
            content: item.content,
            photo: null,
          });

         setPhotoPreview(`${API_BASE_URL}/files/${encodeURIComponent(item.photo)}`
);

          setOldPhoto(
            item.photo
          );

          setEditingId(
            String(item.id)
          );

          setTimeout(() => {
  governingBodyPageRef.current?.scrollIntoView({
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

          if(
            window.confirm(
              "Delete Member?"
            )
          ){

            await deleteGoverningBody(
              String(item.id)
            );

          await fetchMembers();

          }

        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>

    </div>

  </td>

</tr>

))}
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

export default GoverningBodyForm;