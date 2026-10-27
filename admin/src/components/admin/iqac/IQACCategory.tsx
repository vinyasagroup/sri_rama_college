
import { FolderOpen, Save, PencilLine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, {useState,useEffect,useRef,} from "react";

import {
  saveCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "@/services/iqacCategoryApi";
import Pagination from "@/components/admin/pagination/Pagination";
const IQACCategory = () => {
  const iqacCategoryPageRef =
  useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    
  });

  const [
  categories,
  setCategories
] = useState<any[]>([]);

const [currentPage, setCurrentPage] = useState(1);

const categoriesPerPage = 10;

const totalPages = Math.ceil(
  categories.length / categoriesPerPage
);

const startIndex = (currentPage - 1) * categoriesPerPage;

const currentCategories = categories.slice(
  startIndex,
  startIndex + categoriesPerPage
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
//Fetch Function

const fetchCategories =
async () => {

  try {

    const res =
      await getCategories();

    setCategories(
      res.data
    );

  } catch (error) {

    console.log(error);

  }

};

//load

useEffect(() => {

  fetchCategories();

}, []);



const handleSubmit =
async (
e: React.FormEvent
) => {

e.preventDefault();

try {

  if (editingId) {

    await updateCategory(
      editingId,
      formData
    );

    alert(
      "Category Updated"
    );

  } else {

    await saveCategory(
      formData
    );

    alert(
      "Category Saved"
    );

  }

  setFormData({
    categoryName: "",
  });

  setEditingId(null);

  fetchCategories();

} catch (error) {

  console.log(error);

  alert("Save Failed");

}

};


const [editingId,setEditingId] =
useState<string | null>(null);



  return (
    <div
  ref={iqacCategoryPageRef}
  className="space-y-8 p-2 sm:p-4"
>
      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <FolderOpen className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin IQAC Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              IQAC Categories
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add IQAC document categories.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-medium">
                Category Name
              </label>

              <Input
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categoryName: e.target.value,
                  })
                }
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                placeholder="Academic Calendar"
              />
            </div>

           

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Category
            </Button>
          </form>
        </CardContent>
      </Card>


      <Card className="rounded-3xl">
  <CardContent className="p-0">
    <div className="border-b p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Added IQAC Categories
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View and manage saved IQAC categories.
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
              CATEGORY NAME
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              ACTION
            </th>
          </tr>
        </thead>

        <tbody>
         {currentCategories.map((item, index) => (
            <tr
              key={item.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="px-6 py-4">
              {startIndex + index + 1}
              </td>

              <td className="px-6 py-4 font-medium">
                {item.category_name}
              </td>

              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  <Button
  variant="outline"
  className="border-orange-300 text-orange-600 hover:bg-orange-50"
  onClick={() => {

    setFormData({
      categoryName:
      item.category_name
    });

    setEditingId(
      String(item.id)
    );

   setTimeout(() => {
  iqacCategoryPageRef.current?.scrollIntoView({
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
  className="border-red-300 text-red-600 hover:bg-red-50"
  onClick={async () => {

    try {

      await deleteCategory(
        String(item.id)
      );

      alert(
        "Category Deleted"
      );

      fetchCategories();

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
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

export default IQACCategory;