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
  saveTeam,
  getTeam,
  updateTeam,
  deleteTeam,
} from "@/services/iqacTeamApi";
import Pagination from "@/components/admin/pagination/Pagination";
interface TeamMember {
  slNo: string;
  name: string;
  designation: string;
  role: string;
}

const IQACCompositionTeam = () => {
 const iqacTeamPageRef =
    useRef<HTMLDivElement>(null);
  const [members, setMembers] =
    useState<TeamMember[]>([
      {
        slNo: "",
        name: "",
        designation: "",
        role: "",
      },
    ]);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [teamList, setTeamList] =
    useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(teamList.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentMembers = teamList.slice(
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

  const fetchTeam =
    async () => {

      try {

        const res =
          await getTeam();

        setTeamList(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchTeam();

  }, []);

  const handleChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {

    const updated =
      [...members];

    updated[index][field] =
      value;

    setMembers(updated);

  };


  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        if (
          editingId
        ) {

          await updateTeam(
            editingId,
            members[0]
          );

          alert(
            "Member Updated"
          );

        } else {

          await saveTeam(
            members
          );

          alert(
            "Team Saved"
          );

        }

        await fetchTeam();

        setMembers([
          {
            slNo: "",
            name: "",
            designation: "",
            role: "",
          },
        ]);

        setEditingId(
          null
        );

      } catch (error) {

        console.log(error);

        alert(
          "Save Failed"
        );

      }

    };

  return (
    <div
  ref={iqacTeamPageRef}
  id="iqac-composition-team"
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
              Admin IQAC Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              IQAC Composition Team
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add members of the IQAC composition team.
            </p>

          </div>

        </div>

      </div>

      {/* Form */}
      <Card className="rounded-3xl">

        <CardContent className="p-6">

          <form
            onSubmit={
              handleSubmit
            }
          >

            <div className="space-y-4">

              {members.map(
                (
                  member,
                  index
                ) => (

                  <div
  key={index}
  className="grid gap-4 rounded-xl border p-4 md:grid-cols-4"
>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Sl.No
    </label>

    <Input
      value={member.slNo}
      onChange={(e) =>
        handleChange(
          index,
          "slNo",
          e.target.value
        )
      }
      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400
       focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Name
    </label>

    <Input
      value={member.name}
      onChange={(e) =>
        handleChange(
          index,
          "name",
          e.target.value
        )
      }
      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none 
      focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Designation
    </label>

    <Input
      value={member.designation}
      onChange={(e) =>
        handleChange(
          index,
          "designation",
          e.target.value
        )
      }
      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400
       focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Role
    </label>

    <Input
      value={member.role}
      onChange={(e) =>
        handleChange(
          index,
          "role",
          e.target.value
        )
      }
      className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400
       focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

</div>

                )
              )}

            </div>

            <div className="mt-6 flex gap-3">

        

              <Button
                type="submit"
                className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
              >
                <Save className="mr-2 h-4 w-4" />

                {editingId
                  ? "Update Member"
                  : "Save Team"}
              </Button>

            </div>

          </form>

        </CardContent>

      </Card>

      {/* Stored Members */}
      <Card className="rounded-3xl">

        <CardContent className="p-0">

          <div className="border-b p-6">

            <h2 className="text-2xl font-bold">
              Added Team Members
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

             {currentMembers.map(
  (member: any, index: number) => (

                    <tr
                      key={
                        member.id
                      }
                      className="border-b"
                    >

                    <td className="px-6 py-4">
  {startIndex + index + 1}
</td>

                      <td className="px-6 py-4">
                        {
                          member.name
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          member.designation
                        }
                      </td>

                      <td className="px-6 py-4">
                        {
                          member.role
                        }
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex gap-2">

                          <Button
                            type="button"
                            variant="outline"
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                            onClick={() => {

                              setMembers([
                                {
                                  slNo:
                                    member.sl_no,
                                  name:
                                    member.name,
                                  designation:
                                    member.designation,
                                  role:
                                    member.role,
                                },
                              ]);

                              setEditingId(
                                String(
                                  member.id
                                )
                              );

                            setTimeout(() => {
  iqacTeamPageRef.current?.scrollIntoView({
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

                              if (
                                window.confirm(
                                  "Delete this member?"
                                )
                              ) {

                                await deleteTeam(
                                  String(
                                    member.id
                                  )
                                );

                                await fetchTeam();

                              }

                            }}
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

export default IQACCompositionTeam;