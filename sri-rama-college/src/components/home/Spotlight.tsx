import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { API_BASE_URL } from "@/config/constants";

import { getGalleryImages } from "@/services/galleryImageApi";

interface GalleryImage {
  id: number;
  title: string;
  gallery_category_name: string;
  image_url: string;
  
}

const Facilities = () => {
  const [galleryImages, setGalleryImages] = useState<
    GalleryImage[]
  >([]);

  const fetchGalleryImages = async () => {
    try {
      const response = await getGalleryImages();

      // Display all gallery images
      setGalleryImages(response.data);

      // If you want only one category, use:
      //
      // const filtered = response.data.filter(
      //   (item: GalleryImage) =>
      //     item.gallery_category_name === "Campus Building"
      // );
      //
      // setGalleryImages(filtered);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 pt-6 pb-12 md:pt-8 md:pb-14">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">

        {/* Top Wave */}
        <div className="absolute left-0 top-0 h-36 w-full rounded-b-[100px] bg-gradient-to-r from-orange-200/30 via-amber-100/10 to-orange-200/30" />

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 h-32 w-full rounded-t-[100px] bg-gradient-to-r from-orange-100/20 via-transparent to-orange-100/20" />

        {/* Left Glow */}
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-orange-300/20 blur-[120px]" />

        {/* Right Glow */}
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />

        {/* Center Glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-100/20 blur-[150px]" />

      </div>

      {/* Heading */}
      <div className="mb-6 text-center">

        <h2 className="relative inline-block text-3xl font-extrabold text-orange-600 sm:text-4xl">
          Spotlight

          <span className="absolute left-1/2 top-full mt-3 h-[2px] w-20 -translate-x-1/2 rounded-full bg-orange-500"></span>

        </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
          Explore campus excellence
        </p>

      </div>

      {/* Slider starts in Part 2 */}
            {/* Slider */}
      <div className="relative mx-auto max-w-7xl px-12">

        {/* Previous Button */}
        <button
          className="
            custom-prev
            absolute
            left-[-24px]
            top-1/2
            z-20
            hidden
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-orange-600
            bg-orange-400/40
            text-orange-400
            shadow-lg
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-110
            hover:bg-orange-600
            hover:text-white
            md:flex
          "
        >
          <span className="text-2xl leading-none">&#8249;</span>
        </button>

        {/* Next Button */}
        <button
          className="
            custom-next
            absolute
            right-[-24px]
            top-1/2
            z-20
            hidden
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            border
            border-orange-600
            bg-orange-400/40
            text-orange-400
            shadow-lg
            backdrop-blur-xl
            transition-all
            duration-300
            hover:scale-110
            hover:bg-orange-600
            hover:text-white
            md:flex
          "
        >
          <span className="text-2xl leading-none">&#8250;</span>
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={galleryImages.length > 4}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="pb-2"
        >
          {galleryImages.length > 0 ? (
            galleryImages.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="
                    group
                    relative
                    h-[300px]
                    overflow-hidden
                    rounded-2xl
                    border
                    border-orange-200
                    shadow-lg
                  "
                >
                  {/* Image */}
                <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(item.image_url)}`}
  alt={item.title}
  loading="lazy"
  className="
    h-full
    w-full
    object-cover
    transition
    duration-500
    group-hover:scale-110
  "
  onError={(e) => {
    console.error("Image failed:", item.image_url);
    (e.currentTarget as HTMLImageElement).src = "/placeholder.png";
  }}
/>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/35" />

                  {/* Content */}
                 <div className="absolute bottom-5 left-5 right-5">

  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange-300">
    {item.gallery_category_name}
  </p>

  <h3 className="text-2xl font-bold leading-tight text-white">
    {item.title}
  </h3>

</div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex h-[300px] items-center justify-center rounded-2xl border border-dashed border-orange-300 bg-white">
                <p className="text-lg font-medium text-gray-500">
                  No Gallery Images Available
                </p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

      </div>
          </section>
  );
};

export default Facilities;