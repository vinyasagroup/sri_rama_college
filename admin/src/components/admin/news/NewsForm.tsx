import React, { useState, useEffect,useRef } from "react";
import {
  Newspaper,
  Save,
  Plus,
  Trash2,PencilLine
} from "lucide-react";

import {
  getNews,
  saveNews,
  updateNews,
  deleteNews,
} from "@/services/newsApi";
import { API_BASE_URL } from "@/config/constants";
import {
  getNewsCategory,
} from "@/services/newsCategoryApi";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Pagination from "@/components/admin/pagination/Pagination";
const NewsForm = () => {
  const newsPageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    bannerImage: null as File | null,
    paragraphs: [""],
  });
const [newsList, setNewsList] = useState<any[]>([]);
const [currentPage, setCurrentPage] = useState(1);

const newsPerPage = 10;

const totalPages = Math.ceil(newsList.length / newsPerPage);

const startIndex = (currentPage - 1) * newsPerPage;

const currentNews = newsList.slice(
  startIndex,
  startIndex + newsPerPage
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
const [categories, setCategories] =
  useState<any[]>([]);
const [editingId, setEditingId] =
  useState<number | null>(null);
  // Add new paragraph
  const addParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      paragraphs: [...prev.paragraphs, ""],
    }));
  };
const [oldBanner, setOldBanner] = useState("");
  // Remove paragraph
  const removeParagraph = (index: number) => {
    if (formData.paragraphs.length === 1) return;

    const updated = [...formData.paragraphs];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      paragraphs: updated,
    }));
  };

  // Update paragraph
  const updateParagraph = (
    index: number,
    value: string
  ) => {
    const updated = [...formData.paragraphs];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      paragraphs: updated,
    }));
  };

const fetchCategories = async () => {

  try {

    const res =
      await getNewsCategory();

    setCategories(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};

const fetchNews = async () => {

  try {

    const res =
      await getNews();

    setNewsList(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchCategories();

  fetchNews();

}, []);

const handleBannerImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  let finalFile = file;

  // Compress only if image is larger than 200 KB
  if (file.size > 200 * 1024) {
    try {
      const originalSize = file.size;

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
        `Banner image compressed successfully!\n\n` +
        `Original size: ${Math.round(
          originalSize / 1024
        )} KB\n` +
        `Compressed size: ${Math.round(
          finalFile.size / 1024
        )} KB`
      );
    } catch (error) {
      console.error(
        "Banner image compression failed:",
        error
      );

      alert("Failed to compress banner image");
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

  setFormData((prev) => ({
    ...prev,
    bannerImage: finalFile,
  }));
};

  // Submit
const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  try {

    const data =
      new FormData();

    data.append(
      "title",
      formData.title
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "date",
      formData.date
    );

    data.append(
      "paragraphs",
      JSON.stringify(
        formData.paragraphs
      )
    );

    if (
      formData.bannerImage
    ) {

      data.append(
        "bannerImage",
        formData.bannerImage
      );

    }

    if (editingId) {
data.append("oldBanner", oldBanner);
      await updateNews(
        editingId,
        data
      );

      alert(
        "News Updated Successfully"
      );

    } else {

      await saveNews(
        data
      );

      alert(
        "News Saved Successfully"
      );

    }


    fetchNews();

  } catch (error: any) {

  console.log("Axios Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    "Something went wrong"
  );

}

};
 
// Edit News
const handleEdit = (
  item: any
) => {
setOldBanner(item.banner_image);
  setFormData({

    title:
      item.title,

    category:
      item.category,

    description:
      item.description,

    date:
      item.news_date ??
      item.date,

    bannerImage:
      null,

    paragraphs:
      item.paragraphs,

  });

  setEditingId(
    item.id
  );

setTimeout(() => {
  newsPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

};
const handleDelete = async (
  id: number
) => {

  if (
    window.confirm(
      "Delete this news?"
    )
  ) {

    try {

      await deleteNews(
        id
      );

      fetchNews();

    } catch (error) {

      console.log(error);

    }

  }

};


  return (
   <div ref={newsPageRef}
  className="space-y-8 p-2 sm:p-4"
>

  {/* ================= Header ================= */}
  <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
    <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

    <div className="flex items-start gap-4 p-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
        <Newspaper className="h-8 w-8 text-orange-600" />
      </div>

      <div>
        <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
          News Management
        </span>

        <h1 className="text-2xl font-bold text-slate-900">
          News & Updates
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Create and manage the latest news and announcements.
        </p>
      </div>
    </div>
  </div>

  {/* ================= Form ================= */}
  <Card className="rounded-3xl shadow-sm">
    <CardContent className="p-8">

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* ================= News Information ================= */}

        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* News Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                News Title
              </label>

              <Input
                placeholder="Enter News Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-medium">
                Category
              </label>

           <select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
  className="w-full h-8 rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
>
  <option value="">
    Select Category
  </option>

  {categories.map((item: any) => (
    <option
      key={item.id}
      value={item.news_category_name}
    >
      {item.news_category_name}
    </option>
  ))}
</select>
            </div>

            {/* News Date */}
            <div>
              <label className="mb-2 block font-medium">
                News Date
              </label>

              <Input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"

              />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block font-medium">
                Short Description
              </label>

              <Textarea
                rows={3}
                placeholder="Enter short description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

         {/* Banner Image */}
<div className="md:col-span-2">
  <label className="mb-2 block font-medium">
    Banner Image
  </label>

  <Input
    type="file"
    accept="image/*"
    onChange={handleBannerImage}
    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300
    file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
  />
</div>

          </div>
        </div>
                {/* ================= News Content ================= */}

        <div className="border-t border-slate-200 pt-8">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            News Content
          </h2>

          <div className="space-y-6">
            {formData.paragraphs.map((paragraph, index) => (
              <Card
                key={index}
                className="rounded-2xl border border-slate-200"
              >
                <CardContent className="p-5">

                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      Paragraph {index + 1}
                    </h3>

                    {formData.paragraphs.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeParagraph(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <Textarea
                    rows={6}
                    placeholder={`Enter Paragraph ${index + 1}`}
                    value={paragraph}
                    onChange={(e) =>
                      updateParagraph(index, e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
       
                  />

                </CardContent>
              </Card>
            ))}

            {/* Add Paragraph Button */}
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={addParagraph}
                className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Paragraph
              </Button>
            </div>
          </div>
        </div>
                {/* ================= Action Buttons ================= */}
        <div className="flex justify-end  border-slate-200 pt-6">
          <Button
            type="submit"
            className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
          >
           
            <Save className="mr-2 h-5 w-5" />
            Save News
          </Button>
        </div>

      </form>

    </CardContent>
  </Card>


{/* ================= Added News ================= */}

<Card className="rounded-3xl">
  <CardContent className="p-0">

    <div className="border-b p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Added News
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View and manage all news.
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">

        <thead>
          <tr className="border-b bg-slate-50">

            <th className="px-6 py-4 text-left font-semibold">
              SL.NO
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              NEWS TITLE
            </th>

            <th className="px-6 py-4 text-left font-semibold">
            BANNER
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              CATEGORY
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              DATE
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              PARAGRAPHS
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              ACTION
            </th>

          </tr>
        </thead>

        <tbody>

          {newsList.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-10 text-center text-slate-500"
              >
                No News Available
              </td>
            </tr>
          ) : (

          currentNews.map((item, index) => (

              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-6 py-4">
                 {startIndex + index + 1}
                </td>

                <td className="px-6 py-4 font-medium">
                  {item.title}
                </td>
                <td className="px-6 py-4">
  {item.banner_image ? (
    <img
      src={`${API_BASE_URL}/files/${encodeURIComponent(
        item.banner_image
      )}`}
      alt={item.title}
      className="h-16 w-28 rounded-lg border object-cover"
    />
  ) : (
    <span className="text-slate-400">No Image</span>
  )}
</td>

                <td className="px-6 py-4">
                  {item.category}
                </td>

                <td className="px-6 py-4">
                 {item.news_date}
                </td>

                <td className="px-6 py-4">
                  {item.paragraphs.length}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">

                    <Button
                      type="button"
                      variant="outline"
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                      onClick={() => handleEdit(item)}
                    >
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(item.id)}
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

export default NewsForm;