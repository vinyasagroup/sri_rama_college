import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getCarousel,
  getCarouselById,
  saveCarousel,
  updateCarousel,
  deleteCarousel,
} from "@/services/carouselApi";
import {
  Images,
  Upload,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import { API_BASE_URL } from "@/config/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/admin/pagination/Pagination";
const CarouselSettings = () => {

 const fileRef =
  useRef<HTMLInputElement | null>(null);

const carouselPageRef =
  useRef<HTMLDivElement>(null);
  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

 const [editingId, setEditingId] =
  useState<number | null>(null);

const [carouselData, setCarouselData] =
  useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

const imagesPerPage = 10;

const totalPages = Math.ceil(
  carouselData.length / imagesPerPage
);

const startIndex = (currentPage - 1) * imagesPerPage;

const currentCarouselData = carouselData.slice(
  startIndex,
  startIndex + imagesPerPage
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
const [oldImage, setOldImage] = useState("");
  const handleImageChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const img = new Image();

  img.onload = () => {
    console.log("Width:", img.width);
    console.log("Height:", img.height);

    const requiredRatio = 1920 / 650;
const uploadedRatio = img.width / img.height;

if (Math.abs(uploadedRatio - requiredRatio) > 0.02) {
  alert(
    `Invalid banner ratio.\nCurrent: ${img.width} × ${img.height}\nPlease upload a banner with a 1920:650 aspect ratio.`
  );
  return;
}

if (img.width < 1920 || img.height < 650) {
  alert("Image should be at least 1920 × 650 pixels.");
  return;
}

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  img.src = URL.createObjectURL(file);
};

 const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  if (!imageFile && !editingId) {
    alert("Please Select Image");
    return;
  }

  try {

    const data = new FormData();

    if (imageFile) {
      data.append(
        "carouselImage",
        imageFile
      );
    }
if (editingId) {
  data.append("oldImage", oldImage);

  await updateCarousel(editingId, data);

  alert("Carousel Updated Successfully");
} else {
  await saveCarousel(data);

  alert("Carousel Saved Successfully");
}

loadCarousel();

    setEditingId(null);
    setImagePreview(null);
    setImageFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    loadCarousel();

  } catch (err: any) {

    console.log(err);

    alert(
      err?.response?.data?.message ||
      "Something went wrong"
    );

  }

};
useEffect(() => {
  loadCarousel();
}, []);

const loadCarousel = async () => {
  try {

    const res = await getCarousel();

    setCarouselData(res.data);

  } catch (err) {

    console.log(err);

    alert("Unable to load carousel images.");

  }
};

  return (

    <div
  ref={carouselPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* ================= Header ================= */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">

            <Images className="h-8 w-8 text-orange-600" />

          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Website Banner Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Carousel Settings
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Upload homepage carousel images.
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

            <div className="space-y-6">

              {/* ================= Image Upload ================= */}

              <div>

                <label className="mb-3 block font-medium">
                  Carousel Image
                </label>

                <div
                  onClick={() =>
                    fileRef.current?.click()
                  }
                 className="flex aspect-[32/9] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-orange-400">

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt=""
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="text-center">

                      <Images className="mx-auto mb-4 h-14 w-14 text-slate-400" />

                      <p className="font-semibold text-slate-700">
                        Click to Upload Carousel Image
                      </p>

                     <p className="mt-2 text-sm text-slate-500">
  Recommended Size :
  <span className="font-semibold text-orange-600">
    {" "}
    1920 × 540 px
  </span>
</p>

<p className="mt-1 text-xs text-slate-400">
  Aspect Ratio: 32 : 9 • JPG, PNG, WEBP
</p>

                    </div>

                  )}

                </div>

                <input
                  hidden
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() =>
                    fileRef.current?.click()
                  }
                >

                  <Upload className="mr-2 h-4 w-4" />

                  Upload Carousel Image

                </Button>

              </div>

            </div>

            {/* ================= Save Button ================= */}

            <div className="pt-4">

              <Button
  type="submit"
  className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
>
  <Save className="mr-2 h-4 w-4" />

  {editingId
    ? "Update Carousel Image"
    : "Save Carousel Image"}
</Button>

            </div>
            

          </form>

        </CardContent>

      </Card>
      {/* ================= Added Carousel Images ================= */}

<Card className="rounded-3xl">

  <CardContent className="p-0">

    <div className="border-b p-6">

      <h2 className="text-2xl font-bold text-slate-900">
        Added Carousel Images
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View and manage carousel images.
      </p>

    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b bg-slate-50">

            <th className="px-6 py-4 text-left font-semibold">
              IMAGE
            </th>

            

            <th className="px-6 py-4 text-left font-semibold">
              ACTION
            </th>

          </tr>

        </thead>

        <tbody>

          {carouselData.length === 0 ? (

            <tr>

              <td
                colSpan={4}
                className="py-10 text-center text-slate-500"
              >
                No Carousel Images Found
              </td>

            </tr>

          ) : (

       currentCarouselData.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-4">
<img
  src={`${API_BASE_URL}/files/${encodeURIComponent(
    item.carousel_image
  )}`}
  alt=""
  className="h-[70px] w-[250px] rounded-lg border object-cover"
/>

                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-2">

                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-600"
                      onClick={async () => {
  try {
    const res = await getCarouselById(item.id);

    setEditingId(res.data.id);

setOldImage(res.data.carousel_image);

setImagePreview(
  `${API_BASE_URL}/files/${encodeURIComponent(
    res.data.carousel_image
  )}`
);

setImageFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }

   setTimeout(() => {
  carouselPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

  } catch (err) {
    console.log(err);
    alert("Unable to load carousel image.");
  }
}}
                    >

                      <PencilLine className="mr-2 h-4 w-4" />

                      Edit

                    </Button>

                    <Button
                      variant="outline"
                      className="border-red-300 text-red-600"
                    onClick={async () => {
  if (!window.confirm("Delete Carousel Image?")) return;

  try {

    await deleteCarousel(item.id);

    alert("Deleted Successfully");

    loadCarousel();

  } catch (err) {

    console.log(err);

    alert("Delete Failed");

  }
}}
                    >

                      <Trash2 className="mr-2 h-4 w-4" />

                      Delete

                    </Button>

                  </div>

                </td>

              </tr>

            ))

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

};

export default CarouselSettings;