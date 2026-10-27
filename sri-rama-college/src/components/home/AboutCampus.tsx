import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Established in",
    value: "2009",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=70&w=900&auto=format&fit=crop",
  },
  {
    title: "Departments",
    value: "9+",
    image:
      "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=70&w=900&auto=format&fit=crop",
  },
  {
    title: "Students",
    value: "500+",
    image:
      "https://images.unsplash.com/photo-1643055419462-f3ef1b489ea1?q=70&w=900&auto=format&fit=crop",
  },
  {
    title: "Clubs & Activities",
    value: "35+",
    image:
      "https://plus.unsplash.com/premium_photo-1745951329361-34bd6ea25778?q=70&w=900&auto=format&fit=crop",
  },
];

export default function AboutSection() {
  const navigate = useNavigate();
  return (
    <div className="bg-orange-100 py-6 sm:py-10 px-2 sm:px-4">
    <section className="relative bg-white py-16 px-5 sm:px-10 overflow-hidden rounded-2xl shadow-md">

      {/* 🔥 Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-orange-500/20 blur-[120px] top-[-100px] left-[-100px] rounded-full" />
      <div className="absolute w-[300px] h-[300px] bg-yellow-400/20 blur-[120px] bottom-[-80px] right-[10%] rounded-full" />

      {/* MAIN GRID */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center lg:pr-6">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-600">
            About Us
          </h2>

          <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-4 text-justify">
            Sri Rama First Grade College, established in 2009, is a reputed institution dedicated to
providing quality higher education. Located in Karnataka, the college offers a variety of fulltime
undergraduate programmes across disciplines such as Computer Science,
Humanities and Social Sciences, and Commerce and Accounting.

The institution also provides specialized learning opportunities including Artificial Intelligence & Machine
 Learning, Supply Chain and Logistics Management, and CA Coaching, 
enabling students to gain industry-relevant knowledge and skills.
          </p>

         
          {/* CTA */}
          <button
  onClick={() => navigate("/about")}
  className="flex items-center gap-3 font-semibold text-orange-400 group"
>
  Read More

  <span className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full shadow-lg group-hover:scale-110 transition">
    <ArrowRight size={16} />
  </span>
</button>
        </div>

        {/* RIGHT CARDS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 lg:pl-6">

          {cards.map((card, index) => (
            <div
              key={index}
 className="group relative rounded-2xl overflow-hidden
border border-orange-200 bg-black
shadow-md transition-all duration-500
hover:scale-[1.03]"            >
              {/* IMAGE */}
              <img
                src={card.image}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition duration-500"
              />

             
              {/* CONTENT */}
              <div className="relative p-5 sm:p-6 h-full flex flex-col justify-end">

                <p className="text-gray-300 text-sm mb-1">
                  {card.title}
                </p>

                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  {card.value}
                </h3>

                {/* Glow line */}
                <div className="mt-3 h-[2px] w-10 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full" />
              </div>

              {/* BORDER GLOW */}
              <div className="absolute inset-0 rounded-2xl border border-orange-400/20 group-hover:border-orange-400/50 transition" />
            </div>
          ))}

        </div>
      </div>
    </section>
    </div>
  );
}