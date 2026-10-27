import React, { useRef, useState,useEffect } from "react";
import {
  ImageIcon,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";
import {
  saveLogo,
  getLogo,
  updateLogo,
  deleteLogo,
} from "@/services/logoApi";
import { API_BASE_URL } from "@/config/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import imageCompression from "browser-image-compression";

const LogoSettings = () => {
  const fileRef =
    useRef<HTMLInputElement | null>(null);

  const logoPageRef =
    useRef<HTMLDivElement>(null);

 const [logoPreview, setLogoPreview] =
  useState<string | null>(null);

const [logoFile, setLogoFile] =
  useState<File | null>(null);
  const [collegeName, setCollegeName] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [logoData, setLogoData] =
    useState<any[]>([]);
const [oldLogo, setOldLogo] = useState("");
  const handleLogoChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // Compress only if larger than 200 KB
  if (file.size > 200 * 1024) {
    try {
      const originalSize = file.size;

      const options = {
        maxSizeMB: 0.2, // Target around 200 KB
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      finalFile = await imageCompression(
        file,
        options
      );

      alert(
        `Logo compressed successfully!\n\n` +
        `Original size: ${Math.round(
          originalSize / 1024
        )} KB\n` +
        `Compressed size: ${Math.round(
          finalFile.size / 1024
        )} KB`
      );
    } catch (error) {
      console.error(
        "Logo image compression failed:",
        error
      );

      alert("Failed to compress logo");
      return;
    }
  } else {
    alert(
      `Logo size is already below 200 KB.\n\n` +
      `Logo size: ${Math.round(
        file.size / 1024
      )} KB`
    );
  }

  // Store compressed image
  setLogoFile(finalFile);

  // Show compressed image preview
  setLogoPreview(
    URL.createObjectURL(finalFile)
  );
};

  const fetchLogos = async () => {
  try {
    const res = await getLogo();

    setLogoData(res.data);

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchLogos();
}, []);

  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  const formData =
    new FormData();

  formData.append(
    "collegeName",
    collegeName
  );

  formData.append(
    "location",
    location
  );

  if (logoFile) {
    formData.append(
      "logo",
      logoFile
    );
  }

  if (editingId && !logoFile) {
formData.append("oldLogo", oldLogo);
}

  try {

    if (editingId) {

      await updateLogo(
        String(editingId),
        formData
      );

      alert(
        "Logo Updated Successfully"
      );

    } else {

      await saveLogo(
        formData
      );

      alert(
        "Logo Saved Successfully"
      );

    }

    fetchLogos();

    setCollegeName("");
    setLocation("");
    setLogoPreview(null);
    setLogoFile(null);
    setEditingId(null);

  } catch (error) {

    console.log(error);

  }

};
  // const handleDelete = (
  //   id: number
  // ) => {
  //   if (
  //     window.confirm(
  //       "Delete Logo Settings?"
  //     )
  //   ) {
  //     setLogoData((prev) =>
  //       prev.filter(
  //         (item) => item.id !== id
  //       )
  //     );
  //   }
  // };

  return (
    <div
  ref={logoPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <ImageIcon className="h-8 w-8 text-orange-600" />
          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Website Logo Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Logo Settings
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Manage college logo,
              name and location.
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

              {/* Logo Upload */}
              <div className="flex flex-col items-center">

                <div
                  onClick={() =>
                    fileRef.current?.click()
                  }
                  className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50"
                >
               {logoPreview ? (
  <img
    src={logoPreview}
    alt="Logo Preview"
    className="h-full w-full object-cover"
  />
) : (
  <ImageIcon className="h-10 w-10 text-slate-400" />
)}
                 
                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleLogoChange}
                  
                />

                <button
                  type="button"
                  onClick={() =>
                    fileRef.current?.click()
                  }
                  className="mt-3 flex items-center gap-2 text-sm text-slate-600"
                >
                  <Upload size={16} />
                  Upload Logo
                </button>

              </div>

              {/* Fields */}
              <div className="col-span-2 space-y-5">

                <div>
                  <label className="mb-2 block font-medium">
                    College Name
                  </label>

                  <Input
                    value={collegeName}
                    onChange={(e) =>
                      setCollegeName(
                        e.target.value
                      )
                    }
                    placeholder="Enter College Name"
                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Location
                  </label>

                  <Input
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                    placeholder="Enter Location"
                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>

              </div>

            </div>

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />

              {editingId
                ? "Update Logo Settings"
                : "Save Logo Settings"}
            </Button>

          </form>

        </CardContent>

      </Card>

      {/* Table */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Logo Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage logo details.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left font-semibold">
                    LOGO
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    COLLEGE NAME
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    LOCATION
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {logoData.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                     <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(item.logo_url)}`}
  alt=""
  className="h-14 w-14 rounded-full object-cover border"
/>

                    </td>

                 <td className="px-6 py-4 font-medium">
  {item.college_name}
</td>

                    <td className="px-6 py-4">
                      {item.location}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-2">

                        <Button
                          variant="outline"
                          type="button"
                          className="border-orange-300 text-orange-600"
                         onClick={() => {
  setCollegeName(item.college_name);

  setLocation(item.location);

  setOldLogo(item.logo_url);

  setLogoPreview(
    `${API_BASE_URL}/files/${encodeURIComponent(
      item.logo_url
    )}`
  );

  setEditingId(item.id);

  setTimeout(() => {
    logoPageRef.current?.scrollIntoView({
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
                          variant="outline"
                          type="button"
                          className="border-red-300 text-red-600"
                         onClick={async () => {

  if (
    window.confirm(
      "Delete Logo Settings?"
    )
  ) {

    await deleteLogo(
      String(item.id)
    );

    fetchLogos();

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

export default LogoSettings;