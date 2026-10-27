import React, {useEffect,useRef,useState,} from "react";
import {Link,useNavigate,} from "react-router-dom";
import Navbar from "./Navbar";

import { getLogo,} from "@/services/logoApi";
import { API_BASE_URL } from "@/config/constants";
import {
  getMarquee,
} from "@/services/marqueeApi";

const Header: React.FC = () => {
  const navigate =
    useNavigate();

  const trackRef =
    useRef<HTMLDivElement>(null);

  const [logoData, setLogoData] =
    useState<any>(null);

  const [marqueeList, setMarqueeList] =
    useState<any[]>([]);

  const handleAboutClick = () => {
    navigate("/about");
  };

  const fetchLogo = async () => {
    try {
      const res =
        await getLogo();

      if (
        res.data &&
        res.data.length > 0
      ) {
        setLogoData(
          res.data[0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMarquee = async () => {
    try {
      const res =
        await getMarquee();

      setMarqueeList(
        res.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLogo();
    fetchMarquee();
  }, []);

  const marqueeText =
    marqueeList.length > 0
      ? marqueeList
          .map(
            (item: any) =>
              item.marquee_text
          )
          .join(" | ")
      : "Admissions Open 2026 | Apply Now";


  return (
   <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
      {/* Top Header */}
      <div className="w-full max-w-7xl mx-auto pl-0 pr-4 sm:pl-1 sm:pr-6">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center sm:justify-start gap-6 w-full sm:w-auto"
          >
            <div className="h-14 w-14 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full bg-white p-[1px] flex items-center justify-center">
             <img
  src={
    logoData?.logo_url
      ? `${API_BASE_URL}/files/${encodeURIComponent(
          logoData.logo_url
        )}`
      : "/placeholder-logo.png"
  }
  alt="College Logo"
  loading="eager"
  decoding="async"
  className="h-full w-full object-cover rounded-full scale-105"
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/placeholder-logo.png";
  }}
/>
            </div>

            <div className="text-left">
              <span className="font-bold text-sm sm:text-lg leading-tight block">
                {logoData?.college_name ||
                  ""}
              </span>

              <p className="text-xs sm:text-xs text-yellow-300 font-medium">
                {logoData?.location ||
                  ""}
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <Navbar
            onAboutClick={
              handleAboutClick
            }
          />
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full bg-white text-black border-t border-gray-200 overflow-hidden">
        <div className="marquee-wrapper">
          <div
            ref={trackRef}
            className="marquee-track"
          >
            <div className="marquee-item">
              {marqueeText}
            </div>

            <div className="marquee-item">
              {marqueeText}
            </div>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;