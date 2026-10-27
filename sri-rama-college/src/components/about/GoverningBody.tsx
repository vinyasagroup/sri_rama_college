import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import  { useEffect, useState } from "react";
import {
  getGoverningBody,
} from "@/services/governingBodyApi";

import {
  getFounder
} from "@/services/founderMessageApi";
import { getFaculty } from "@/services/facultyApi";
import { API_BASE_URL } from "@/config/constants";

export default function GoverningBodyPage() {
  const [selectedMember, setSelectedMember] =
    useState<any>(null);

  const [members, setMembers] =
    useState<any[]>([]);

  const [founder, setFounder] =
    useState<any>(null);

  const [faculty, setFaculty] =
    useState<any>(null);

    // ================= PAGINATION =================
const [currentPage, setCurrentPage] = useState(1);
const [isDesktop, setIsDesktop] = useState(
  typeof window !== "undefined" ? window.innerWidth >= 1024 : true
);

// Desktop: 4 columns × 3 rows = 12
// Mobile: 2 columns × 2 rows = 4
const membersPerPage = isDesktop ? 12 : 4;

const totalPages = Math.ceil(
  members.length / membersPerPage
);

const startIndex =
  (currentPage - 1) * membersPerPage;

const currentMembers = members.slice(
  startIndex,
  startIndex + membersPerPage
);

const handlePageChange = (page: number) => {
  setCurrentPage(page);

  setTimeout(() => {
    document.getElementById("governing-body-members")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, 100);
};

//Member fetch
const fetchMembers =
  async () => {

    try {

      const res =
        await getGoverningBody();

      setMembers(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  //founder fetch

  const fetchFounder =
  async () => {

    try {

      const res =
        await getFounder();

      if (
        res.data.length > 0
      ) {

        setFounder(
          res.data[0]
        );

      }

    } catch (error) {

      console.log(error);

    }

  };
  const fetchFaculty = async () => {
  try {
    const res = await getFaculty();

    if (res.data && res.data.length > 0) {
      setFaculty(res.data[0]);
    }
  } catch (error) {
    console.log("Faculty fetch error:", error);
  }
};
useEffect(() => {
  fetchMembers();
  fetchFounder();
  fetchFaculty();
}, []);
useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
  return (
    <div className="min-h-screen px-6 md:px-16 py-12 bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* 🔥 Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
     <div className="mb-8 flex justify-center px-4">
  <div className="w-full max-w-4xl rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 text-center shadow-xl">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
      Governing Body
    </h2>
    <p className="mt-3 mx-auto max-w-3xl text-sm sm:text-base text-orange-100 text-justify leading-relaxed">
      Our Governing Body consists of distinguished members dedicated to providing visionary leadership, promoting academic excellence, and supporting the overall development of the institution.
    </p>

  </div>

</div>
      </motion.div>


      {/* � Founder’s Message */}
  {/* ================= FOUNDER'S MESSAGE ================= */}
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="max-w-6xl mx-auto mt-2 mb-8"
>
  <Card className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-xl">

    {/* Decorative Circle */}
    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/10" />
    <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-orange-200/20 blur-3xl" />

    <CardContent className="pt-2 pb-4 px-4 md:px-5">

      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-6 items-center">

        {/* ================= LEFT : IMAGE ================= */}
        <div className="flex items-center justify-center order-1">

          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl scale-110" />

            <div className="relative h-72 w-72 md:h-80 md:w-80 rounded-full border-[6px] border-orange-500 bg-white p-2 shadow-2xl">

              <img
                src={
                  founder?.photo
                    ? `${API_BASE_URL}/files/${encodeURIComponent(founder.photo)}`
                    : ""
                }
                alt={founder?.name}
                className="h-full w-full rounded-full object-cover object-top"
              />

            </div>

          </div>

        </div>

        {/* ================= RIGHT : CONTENT ================= */}
        <div className="order-2">

          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
            Founder
          </span>

          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-gray-900">
            Founder&apos;s
            <span className="block text-3xl md:text-2xl text-orange-600 italic font-serif leading-none">
  Message
</span>
          </h2>

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 to-orange-300" />

          {founder?.quote && (
  <p className="mt-5 italic text-orange-600 text-justify">
    "{founder.quote}"
  </p>
)}

<p className="mt-5 text-gray-600 leading-7 text-justify whitespace-pre-line">
  {founder?.message}
</p>

<div className="mt-6">
  <h3 className="text-xl font-semibold text-gray-900">
    {founder?.name}
  </h3>

  <p className="text-sm font-medium text-orange-600">
    Founder
  </p>
</div>

        </div>

      </div>

    </CardContent>

  </Card>
</motion.section>

      {/* �🎓 Faculty Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Faculty
        </h2>

        {/* 🖼️ Faculty highlight (bigger + attractive) */}
        <div className="max-w-6xl mx-auto mb-14">

  <Card className="group rounded-3xl overflow-hidden bg-white shadow-2xl border-2 border-orange-200 py-0 gap-0">
    {/* Faculty Image */}

    {/* Faculty Image */}
<div className="relative w-full">

  {faculty?.faculty_photo ? (
    <img
      src={`${API_BASE_URL}/files/${encodeURIComponent(
        faculty.faculty_photo
      )}`}
      alt="Faculty Team"
     className="
  w-full
  h-auto
  object-contain
  md:h-[420px]
  md:object-cover
  transition-transform duration-700
  group-hover:scale-[1.02]
"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.src =
          "https://via.placeholder.com/1200x500?text=Faculty+Image";
      }}
    />
  ) : (
    <div className="flex min-h-[220px] items-center justify-center bg-orange-50">
      <p className="text-orange-500 font-medium">
        Faculty Image Not Available
      </p>
    </div>
  )}

  {/* Label */}
  <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-5">
    <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-orange-700 shadow">
      Faculty Team
    </div>
  </div>

</div>
    {/* Faculty Quote */}

   <CardContent className="p-4 sm:p-6 md:p-8">
  {faculty?.faculty_quote ? (
    <p className="text-sm md:text-base leading-relaxed text-gray-700 text-justify">
      • {faculty.faculty_quote}
    </p>
  ) : (
    <p className="text-sm md:text-base text-gray-500">
      Faculty information is currently unavailable.
    </p>
  )}


    </CardContent>

  </Card>

</div>
        
{/* 👔 Governing Body Cards */}
<div id="governing-body-members"
 className="mt-16 mb-10 text-center scroll-mt-24">
  <h2 className="text-3xl font-bold text-gray-800">
    Governing Body Members
  </h2>
  <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
  Our Governing Body comprises experienced leaders committed to fostering academic excellence, innovation, and the overall growth of the institution.
</p>
</div>
     <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
  {currentMembers.map((member, index) => (
         <motion.div
  key={index}
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.15 }}
  className="h-full"
>
            <div className="group h-full rounded-3xl bg-gradient-to-br from-orange-200/70 via-white to-orange-100/70 p-[1px] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-1">           
                <Card className="relative h-full rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60 shadow-none">
                  <div className="relative h-20 sm:h-24 md:h-28 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                  <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
                  <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

              <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(member.photo)}`}
  alt={member.name}
  className="absolute left-1/2 top-5 sm:top-6 md:top-4
h-20 w-20
sm:h-24 sm:w-24
md:h-34 md:w-34
-transform -translate-x-1/2
rounded-full border-4 border-white object-cover shadow-[0_12px_30px_-12px_rgba(0,0,0,0.55)]"  loading="lazy"
  decoding="async"
  onError={(e) => {
    e.currentTarget.src =
      "https://via.placeholder.com/300x300?text=No+Image";
  }}
/>
                </div>
<CardContent className="pt-2 sm:pt-5 md:pt-8 pb-1 md:pb-4 px-3 md:px-4 text-center">
  <h2 className="mt-0 h-9 sm:h-12 md:h-auto flex items-center justify-center text-xs sm:text-sm md:text-lg font-semibold leading-4 md:leading-6 tracking-tight text-gray-900 line-clamp-2">    {member.name}
  </h2>

  <div className="mt-1 md:mt-2 h-7 flex items-center justify-center">
    <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-[11px] sm:text-xs font-semibold text-orange-700 ring-1 ring-orange-200">
  {member.role}
</span>
  </div>

  <div className="w-12 h-[3px] bg-gradient-to-r from-orange-400 to-orange-600 mx-auto my-4 rounded-full" />

 <div className="min-h-[34px] sm:min-h-[42px] md:min-h-[50px]">
  <p className="text-sm leading-relaxed text-gray-800 text-justify line-clamp-2">
    {member.content}
  </p>
</div>

{member.content && (
  <button
    type="button"
    onClick={() => setSelectedMember(member)}
 className="mt-0.5 md:mt-2 text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700"
  >
    Read More
  </button>
)}

</CardContent>
              </Card>
              
            </div>
          </motion.div>
        ))}
      </div>
      {/* ================= PAGINATION ================= */}
{totalPages > 1 && (
  <div className="flex flex-col items-center justify-center gap-4 mt-10 mb-6">

    {/* Page information */}
    <p className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-semibold text-gray-700">
        {startIndex + 1}
      </span>
      {" - "}
      <span className="font-semibold text-gray-700">
        {Math.min(
          startIndex + membersPerPage,
          members.length
        )}
      </span>
      {" of "}
      <span className="font-semibold text-gray-700">
        {members.length}
      </span>
      {" members"}
    </p>

    {/* Pagination buttons */}
    <div className="flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
       onClick={() => {
  const newPage = Math.max(currentPage - 1, 1);
  handlePageChange(newPage);
}}
        disabled={currentPage === 1}
        className="
          rounded-xl
          border border-orange-200
          bg-white
          px-3 py-2
          text-sm font-medium
          text-orange-600
          shadow-sm
          transition
          hover:bg-orange-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            className={`
              h-9 w-9 rounded-xl text-sm font-semibold transition
              ${
                currentPage === page
                  ? "bg-orange-500 text-white shadow-md"
                  : "border border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
       onClick={() => {
  const newPage = Math.min(currentPage + 1, totalPages);
  handlePageChange(newPage);
}}
        disabled={currentPage === totalPages}
        className="
          rounded-xl
          border border-orange-200
          bg-white
          px-3 py-2
          text-sm font-medium
          text-orange-600
          shadow-sm
          transition
          hover:bg-orange-50
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
      </button>

    </div>
  </div>
)}
      </motion.div>

      {/* 🌟 Vision Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-20 text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Vision & Leadership
        </h2>
        <p className="text-gray-600">
          Our governing body ensures continuous innovation, strong academic
          foundations, and a future-ready environment for students to thrive.
        </p>
      </motion.div>
{selectedMember && (
  <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
    <div className="relative bg-white rounded-3xl p-5 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
      <button
        onClick={() => setSelectedMember(null)}
        className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white"
      >
        <X size={20} />
      </button>

    <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(
    selectedMember.photo
  )}`}
  alt={selectedMember.name}
  className="w-full h-[400px] rounded-2xl object-cover"
  onError={(e) => {
    e.currentTarget.src =
      "https://via.placeholder.com/600x400?text=No+Image";
  }}
/>

      <h2 className="text-2xl font-bold text-center mt-4">
        {selectedMember.name}
      </h2>

      <p className="text-center text-orange-500 font-semibold mt-2">
        {selectedMember.role}
      </p>

      <p className="text-gray-600 leading-7 text-justify mt-4">
        {selectedMember.content}
      </p>
    </div>
  </div>
)}
    </div>
  );
}