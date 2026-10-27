import { useRef, useState, useEffect } from "react";

import {
  Images,
  Save,
  RotateCcw,
    Trash2,
   PencilLine,
  Image as ImageIcon,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import {
  getSliderImages,
  saveSliderImage,
  updateSliderImage,
  deleteSliderImage,
} from "@/services/sliderApi";
import Pagination from "@/components/admin/pagination/Pagination";
import { API_BASE_URL } from "@/config/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SliderSection() {
  const imageRef = useRef<HTMLInputElement>(null);
  const sliderPageRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    status: "Active",
    image: null as File | null,
  });

  const [preview, setPreview] = useState("");

  const [sliders, setSliders] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

const slidersPerPage = 10;

const totalPages = Math.ceil(sliders.length / slidersPerPage);

const startIndex = (currentPage - 1) * slidersPerPage;

const currentSliders = sliders.slice(
  startIndex,
  startIndex + slidersPerPage
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

  const [oldImage, setOldImage] =
    useState("");

  // ================= FETCH =================

  const fetchSliders = async () => {

    try {

      const res =
        await getSliderImages();

      setSliders(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchSliders();

  }, []);

  // ================= IMAGE =================

const handleImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // Compress only if image is larger than 200KB
  if (file.size > 200 * 1024) {
    try {
      const originalSize = file.size;

      const options = {
        maxSizeMB: 0.2, // Target around 200KB
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };

      finalFile = await imageCompression(
        file,
        options
      );

      alert(
        `Image compressed successfully!\n\n` +
        `Original size: ${Math.round(
          originalSize / 1024
        )} KB\n` +
        `Compressed size: ${Math.round(
          finalFile.size / 1024
        )} KB`
      );
    } catch (error) {
      console.error(
        "Image compression failed:",
        error
      );

      alert("Failed to compress image");
      return;
    }
  } else {
    alert(
      `Image size is already below 200 KB.\n\n` +
      `Image size: ${Math.round(
        file.size / 1024
      )} KB`
    );
  }

  // Store compressed image
  setFormData({
    ...formData,
    image: finalFile,
  });

  // Show compressed image preview
  setPreview(
    URL.createObjectURL(finalFile)
  );
};

  // ================= SAVE / UPDATE =================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const data =
      new FormData();

    data.append(
      "status",
      formData.status
    );

    if (formData.image) {

      data.append(
        "image",
        formData.image
      );

    }

    if (editingId) {

      data.append(
        "oldImage",
        oldImage
      );

    }

    try {

      if (editingId) {

        await updateSliderImage(
          editingId,
          data
        );

        alert(
          "Slider Updated Successfully"
        );

      } else {

        await saveSliderImage(
          data
        );

        alert(
          "Slider Saved Successfully"
        );

      }

      await fetchSliders();

      setFormData({

        status: "Active",

        image: null,

      });

      setPreview("");

      setEditingId(null);

      setOldImage("");

    } catch (error) {

      console.log(error);

      alert(
        "Operation Failed"
      );

    }

  };
  // ================= EDIT =================

const handleEdit = (
  item: any
) => {

  setFormData({

    status: item.status,

    image: null,

  });

  setEditingId(
    String(item.id)
  );

  setOldImage(
    item.slider_image
  );

  setPreview(
    `${API_BASE_URL}/files/${encodeURIComponent(
      item.slider_image
    )}`
  );

 setTimeout(() => {
  sliderPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

};

// ================= DELETE =================

const handleDelete = async (
  id: number
) => {

  if (
    !window.confirm(
      "Delete this slider?"
    )
  ) {
    return;
  }

  try {

    await deleteSliderImage(
      String(id)
    );

    alert(
      "Slider Deleted Successfully"
    );

    await fetchSliders();

    if (
      editingId === String(id)
    ) {

      handleReset();

    }

  } catch (error) {

    console.log(error);

    alert(
      "Delete Failed"
    );

  }

};

// ================= RESET =================

const handleReset = () => {

  setFormData({

    status: "Active",

    image: null,

  });

  setPreview("");

  setEditingId(null);

  setOldImage("");

  if (imageRef.current) {

    imageRef.current.value = "";

  }

};

  return (
  <div ref={sliderPageRef}
  className="space-y-8"
>

      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <Images className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin Slider Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Slider Section
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Upload and manage homepage slider images.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      {/* ================= FORM ================= */}

<Card className="rounded-3xl">

  <CardContent className="p-8">

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Upload Image */}

      <div>

        <label className="mb-3 block text-sm font-medium">

          Upload Image

        </label>

        <div
          onClick={() => imageRef.current?.click()}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-orange-300 bg-orange-50 p-10 text-center transition hover:bg-orange-100"
        >

          {preview ? (

            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-60 rounded-xl object-cover"
            />

          ) : (

            <>

              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-orange-500" />

              <p className="text-lg font-semibold">

                Click to Upload Image

              </p>

              <p className="text-sm text-slate-500">

                JPG, PNG, JPEG

              </p>

            </>

          )}

        </div>

        <input
          hidden
          ref={imageRef}
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </div>

      {/* Existing Image */}

      {editingId && oldImage && !formData.image && (

        <div>

          <label className="mb-2 block text-sm font-medium">

            Existing Image

          </label>

          <img
            src={`${API_BASE_URL}/files/${encodeURIComponent(
              oldImage
            )}`}
            alt="Slider"
            className="h-28 w-44 rounded-lg border object-cover"
          />

        </div>

      )}

      {/* Status */}

      <div>

        <label className="mb-2 block text-sm font-medium">

          Status

        </label>

        <select
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
          value={formData.status}
          onChange={(e) =>
            setFormData({

              ...formData,

              status: e.target.value,

            })
          }
        >

          <option value="Active">

            Active

          </option>

          <option value="Inactive">

            Inactive

          </option>

        </select>

      </div>

      {/* Buttons */}

      <div className="flex gap-4">

        <Button
          type="submit"
          className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white"
        >

          <Save className="mr-2 h-4 w-4" />

          {editingId

            ? "Update Slider"

            : "Save Slider"}

        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
        >

          <RotateCcw className="mr-2 h-4 w-4" />

          Reset

        </Button>

      </div>

    </form>

  </CardContent>

</Card>

      {/* Table */}
      {/* ================= TABLE ================= */}

<Card className="rounded-3xl">

  <CardContent className="p-0">

    <div className="border-b p-6">

      <h2 className="text-2xl font-bold">
        Slider Images
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View and manage uploaded slider images.
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b bg-slate-50">

            <th className="px-6 py-4 text-left">
              IMAGE
            </th>

            <th className="px-6 py-4 text-left">
              STATUS
            </th>

            <th className="px-6 py-4 text-left">
              ACTION
            </th>

          </tr>

        </thead>

        <tbody>

        {sliders.length > 0 ? (
  currentSliders.map((item: any) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >

                {/* Image */}

                <td className="px-6 py-4">

                  <img
                    src={`${API_BASE_URL}/files/${encodeURIComponent(
                      item.slider_image
                    )}`}
                    alt="Slider"
                    className="h-20 w-36 rounded-lg border object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/600x400?text=No+Image";
                    }}
                  />

                </td>

                {/* Status */}

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>

                {/* Action */}

                <td className="px-6 py-4">

                  <div className="flex gap-3">

                    <Button
                      type="button"
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                      onClick={() =>
                        handleEdit(item)
                      }
                    >

                      <PencilLine className="mr-2 h-4 w-4" />

                      Edit

                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() =>
                        handleDelete(item.id)
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
                colSpan={3}
                className="py-8 text-center text-slate-500"
              >

                No Slider Images Found

              </td>

            </tr>

          )}

        </tbody>

          </table>
    </div>

    {/* Pagination */}
    <div className="border-t border-slate-200 px-6 py-4">
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
}