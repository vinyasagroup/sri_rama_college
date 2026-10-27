import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Users,
  User,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import imageCompression from "browser-image-compression";
 import { API_BASE_URL } from "@/config/constants";
import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  getTestimonials,
  saveTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/services/testimonialsApi";
import Pagination from "@/components/admin/pagination/Pagination";
const TestimonialsForm = () => {
  const testimonialsPageRef = useRef<HTMLDivElement>(null);
  const photoRef =
    useRef<HTMLInputElement | null>(null);

 const [photoPreview, setPhotoPreview] =
  useState<string>("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [oldPhoto, setOldPhoto] =
    useState("");

  const [testimonials, setTestimonials] =
    useState<any[]>([]);

    
const [currentPage, setCurrentPage] = useState(1);

const testimonialsPerPage = 10;

const totalPages = Math.ceil(
  testimonials.length / testimonialsPerPage
);

const startIndex = (currentPage - 1) * testimonialsPerPage;

const currentTestimonials = testimonials.slice(
  startIndex,
  startIndex + testimonialsPerPage
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


  const [formData, setFormData] =
    useState({
      testimonial_name: "",
      testimonial_role: "",
    testimonial_description: "",
    testimonial_photo: null as File | null,
    });

  // ================= Load Testimonials =================

  const fetchTestimonials =
    async () => {

      try {

        const res =
          await getTestimonials();

        setTestimonials(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTestimonials();

  }, []);

  // ================= Submit =================

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {
const data = new FormData();
        data.append(
  "testimonial_name",
formData.testimonial_name
);

data.append(
  "testimonial_role",
  formData.testimonial_role
);
data.append(
  "testimonial_description",
  formData.testimonial_description
);

if (formData.testimonial_photo) {
  data.append(
    "testimonial_photo",
    formData.testimonial_photo
  );
}

data.append("oldPhoto", oldPhoto);

        if (editingId) {

          await updateTestimonial(
            editingId,
            data
          );

          alert(
            "Testimonial Updated Successfully"
          );

        } else {

          await saveTestimonial(
            data
          );

          alert(
            "Testimonial Saved Successfully"
          );

        }

        fetchTestimonials();

        setEditingId(null);

        setOldPhoto("");

        setPhotoPreview("");

        setFormData({
  testimonial_name: "",
  testimonial_role: "",
  testimonial_description: "",
  testimonial_photo: null,
});

      } catch (error) {

        console.log(error);

        alert(
          "Unable to Save Testimonial"
        );

      }

    };

  // ================= Upload Image =================

 const handlePhotoChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // Compress if larger than 200KB
  if (file.size > 200 * 1024) {
    try {
      const originalSize = file.size;

      const options = {
        maxSizeMB: 0.2, // 200KB
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      finalFile = await imageCompression(file, options);

      // Show compression result
      alert(
        `Image compressed successfully!\n\n` +
        `Original size: ${Math.round(originalSize / 1024)} KB\n` +
        `Compressed size: ${Math.round(finalFile.size / 1024)} KB`
      );

    } catch (error) {
      console.error("Image compression failed:", error);
      alert("Failed to compress image");
      return;
    }
  } else {
    // Image is already below 200KB
    alert(
      `Image size is already below 200 KB.\n\n` +
      `Image size: ${Math.round(file.size / 1024)} KB`
    );
  }

  // Store compressed/original file
  setFormData({
    ...formData,
    testimonial_photo: finalFile,
  });

  // Show preview
  setPhotoPreview(URL.createObjectURL(finalFile));
};

  // ================= Delete =================

  const handleDelete =
    async (
      id: string
    ) => {

      if (
        !window.confirm(
          "Delete Testimonial?"
        )
      )
        return;

      try {

        await deleteTestimonial(
          id
        );

        fetchTestimonials();

      } catch (error) {

        console.log(error);

      }

    };
      return (
   <div ref={testimonialsPageRef}
  className="space-y-8 p-2 sm:p-4">

      {/* ================= Header ================= */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">

            <Users className="h-8 w-8 text-orange-600" />

          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Testimonials Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Testimonials
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add and manage testimonials.
            </p>

          </div>

        </div>

      </div>

      {/* ================= Form ================= */}

      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-3">

              {/* ================= Photo Upload ================= */}

              <div className="flex flex-col items-center">

                <div
  onClick={() => photoRef.current?.click()}
  className="flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 hover:border-orange-400"
>
  {photoPreview ? (
    <img
      src={photoPreview}
      alt="Preview"
      className="h-full w-full object-cover"
      onError={(e) => {
        console.log("Image failed:", photoPreview);
        e.currentTarget.src = "/placeholder-user.png";
      }}
    />
  ) : (
    <User className="h-10 w-10 text-slate-400" />
  )}
</div>

                <input
                  hidden
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    photoRef.current?.click()
                  }
                >

                  <Upload className="mr-2 h-4 w-4" />

                  Upload Photo

                </Button>

              </div>

              {/* ================= Form Fields ================= */}

              <div className="col-span-2 space-y-5">

                <div>

                  <label className="mb-2 block font-medium">
                    Name
                  </label>

                  <Input
                    placeholder="Enter Name"
                    value={formData.testimonial_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial_name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all 
                    focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Role
                  </label>

                  <Input
                    placeholder="Enter Role"
                    value={formData.testimonial_role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                       testimonial_role: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all 
                    focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Description
                  </label>

                  <Textarea
                    rows={8}
                    placeholder="Enter Testimonial Description"
                    value={formData.testimonial_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        testimonial_description: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all
                     focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />

                </div>

              </div>

            </div>

            {/* ================= Save Button ================= */}

            <div className=" pt-6">

              <Button
                type="submit"
                className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
              >

                <Save className="mr-2 h-4 w-4" />

                {editingId
                  ? "Update Testimonial"
                  : "Save Testimonial"}

              </Button>

            </div>

          </form>

        </CardContent>

      </Card>
            {/* ================= Added Testimonials ================= */}

      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Testimonials
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage testimonials.
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
                    DESCRIPTION
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

                {testimonials.length > 0 ? (

                  currentTestimonials.map((item: any) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">

                        <div className="h-14 w-14 overflow-hidden rounded-full border">

                       <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(
    item.testimonial_photo
  )}`}
  alt={item.testimonial_name}
  className="h-full w-full object-cover"
/>
                        </div>

                      </td>

                      <td className="px-6 py-4 font-medium">
                        {item.testimonial_name}
                      </td>

                      <td className="px-6 py-4">
                        {item.testimonial_role}
                      </td>

                      <td className="max-w-md px-6 py-4">

                        <p className="line-clamp-3 text-sm text-slate-600">

                          {item.testimonial_description}

                        </p>

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-3">

                          <Button
  type="button"
  variant="outline"
  className="border-orange-300 text-orange-600"
  onClick={() => {
    setEditingId(String(item.id));

    setOldPhoto(item.testimonial_photo);

   setPhotoPreview(
  `${API_BASE_URL}/files/${encodeURIComponent(
    item.testimonial_photo
  )}`
);

    setFormData({
      testimonial_name: item.testimonial_name,
      testimonial_role: item.testimonial_role,
      testimonial_description: item.testimonial_description,
      testimonial_photo: null,
    });
setTimeout(() => {
  testimonialsPageRef.current?.scrollIntoView({
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
                            onClick={() =>
                              handleDelete(
                                String(item.id)
                              )
                            }
                          >

                            <Trash2 className="mr-2 h-4 w-4" />

                            Delete

                          </Button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="py-12 text-center text-slate-500"
                    >

                      No Testimonials Found

                    </td>

                  </tr>

                )}

              </tbody>

           
</table>
</div>

{/* Pagination */}
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}/>
</CardContent>
      </Card>

    </div>

  );

};

export default TestimonialsForm;