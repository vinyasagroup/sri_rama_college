import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { getVideos } from "@/services/videoApi";
import { getSliderImages } from "@/services/sliderApi";

import { API_BASE_URL } from "@/config/constants";

// =====================================================
// YOUTUBE URL → EMBED URL
// =====================================================
const getYouTubeEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    let videoId = "";

    if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v") || "";

      if (!videoId) {
        const shortsMatch =
          parsedUrl.pathname.match(/\/shorts\/([^/]+)/);

        if (shortsMatch) {
          videoId = shortsMatch[1];
        }
      }

      if (!videoId) {
        const embedMatch =
          parsedUrl.pathname.match(/\/embed\/([^/]+)/);

        if (embedMatch) {
          videoId = embedMatch[1];
        }
      }
    }

    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.substring(1);
    }

    if (!videoId) {
      return "";
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&rel=0&iv_load_policy=3&disablekb=1`;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return "";
  }
};

export default function MediaSection() {
  const [video, setVideo] =
    useState<any>(null);

  const [images, setImages] =
    useState<any[]>([]);

  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchData = async () => {
    try {
      // Get YouTube video
      const videoRes =
        await getVideos();

      const activeVideo =
        videoRes.data.find(
          (item: any) =>
            item.status === "Active"
        );

      setVideo(
        activeVideo || null
      );

      // Get slider images
      const sliderRes =
        await getSliderImages();

      const activeImages =
        sliderRes.data.filter(
          (item: any) =>
            item.status === "Active"
        );

      setImages(activeImages);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-slate-50 pt-0 pb-5">

      <div className="mx-auto max-w-7xl px-4">

        {/* ================= HEADING ================= */}

        <div className="mb-6 text-center">

          <h2 className="relative inline-block text-2xl font-extrabold text-orange-600 sm:text-3xl lg:text-4xl">

            Campus Visual Journey

            <span className="absolute left-1/2 top-full mt-2 h-[3px] w-16 -translate-x-1/2 rounded-full bg-orange-500 sm:w-20" />

          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Experience our vibrant campus
            through videos and photos.
          </p>

        </div>

        {/* ================= VIDEO + SLIDER ================= */}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* ================= YOUTUBE VIDEO ================= */}

<div className="overflow-hidden rounded-2xl bg-black shadow-lg">
  {video && getYouTubeEmbedUrl(video.video) ? (
    <div className="aspect-video w-full">
      <iframe
        src={getYouTubeEmbedUrl(video.video)}
        title="College YouTube Video"
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="flex aspect-video w-full items-center justify-center bg-gray-100">
      No Video Available
    </div>
  )}
</div>

          {/* ================= SLIDER ================= */}

          <div className="overflow-hidden rounded-2xl shadow-lg">

            {images.length > 0 ? (
<Swiper
  modules={[
    Navigation,
    Autoplay,
  ]}
  navigation
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop
  className="campus-swiper aspect-video w-full"
>
                {images.map(
                  (item: any) => (

                    <SwiperSlide
                      key={item.id}
                    >

                      <img
                        src={`${API_BASE_URL}/files/${encodeURIComponent(
                          item.slider_image
                        )}`}
                        alt="Campus Slider"
                        className="h-full w-full object-cover"
                      />

                    </SwiperSlide>

                  )
                )}

              </Swiper>

            ) : (

              <div className="flex h-56 items-center justify-center bg-gray-100 sm:h-72 lg:h-[380px]">

                No Slider Images Available

              </div>

            )}

          </div>

        </div>

      </div>

    </section>
  );
}