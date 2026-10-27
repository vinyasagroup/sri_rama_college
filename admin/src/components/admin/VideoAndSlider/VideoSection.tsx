import { useEffect, useRef, useState } from "react";
import {Video, Save, RotateCcw, PencilLine,Trash2,} from "lucide-react";

import {getVideos,saveVideo,updateVideo,deleteVideo,} from "@/services/videoApi";
import { Button } from "@/components/ui/button";
import {Card,CardContent,} from "@/components/ui/card";

export default function VideoSection() {
  const videoPageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    status: "Active",
    video: "",
  });

  const [videos, setVideos] = useState<any[]>([]);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  // ================= GET =================

  const fetchVideos = async () => {

    try {

      const res = await getVideos();

      setVideos(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchVideos();

  }, []);

  // ================= SAVE / UPDATE =================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!formData.video.trim()) {

      alert("Please enter YouTube link.");

      return;
    }

    try {

      if (editingId) {

        await updateVideo(
          String(editingId),
          {
            status: formData.status,
            video: formData.video,
          }
        );

        alert(
          "YouTube Video Updated Successfully"
        );

      } else {

        await saveVideo({
          status: formData.status,
          video: formData.video,
        });

        alert(
          "YouTube Video Saved Successfully"
        );
      }

      await fetchVideos();

      handleReset();

    } catch (error: any) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  // ================= RESET =================

  const handleReset = () => {

    setEditingId(null);

    setFormData({
      status: "Active",
      video: "",
    });

  };

  // ================= EDIT =================

  const handleEdit = (
    item: any
  ) => {

    setEditingId(item.id);

    setFormData({
      status: item.status,
      video: item.video,
    });

    setTimeout(() => {
  videoPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

  };

  // ================= DELETE =================

  const handleDelete = async (
    id: number
  ) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this YouTube video?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteVideo(
        String(id)
      );

      await fetchVideos();

      alert(
        "YouTube Video Deleted Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Delete Failed"
      );

    }

  };

  return (

   <div ref={videoPageRef}
  className="space-y-8"
>

      {/* ================= HEADER ================= */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">

            <Video className="h-8 w-8 text-orange-600" />

          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">

              Admin Video Management

            </span>

            <h1 className="text-2xl font-bold text-slate-900">

              Video Section

            </h1>

            <p className="mt-1 text-sm text-slate-600">

              Add and manage YouTube videos.

            </p>

          </div>

        </div>

      </div>


      {/* ================= FORM ================= */}

      <Card className="rounded-3xl">

        <CardContent className="p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* YouTube Link */}

            <div>

              <label className="mb-3 block text-sm font-medium">

                YouTube Video Link

              </label>

             <div className="relative">
  <Video
    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
    size={22}
  />

  <input
    type="url"
    value={formData.video}
    onChange={(e) =>
      setFormData({
        ...formData,
        video: e.target.value,
      })
    }
    placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
    className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-gray-400 focus:ring-2 focus:ring-gray-300"  />
</div>

              <p className="mt-2 text-xs text-slate-500">

                Enter a YouTube video URL.

              </p>

            </div>


            {/* Preview */}

            {formData.video && (

              <div>

                <label className="mb-3 block text-sm font-medium">

                  Preview

                </label>

                <div className="overflow-hidden rounded-2xl bg-black">

                  <iframe
                    className="h-[300px] w-full md:h-[400px]"
                    src={formData.video
                      .replace(
                        "watch?v=",
                        "embed/"
                      )
                      .replace(
                        "youtu.be/",
                        "www.youtube.com/embed/"
                      )
                    }
                    title="YouTube Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />

                </div>

              </div>

            )}


            {/* Status */}

            <div>

              <label className="mb-2 block text-sm font-medium">

                Status

              </label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
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
                className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
              >

                <Save className="mr-2 h-4 w-4" />

                {editingId
                  ? "Update Video"
                  : "Save Video"}

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


      {/* ================= TABLE ================= */}

      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">

              YouTube Videos

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              View and manage YouTube videos.

            </p>

          </div>


          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left">
                    YouTube Video
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {videos.length > 0 ? (

                  videos.map(
                    (item: any) => (

                      <tr
                        key={item.id}
                        className="border-b hover:bg-slate-50"
                      >

                        {/* YouTube Preview */}

                        <td className="px-6 py-4">

                          <div className="w-64 overflow-hidden rounded-lg">

                            <iframe
                              className="h-36 w-full"
                              src={item.video
                                .replace(
                                  "watch?v=",
                                  "embed/"
                                )
                                .replace(
                                  "youtu.be/",
                                  "www.youtube.com/embed/"
                                )
                              }
                              title="YouTube Video"
                              allowFullScreen
                            />

                          </div>

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


                        {/* Actions */}

                        <td className="px-6 py-4">

                          <div className="flex gap-3">

                            <Button
                              type="button"
                              variant="outline"
                              className="border-orange-300 text-orange-600"
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
                  )

                ) : (

                  <tr>

                    <td
                      colSpan={3}
                      className="py-10 text-center text-slate-500"
                    >

                      No YouTube Videos Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}