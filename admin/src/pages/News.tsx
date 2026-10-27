import NewsCategory from "@/components/admin/news/NewsCategory";
import NewsForm from "@/components/admin/news/NewsForm";

const News = () => {
  return (
    <div className="space-y-8">
      <NewsCategory />
      <NewsForm />
    </div>
  );
};

export default News;