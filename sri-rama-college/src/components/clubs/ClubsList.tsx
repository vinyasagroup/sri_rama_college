import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,

} from "lucide-react";

import { getClubs } from "@/services/clubsApi";
import { getClubsCategory } from "@/services/clubsCategoryApi";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { API_BASE_URL } from "@/config/constants";
interface ClubCategory {
  id: number;
  club_category_name: string;
}

interface Club {
  id: number;
  club_name: string;
  club_category: string;
  club_short_description: string;
  club_image: string;
}

const ClubsList: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<ClubCategory[]>([]);

  const [clubs, setClubs] =
    useState<Club[]>([]);

  // Selected category
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");
const [currentPage, setCurrentPage] = useState(1);

const [isDesktop, setIsDesktop] = useState(
  typeof window !== "undefined"
    ? window.innerWidth >= 1024
    : true
);

const clubsPerPage = isDesktop ? 10 : 4;
  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // LOAD CLUBS + CATEGORIES
  // =====================================================

  const loadClubs = async () => {
    try {
      const [clubsRes, categoryRes] =
        await Promise.all([
          getClubs(),
          getClubsCategory(),
        ]);

      setClubs(clubsRes.data);
      setCategories(categoryRes.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClubs();
  }, []);

  // =====================================================
  // FILTER CLUBS
  // =====================================================

  const filteredClubs =
    selectedCategory === "All"
      ? clubs
      : clubs.filter(
          (club) =>
            club.club_category ===
            selectedCategory
        );
// Pagination
const totalPages = Math.ceil(
  filteredClubs.length / clubsPerPage
);

const startIndex = (currentPage - 1) * clubsPerPage;

const currentClubs = filteredClubs.slice(
  startIndex,
  startIndex + clubsPerPage
);

const handlePageChange = (page: number) => {
  setCurrentPage(page);

  setTimeout(() => {
    document.getElementById("clubs-list")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, 100);
};

// Detect desktop and mobile screen sizes
useEffect(() => {
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

// Reset pagination when category or screen size changes
useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory, isDesktop]);

// Keep page number valid when clubs change
useEffect(() => {
  if (currentPage > Math.max(1, totalPages)) {
    setCurrentPage(Math.max(1, totalPages));
  }
}, [currentPage, totalPages]);
  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="py-16">
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-gray-500">
            Loading clubs...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-8">

      <div className="mx-auto max-w-7xl px-4">

        {/* ================================================= */}
        {/* HEADING */}
        {/* ================================================= */}

        <div className="mb-2 text-center">

          <h2 className="text-4xl font-extrabold text-orange-600">
            Clubs List
          </h2>

          <p className="mt-3 text-gray-600">
            Explore the clubs available in our college.
          </p>

        </div>


        {/* ================================================= */}
        {/* CLUB CATEGORY TABS */}
        {/* ================================================= */}

        <div className="sticky top-0 z-40 mb-2 border-b bg-white">

          <div className="overflow-x-auto">

            <div className="flex min-w-max items-center justify-center gap-2 px-3 py-2">

              {/* ALL CLUBS */}
<button
  type="button"
  onClick={() => setSelectedCategory("All")}
  className={`
    my-2
    flex
    items-center
    gap-2
    rounded-full
    border
    px-5
    py-2.5
    text-sm
    font-medium
    whitespace-nowrap
    transition-all
    duration-300
    ${
      selectedCategory === "All"
        ? "border-orange-500 bg-orange-500 text-white"
        : "border-orange-200 bg-orange-50 text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
    }
  `}
>
  <span>All Clubs</span>
</button>


              {/* CATEGORIES */}

              {categories.map((category) => (

                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      category.club_category_name
                    )
                  }
                  className={`
                    my-3 rounded-full
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    whitespace-nowrap
                    transition-all
                    duration-300
                    ${
                      selectedCategory ===
                      category.club_category_name
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-orange-200 bg-orange-50 text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                    }
                  `}
                >
                  <span>
                    {category.club_category_name}
                  </span>

                </button>

              ))}

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SELECTED CATEGORY TITLE */}
        {/* ================================================= */}

        <div className="mb-6">

          <h3 className="text-2xl font-bold text-slate-900">

            {selectedCategory === "All"
              ? "All Clubs"
              : selectedCategory}

          </h3>

          <div className="mt-2 h-[2px] w-full bg-orange-500" />

        </div>


        {/* ================================================= */}
        {/* NO CLUBS */}
        {/* ================================================= */}

      {filteredClubs.length === 0 ? (
  <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
    <p className="text-slate-500">
      No clubs available in this category.
    </p>
  </div>
) : (
  <div
    id="clubs-list"
    className="grid scroll-mt-24 grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    {currentClubs.map((club) => (

              <Card
                key={club.id}
                className="
                  flex
                  h-full
                  flex-col
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-black
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                {/* ================================================= */}
                {/* IMAGE */}
                {/* ================================================= */}

                <div className="h-40 w-full overflow-hidden">

                  <img
                    src={`${API_BASE_URL}/files/${encodeURIComponent(
                      club.club_image
                    )}`}
                    alt={club.club_name}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      hover:scale-105
                    "
                    loading="lazy"
                  />

                </div>


                {/* ================================================= */}
                {/* CONTENT */}
                {/* ================================================= */}

                <CardContent className="flex flex-1 flex-col p-3 sm:p-4">

                  {/* Category */}

                  <Badge
                    className="
                      mb-2
                      w-fit
                      bg-orange-100
                      text-orange-700
                      hover:bg-orange-100
                    "
                  >
                    {club.club_category}
                  </Badge>


                  {/* Club Name */}

                  <h3 className="line-clamp-2 text-sm font-bold sm:text-base">
                    {club.club_name}
                  </h3>


                  {/* Description */}

                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-600 sm:text-sm">
                    {club.club_short_description}
                  </p>


                  {/* Button */}

                  <Button
                    size="sm"
                    className="
                      mt-auto
                      h-8
                      w-full
                      bg-orange-500
                      text-[11px]
                      text-white
                      hover:bg-orange-600
                      sm:text-xs
                    "
                    onClick={() =>
                      navigate(
                        `/clubs/${club.id}`
                      )
                    }
                  >
                    View Details

                    <ArrowRight className="ml-1 h-3 w-3" />

                  </Button>

                </CardContent>

              </Card>

            ))}

          </div>

        )}

      </div>
      
{/* Pagination */}
{totalPages > 1 && (
  <div className="mt-10 mb-6 flex flex-col items-center justify-center gap-4">
    {/* Results count */}
    <p className="text-sm text-gray-500">
      Showing{" "}
      <span className="font-semibold text-gray-700">
        {startIndex + 1}
      </span>
      {" - "}
      <span className="font-semibold text-gray-700">
        {Math.min(startIndex + clubsPerPage, filteredClubs.length)}
      </span>
      {" of "}
      <span className="font-semibold text-gray-700">
        {filteredClubs.length}
      </span>{" "}
      clubs
    </p>

    <div className="flex flex-wrap items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() =>
          handlePageChange(Math.max(currentPage - 1, 1))
        }
        disabled={currentPage === 1}
        className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-9 w-9 rounded-xl text-sm font-semibold transition ${
              currentPage === page
                ? "bg-orange-500 text-white shadow-md"
                : "border border-orange-200 bg-white text-orange-600 hover:bg-orange-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() =>
          handlePageChange(
            Math.min(currentPage + 1, totalPages)
          )
        }
        disabled={currentPage === totalPages}
        className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-sm transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  </div>
)}


    </section>
  );
};

export default ClubsList;