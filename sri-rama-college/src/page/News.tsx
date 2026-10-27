import React, { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

import NewsList from "@/components/news/NewsList";
import NewsDetails from "@/components/news/NewsDetails";

import { getNews } from "@/services/newsApi";
import { getNewsCategory } from "@/services/newsCategoryApi";

interface NewsCategory {
  id: number;
  news_category_name: string;
}
const News: React.FC = () => {
  const [categories, setCategories] =useState<NewsCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =useState("All");
  const [newsData, setNewsData] = useState<any[]>([]);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

const fetchCategories = async () => {
  try {
    const res = await getNewsCategory();

    setCategories(res.data);
  } catch (error) {
    console.log("Category Error:", error);
  }
};

  const fetchNews = async () => {
    try {
      const res = await getNews();
console.log("API Response:", res.data);

     const formatted = res.data.map((item: any) => {

  console.log("Banner Image:", item.banner_image);

  return {
    id: item.id,

    title: item.title,

    category: item.category,

    description: item.description,

    banner_image: item.banner_image,

    date: new Date(item.news_date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),

    paragraphs: item.paragraphs || [],

    content: (item.paragraphs || []).join("\n\n"),
  };

});

      setNewsData(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchNews();
  fetchCategories();
}, []);
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading News...
      </div>
    );
  }
const filteredNews =
  selectedCategory === "All"
    ? newsData
    : newsData.filter(
        (item) =>
          item.category === selectedCategory
      );
  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6">

      {!selectedNews && (
        <>
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl px-5 sm:px-8 py-5 text-white shadow-md mb-8">

            <div className="flex items-center gap-4">

              <div className="p-2.5 rounded-xl bg-white/20">
                <Newspaper className="w-7 h-7 text-white" />
              </div>

              <div>

                <h1 className="text-xl sm:text-2xl font-bold">
                  News & Updates
                </h1>

                <p className="text-orange-100 text-sm mt-1">
                  Latest News, Events & Announcements
                </p>

              </div>

            </div>

          </div>
          {/* ================= NEWS CATEGORIES ================= */}

<div className="sticky top-0 z-40 mb-2 border-b ">

  <div className="overflow-x-auto">

    <div className="flex min-w-max items-center justify-center gap-2 px-3 py-2">

      {/* ALL NEWS */}

      <button
        type="button"
        onClick={() =>
          setSelectedCategory("All")
        }
        className={`
          my-3
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
        All News
      </button>

      {/* NEWS CATEGORIES */}

      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() =>
            setSelectedCategory(
              category.news_category_name
            )
          }
          className={`
            my-3
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
              selectedCategory ===
              category.news_category_name
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-orange-200 bg-orange-50 text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            }
          `}
        >
          {category.news_category_name}
        </button>
      ))}

    </div>

  </div>

</div>

          <NewsList
  news={filteredNews}
  onSelect={(item) =>
    setSelectedNews(item)
  }
/>
        </>
      )}

      {selectedNews && (
       <NewsDetails
  news={selectedNews}
  relatedNews={newsData.filter(
    (item) =>
      item.id !== selectedNews.id &&
      item.category === selectedNews.category
  )}
  onBack={() => setSelectedNews(null)}
  onSelectNews={(item: any) => setSelectedNews(item)}
/>
      )}
    </div>
  );
};

export default News;