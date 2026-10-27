import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Building2,
  RotateCcw,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  saveAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} from "@/services/aboutApi";
import imageCompression from "browser-image-compression";

const About: React.FC = () => {
  const aboutPageRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const photoRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [collegePhoto, setCollegePhoto] = useState<string | null>(null);
  const [aboutData, setAboutData] = useState<any>(null);
const [compressedPhoto, setCompressedPhoto] = useState<File | null>(null);
  const [form, setForm] = useState({
    collegeName: "",
    quote: "",
    content: "",
    vision: "",
    mission: "",
  });

  useEffect(() => {
    fetchAbout();
  }, []);
const fetchAbout = async () => {
  try {
    const res = await getAbout();

    // Store data for table only
    setAboutData(res.data);
    // Do NOT setForm here
    // Form should remain empty until Edit is clicked
  } catch (error) {
    console.error(error);
  }
};

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  // Preview selected image before upload
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
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      finalFile = await imageCompression(file, options);

      alert(
        `Image compressed from ${Math.round(
          file.size / 1024
        )}KB to ${Math.round(
          finalFile.size / 1024
        )}KB`
      );
    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Failed to compress image");
      return;
    }
  }

  // Store compressed file for upload
  setCompressedPhoto(finalFile);

  // Create preview from compressed file
  const reader = new FileReader();

  reader.onloadend = () => {
    setCollegePhoto(reader.result as string);
  };

  reader.readAsDataURL(finalFile);

  setSaved(false);
};


 const handleReset = () => {
  if (isEditing && aboutData) {
    setForm({
      collegeName: aboutData.college_name || "",
      quote: aboutData.quote || "",
      content: aboutData.content || "",
      vision: aboutData.vision || "",
      mission: aboutData.mission || "",
    });

    setCollegePhoto(
      aboutData.college_photo
        ? `${import.meta.env.VITE_API_BASE_URL}/files/${encodeURIComponent(
            aboutData.college_photo
          )}`
        : null
    );

    // Clear newly selected compressed image
    setCompressedPhoto(null);
  } else {
    setForm({
      collegeName: "",
      quote: "",
      content: "",
      vision: "",
      mission: "",
    });

    setCollegePhoto(null);
    setCompressedPhoto(null);
  }

  setSaved(false);

  if (photoRef.current) {
    photoRef.current.value = "";
  }
};

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const data = new FormData();

    if (aboutData?.id) {
      data.append(
        "id",
        String(aboutData.id)
      );
    }

    data.append(
      "collegeName",
      form.collegeName
    );

    data.append(
      "quote",
      form.quote
    );

    data.append(
      "content",
      form.content
    );

    data.append(
      "vision",
      form.vision
    );

    data.append(
      "mission",
      form.mission
    );

    data.append(
      "oldPhoto",
      aboutData?.college_photo || ""
    );

    if (compressedPhoto) {
  data.append("photo", compressedPhoto);
}
    // =========================
    // SAVE / UPDATE
    // =========================

    if (isEditing) {
      await updateAbout(data);
    } else {
      await saveAbout(data);
    }

    // =========================
    // GET SAVED DATA
    // ONLY FOR TABLE
    // =========================

    const res = await getAbout();

    setAboutData(res.data);

    // =========================
    // CLEAR FORM
    // =========================

    setForm({
      collegeName: "",
      quote: "",
      content: "",
      vision: "",
      mission: "",
    });
setCollegePhoto(null);
setCompressedPhoto(null);

    if (photoRef.current) {
      photoRef.current.value = "";
    }

    setIsEditing(false);
    setSaved(true);

  } catch (error) {
    console.error(error);
    alert("Save failed");
  }
};
  return (
  <div
  ref={aboutPageRef}
  className="min-h-screen bg-gray-50"
>
    <div className="mx-auto max-w-7xl px-6 py-6">

    {/* Header */}
<div className="mb-6 overflow-hidden rounded-2xl border bg-white shadow-sm">

  {/* Orange top line */}
  <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

  <div className="flex items-start gap-4 p-7">

    {/* Icon */}
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
      <Building2 className="h-8 w-8 text-orange-600" />
    </div>

    {/* Header Content */}
    <div>

      {/* Badge */}
      <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
        Admin About Management
      </span>

      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900">
        About Management
      </h1>

      {/* Description */}
      <p className="mt-1 text-sm text-slate-600">
        Manage your college about information.
      </p>

    </div>

  </div>

</div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Upload */}
            <div className="flex flex-col items-center">

              <div
                onClick={() => photoRef.current?.click()}
                className="flex h-56 w-56 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50"
              >
                {collegePhoto ? (
                  <img
                    src={collegePhoto}
                    alt="College"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Building2
                      size={60}
                      className="mx-auto text-orange-400"
                    />
                    <p className="mt-3 text-sm text-gray-500">
                      Click to upload photo
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={photoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

              <Button
                type="button"
                variant="outline"
                className="mt-5"
                onClick={() => photoRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 lg:col-span-2">
              {/* College Name */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    College Name
  </label>
  <input
    type="text"
    value={form.collegeName}
    onChange={(e) =>
      updateField("collegeName", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    placeholder="Enter College Name"
  />
</div>

{/* Quote */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Quote
  </label>
  <input
    type="text"
    value={form.quote}
    onChange={(e) =>
      updateField("quote", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    placeholder="Enter College Quote"
  />
</div>

{/* About */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    About
  </label>
  <textarea
    rows={6}
    value={form.content}
    onChange={(e) =>
      updateField("content", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    placeholder="Enter About College"
  />
</div>

{/* Vision */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Vision
  </label>
  <textarea
    rows={4}
    value={form.vision}
    onChange={(e) =>
      updateField("vision", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    placeholder="Enter Vision"
  />
</div>

{/* Mission */}
<div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Mission
  </label>
  <textarea
    rows={4}
    value={form.mission}
    onChange={(e) =>
      updateField("mission", e.target.value)
    }
    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    placeholder="Enter Mission"
  />
</div>

{/* Buttons */}
<div className="flex justify-end gap-3 pt-4">
  <Button
    type="button"
    variant="outline"
    onClick={handleReset}
  >
    <RotateCcw className="mr-2 h-4 w-4" />
    Reset
  </Button>
 

  <Button
    type="submit"
    className="bg-orange-500 hover:bg-orange-600 text-white"
  >
    {isEditing ? (
      <>
        <PencilLine className="mr-2 h-4 w-4" />
        Update About
      </>
    ) : (
      <>
        <Save className="mr-2 h-4 w-4" />
        Save About
      </>
    )}
  </Button>
</div>

{saved && (
  <p className="text-right text-sm font-medium text-green-600">
    Saved Successfully!
  </p>
)}

</div>
</div>
</div>
</form>

{/* Stored About Details Starts Below */}
<div className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
  <div className="border-b px-6 py-5">
    <h2 className="text-2xl font-bold text-slate-900">
      Added About Details
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      View and manage saved about information.
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-slate-50">
        <tr className="text-left text-sm font-semibold text-slate-600">
          <th className="px-6 py-4">PHOTO</th>
          <th className="px-6 py-4">COLLEGE NAME</th>
          <th className="px-6 py-4">QUOTE</th>
          <th className="px-6 py-4">VISION</th>
          <th className="px-6 py-4">MISSION</th>
          <th className="px-6 py-4 text-center">
            ACTION
          </th>
        </tr>
      </thead>

      <tbody>
        {aboutData ? (
          <tr className="border-t hover:bg-slate-50">
            <td className="px-6 py-5">
              {aboutData.college_photo ? (
               <img
  src={`${import.meta.env.VITE_API_BASE_URL}/files/${encodeURIComponent(
    aboutData.college_photo
  )}`}
  alt="College"
  className="h-20 w-20 rounded-xl object-cover border"
/>
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </td>

            <td className="px-6 py-5 font-medium">
              {aboutData.college_name}
            </td>

            <td className="max-w-xs px-6 py-5">
              <p className="line-clamp-2">
                {aboutData.quote}
              </p>
            </td>

            <td className="max-w-xs px-6 py-5">
              <p className="line-clamp-3">
                {aboutData.vision}
              </p>
            </td>

            <td className="max-w-xs px-6 py-5">
              <p className="line-clamp-3">
                {aboutData.mission}
              </p>
            </td>

            <td className="px-6 py-5">
              <div className="flex items-center justify-center gap-3">
                {/* Edit Button */}
<Button
  type="button"
  variant="outline"
  className="border-orange-300 text-orange-600 hover:bg-orange-50"
  onClick={() => {
    setForm({
      collegeName: aboutData.college_name || "",
      quote: aboutData.quote || "",
      content: aboutData.content || "",
      vision: aboutData.vision || "",
      mission: aboutData.mission || "",
    });

 setCollegePhoto(
  aboutData.college_photo
    ? `${import.meta.env.VITE_API_BASE_URL}/files/${encodeURIComponent(
        aboutData.college_photo
      )}`
    : null
);
    setIsEditing(true);
    setSaved(false);

  setTimeout(() => {
  aboutPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);
  }}
>
  <PencilLine className="mr-2 h-4 w-4" />
  Edit
</Button>

{/* Delete Button */}
<Button
  type="button"
  variant="outline"
  className="border-red-300 text-red-600 hover:bg-red-50"
  onClick={async () => {
    if (!window.confirm("Are you sure you want to delete this About information?")) {
      return;
    }

    try {
      await deleteAbout();

      setAboutData(null);

      setForm({
        collegeName: "",
        quote: "",
        content: "",
        vision: "",
        mission: "",
      });

      setCollegePhoto(null);

      setSaved(false);
      setIsEditing(false);

      if (photoRef.current) {
        photoRef.current.value = "";
      }

      alert("About information deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete About information.");
    }
  }}
>
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</Button>

              </div>
            </td>
          </tr>
        ) : (
          <tr>
            <td
              colSpan={6}
              className="py-10 text-center text-gray-500"
            >
              No About information found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
  </div>
);
};

export default About;