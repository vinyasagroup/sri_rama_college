import  {
  useEffect,
  useState
} from "react";

import { Users } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  getTeam
} from "@/services/compositionTeamApi";

const CompositionTeamList = () => {

  const [teamMembers, setTeamMembers] =
    useState<any[]>([]);

  const fetchTeam = async () => {

    try {

      const res =
        await getTeam();

      setTeamMembers(
        res.data
      );

    } catch(error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTeam();

  }, []);

  return (
    <Card className="overflow-hidden rounded-2xl border border-gray-200 !bg-white !text-gray-900 shadow-sm">

      {/* Title */}
     <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <Users className="h-5 w-5 text-orange-500" />

       <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
          IQAC Composition Team
        </h2>
      </div>

      <CardContent className="bg-white p-0">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px] bg-white">

            <thead>
              <tr className="bg-orange-500 text-white">

                <th className="px-4 py-3 text-left font-semibold">
                  Sl.No
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Name
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Designation
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Role
                </th>

              </tr>
            </thead>

           <tbody className="bg-white">

            {[...teamMembers]
  .sort(
    (a, b) =>
      Number(a.sl_no) -
      Number(b.sl_no)
  )
  .map(
    (
      member:any,
      index:number
    ) => (

                  <tr
                    key={member.id}
                    className={`border-t ${
                      index % 2 === 0
                        ? "bg-white"
                        : "bg-orange-50/30"
                    }`}
                  >

                    <td className="px-4 py-4 font-medium text-slate-900">
                      {member.sl_no}
                    </td>

                    <td className="px-4 py-4 text-slate-800">
                      {member.name}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {member.designation}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {member.role}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </CardContent>

    </Card>
  );
};

export default CompositionTeamList;