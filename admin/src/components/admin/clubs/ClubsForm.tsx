import React, {useEffect,useRef,useState,} from "react";
import {
  getClubs,
  getClubById,
  saveClub,
  updateClub,
  deleteClub,
} from "@/services/clubsApi";
import { getClubsCategory } from "@/services/clubsCategoryApi";
import {
  Users,
  Plus,
  Trash2,
  Save,
  PencilLine,
} from "lucide-react";
import { API_BASE_URL } from "@/config/constants";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from "browser-image-compression";
import Pagination from "@/components/admin/pagination/Pagination";
const ClubsForm = () => {
  const clubsPageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    clubName: "",
    category: "",
    shortDescription: "",
    image: null as File | null,
  });
const [clubCategories, setClubCategories] = useState<any[]>([]);

  const [clubs, setClubs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

const clubsPerPage = 10;

const totalPages = Math.ceil(clubs.length / clubsPerPage);

const startIndex = (currentPage - 1) * clubsPerPage;

const currentClubs = clubs.slice(
  startIndex,
  startIndex + clubsPerPage
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
const [editingId, setEditingId] = useState<number | null>(null);
const [oldImage, setOldImage] = useState("");

  // ================= Overview =================

  const [overview, setOverview] = useState([
    {
      paragraph: "",
    },
  ]);

  // ================= Faculty =================

  const [coordinators, setCoordinators] = useState([
    {
      name: "",
      designation: "",
    },
  ]);

  // ================= Overview Functions =================

  const addOverview = () => {
    setOverview([
      ...overview,
      {
        paragraph: "",
      },
    ]);
  };

  // const removeOverview = (index: number) => {
  //   setOverview(
  //     overview.filter((_, i) => i !== index)
  //   );
  // };

  const handleOverviewChange = (
    index: number,
    value: string
  ) => {
    const updated = [...overview];

    updated[index].paragraph = value;

    setOverview(updated);
  };

  // ================= Coordinator Functions =================

  const addCoordinator = () => {
    setCoordinators([
      ...coordinators,
      {
        name: "",
        designation: "",
      },
    ]);
  };

  // const removeCoordinator = (index: number) => {
  //   setCoordinators(
  //     coordinators.filter((_, i) => i !== index)
  //   );
  // };

  const handleCoordinatorChange = (
    index: number,
    field: "name" | "designation",
    value: string
  ) => {
    const updated = [...coordinators];

    updated[index][field] = value;

    setCoordinators(updated);
  };

 useEffect(() => {
  loadClubs();
  loadClubCategories();
}, []);

const loadClubCategories = async () => {
  try {
    const res = await getClubsCategory();
    setClubCategories(res.data);
  } catch (err) {
    console.log(err);
  }
};

const loadClubs = async () => {
  try {
    const res = await getClubs();
    setClubs(res.data);
  } catch (error) {
    console.log(error);
  }
};
const handleImageChange = async (
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
        `Club image compressed successfully!\n\n` +
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

      alert("Failed to compress club image");
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
    image: finalFile,
  }));
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = new FormData();

    data.append("clubName", formData.clubName);

    data.append("clubCategory", formData.category);

    data.append(
      "clubShortDescription",
      formData.shortDescription
    );

    if (formData.image) {
      data.append("clubImage", formData.image);
    }

    data.append(
      "overview",
      JSON.stringify(overview)
    );
    

    data.append(
      "coordinators",
      JSON.stringify(coordinators)
    );

  if (editingId) {
  data.append("oldImage", oldImage);
  await updateClub(editingId, data);
  alert("Club Updated Successfully");
} else {
  await saveClub(data);
  alert("Club Saved Successfully");
}

await loadClubs();


    setEditingId(null);
    setOldImage("");

    setFormData({
      clubName: "",
      category: "",
      shortDescription: "",
      image: null,
    });

    setOverview([
      {
        paragraph: "",
      },
    ]);

    setCoordinators([
      {
        name: "",
        designation: "",
      },
    ]);

  }catch (err: any) {
  console.error(err);

  alert(
    err?.response?.data?.message ||
    "Something went wrong"
  );
}
  
};
const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this club?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteClub(id);

    alert("Club deleted successfully!");

    await loadClubs();
  } catch (error: any) {
    console.error("Delete Club Error:", error);

    alert(
      error?.response?.data?.message ||
      "Failed to delete club"
    );
  }
};
const handleEdit = async (club: any) => {
  try {
    const res = await getClubById(club.id);

    const data = res.data;

    setEditingId(club.id);
    setOldImage(data.club.club_image);

    setFormData({
      clubName: data.club.club_name,
      category: data.club.club_category,
      shortDescription: data.club.club_short_description,
      image: null,
    });

    setOverview(
      data.overview.map((item: any) => ({
        paragraph: item.overview_content,
      }))
    );

    setCoordinators(
      data.coordinators.map((item: any) => ({
        name: item.club_faculty_name,
        designation: item.club_faculty_designation,
      }))
    );

    // Smooth scroll to header/form
    setTimeout(() => {
      clubsPageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);

  } catch (err) {
    console.error(err);
    alert("Unable to load club");
  }
};

    return (
 <div
  ref={clubsPageRef}
  className="space-y-8 p-4"
>
    {/* ================= Header ================= */}

    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">

      <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

      <div className="flex items-center gap-4 p-6">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
          <Users className="h-8 w-8 text-orange-600" />
        </div>

        <div>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
            Clubs Management
          </span>

          <h2 className="mt-2 text-3xl font-bold">
            Clubs
          </h2>

          <p className="text-slate-500">
            Create and manage club information.
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

          {/* Club Name & Category */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Club Name
              </label>

              <Input
                placeholder="Enter Club Name"
                value={formData.clubName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    clubName: e.target.value,
                  })
                }
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

            </div>

            <div>
  <label className="mb-2 block font-medium">
    Club Category
  </label>

  <select
    className="w-full rounded-md border px-3 py-2"
    value={formData.category}
    onChange={(e) =>
      setFormData({
        ...formData,
        category: e.target.value,
      })
    }
  >
    <option value="">
      Select Club Category
    </option>

    {clubCategories.map((item) => (
      <option
        key={item.id}
        value={item.club_category_name}
      >
        {item.club_category_name}
      </option>
    ))}
  </select>
</div>

          </div>

          {/* Short Description */}

          <div>

            <label className="mb-2 block font-medium">
              Short Description
            </label>

            <Textarea
              rows={4}
              placeholder="Enter Short Description"
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shortDescription: e.target.value,
                })
              }
              className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

          </div>

          {/* Image */}

          <div>

  <label className="mb-2 block font-medium">
    Club Image
  </label>

 <Input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>

  {/* Show current image while editing */}
  {oldImage && (
    <img
      src={`${API_BASE_URL}/files/${encodeURIComponent(oldImage)}`}
      alt="Club"
      className="mt-3 h-24 w-24 rounded-lg border object-cover"
    />
  )}

</div>
                    {/* ================= Overview ================= */}

          <div className="rounded-2xl border p-6">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold">
                Overview
              </h3>

              <Button
                type="button"
                onClick={addOverview}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Paragraph
              </Button>

            </div>

            <div className="space-y-5">

              {overview.map((item, index) => (

                <div
                  key={index}
                  className="rounded-xl border p-5"
                >

                  <Textarea
                    rows={5}
                    placeholder={`Paragraph ${index + 1}`}
                    value={item.paragraph}
                    onChange={(e) =>
                      handleOverviewChange(
                        index,
                        e.target.value
                      )
                    }
                    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />

                </div>

              ))}

            </div>

          </div>

          {/* ================= Coordinators ================= */}

          <div className="rounded-2xl border p-6">

            <div className="mb-6 flex items-center justify-between">

              <h3 className="text-xl font-bold">
                Club Faculty Coordinators
              </h3>

              <Button
                type="button"
                onClick={addCoordinator}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Coordinator
              </Button>

            </div>

            {coordinators.map((item, index) => (

              <div
                key={index}
                className="mb-5 grid gap-5 md:grid-cols-2"
              >

                <Input
                  placeholder=" Club Faculty Name"
                  value={item.name}
                  onChange={(e) =>
                    handleCoordinatorChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

                <Input
                  placeholder="Designation"
                  value={item.designation}
                  onChange={(e) =>
                    handleCoordinatorChange(
                      index,
                      "designation",
                      e.target.value
                    )
                  }
                  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />

              </div>

            ))}

          </div>

          {/* Save Button */}

          <div className="flex justify-end pt-0">

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
{editingId ? "Update Club" : "Save Club"}
            </Button>

          </div>

        </form>

      </CardContent>

    </Card>

    {/* ================= Added Clubs ================= */}

    <Card className="rounded-3xl">

      <CardContent className="p-0">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-slate-900">
            Added Clubs
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage all added clubs.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-slate-50">

                <th className="px-6 py-4 text-left">SL.NO</th>
               <th className="px-6 py-4 text-left">IMAGE</th>
             <th className="px-6 py-4 text-left">CLUB NAME</th>
                <th className="px-6 py-4 text-left">CATEGORY</th>
                <th className="px-6 py-4 text-left"> OVERVIEW</th>
                <th className="px-6 py-4 text-left">COORDINATORS</th>
                <th className="px-6 py-4 text-left">ACTION</th>
                
              </tr>

            </thead>

           <tbody>

  {clubs.length > 0 ? (
  currentClubs.map((club, index) => (

      <tr
        key={club.id}
        className="border-b"
      >

        <td className="px-6 py-4">
          {startIndex + index + 1}
        </td>
<td className="px-6 py-4">
  <img
    src={`${API_BASE_URL}/files/${encodeURIComponent(
      club.club_image
    )}`}
    alt={club.club_name}
    className="h-14 w-14 rounded-lg object-cover border"
  />
</td>
        <td className="px-6 py-4">
          {club.club_name}
        </td>

        <td className="px-6 py-4">
          {club.club_category}
        </td>
      <td className="px-6 py-4">
  <div
    className="max-w-[300px] truncate whitespace-nowrap overflow-hidden"
    title={club.overview
      ? club.overview.split("||").join(" • ")
      : ""}
  >
    {club.overview
      ? club.overview.split("||").join(" • ")
      : "-"}
  </div>
</td>
<td className="px-6 py-4">

  {club.coordinators
    ? club.coordinators
        .split("||")
        .map((item: string, index: number) => (
          <p key={index}>
            • {item}
          </p>
        ))
    : "-"}

</td>

        <td className="px-6 py-4">
<div className="flex gap-2">

  <Button
    size="sm"
    variant="outline"
    onClick={() => handleEdit(club)}
  >
    <PencilLine className="h-4 w-4" />
  </Button>

  <Button
    size="sm"
    variant="destructive"
    onClick={() => handleDelete(club.id)}
  >
    <Trash2 className="h-4 w-4" />
  </Button>

</div>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan={7}
        className="py-10 text-center text-slate-500"
      >
        No Clubs Found
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

export default ClubsForm;