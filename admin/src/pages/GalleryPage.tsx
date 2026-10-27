import GalleryCategory from "@/components/admin/gallery/GalleryCategory";
import GalleryImage from "@/components/admin/gallery/GalleryImage";

const GalleryPage = () => {
  return (
    <div className="space-y-8">
      <GalleryCategory />
      <GalleryImage />
    </div>
  );
};

export default GalleryPage;