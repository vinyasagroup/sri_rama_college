import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  Megaphone,
  Save,
  PencilLine,
  Trash2,
} from "lucide-react";

import {
  saveMarquee,
  getMarquee,
  updateMarquee,
  deleteMarquee,
} from "@/services/marqueeApi";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/admin/pagination/Pagination";
const MarqueeSettings = () => {
  const marqueePageRef = useRef<HTMLDivElement>(null);
  const [marqueeText, setMarqueeText] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [marqueeList, setMarqueeList] =
    useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

const marqueePerPage = 10;

const totalPages = Math.ceil(
  marqueeList.length / marqueePerPage
);

const startIndex = (currentPage - 1) * marqueePerPage;

const currentMarquees = marqueeList.slice(
  startIndex,
  startIndex + marqueePerPage
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

  const fetchMarquees = async () => {
    try {
      const res =
        await getMarquee();

      setMarqueeList(
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMarquees();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!marqueeText.trim()) {
      alert(
        "Marquee Text Required"
      );
      return;
    }

    try {
      if (editingId) {
        await updateMarquee(
          String(editingId),
          {
            marqueeText,
          }
        );

        alert(
          "Marquee Updated Successfully"
        );
      } else {
        await saveMarquee({
          marqueeText,
        });

        alert(
          "Marquee Added Successfully"
        );
      }

      fetchMarquees();

      setMarqueeText("");

      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    if (
      window.confirm(
        "Delete Marquee Text?"
      )
    ) {
      try {
        await deleteMarquee(
          String(id)
        );

        fetchMarquees();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
<div
  ref={marqueePageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <Megaphone className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Website Marquee Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Marquee Settings
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Create and manage scrolling announcements.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}
      <Card className="rounded-3xl">
        <CardContent className="p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label className="mb-2 block font-medium">
                Marquee Text
              </label>

              <Input
                placeholder="Admissions Open 2026"
                value={marqueeText}
                onChange={(e) =>
                  setMarqueeText(
                    e.target.value
                  )
                }
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />

              {editingId
                ? "Update Marquee"
                : "Save Marquee"}
            </Button>

          </form>

        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Added Marquee Texts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage marquee announcements.
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
                    MARQUEE TEXT
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    ACTION
                  </th>

                </tr>

              </thead>

              <tbody>

          {currentMarquees.map(
  (
    item,
    index
  ) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                       {startIndex + index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {item.marquee_text}
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <Button
                            type="button"
                            variant="outline"
                            className="border-orange-300 text-orange-600"
                            onClick={() => {

                              setMarqueeText(
                                item.marquee_text
                              );

                              setEditingId(
                                item.id
                              );

                            setTimeout(() => {
  marqueePageRef.current?.scrollIntoView({
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
                                item.id
                              )
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </Button>

                        </div>

                      </td>

                    </tr>
                  )
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

export default MarqueeSettings; 