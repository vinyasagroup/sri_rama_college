import React, { useCallback, useEffect, useRef, useState } from "react";
import { Play, Flag } from "lucide-react";  
import { getCarousel } from "@/services/carouselApi";
import { API_BASE_URL } from "@/config/constants";

const HeroSection: React.FC = () => {
  const [slides, setSlides] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const currentRef = useRef(0);
  const clearPrevTimerRef = useRef<number | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

 const goTo = useCallback((nextIndex: number) => {

  if (slides.length === 0) return;
    const safeNext = ((nextIndex % slides.length) + slides.length) % slides.length;

    setPrevious(currentRef.current);
    setCurrent(safeNext);
    currentRef.current = safeNext;

    if (clearPrevTimerRef.current !== null) {
      window.clearTimeout(clearPrevTimerRef.current);
    }

    clearPrevTimerRef.current = window.setTimeout(() => {
      setPrevious(null);
      clearPrevTimerRef.current = null;
    }, 1100);


    
    const nextToPreload = (safeNext + 1) % slides.length;
    const img = new Image();
    img.decoding = "async";
    img.src = slides[nextToPreload];
  }, [slides]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = window.setInterval(() => {
      goTo(currentRef.current + 1);
    }, 5000);
    return () => {
      window.clearInterval(timer);
      if (clearPrevTimerRef.current !== null) {
        window.clearTimeout(clearPrevTimerRef.current);
      }
    };
}, [goTo, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goTo(currentRef.current + 1);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      goTo(currentRef.current === 0 ? slides.length - 1 : currentRef.current - 1);
    }
  };


  useEffect(() => {
  loadCarousel();
}, []);

const loadCarousel = async () => {
  try {
    const res = await getCarousel();

    const images = res.data.map(
      (item: any) =>
        `${API_BASE_URL}/files/${encodeURIComponent(
          item.carousel_image
        )}`
    );

    setSlides(images);
  } catch (err) {
    console.error(err);
  }
};
  return (
  <>
   <section className="relative w-full aspect-[1920/650] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
     {slides.length > 0 &&
  slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
  i === current ? "opacity-100 z-20" : "opacity-0 z-10"
}`}
        >
          {(i === current || i === previous) && (
            <img
              src={src}
              alt={"Campus slide " + (i + 1)}
              loading={i === current ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={i === current ? "high" : "auto"}
            className={`w-full h-full object-cover object-center transition-transform ease-linear duration-[6000ms] ${ i === current ? "scale-103" : "scale-100"}`}    />
          )}

          
        </div>
      ))}

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col justify-start sm:justify-center h-full px-6 sm:px-12 pt-6 sm:pt-0">   
         <div className="max-w-xl text-gray-900">
         
        </div>
      </div>

    
      {/* RIGHT IMAGE */}
<div className="hidden sm:block block pointer-events-none absolute top-20 sm:top-1/2 right-4 sm:right-24 md:right-32 transform sm:-translate-y-1/2 z-30">
  <div className="relative flex items-center justify-center">

    <div className="absolute w-[115%] h-[115%] rounded-full bg-orange-200/20 blur-[25px]" />
  </div>
</div>

           {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 w-full flex justify-center gap-1.5 sm:gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
           className={`rounded-full transition-all duration-300 ${
  i === current
    ? "w-5 h-2 sm:w-6 bg-orange-500"
    : "w-2 h-2 sm:w-3 sm:h-3 bg-gray-400"
}`}
          />
        ))}
      </div>
    </section>

      {/* Buttons Below Hero */}
    <div className="bg-white py-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-2 sm:gap-6 px-3">
      <a
  href="/admissions/application-form"
  className="relative group inline-flex items-center justify-center gap-1 sm:gap-2
    px-3 sm:px-5 py-2
    rounded-full text-[11px] sm:text-sm font-semibold text-white
    bg-gradient-to-b from-orange-400 via-orange-500 to-red-500
    border border-orange-300 sm:border-2
    transition-all duration-300 hover:scale-105"
>
  <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/30 to-transparent" />

  <Play className="relative z-10 h-3 w-3 sm:h-4 sm:w-4 fill-white text-white" />

  <span className="relative z-10 whitespace-nowrap">
    Apply Now
  </span>
</a>
       <a
  href="https://shriramakalladka.in/"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center gap-1 sm:gap-2
    rounded-full border border-orange-300 bg-white
    px-3 sm:px-5 py-2
    text-[11px] sm:text-sm font-medium text-gray-800
    shadow-md transition-all duration-300
    hover:bg-orange-50 hover:scale-105"
>
  <span className="whitespace-nowrap">Visit Website</span>

  <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-orange-500">
    <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-white text-white" />
  </span>
</a>
<a
  href="https://youtube.com/@ramadhwani?si=I_5CI11-RuIXXO0U"
  target="_blank"
  rel="noopener noreferrer"
  className="relative group inline-flex items-center justify-center gap-1 sm:gap-2
    px-3 sm:px-5 py-2
    rounded-full text-[11px] sm:text-sm font-semibold text-white
    bg-gradient-to-b from-orange-400 via-orange-500 to-red-500
    border border-orange-300 sm:border-2
    transition-all duration-300 hover:scale-105"
>
  <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-white/30 to-transparent" />

  <Flag className="relative z-10 h-3 w-3 sm:h-4 sm:w-4 text-white" />

  <span className="relative z-10 whitespace-nowrap">
    Rama Dhwani
  </span>
</a>
      </div>
    </div>
  </>
);
};

export default React.memo(HeroSection);