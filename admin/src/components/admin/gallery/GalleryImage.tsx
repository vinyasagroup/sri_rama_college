import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  ImagePlus,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import imageCompression from "browser-image-compression";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/admin/pagination/Pagination";
import {
  getGalleryCategory,
} from "@/services/galleryCategoryApi";

import {
  saveGalleryImage,
  getGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/services/galleryImageApi";

import { API_BASE_URL } from "@/config/constants";

const GalleryImage = () => {
  const imageRef =
    useRef<HTMLInputElement | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [oldImage, setOldImage] =
    useState("");

  const [categories, setCategories] =
    useState<any[]>([]);

  const [images, setImages] =
    useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

const imagesPerPage = 10;

const totalPages = Math.ceil(
  images.length / imagesPerPage
);

const startIndex = (currentPage - 1) * imagesPerPage;

const currentImages = images.slice(
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
  const [formData, setFormData] =
    useState({
      title: "",
      category: "",
      description: "",
      image: null as File | null,
    });

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await getGalleryCategory();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Images
  const fetchImages = async () => {
    try {
      const res = await getGalleryImage();
      setImages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  // Handle Image Upload
const handleImageChange = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const img = new Image();

  img.onload = async () => {
    let compressedFile = file;

    // Compress only if larger than 200 KB
    if (file.size > 200 * 1024) {
      try {
        const originalSize = file.size;

        const options = {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        compressedFile = await imageCompression(
          file,
          options
        );

        alert(
          `Gallery image compressed successfully!\n\n` +
          `Original size: ${Math.round(
            originalSize / 1024
          )} KB\n` +
          `Compressed size: ${Math.round(
            compressedFile.size / 1024
          )} KB`
        );
      } catch (error) {
        console.error(
          "Image compression failed:",
          error
        );

        alert("Failed to compress gallery image");
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

    // Store compressed/original file
    setFormData((prev) => ({
      ...prev,
      image: compressedFile,
    }));

    // Show compressed image preview
    setImagePreview(
      URL.createObjectURL(compressedFile)
    );
  };

  img.onerror = () => {
    alert("Unable to read the selected image.");
  };

  img.src = URL.createObjectURL(file);
};
  // Save / Update
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);

      data.append(
        "galleryCategoryName",
        formData.category
      );

      data.append(
        "description",
        formData.description
      );

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      data.append(
        "oldImage",
        oldImage
      );

      if (editingId) {
        await updateGalleryImage(
          String(editingId),
          data
        );

        alert(
          "Gallery Image Updated Successfully"
        );
      } else {
        await saveGalleryImage(data);

        alert(
          "Gallery Image Saved Successfully"
        );
      }

      fetchImages();

      setFormData({
        title: "",
        category: "",
        description: "",
        image: null,
      });

      setImagePreview(null);
      setEditingId(null);
      setOldImage("");

      if (imageRef.current) {
        imageRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
      alert("Failed to save image.");
    }
  };
    return (
    <div className="space-y-8 p-2 sm:p-4">

      {/* Upload Form */}
      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-3">

              {/* Image Upload */}
              <div className="flex flex-col items-center">

                <div
                  onClick={() => imageRef.current?.click()}
                  className="flex h-32 w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50"
                >

                  {imagePreview ? (

                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <ImagePlus className="h-8 w-8 text-slate-400" />

                  )}

                </div>

                <input
                  hidden
                  ref={imageRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <button
  type="button"
  onClick={() => imageRef.current?.click()}
  className="mt-3 flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600"
>
  <ImagePlus size={16} />
  Upload Image
</button>

<div className="mt-3 text-center">
  <p className="text-sm font-semibold text-slate-700">
    Recommended Size : <span className="text-orange-600">300 × 200 px</span>
  </p>

  <p className="mt-1 text-xs text-slate-500">
    Aspect Ratio: <strong>3 : 2</strong> • JPG, PNG, WEBP
  </p>

  <p className="mt-1 text-xs text-slate-400">
    Maximum file size: 200 KB
  </p>
</div>

                <p className="mt-2 text-center text-xs text-slate-400">
                  Images larger than 200KB will be compressed automatically.
                </p>

              </div>

              {/* Form Fields */}
              <div className="col-span-2 space-y-5">

                <Input
                  placeholder="Image Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <select
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"      value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Gallery Category
                  </option>

                  {categories.map((category: any) => (

                    <option
                      key={category.id}
                      value={category.gallery_category_name}
                    >
                      {category.gallery_category_name}
                    </option>

                  ))}

                </select>

                <textarea
                  rows={6}
                  placeholder="Image Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                 className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"        />

              </div>

            </div>

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >

              <Save className="mr-2 h-4 w-4" />

              {editingId
                ? "Update Gallery Image"
                : "Save Gallery Image"}

            </Button>

          </form>

        </CardContent>

      </Card>
            {/* Gallery Images Table */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Gallery Images
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage gallery images.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left font-semibold">
                    IMAGE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    TITLE
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    CATEGORY
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

             {currentImages.map((item: any) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="h-14 w-14 overflow-hidden rounded-lg border">

                      <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(item.image_url)}`}
  alt={item.title}
  className="h-full w-full object-cover"
/>

                      </div>

                    </td>

                    <td className="px-6 py-4 font-medium">
                      {item.title}
                    </td>

                    <td className="px-6 py-4">
                      {item.gallery_category_name}
                    </td>

                    <td className="max-w-md px-6 py-4">
                      {item.description}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex gap-3">

                        {/* Edit */}

                        <Button
                          type="button"
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          onClick={() => {

                            setFormData({
                              title: item.title,
                              category: item.gallery_category_name,
                              description: item.description,
                              image: null,
                            });

                            setEditingId(item.id);

                            setOldImage(item.image_url);

                           setImagePreview(
  `${API_BASE_URL}/files/${encodeURIComponent(item.image_url)}`
);

                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });

                          }}
                        >

                          <PencilLine className="mr-2 h-4 w-4" />

                          Edit

                        </Button>

                        {/* Delete */}

                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={async () => {

                            const confirmDelete =
                              window.confirm(
                                "Are you sure you want to delete this image?"
                              );

                            if (!confirmDelete) return;

                            try {

                              await deleteGalleryImage(
                                String(item.id)
                              );

                              alert(
                                "Gallery Image Deleted Successfully"
                              );

                              fetchImages();

                            } catch (error) {

                              console.log(error);

                              alert(
                                "Failed to delete image."
                              );

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

                {images.length === 0 && (

                  <tr>

                    <td
                      colSpan={5}
                      className="py-10 text-center text-slate-500"
                    >
                      No Gallery Images Found
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

};

export default GalleryImage;