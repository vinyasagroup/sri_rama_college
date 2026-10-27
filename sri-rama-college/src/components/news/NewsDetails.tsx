import {
  ArrowLeft,
  CalendarDays,
  User,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { API_BASE_URL } from "@/config/constants";
interface Props {
  news: any;
  relatedNews?: any[];
  onBack: () => void;
  onSelectNews: (news: any) => void;
}

const NewsDetails = ({
  news,
  relatedNews = [],
  onBack,
  onSelectNews,
}: Props) => {
  // const currentUrl = window.location.href;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-0 pb-8">

        {/* Back Button */}

        <Button
          variant="outline"
          onClick={onBack}
          className="mt-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-yellow-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mt-4">
          Home
          <span className="mx-2">›</span>
          News
          <span className="mx-2">›</span>
          <span className="text-orange-600 font-medium">
            {news.category}
          </span>
        </div>

        {/* Main Article */}

        <Card className="mt-4 overflow-hidden rounded-2xl border border-gray-200 !bg-white !text-gray-900 shadow-lg">
  <div className="bg-white px-6 pb-8 pt-0 md:px-10 md:pb-10 md:pt-0">

            {/* Title */}

            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>

            {/* Meta */}

            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 border-b pb-6">

              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-orange-500" />
                <span>{news.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-orange-500" />
                <span>Admin</span>
              </div>

              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-orange-500" />
                <span>{news.category}</span>
              </div>

            </div>

            {/* Featured Image */}
<div className="mt-2 overflow-hidden rounded-2xl shadow-md max-w-4xl mx-auto">
 <img
  src={
    news.banner_image
      ? `${API_BASE_URL}/files/${encodeURIComponent(news.banner_image)}`
      : "/placeholder-image.jpg"
  }
  alt={news.title}
  className="w-full h-[220px] md:h-[320px] lg:h-[380px] object-cover"
/>
</div>
                        {/* Article Content */}

           <div className="mt-6 space-y-3 text-base leading-6 text-gray-700 text-justify">

             {news.paragraphs?.map((para: string, index: number) => (

  <p
    key={index}
    className="mb-5 leading-8 text-gray-700"
  >
    {para}
  </p>

))}

            </div>
          </div>
        </Card>

        {/* ================= Related News ================= */}

        <div className="mt-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Related News
              </h2>

              <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
            </div>

           <Button
  variant="outline"
  onClick={() => {
    onBack();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="w-full sm:w-auto border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
>
  View All News
</Button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">

            {relatedNews.length > 0 ? (

              relatedNews.map((item: any, index: number) => (
                <Card
  key={index}
  onClick={() => {
    onSelectNews(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="h-full cursor-pointer overflow-hidden rounded-xl border border-gray-200 !bg-white !text-gray-900 p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">  {/* Image */}
              <div className="relative overflow-hidden">
             <img src={item.banner_image  ? `${API_BASE_URL}/files/${encodeURIComponent(item.banner_image)}`  : "/placeholder-image.jpg"}
  alt={item.title}
  className="w-full h-[140px] object-cover transition duration-500 hover:scale-105"
/>
    {/* Category */}
    <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
      {item.category || "NEWS"}
    </div>
  </div>

  {/* Content */}
 <div className="flex h-[170px] flex-col bg-white p-3">

  {/* Title */}
  <h2 className="min-h-[60px] line-clamp-3 text-sm font-bold leading-5 text-gray-900">
  {item.title}
</h2>

  {/* Description */}
  <p className="line-clamp-2 text-xs leading-5 text-gray-600">
  {item.description || item.content}
</p>

  {/* Footer */}
  <div className="flex items-center justify-between mt-auto pt-4 text-[11px]">
    <div className="flex items-center gap-1 text-gray-500">
      <CalendarDays size={12} />
      <span>{item.date}</span>
    </div>

    <span className="font-semibold text-orange-600 hover:text-orange-700">
      Read More
    </span>
  </div>

</div>
</Card>
              ))

            ) : (
  <div className="col-span-full text-center py-8 text-gray-500">
    No Related News Available
  </div>
)}
          </div>

        </div>

      </div>

    </div>
  );
};

export default NewsDetails;