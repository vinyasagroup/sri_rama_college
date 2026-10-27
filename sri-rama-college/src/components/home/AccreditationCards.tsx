import { useNavigate } from "react-router-dom";
import { FileText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  { title: "IQAC", subtitle: "Download", path: "/iqac" },
  { title: "AQAR", subtitle: "Know More", path: "/aqar" },
  { title: "NAAC", subtitle: "Visit", path: "/naac" },
  { title: "NIRF", subtitle: "View", path: "/nirf" },
];

export default function AccreditationCards() {
  const navigate = useNavigate();

  return (
   <section className="w-full bg-white border-0 shadow-none pt-8 pb-4">
      <div className="mx-auto max-w-7xl px-4">
       <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {cards.map((card) => (
           <Card
  key={card.title}
  onClick={() => {
    navigate(card.path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="group cursor-pointer rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
  <CardContent className="flex items-center gap-2 p-3 sm:gap-3 sm:p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 via-orange-400 to-red-500 shadow-md ring-1 ring-orange-300 sm:h-14 sm:w-14">
      <FileText className="h-5 w-5 text-white sm:h-7 sm:w-7" />
    </div>

   <div className="min-w-0 pt-2 ">
      <h3 className="truncate text-sm font-bold text-red-900 sm:text-xl">
        {card.title}
      </h3>

      <div className="mt-1 flex items-center gap-1 text-xs text-gray-600 sm:text-sm">
        <span className="truncate">{card.subtitle}</span>
        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
      </div>
    </div>
  </CardContent>
</Card>
          ))}
        </div>
      </div>
    </section>
  );
}