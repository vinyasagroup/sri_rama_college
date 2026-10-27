import { useEffect, useMemo, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

import AboutUs from "@/components/about/Aboutus";
import FeedbackPage from "@/components/about/Feedback";
import GoverningBodyPage from "@/components/about/GoverningBody";
import AchieversDetails from "@/components/about/AchieversDetails";

type AboutSection = "about-us"   | "achievements" | "feedback" | "governing-body";

const SECTION_COMPONENTS: Record<AboutSection, ReactNode> = {
  "about-us": <AboutUs />,
 achievements: <AchieversDetails />,
  feedback: <FeedbackPage />,
  "governing-body": <GoverningBodyPage />,

};

function slugify(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AboutPage() {
  const location = useLocation();

  const hashSection = useMemo(() => {
    const raw = (location.hash ?? "").replace(/^#/, "");
    return raw ? slugify(raw) : "";
  }, [location.hash]);

  const selected = useMemo(() => {
    const key = ((hashSection || "about-us").toLowerCase() as AboutSection);
    return SECTION_COMPONENTS[key] ?? SECTION_COMPONENTS["about-us"];
  }, [hashSection]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: hashSection ? "smooth" : "auto",
    });
  }, [hashSection]);

  return <>{selected}</>;
}