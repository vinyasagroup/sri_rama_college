import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock3 } from "lucide-react";
import { API_BASE_URL } from "@/config/constants";
import { useState, useEffect } from "react";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  date: string;
  banner_image: string;
  category?: string;
}

interface Props {
  news: NewsItem[];
  onSelect: (item: NewsItem) => void;
}

const NewsList = ({ news, onSelect }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerPage(15);
      } else if (window.innerWidth >= 1024) {
        setItemsPerPage(12);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(6);
      }

      setCurrentPage(1);
    };

    updateItemsPerPage();

    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = news.slice(startIndex, startIndex + itemsPerPage);

 return (
  <div>
   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
     {currentNews.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
      <Card
  onClick={() => onSelect(item)}
  className="h-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 !bg-white !text-gray-900 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
            {/* Image */}
            <div className="relative overflow-hidden">
<img
  src={
    item.banner_image
      ? `${API_BASE_URL}/files/${encodeURIComponent(item.banner_image)}`
      : "/placeholder-image.jpg"
  }
  alt={item.title}
  className="w-full h-[140px] object-cover"
/>


             {/* Category */}
            <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            {item.category || "NEWS"}</div>
            </div>

            <CardContent className="flex h-[170px] flex-col !bg-white p-3">
  {/* Title */}
<h2 className="min-h-[60px] line-clamp-3 text-sm font-bold leading-5 text-gray-900">
  {item.title}
</h2>

  {/* Description */}
 <p className="line-clamp-2 text-xs leading-5 text-gray-600">
  {item.description}
</p>

  {/* Footer */}
 <div className="mt-auto flex items-center justify-between pt-4 text-[11px]">
  <div className="flex items-center gap-1 text-gray-500">
      <Clock3 size={12} />
      <span>{item.date}</span>
    </div>

<span className="font-semibold text-orange-600 transition-colors hover:text-orange-700">
      Read More
    </span>
  </div>
</CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Pagination */}
    {totalPages > 1 && (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
    <button
  onClick={() => {
    setCurrentPage((p) => Math.max(p - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  disabled={currentPage === 1}
  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  Previous
</button>

    {Array.from({ length: totalPages }).map((_, index) => (
   <button
  key={index}
  onClick={() => {
    setCurrentPage(index + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
    currentPage === index + 1
      ? "bg-orange-600 text-white"
      : "border border-gray-300 bg-white text-gray-700 hover:bg-orange-100"
  }`}
>
  {index + 1}
</button>
    ))}

 <button
  onClick={() => {
    setCurrentPage((p) => Math.min(p + 1, totalPages));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  disabled={currentPage === totalPages}
  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-orange-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  Next
</button>
  </div>
)}
  </div>
);

};

export default NewsList;