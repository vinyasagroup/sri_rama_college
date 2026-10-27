import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAbout } from "@/services/aboutApi";
import aboutHeroImage from "../../assets/srfgckclegimg.jpeg";
import {Users,BookOpen,Award,Target,MapPin} from "lucide-react";
import {Card,CardContent} from "@/components/ui/card";
export default function AboutUs() {

const [about,setAbout]=useState<any>(null);

useEffect(()=>{

fetchAbout();

},[]);

const fetchAbout=
async()=>{

try{

const res=
await getAbout();

setAbout(
res.data
);

}catch(
error
){

console.log(
error
);

}

};

if(!about){

return(
<div>
Loading...
</div>
);

}
return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-800">

      {/* Hero Section */}
      <section className="relative overflow-hidden h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] bg-[#111111]">
       <img
  src={aboutHeroImage}
  alt="Campus"
  loading="eager"
  decoding="async"
  fetchPriority="high"
  className="absolute inset-0 w-full h-full object-cover"
  style={{ opacity: 0.65 }}
/>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
          }}
        />

        <div
          className="relative z-10 h-full flex flex-col justify-center text-white"
          style={{ padding: "0 clamp(1.5rem, 5vw, 5rem)" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-orange-400" size={13} />
              <span className="text-white/60 uppercase tracking-widest text-xs">
                Hanuman Nagara, Kalladka
              </span>
            </div>

            <h1 className="text-white font-bold text-3xl md:text-4xl">
              About Us
            </h1>

            <p className="text-white/70 mt-2 max-w-md text-justify">
{about?.quote}

</p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-6 md:px-16">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto items-center">

    {/* Left Image */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <img
        src={
          about?.college_photo
            ? `${import.meta.env.VITE_API_BASE_URL}/files/${encodeURIComponent(
                about.college_photo
              )}`
            : ""
        }
        alt="College"
        className="w-full h-full object-cover rounded-3xl shadow-2xl"
      />
    </motion.div>

    {/* Right Card */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <div className="h-full rounded-3xl bg-gradient-to-br from-orange-200/70 via-white to-orange-100/70 p-[1px] shadow-xl">

        <Card className="h-full rounded-3xl bg-white/90">

          <CardContent className="h-full p-8 flex flex-col justify-center">

            <h2 className="text-3xl font-bold text-orange-600 mb-2">
              Who We Are
            </h2>

            <p className="text-gray-500 mb-4">
              {about?.college_name}
            </p>

            <p className="italic text-orange-600 border-l-4 border-orange-400 pl-4 mb-6">
              {about?.quote}
            </p>

            <p className="text-gray-700 leading-8 text-justify">
              {about?.content}
            </p>

          </CardContent>

        </Card>

      </div>
    </motion.div>

  </div>
</section>

      {/* Stats Section */}
    {/* Stats Section */}
<section className="pt-2 pb-10 px-4 md:px-20">
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">

    {[
      {
        icon: Users,
        end: 5000,
        suffix: "+",
        desc: "Students",
      },
      {
        icon: BookOpen,
        end: 4,
        suffix: "+",
        desc: "Courses",
      },
      {
        icon: Award,
        end: 25,
        suffix: "+",
        desc: "Awards",
      },
      {
        icon: Target,
        end: 15,
        suffix: "+",
        desc: "Years of Excellence",
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.03 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: i * 0.1,
        }}
        className="
          h-[115px]
          sm:h-[125px]
          md:h-[150px]
          w-full
          bg-white/80
          rounded-2xl
          shadow-md
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        {/* Icon */}
        <item.icon
          className="text-orange-500 mb-1 md:mb-2"
          size={30}
          strokeWidth={2}
        />

        {/* Number */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-none">
          <CountUp
            start={0}
            end={item.end}
            duration={2.5}
            enableScrollSpy
          />
          {item.suffix}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm mt-1">
          {item.desc}
        </p>

      </motion.div>
    ))}

  </div>
</section>

     {/* Mission & Vision */}
<section className="pt-2 pb-10 px-4 sm:px-6 md:px-20">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">

    {/* Mission */}
    <Card className="rounded-2xl bg-white/70 shadow-md">
      <CardContent className="pt-2 px-5 pb-5 md:pt-3 md:px-6 md:pb-6">

        <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">
          Mission
        </h3>

        <p className="text-gray-700 text-sm md:text-base leading-7 text-justify">
          {about?.mission || "No mission available"}
        </p>

      </CardContent>
    </Card>

    {/* Vision */}
    <Card className="rounded-2xl bg-white/70 shadow-md">
      <CardContent className="pt-2 px-5 pb-5 md:pt-3 md:px-6 md:pb-6">

        <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">
          Vision
        </h3>

        <p className="text-gray-700 text-sm md:text-base leading-7 text-justify">
          {about?.vision || "No vision available"}
        </p>

      </CardContent>
    </Card>

  </div>
</section>

{/* CTA Section */}
<section className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-10 sm:py-12 md:py-16 px-4 text-center">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}>

    <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
      Join Our Community
    </h2>

    <p className="mb-5 px-5 text-sm sm:text-base text-orange-100 text-center leading-6 max-w-md mx-auto">
      Be part of a journey that transforms knowledge into success.
    </p>

    <button className="bg-white  text-orange-600  px-5 py-2.5  sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:bg-gray-100 transition">
      Explore Courses
    </button>
  </motion.div>
</section>
    </div>
  );
}