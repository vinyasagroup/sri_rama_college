import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "@/config/constants";

interface Testimonial {
  id: number;
  testimonial_name: string;
  testimonial_role: string;
  testimonial_description: string;
  testimonial_photo: string;
}

const LeadershipSection = () => {
  const [leaders, setLeaders] = useState<Testimonial[]>([]);
  const [selectedLeader, setSelectedLeader] =
    useState<Testimonial | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // =========================
  // FETCH TESTIMONIALS
  // =========================
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        API_BASE_URL + "/api/testimonials"
      );

      setLeaders(res.data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // =========================
  // NEXT SLIDE
  // =========================
  const nextSlide = () => {
    if (leaders.length === 0) return;

    setCurrentIndex((prev) =>
      (prev + 1) % leaders.length
    );
  };

  // =========================
  // PREVIOUS SLIDE
  // =========================
  const prevSlide = () => {
    if (leaders.length === 0) return;

    setCurrentIndex((prev) =>
      (prev - 1 + leaders.length) % leaders.length
    );
  };

  // =========================
  // AUTO SLIDE
  // =========================
  useEffect(() => {
    if (leaders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) % leaders.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [leaders.length]);

  // =========================
  // GET CARD POSITION
  // =========================
  const getCardPosition = (index: number) => {
    if (leaders.length === 1) {
      return "center";
    }

    const prevIndex =
      (currentIndex - 1 + leaders.length) %
      leaders.length;

    const nextIndex =
      (currentIndex + 1) %
      leaders.length;

    if (index === currentIndex) {
      return "center";
    }

    if (index === prevIndex) {
      return "left";
    }

    if (index === nextIndex) {
      return "right";
    }

    return "hidden";
  };

  return (
  <section className="relative overflow-hidden bg-white pt-6 pb-0 sm:pt-8 sm:pb-0">

      {/* =========================================
          BACKGROUND DECORATIONS
      ========================================= */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-orange-400/20 blur-[150px]" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-300/25 blur-[170px]" />

        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/30 blur-[170px]" />

        <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-r from-orange-300/20 via-orange-100/10 to-orange-300/20" />

        <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-r from-orange-200/20 via-transparent to-orange-200/20" />

      </div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}
      <div className="relative mx-auto max-w-7xl px-4">

        {/* =========================================
            HEADING
        ========================================= */}
       <div className="mb-6 text-center">

          <h2 className="relative inline-block text-3xl font-extrabold text-orange-600 sm:text-4xl">

            Testimonials

            <span className="absolute left-1/2 top-full mt-3 h-[2px] w-20 -translate-x-1/2 rounded-full bg-orange-500" />

          </h2>

        <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Meet the visionary leaders whose dedication and
            guidance shape the future of our institution.
          </p>

        </div>


        {/* =========================================
            SLIDER
        ========================================= */}
        {leaders.length > 0 && (
          <div className="relative">

            {/* =========================
                SLIDER AREA
            ========================= */}
           <div
  className="
    relative
    mx-auto
    flex
    h-[500px]
    w-full
    max-w-6xl
    items-center
    justify-center
    overflow-hidden
    sm:h-[520px]
  "
>

              {leaders.map((leader, index) => {

                const position = getCardPosition(index);

                return (
                  <div
                    key={leader.id}
                    className={`
                      absolute
                      w-[280px]
                      sm:w-[350px]
                      lg:w-[400px]

                      rounded-[28px]
                      border-2
                      border-orange-400
                      bg-white

                      px-5
                      pb-6
                      pt-24

                      shadow-xl

                      transition-all
                      duration-700
                      ease-in-out

                      ${
                        position === "center"
                          ? `
                            z-30
                            translate-x-0
                            scale-100
                            opacity-100
                            shadow-2xl
                          `
                          : position === "left"
                          ? `
                            z-20
                            -translate-x-[260px]
                            scale-[0.78]
                            opacity-60
                            sm:-translate-x-[340px]
                            lg:-translate-x-[390px]
                          `
                          : position === "right"
                          ? `
                            z-20
                            translate-x-[260px]
                            scale-[0.78]
                            opacity-60
                            sm:translate-x-[340px]
                            lg:translate-x-[390px]
                          `
                          : `
                            z-0
                            translate-x-0
                            scale-50
                            opacity-0
                            pointer-events-none
                          `
                      }
                    `}
                  >

                    {/* =========================
                        IMAGE
                    ========================= */}
                    <div
                      className="
                        absolute
                        left-1/2
                        top-0
                        -translate-x-1/2
                        -translate-y-1/2
                        mt-4
                      "
                    >

                      <div
                        className="
                          h-28
                          w-28
                          overflow-hidden
                          rounded-full
                          border-4
                          border-yellow-400
                          bg-white
                          shadow-xl

                          sm:h-32
                          sm:w-32

                          lg:h-36
                          lg:w-36
                        "
                      >

                        <img
                          src={`${API_BASE_URL}/files/${encodeURIComponent(
                            leader.testimonial_photo
                          )}`}
                          alt={leader.testimonial_name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full scale-110 object-cover"
                          onError={(e) => {
                            console.log(
                              "Image failed:",
                              `${API_BASE_URL}/files/${encodeURIComponent(
                                leader.testimonial_photo
                              )}`
                            );

                            e.currentTarget.src =
                              "https://via.placeholder.com/200x200?text=No+Image";
                          }}
                        />

                      </div>

                    </div>


                    {/* =========================
                        NAME
                    ========================= */}
                    <h3
                      className="
                        text-center
                        text-lg
                        font-bold
                        text-gray-800
                        sm:text-xl
                      "
                    >
                      {leader.testimonial_name}
                    </h3>


                    {/* =========================
                        ROLE
                    ========================= */}
                    <p
                      className="
                        mt-1
                        text-center
                        text-sm
                        font-semibold
                        text-orange-500
                        sm:text-base
                      "
                    >
                      {leader.testimonial_role}
                    </p>


                    {/* =========================
                        DESCRIPTION
                    ========================= */}
                    <p
                      className="
                        mt-5
                        text-justify
                        text-sm
                        leading-6
                        text-gray-700
                        sm:text-base
                        sm:leading-7
                      "
                    >
                      {leader.testimonial_description.length > 180
                        ? `${leader.testimonial_description.substring(
                            0,
                            180
                          )}...`
                        : leader.testimonial_description}
                    </p>


                    {/* =========================
                        READ MORE
                    ========================= */}
                    <div className="mt-6 text-center">

                      <button
                        onClick={() =>
                          setSelectedLeader(leader)
                        }
                        className="
                          rounded-full
                          bg-orange-500
                          px-6
                          py-2
                          text-sm
                          font-semibold
                          text-white
                          transition
                          hover:bg-orange-600
                          hover:shadow-md
                        "
                      >
                        Read More
                      </button>

                    </div>

                  </div>
                );
              })}


              {/* =================================
                  LEFT ARROW
              ================================= */}
              {leaders.length > 1 && (
                <button
                  onClick={prevSlide}
                  aria-label="Previous testimonial"
                  className="
                    absolute
                    left-2
                    top-1/2
                    z-40
                    flex
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-300
                    bg-white
                    text-orange-500
                    shadow-lg
                    transition
                    hover:scale-110
                    hover:bg-orange-500
                    hover:text-white

                    sm:left-6
                    sm:h-12
                    sm:w-12
                  "
                >
                  <ChevronLeft size={24} />
                </button>
              )}


              {/* =================================
                  RIGHT ARROW
              ================================= */}
              {leaders.length > 1 && (
                <button
                  onClick={nextSlide}
                  aria-label="Next testimonial"
                  className="
                    absolute
                    right-2
                    top-1/2
                    z-40
                    flex
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-orange-300
                    bg-white
                    text-orange-500
                    shadow-lg
                    transition
                    hover:scale-110
                    hover:bg-orange-500
                    hover:text-white

                    sm:right-6
                    sm:h-12
                    sm:w-12
                  "
                >
                  <ChevronRight size={24} />
                </button>
              )}

            </div>


            {/* =================================
                DOTS
            ================================= */}
            {leaders.length > 1 && (
              <div className="mt-0 flex justify-center gap-2">

                {leaders.map((leader, index) => (
                  <button
                    key={leader.id}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`
                      h-2.5
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        currentIndex === index
                          ? "w-8 bg-orange-500"
                          : "w-2.5 bg-orange-200 hover:bg-orange-400"
                      }
                    `}
                  />
                ))}

              </div>
            )}

          </div>
        )}


        {/* =========================================
            NO DATA
        ========================================= */}
        {leaders.length === 0 && (
          <div className="flex h-64 items-center justify-center">
            <p className="text-gray-500">
              No testimonials available.
            </p>
          </div>
        )}

      </div>


      {/* =========================================
          MODAL
      ========================================= */}
      {selectedLeader && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            backdrop-blur-sm
          "
          onClick={() => setSelectedLeader(null)}
        >

          <div
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-lg
              overflow-y-auto
              rounded-3xl
              bg-white
              p-6
              shadow-2xl
              sm:p-8
            "
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              onClick={() => setSelectedLeader(null)}
              className="
                absolute
                right-4
                top-4
                text-2xl
                text-gray-500
                transition
                hover:text-black
              "
            >
              ✕
            </button>


            {/* Image */}
            <div className="flex justify-center">

              <img
                src={`${API_BASE_URL}/files/${encodeURIComponent(
                  selectedLeader.testimonial_photo
                )}`}
                alt={selectedLeader.testimonial_name}
                loading="lazy"
                decoding="async"
                className="
                  h-28
                  w-28
                  rounded-full
                  border-4
                  border-yellow-400
                  object-cover
                "
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/200x200?text=No+Image";
                }}
              />

            </div>


            {/* Name */}
            <h2
              className="
                mt-4
                text-center
                text-2xl
                font-bold
                text-gray-800
              "
            >
              {selectedLeader.testimonial_name}
            </h2>


            {/* Role */}
            <p
              className="
                mt-1
                text-center
                font-semibold
                text-orange-500
              "
            >
              {selectedLeader.testimonial_role}
            </p>


            {/* Description */}
            <p
              className="
                mt-5
                break-words
                whitespace-normal
                text-justify
                leading-7
                text-gray-600
              "
            >
              {selectedLeader.testimonial_description}
            </p>

          </div>

        </div>
      )}

    </section>
  );
};

export default LeadershipSection;