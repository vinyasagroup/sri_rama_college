import React from "react";
import HeroSection from "../components/home/HeroSection";
import MediaSection from "@/components/home/MediaSection";
import AccreditationCards from "@/components/home/AccreditationCards";
import RankHolders from "../components/home/Achievers";
import Spotlight from "../components/home/Spotlight";
import Testimonials from "../components/home/Testimonials";
import AboutCampus from "../components/home/AboutCampus";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0604]">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-[700px] w-[700px] rounded-full bg-orange-600/20 blur-[220px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-orange-500/15 blur-[220px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2b1208] via-[#120907] to-black" />
      </div>

      <HeroSection />
      <MediaSection />
      <AccreditationCards />
      <RankHolders />
      <Testimonials />
      <Spotlight />
      
      <AboutCampus />
    </div>
  );
};
export default Home;