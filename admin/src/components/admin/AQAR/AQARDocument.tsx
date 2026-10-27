import React, {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  ShieldCheck,
  Save,
  PencilLine,
  Trash2,
  FileText,
} from "lucide-react";

import {
  saveAQAR,
  getAQAR,
  updateAQAR,
  deleteAQAR,
} from "@/services/aqarApi";
import { API_BASE_URL } from "@/config/constants";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/admin/pagination/Pagination";
const AQARDocument = () => {
const aqarPageRef =
  useRef<HTMLDivElement>(null);
  const [formData, setFormData] =
    useState({
      year: "",
      file: null as File | null,
    });

    const [oldDocument, setOldDocument] = useState("");
  const [documents, setDocuments] =
    useState<any[]>([]);

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(documents.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;

const currentDocuments = documents.slice(
  startIndex,
  startIndex + itemsPerPage
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
    useState<number | null>(null);

  const fetchDocuments = async () => {

    try {

      const res =
        await getAQAR();

      setDocuments(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchDocuments();

  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!formData.year) {

      alert("Academic Year Required");

      return;

    }

const data = new FormData();

data.append("aqardocYear", formData.year);
data.append("oldDocument", oldDocument);

if (formData.file) {
  data.append("document", formData.file);
}

    try {

      if (editingId) {

        await updateAQAR(
          String(editingId),
          data
        );

        alert("AQAR Updated");

      } else {

        await saveAQAR(data);

        alert("AQAR Saved");

      }
await fetchDocuments();
setCurrentPage(1);

      setFormData({
        year: "",
        file: null,
      });

      setEditingId(null);
      setOldDocument("");

    } catch (error) {

      console.log(error);

    }

  };

  return (

  <div ref={aqarPageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">

            <ShieldCheck className="h-8 w-8 text-orange-600"/>

          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">

              Admin AQAR Management

            </span>

            <h1 className="text-2xl font-bold text-slate-900">

              AQAR

            </h1>

            <p className="mt-1 text-sm text-slate-600">

              Upload Annual Quality Assurance Report documents.

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

            <div>

              <label className="mb-2 block font-medium">

                Academic Year

              </label>

              <Input
                placeholder="2024-25"
                value={formData.year}
                onChange={(e)=>

                  setFormData({

                    ...formData,

                    year:e.target.value

                  })

                }
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
                focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">

                Upload Document

              </label>

              <Input

                type="file"

                accept=".pdf,.jpg,.jpeg,.png"

                onChange={(e)=>

                  setFormData({

                    ...formData,

                    file:
                      e.target.files?.[0] ||
                      null

                  })

                }
                className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none
                 transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"

              />

            </div>

            <Button
              type="submit"
              className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
            >

              <Save className="mr-2 h-4 w-4"/>

              {editingId
                ? "Update AQAR"
                : "Save AQAR"}

            </Button>

          </form>

        </CardContent>

      </Card>

      {/* Table */}

      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">

              Uploaded AQAR Reports

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              Manage uploaded AQAR documents.

            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left">

                    YEAR

                  </th>

                <th className="px-6 py-4 text-left">
                 DOCUMENT
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

                {currentDocuments.map((item: any) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="px-6 py-4">

                      {item.aqardoc_year}

                    </td>

                    <td className="px-6 py-4">

                      <a
  href={`${API_BASE_URL}/files/${encodeURIComponent(item.aqardoc_url)}`}
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center gap-2 text-orange-600 hover:underline"
>
  <FileText className="h-4 w-4" />
  View Document
</a>

                    </td>

 {/* STATUS */}
                    <td className="px-6 py-4">
  <button
    type="button"
    role="switch"
    aria-checked={item.status === "Active"}
    onClick={async () => {
      try {
        const data = new FormData();

        data.append(
          "aqardocYear",
          item.aqardoc_year
        );

        data.append(
          "oldDocument",
          item.aqardoc_url
        );

        data.append(
          "status",
          item.status === "Active"
            ? "Inactive"
            : "Active"
        );

        await updateAQAR(
          String(item.id),
          data
        );

        await fetchDocuments();
      } catch (error) {
        console.log(error);
        alert("Status update failed");
      }
    }}
    className={`
      relative h-[22px] w-[42px]
      rounded-full p-[2px]
      transition-all duration-300
      focus:outline-none
      ${
        item.status === "Active"
          ? "bg-gradient-to-b from-orange-400 to-red-500"
          : "bg-gray-300"
      }
    `}
  >
    <span
      className={`
        block h-[18px] w-[18px]
        rounded-full bg-white
        shadow-[0_1px_3px_rgba(0,0,0,0.3)]
        transition-transform duration-300
        ${
          item.status === "Active"
            ? "translate-x-[20px]"
            : "translate-x-0"
        }
      `}
    />
  </button>
</td>

                    <td className="px-6 py-4">

                      <div className="flex gap-3">

                        <Button
                          type="button"
                          variant="outline"
                          className="border-orange-300 text-orange-600"
                          onClick={() => {

  setFormData({
    year: item.aqardoc_year,
    file: null,
  });

  setOldDocument(item.aqardoc_url);

  setEditingId(item.id);

setTimeout(() => {
  aqarPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

}}
                        >

                          <PencilLine className="mr-2 h-4 w-4"/>

                          Edit

                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          className="border-red-300 text-red-600"
                          onClick={async()=>{

                            if(

                              window.confirm(
                                "Delete AQAR?"
                              )

                            ){

                              await deleteAQAR(
                                String(item.id)
                              );

                             await fetchDocuments();
                              setCurrentPage(1);
                            }

                          }}
                        >

                          <Trash2 className="mr-2 h-4 w-4"/>

                          Delete

                        </Button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

                   </div>

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

export default AQARDocument;