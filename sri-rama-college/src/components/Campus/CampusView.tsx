import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import campusImage from "../../assets/srfgckclegimg.jpeg";
import {
  Eye,
  MapPin,
  Images,
  Building2,
  School,
  BedDouble,
  FlaskConical,
  Gamepad2,
  Presentation,
  Trophy,
  Bus,
  X,
} from "lucide-react";

import { getGalleryCategory } from "@/services/galleryCategoryApi";
import { getGalleryImages } from "@/services/galleryImageApi";
import { API_BASE_URL } from "@/config/constants";
interface GalleryCategory {
  id: number;
  gallery_category_name: string;
}

interface GalleryImage {
  id: number;
  title: string;
  gallery_category_name: string;
  image_url: string;
  description: string;
}

const CampusView = () => {
  const [categories, setCategories] =
    useState<GalleryCategory[]>([]);

  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>([]);

  const [selectedItem, setSelectedItem] =
    useState<GalleryImage | null>(null);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await getGalleryCategory();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Images
 const fetchImages = async () => {
  try {
    const res = await getGalleryImages();
    console.log("Images:", res.data);
    setGalleryImages(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchCategories();
    fetchImages();
  }, []);

  // Images by Category
  const getImagesByCategory = (
    categoryName: string
  ) => {
    return galleryImages.filter(
      (item) =>
        item.gallery_category_name === categoryName
    );
  };

  const scrollToSection = (
    section: string
  ) => {
    document
      .getElementById(
        section.replace(/\s+/g, "-")
      )
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const tabIcons: Record<string, any> = {
    "Campus Building": Building2,
    Classrooms: School,
    Hostel: BedDouble,
    Labs: FlaskConical,
    Recreational: Gamepad2,
    "Seminar Halls": Presentation,
    "Sports & Games": Trophy,
    Transportation: Bus,
  };

  console.log(categories);
console.log(galleryImages);
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[300px] overflow-hidden md:h-[400px]">

        <img
  src={campusImage}
  alt="Campus"
  className="absolute inset-0 h-full w-full object-cover mb-8"
/>

        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 flex h-full items-center">

          <div className="mx-auto w-full max-w-7xl px-6">

            <div className="max-w-xl text-white">

              <div className="mb-4 flex items-center gap-2 text-orange-400">
                <MapPin size={15} />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Hanuman Nagara, Kalladka
                </span>
              </div>

              <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-6xl">
                Campus
              </h1>

              <p className="text-sm text-gray-200 sm:text-base md:text-lg">
                Explore world-class facilities built to inspire,
                educate and nurture holistic growth.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Category Tabs */}

   <div className="sticky top-0 -mt-6 z-40 border-b bg-white shadow-sm">

        <div className="overflow-x-auto">

          <div className="flex min-w-max items-center gap-2 px-3 py-2 lg:justify-center">

            {categories.map((category) => {

              const Icon =
                tabIcons[
                  category.gallery_category_name
                ] || Images;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    scrollToSection(
                      category.gallery_category_name
                    )
                  }
                  className="
  my-3
  flex items-center gap-2
  rounded-full
  border border-orange-200
  bg-orange-50
  px-4 py-2
  text-sm
  font-medium
  text-slate-700
  whitespace-nowrap
  transition-all
  hover:bg-orange-500
  hover:text-white
  hover:border-orange-500
"
                >
                  <Icon size={16} />

                  <span>
                    {category.gallery_category_name}
                  </span>

                </button>
              );

            })}

          </div>

        </div>

      </div>
            {/* Gallery Categories */}
      <div className="mx-auto max-w-7xl px-4 pt-2 pb-8 sm:px-6 sm:pt-4 sm:pb-12">

        {categories.map((category) => {

          const items = getImagesByCategory(
            category.gallery_category_name
          );

          return (

            <section
              key={category.id}
              id={category.gallery_category_name.replace(/\s+/g, "-")}
              className="mb-10"
            >

              {/* Category Heading */}
              <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-3xl md:text-4xl">
                {category.gallery_category_name}
              </h2>

              <div className="mb-6 h-[2px] bg-orange-500" />

              {/* No Images */}
              {items.length === 0 ? (

                <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
                  No images available.
                </div>

              ) : (

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">

                  {items.map((item) => (

                    <Card
                      key={item.id}
                      className="
                        group
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        shadow-sm
                        transition-all
                        duration-300
                        hover:shadow-lg
                      "
                    >

                      {/* Image */}
                      <div className="relative overflow-hidden">

                        <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(item.image_url)}`}
  alt={item.title}
  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-48 md:h-52"
/>

                      </div>

                      {/* Content */}
                      <CardContent className="bg-orange-50 p-4">

                        <div className="flex items-center justify-between">

                          <div>

                            <h3 className="text-base font-semibold text-slate-800">
                              {item.title}
                            </h3>

                          </div>

                          <button
                            onClick={() =>
                              setSelectedItem(item)
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              bg-orange-500
                              text-white
                              transition-all
                              hover:bg-orange-600
                            "
                          >
                            <Eye size={16} />
                          </button>

                        </div>

                      </CardContent>

                    </Card>

                  ))}

                </div>

              )}

            </section>

          );

        })}

      </div>
            {/* Image Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">

          <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">

            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="
                absolute
                right-4
                top-4
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-orange-500
                text-white
                transition-all
                hover:bg-orange-600
              "
            >
              <X size={20} />
            </button>

            {/* Image */}
          <img
  src={`${API_BASE_URL}/files/${encodeURIComponent(selectedItem.image_url)}`}
  alt={selectedItem.title}
  className="h-[350px] w-full object-cover"
/>

            {/* Content */}
            <div className="p-6">

              <h2 className="text-2xl font-bold text-slate-900">
                {selectedItem.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-orange-500">
                {selectedItem.gallery_category_name}
              </p>

              <p className="mt-5 text-justify leading-7 text-gray-600">
                {selectedItem.description}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CampusView;