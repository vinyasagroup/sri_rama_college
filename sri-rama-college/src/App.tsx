import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserLayout from "./components/layout/UserLayout";

// Lazy Loaded Pages
const Home = lazy(() => import("./page/Home"));
const AboutPage = lazy(() => import("./page/About"));
const Campus = lazy(() => import("./page/Campus"));
const Clubs = lazy(() => import("./page/Club"));
const ClubDetail = lazy(() => import("./components/clubs/ClubDetail"));

const Admission = lazy(() => import("./page/Admission"));
const Eligibility = lazy(
  () => import("./components/admission/Eligibility")
);
const ApplicationForm = lazy(
  () => import("./components/admission/Admissionform")
);
const CoursesPage = lazy(() => import("./page/CoursesPage"));
const Contact = lazy(() => import("./page/Contact"));
const Iqac = lazy(() => import("./page/Iqac"));
const News = lazy(() => import("./page/News"));

// New Pages
const AICTE = lazy(() => import("./page/AICTE"));
const AQAR = lazy(() => import("./page/AQAR"));
const NIRF = lazy(() => import("./page/NIRF"));
const NAAC = lazy(() => import("./page/NAAC"));


function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-xl">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route element={<UserLayout />}>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about/*" element={<AboutPage />} />

        {/* Campus */}
<Route path="/campus" element={<Campus />} />

{/* Clubs */}
<Route path="/clubs" element={<Clubs />} />
<Route path="/clubs/:id" element={<ClubDetail />} />
            {/* Admissions */}
            <Route path="/admissions" element={<Admission />} />
            <Route
              path="/admissions/eligibility"
              element={<Eligibility />}
            />
            <Route
              path="/admissions/application-form"
              element={<ApplicationForm />}
            />

            {/* Courses */}
            <Route
              path="/courses/:courseName"
              element={<CoursesPage />}
            />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* IQAC */}
            <Route path="/iqac/*" element={<Iqac />} />

            {/* AICTE */}
            <Route path="/aicte" element={<AICTE />} />
            

            {/* AQAR */}
            <Route path="/aqar" element={<AQAR />} />

            
            {/* NIRF */}
           <Route path="/nirf" element={<NIRF />} />
            {/* NAAC */}
            <Route path="/naac" element={<NAAC />} />

            {/* News */}
            <Route path="/news" element={<News />} />

            {/* Redirect Unknown Routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default React.memo(App);