import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Admissions from "@/pages/Admissions";
import Courses from "./pages/Courses";
// import News from "./pages/News";
import Feedback from "./pages/Feedback";
import ClubsCategory from "@/components/admin/clubs/ClubsCategory";
import Clubs from "@/components/admin/clubs/ClubsForm";

import VideoSectionPage from "@/components/admin/VideoAndSlider/VideoSection";
import SliderSectionPage from "@/components/admin/VideoAndSlider/SliderSection";

import NewsCategory from "./components/admin/news/NewsCategory";
import NewsFormPage from "./components/admin/news/NewsForm";

import Logo from "./pages/Logo";
import LogoSettings from "./components/admin/logo/LogoSettings";
import MarqueeSettings from "./components/admin/logo/MarqueeSettings";
import CarouselSettings from "./components/admin/logo/CarouselSettings";

import About from "./pages/About";

import GalleryCategory from "./components/admin/gallery/GalleryCategory";
import GalleryImage from "./components/admin/gallery/GalleryImage";

import GoverningBodyForm from "./components/admin/governingBody/GoverningBodyForm";
import FounderMessage from "./components/admin/governingBody/FounderMessage";
import FacultyMember from "./components/admin/governingBody/FacultyMember";

import IQAC from "./components/admin/iqac/IQACForm";
import IQACCategory from "./components/admin/iqac/IQACCategory";
import IQACCompositionTeam from "./components/admin/iqac/IQACCompositionTeam";

// AICTE
import AICTE from "@/pages/AICTE";

import AQAR from "./components/admin/AQAR/AQARDocument";
import AQARCommittee from "./components/admin/AQAR/AQARCommittee";
import NIRF from "@/pages/NIRF";
import NAAC from "@/pages/NAAC";

import Achievements from "./pages/Achievements";
import Testimonials from "@/pages/Testimonials";
import Logout from "./pages/Logout";

// Protected Route Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = sessionStorage.getItem("adminToken");
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login Route - No Layout */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes with Layout */}

          <Route path="/" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>}>
            {/* Redirect root to dashboard */}
            <Route index element={<Navigate to="/dashboard" replace />} />

            {/* Admin Pages */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="courses" element={<Courses />} />
            <Route path="feedback" element={<Feedback />} />
            {/* <Route path="news" element={<News />} /> */}

            <Route path="/video-section" element={<VideoSectionPage />} />
            <Route path="/slider-section" element={<SliderSectionPage />} />

            <Route path="/news-category" element={<NewsCategory />} />
            <Route path="/news-form" element={<NewsFormPage />} />
            <Route path="/clubs-category" element={<ClubsCategory />} />
            <Route path="/clubs" element={<Clubs />} />

            <Route path="/headersetting" element={<Logo />} />
            <Route path="/logo-settings" element={<LogoSettings />} />
            <Route path="/marquee-settings" element={<MarqueeSettings />} />
            <Route
              path="/carousel-settings"
              element={<CarouselSettings />}
            />

            <Route path="/governing-body" element={<GoverningBodyForm />} />
            <Route path="/founder-message" element={<FounderMessage />} />
            <Route path="/faculty-member"element={<FacultyMember />}/>
            
            <Route path="/About" element={<About />} />

            <Route path="/gallery-category" element={<GalleryCategory />} />
            <Route path="/gallery-image" element={<GalleryImage />} />

            <Route path="/iqac-category" element={<IQACCategory />} />
            <Route path="/iqac" element={<IQAC />} />
            <Route path="/iqac-composition-team" element={<IQACCompositionTeam />} />

            {/* AICTE */}
            <Route path="aicte" element={<AICTE />} />

            <Route path="aqar" element={<AQAR />} />
            <Route path="aqar-committee" element={<AQARCommittee />} />
            <Route path="nirf" element={<NIRF />} />
            <Route path="naac" element={<NAAC />} />
            <Route path="/achievements" element={<Achievements />} />

            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/logout" element={<Logout />} />
            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;