
import {
  User,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  getFounder,
  saveFounder,
  updateFounder,
  deleteFounder,
} from "@/services/founderMessageApi";
import imageCompression from "browser-image-compression";
import { API_BASE_URL } from "@/config/constants";

const FounderMessage = () => {
  const founderPageRef = useRef<HTMLDivElement>(null);
  const [photoPreview, setPhotoPreview] =
  useState<string | null>(null);

  const photoRef =
  useRef<HTMLInputElement | null>(null);

const [founders, setFounders] =
  useState<any[]>([]);

const [editingId, setEditingId] =
  useState<string | null>(null);

const [oldPhoto, setOldPhoto] =
  useState("");

const [formData, setFormData] =
  useState({
    name: "",
    quote: "",
    message: "",
    photo: null as File | null,
  });

  const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // If image is larger than 200KB, compress it
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
        `Image compressed from ${Math.round(file.size / 1024)}KB to ${Math.round(finalFile.size / 1024)}KB`
      );

    } catch (error) {

      console.log(error);

      alert("Image compression failed");

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
        "quote",
        formData.quote
      );

      data.append(
        "message",
        formData.message
      );

      if(formData.photo){

        data.append(
          "photo",
          formData.photo
        );

      }

      data.append(
        "oldPhoto",
        oldPhoto
      );

      if(editingId){

        await updateFounder(
          editingId,
          data
        );

        alert(
          "Founder Updated"
        );

      } else {

        await saveFounder(
          data
        );

        alert(
          "Founder Saved"
        );

      }

     await fetchFounders();

      setEditingId(null);

      setOldPhoto("");

      setPhotoPreview(null);

      setFormData({
        name:"",
        quote:"",
        message:"",
        photo:null
      });

    } catch(error){

      console.log(error);

      alert(
        "Save Failed"
      );

    }

  };

const fetchFounders =
  async () => {

    try {

      const res =
        await getFounder();

      setFounders(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

useEffect(() => {

  fetchFounders();

}, []);


  return (
    <div
  ref={founderPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <User className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Founder Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Founder Message
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add founder details and message.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}
      <Card className="rounded-3xl">
        <CardContent className="p-6">
<form
  onSubmit={handleSubmit}
  className="space-y-6"
>

            <div className="grid gap-6 md:grid-cols-3">

              {/* Photo */}
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
    alt=""
    className="h-full w-full object-cover"
  />
) : (
  <User className="h-8 w-8 text-slate-400" />
)}
                </div>

                <input
                  hidden
                  type="file"
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
                  placeholder="Founder Name"
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
                  placeholder="Quote"
                  value={formData.quote}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quote: e.target.value,
                    })
                  }className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
                  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <textarea
                  rows={6}
                  placeholder="Founder Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none
                   transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

              </div>

            </div>

            <Button
  type="submit"
  className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
>
  <Save className="mr-2 h-4 w-4" />
  {editingId
    ? "Update Founder Message"
    : "Save Founder Message"}
</Button>

          </form>

        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Founder Messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage founder details.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left font-semibold">
                    PHOTO
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    NAME
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    QUOTE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    MESSAGE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {founders.map(
  (item:any) => (

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
        {item.quote}
      </td>

      <td className="px-6 py-4">
        {item.message}
      </td>

      <td className="px-6 py-4">

        <div className="flex gap-3">

          <Button
            type="button"
            variant="outline"
            className="border-orange-300 text-orange-600"
            onClick={() => {

              setFormData({
                name:item.name,
                quote:item.quote,
                message:item.message,
                photo:null
              });

              setEditingId(
                String(item.id)
              );

              setOldPhoto(
                item.photo
              );

             setPhotoPreview(
  `${API_BASE_URL}/files/${encodeURIComponent(item.photo)}`
);
setTimeout(() => {
  founderPageRef.current?.scrollIntoView({
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
                  "Delete Founder?"
                )
              ){

                await deleteFounder(
                  String(item.id)
                );

                await fetchFounders();

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

        </CardContent>

      </Card>

    </div>
  );
};

export default FounderMessage;