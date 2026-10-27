import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full max-w-full flex flex-col overflow-x-hidden scroll-smooth bg-background">
      <Header />

      <main className="flex-1 w-full max-w-full overflow-x-hidden pt-0">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[50vh] text-base">
              Loading...
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;