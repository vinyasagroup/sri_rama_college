import React from "react";

const AdminFooter: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left">

          {/* LEFT */}
          <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed">
            © {new Date().getFullYear()} srfgck.com All rights reserved.


          </p>

          {/* RIGHT */}
          <p className="text-[10px] sm:text-xs mt-1 text-center text-black">
  Developed by{" "}
  <a
    href="https://www.google.com/search?q=vinyasa+software+solutions"
    target="_blank"
    rel="noopener noreferrer"
    className="text-black font-bold underline hover:text-blue-400"
  >
    VINYASA
  </a>
</p>
        </div>

      </div>
    </footer>
  );
};

export default AdminFooter;