import {
  useRef,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getAchievements,
} from "@/services/achievementApi";

import { API_BASE_URL } from "@/config/constants";

export default function AchiverseSection() {
const navigate = useNavigate();
  const scrollRef =
    useRef<HTMLDivElement>(null);

  const [rankHolders, setRankHolders] =
    useState<any[]>([]);    
  const fetchAchievements =
    async () => {

      try {

        const res =
          await getAchievements();

        setRankHolders(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchAchievements();

  }, []);

  const scroll = (dir: "left" | "right") => {
  if (!scrollRef.current) return;

  scrollRef.current.scrollBy({
    left: dir === "left" ? -280 : 280,
    behavior: "smooth",
  });
};

  return (
<div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 pt-12 pb-0 px-4">

   <section className="relative rounded-[32px] border border-orange-100 bg-white/85 backdrop-blur-xl shadow-[0_20px_60px_rgba(255,140,0,0.15)] px-4 pt-10 pb-6 sm:px-8">       {/* Soft Background */}

<div className="absolute inset-0">

  {/* Paper Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50" />

  {/* Left Glow */}
  <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-orange-300/25 blur-[130px]" />

  {/* Right Glow */}
  <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-amber-200/30 blur-[140px]" />

  {/* Center Glow */}
  <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/20 blur-[160px]" />

  {/* Decorative Wave */}
  <svg
    className="absolute top-0 left-0 w-full opacity-20"
    viewBox="0 0 1600 220"
    preserveAspectRatio="none"
  >
    <path
      fill="#fb923c"
      d="M0,60 C250,170 500,0 800,60 C1100,120 1350,0 1600,70 L1600,0 L0,0 Z"
    />
  </svg>

  {/* Top Left Circles */}
  <div className="absolute left-8 top-8 h-4 w-4 rounded-full bg-orange-500" />
  <div className="absolute left-16 top-10 h-3 w-3 rounded-full bg-orange-300" />
  <div className="absolute left-28 top-20 h-2 w-2 rounded-full bg-orange-400" />

  {/* Bottom Right Circles */}
  <div className="absolute bottom-12 right-16 h-4 w-4 rounded-full bg-orange-500" />
  <div className="absolute bottom-24 right-28 h-3 w-3 rounded-full bg-orange-300" />
  <div className="absolute bottom-36 right-20 h-2 w-2 rounded-full bg-orange-400" />

  {/* Left Pattern */}
  <div className="absolute left-8 bottom-10 grid grid-cols-5 gap-2 opacity-25">
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-orange-400"
      />
    ))}
  </div>

  {/* Right Pattern */}
  <div className="absolute right-8 top-44 grid grid-cols-5 gap-2 opacity-25">
    {Array.from({ length: 35 }).map((_, i) => (
      <div
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-orange-400"
      />
    ))}
  </div>

</div>
        <div className="absolute left-[-60px] top-[-80px] h-[250px] w-[250px] rounded-full bg-orange-200/40 blur-[100px]" />
        <div className="absolute bottom-[-60px] right-[10%] h-[220px] w-[220px] rounded-full bg-yellow-200/40 blur-[100px]" />

 <div className="absolute left-1/2 top-0 z-30 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 text-center">
  <h2 className="relative inline-block text-3xl font-extrabold text-orange-600 sm:text-4xl">
    Achievement
     <span className="absolute left-1/2 top-full mt-3 h-[2px] w-20 -translate-x-1/2 rounded-full bg-orange-500"></span>

    
  </h2>

    <p className="mx-auto mt-3 max-w-2xl text-gray-600">
    Celebrating our top achievers.
  </p>
</div>

        {/* Slider */}
       <div className="relative z-20 mx-auto max-w-7xl mt-0">

          <div
  
  ref={scrollRef}
  className="no-scrollbar flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 pb-6 mb-10">    
        {rankHolders.map((student, index) => (

  <div
  key={student.id || index}
 className="snap-center w-[240px] min-w-[240px] flex-shrink-0">
  <div className="group relative">

    {/* IMAGE */}
    <div className="overflow-hidden rounded-3xl">
   <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(student.file_name)}`}
  alt={student.achiever_name}
  loading="lazy"
  className="w-full h-[300px] object-cover object-center transition duration-700 group-hover:scale-110"
  onError={(e) => {
    console.log("Image failed:", (e.target as HTMLImageElement).src);
  }}
/>
    </div>

    {/* LIGHT OVERLAY */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

  <div
  className="
    absolute
    bottom-3
    left-3
    right-3
    h-[110px]
    rounded-xl
    border
    border-white/10
    bg-black/40
    backdrop-blur-xl
    px-3
    py-3
    shadow-xl
    transition-all
    duration-300
    group-hover:-translate-y-1
  "
>
  <h3 className="text-white font-semibold text-sm truncate">
    {student.achiever_name}
  </h3>

  <p className="text-orange-400 text-xs font-semibold">
    {student.year}
  </p>

  <p className="mt-1 text-xs text-gray-300 line-clamp-1">
    {student.description}
  </p>
    </div>

    {/* HOVER SHINE */}
    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

    {/* BORDER */}
    <div className="absolute inset-0 rounded-3xl border border-orange-400/20 group-hover:border-orange-400/60 transition" />

  </div>
</div>

))}

          </div>

          {/* Left Arrow */}
          <button
  onClick={() => scroll("left")}
 className="
absolute
left-[-55px]
top-1/2
-translate-y-1/2
z-30
hidden
md:flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-orange-500/40
bg-orange-500/40
backdrop-blur-xl
text-orange-400
hover:bg-orange-500
hover:text-white
transition
">
    <ChevronLeft size={22} />
</button>

          {/* Right Arrow */}
          <button
  onClick={() => scroll("right")}
  className="
absolute
right-[-55px]
top-1/2
-translate-y-1/2
z-30
hidden
md:flex
h-12
w-12
items-center
justify-center
rounded-full
border
border-orange-500/40
bg-orange-500/40
backdrop-blur-xl
text-orange-400
hover:bg-orange-500
hover:text-white
transition
"
>
  <ChevronRight size={22} />
</button>
          

        </div>
{/* View More */}
<div className="relative z-50 flex justify-center mt-8">
  <button
    onClick={() => navigate("/about#achievements")}
   className=" relative group inline-flex items-center justify-center gap-2 px-5 py-2  rounded-full text-sm font-semibold text-white  bg-gradient-to-b
    from-orange-400 via-orange-500  to-red-500 border-2 border-orange-300  transition-all duration-300 hover:scale-105 ">
 
    View More

    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white">
      <ArrowRight className="h-4 w-4 text-orange-500" />
    </span>
  </button>
</div>
      </section>

      

    </div>
  );
}