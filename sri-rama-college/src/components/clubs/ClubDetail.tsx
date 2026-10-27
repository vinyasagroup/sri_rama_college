import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";
import { UserRound, } from "lucide-react";
import {getClubById,
} from "@/services/clubsApi";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE_URL } from "@/config/constants";
const ClubDetail: React.FC = () => {
  console.log("ClubDetail Rendered");

  const { id } = useParams();

  console.log("ID:", id);

const [club, setClub] = useState<any>(null);

const loadClub = async () => {
  try {
    console.log("Calling API...");

    const res = await getClubById(Number(id));

    console.log("API Response:", res.data);

    setClub(res.data);

    console.log("State Updated");
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  if (id) {
    loadClub();
  }
}, [id]);

if (!club) {
  return (
    <div className="p-10 text-center">
      
    </div>
  );
}

return (
 <section className="min-h-screen bg-white">

{/* ================= Main Section ================= */}

<div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-14">

        <div className="space-y-10">

            {/* Club Intro */}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">

  {/* ================= Left Content Card ================= */}
 
   <Card className="lg:col-span-2 overflow-hidden rounded-2xl lg:rounded-3xl border border-gray-200 border-l-4 lg:border-l-[6px] border-l-orange-600 bg-white text-gray-900 shadow-sm">  
      <CardContent className="p-5 sm:p-6 lg:p-8">

     <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start text-center sm:text-left">
        {/* Icon */}
<div>

  <Badge className="mb-4 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs sm:text-sm">
    {club?.club?.club_category || "No Category"}
  </Badge>

 <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl break-words">
    {club.club.club_name}
  </h2>

  <p className="mt-5 text-sm sm:text-base leading-7 text-gray-700 text-justify">
    {club.club.club_short_description}
  </p>

</div>
</div>

    </CardContent>
  </Card>

{/* ================= Right Image Card ================= */}
<div className="relative h-[300px] w-full overflow-hidden">
  <img
    src={
      club?.club?.club_image
        ? `${API_BASE_URL}/files/${encodeURIComponent(
            club.club.club_image
          )}`
        : "https://placehold.co/800x600?text=Club"
    }
    alt={club?.club?.club_name || "Club"}
    className="h-full w-full object-cover"
    onError={(e) => {
      e.currentTarget.src =
        "https://placehold.co/800x600?text=Club";
    }}
  />
</div>

</div>
                        {/* ================= About ================= */}

           <Card className="rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm">
              <CardHeader>
               <CardTitle className="text-2xl sm:text-3xl font-bold text-slate-900">
                 Over View
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">

  {club?.overview?.map((item: any) => (

    <p
      key={item.id}
      className="text-sm sm:text-base leading-7 text-gray-700 text-justify"
    >

      {item.overview_content}

    </p>

  ))}

</CardContent>
            </Card>

                        {/* ================= Faculty Coordinator ================= */}
<Card className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm">
  <CardHeader className="px-5 py-3">
  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-slate-900">
    <UserRound className="h-7 w-7 text-orange-500" />
    Faculty Coordinator
  </CardTitle>
</CardHeader>

  <CardContent className="p-0">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-orange-500 text-white">
          <tr>
            <th className="px-3 py-3 text-sm sm:px-6 sm:py-4 text-left font-semibold">Sl.No</th>
            <th className="px-3 py-3 text-sm sm:px-6 sm:py-4 text-left font-semibold">Name</th>
            <th className="px-3 py-3 text-sm sm:px-6 sm:py-4 text-left font-semibold">Designation</th>
             </tr>
        </thead>

        <tbody>
{club?.coordinators?.map((item: any, index: number) => (

      <tr
        key={item.id}
        className="border-b hover:bg-orange-50"
      >

        <td className="px-6 py-5">

          {index + 1}

        </td>

        <td className="px-6 py-5 font-semibold">

          {item.club_faculty_name}

        </td>

        <td className="px-6 py-5">

          {item.club_faculty_designation}

        </td>

      </tr>

    )
  )}

</tbody>
      </table>
    </div>
  </CardContent>
</Card>
          </div>
        </div>

     

    </section>
  );
};

export default ClubDetail;