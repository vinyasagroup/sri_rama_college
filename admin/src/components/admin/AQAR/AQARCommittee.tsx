import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Users,
  Save,
  Trash2,
  PencilLine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  saveAQARCommittee,
  getAQARCommittee,
  updateAQARCommittee,
  deleteAQARCommittee,
} from "@/services/aqarCommitteeApi";
import Pagination from "@/components/admin/pagination/Pagination";
const AQARCommittee = () => {
  const aqarCommitteePageRef =
    useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
  aqarSlNo: "",
  aqarName: "",
  aqarDesignation: "",
  aqarRole: "",
});

const [committeeList, setCommitteeList] =
  useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

const itemsPerPage = 10;

const totalPages = Math.ceil(
  committeeList.length / itemsPerPage
);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentMembers = committeeList.slice(
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


  const fetchCommittee = async () => {

  try {

    const res =
      await getAQARCommittee();

    setCommitteeList(res.data);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchCommittee();

}, []);

 const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
    !formData.aqarSlNo.trim() ||
    !formData.aqarName.trim() ||
    !formData.aqarDesignation.trim() ||
    !formData.aqarRole.trim()
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    if (editingId !== null) {
      await updateAQARCommittee(String(editingId), {
        aqarSlNo: formData.aqarSlNo,
        aqarName: formData.aqarName,
        aqarDesignation: formData.aqarDesignation,
        aqarRole: formData.aqarRole,
      });

      alert("Committee Updated Successfully");
    } else {
      await saveAQARCommittee({
        aqarSlNo: formData.aqarSlNo,
        aqarName: formData.aqarName,
        aqarDesignation: formData.aqarDesignation,
        aqarRole: formData.aqarRole,
      });

      alert("Committee Saved Successfully");
    }

    setFormData({
      aqarSlNo: "",
      aqarName: "",
      aqarDesignation: "",
      aqarRole: "",
    });

    setEditingId(null);

    await fetchCommittee();
setCurrentPage(1);

  } catch (err: any) {
  console.log(err);

  console.log(err.response?.data);

  alert(
    err.response?.data?.message ||
    "Something went wrong"
  );
}
};
  return (
    <div
  ref={aqarCommitteePageRef}
  className="space-y-8 p-2 sm:p-4"
>

      {/* Header */}

      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">

        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <Users className="h-8 w-8 text-orange-600" />
          </div>

          <div>

            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin AQAR Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              AQAR Committee
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add members of the AQAR Committee.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}

      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form onSubmit={handleSubmit}>

            <div className="space-y-4">

              
<div className="grid gap-4 rounded-xl border p-4 md:grid-cols-4">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Sl.No
                    </label>

                 <Input
  value={formData.aqarSlNo}
  onChange={(e)=>
    setFormData({
      ...formData,
      aqarSlNo:e.target.value
    })
  }
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>

                    <Input
  value={formData.aqarName}
  onChange={(e)=>
    setFormData({
      ...formData,
      aqarName:e.target.value
    })
  }
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none
   transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Designation
                    </label>

                    <Input
  value={formData.aqarDesignation}
  onChange={(e)=>
    setFormData({
      ...formData,
      aqarDesignation:e.target.value
    })
  }
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
  focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Role
                    </label>

                  <Input
  value={formData.aqarRole}
  onChange={(e)=>
    setFormData({
      ...formData,
      aqarRole:e.target.value
    })
  }
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 
  focus:outline-none focus:ring-2 focus:ring-gray-300"
/>
                  </div>

                </div>

            </div>

            <div className="mt-6">

              <Button
                type="submit"
                className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
              >
                <Save className="mr-2 h-4 w-4" />

                {editingId !== null
                  ? "Update Committee Member"
                  : "Save Committee"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

      {/* Table */}

      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Added AQAR Committee Members
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b bg-slate-50">

                  <th className="px-6 py-4 text-left">
                    Sl.No
                  </th>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Designation
                  </th>

                  <th className="px-6 py-4 text-left">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

             <tbody>
 {currentMembers.map((member, index) => (
    <tr
      key={member.id}
      className="border-b"
    >
      <td className="px-6 py-4">
       {startIndex + index + 1}
      </td>

      <td className="px-6 py-4">
        {member.aqar_name}
      </td>

      <td className="px-6 py-4">
        {member.aqar_designation}
      </td>

      <td className="px-6 py-4">
        {member.aqar_role}
      </td>

      <td className="px-6 py-4">
        <div className="flex gap-2">

         <Button
  type="button"
  variant="outline"
  className="border-orange-300 text-orange-600"
  onClick={() => {

    setFormData({
      aqarSlNo: member.aqar_sl_no,
      aqarName: member.aqar_name,
      aqarDesignation: member.aqar_designation,
      aqarRole: member.aqar_role,
    });

    setEditingId(member.id);

  setTimeout(() => {
  aqarCommitteePageRef.current?.scrollIntoView({
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
  variant="destructive"
  onClick={async () => {

    if (!window.confirm("Delete Committee Member?"))
      return;

    try {

      await deleteAQARCommittee(
        String(member.id)
      );

  await fetchCommittee();
setCurrentPage(1);

    } catch (err) {

      console.log(err);

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
          <div className="border-t px-6 py-4">
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

export default AQARCommittee;