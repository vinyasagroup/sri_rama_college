import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image,
  Users,
  ChevronDown,
  ChevronRight,
  Trophy,
  Newspaper,
  MessageSquare,
  Shapes,
  Quote,
  Clapperboard,
} from "lucide-react";

interface AdminSidebarProps {
  onClose?: () => void;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: FileText,
    label: "Admissions",
    path: "/admissions",
  },
  {
    icon: Image,
    label: "About",
    path: "/About",
  },
  {
    icon: MessageSquare,
    label: "Feedback",
    path: "/feedback",
  },
  {
    icon: BookOpen,
    label: "Courses",
    path: "/courses",
  },
  {
    icon: Trophy,
    label: "Achievements",
    path: "/achievements",
  },
  {
  icon: Quote,
  label: "Testimonials",
  path: "/testimonials",
},

];

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onClose,
}) => {

const [videoSliderOpen, setVideoSliderOpen] = useState(false);
const [newsOpen, setNewsOpen] = useState(false);
const [logoOpen, setLogoOpen] = useState(false);
const [galleryOpen, setGalleryOpen] = useState(false);
const [iqacOpen, setIqacOpen] = useState(false);
const [aicteOpen, setAicteOpen] = useState(false);
const [aqarOpen, setAqarOpen] = useState(false);
const [nirfOpen, setNirfOpen] = useState(false);
const [naacOpen, setNaacOpen] = useState(false);
const [clubsOpen, setClubsOpen] = useState(false);
const [governingOpen, setGoverningOpen] = useState(false);

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:h-16">

       <h1 className="truncate text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
          Admin
        </h1>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-black md:hidden"
          >
            ✕
          </button>
        )}

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4">

        <div className="space-y-1">

          {/* Main Menu */}
         {menuItems.map((item) => {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.path}
      to={item.path}
      onClick={onClose}
    className={({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
    isActive
      ? "bg-orange-500 text-white"
      : "text-gray-700 dark:text-gray-200 hover:bg-orange-500 hover:text-white"
  }`
}
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </NavLink>
  );
})}

{/* Video & Slider Dropdown */}

<div>
  <button
    type="button"
    onClick={() => setVideoSliderOpen(!videoSliderOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <Clapperboard className="h-5 w-5" />
      <span>Video & Slider</span>
    </div>

    {videoSliderOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}
  </button>

  {videoSliderOpen && (
    <div className="ml-8 mt-1 space-y-1">
      <NavLink
        to="/video-section"
        onClick={onClose}
        className={({ isActive }) =>
          `block rounded-lg px-3 py-2 text-sm transition-colors ${
            isActive
              ? "bg-orange-500 text-white font-medium"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
          }`
        }
      >
        Video Section
      </NavLink>

      <NavLink
        to="/slider-section"
        onClick={onClose}
        className={({ isActive }) =>
          `block rounded-lg px-3 py-2 text-sm transition-colors ${
            isActive
              ? "bg-orange-500 text-white font-medium"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
          }`
        }
      >
        Slider Section
      </NavLink>
    </div>
  )}
</div>

  {/* News Dropdown */}
<div>
  <button
    type="button"
    onClick={() => setNewsOpen(!newsOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 transition-colors duration-200 hover:bg-orange-500 hover:text-white"  >
    <div className="flex items-center gap-3">
      <Newspaper className="h-5 w-5" />
      <span>News</span>
    </div>

    {newsOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}
  </button>

  {newsOpen && (
    <div className="ml-8 mt-1 space-y-1">
      <NavLink
        to="/news-category"
        onClick={onClose}
       className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        News Category
      </NavLink>

      <NavLink
        to="/news-form"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        News Form
      </NavLink>
    </div>
  )}
</div>
{/* Clubs Dropdown */}

<div>

  <button
    type="button"
    onClick={() => setClubsOpen(!clubsOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >

    <div className="flex items-center gap-3">

      <Shapes className="h-5 w-5" />

      <span>Clubs</span>

    </div>

    {clubsOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}

  </button>

  {clubsOpen && (

    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/clubs-category"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Clubs Category
      </NavLink>

      <NavLink
        to="/clubs"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Clubs Form
      </NavLink>

    </div>

  )}

</div>

{/* Logo Dropdown */}
<div>
  <button
    type="button"
    onClick={() => setLogoOpen(!logoOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <Image className="h-5 w-5" />
      <span>Logo Settings</span>
    </div>

    {logoOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}
  </button>

  {logoOpen && (
    <div className="ml-8 mt-1 space-y-1">
      <NavLink
        to="/logo-settings"
        onClick={onClose}
       className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Logo Details
      </NavLink>

      <NavLink
        to="/marquee-settings"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Marquee Settings
      </NavLink>
      <NavLink
  to="/carousel-settings"
  onClick={onClose}
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
>
  Carousel Settings
</NavLink>
    </div>
  )}
</div>
          {/* Gallery Dropdown */}
<div>
  <button
    type="button"
    onClick={() =>
      setGalleryOpen(!galleryOpen)
    }
   className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <Image className="h-5 w-5 " />
      <span>
        Gallery
      </span>
    </div>

    {galleryOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}
  </button>

  {galleryOpen && (
    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/gallery-category"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Gallery Category
      </NavLink>

      <NavLink
        to="/gallery-image"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        Gallery Images
      </NavLink>

    </div>
  )}
</div>

          {/* IQAC Dropdown */}
          <div>

            <button
              type="button"
              onClick={() =>
                setIqacOpen(!iqacOpen)
              }
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
          <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span>
                  IQAC
                </span>
              </div>

              {iqacOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {iqacOpen && (
              <div className="ml-8 mt-1 space-y-1">


                <NavLink
                  to="/iqac-category"
                  onClick={onClose}
                  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
                >
                  IQAC Category
                </NavLink>

                <NavLink
                  to="/iqac"
                  onClick={onClose}
                  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
                >
                  IQAC Form
                </NavLink>


                <NavLink
                  to="/iqac-composition-team"
                  onClick={onClose}
                  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
                >
                  IQAC Composition Team
                </NavLink>

              </div>
            )}

          </div>

          {/* AICTE Dropdown */}
<div>

  <button
    type="button"
    onClick={() => setAicteOpen(!aicteOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
     <Users className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span>AICTE</span>
    </div>

    {aicteOpen ? (
      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    )}
  </button>

  {aicteOpen && (
    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/aicte"
        onClick={onClose}
        className={({ isActive }) =>
          `block rounded-lg px-3 py-2 text-sm ${
         isActive
  ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium"
  : "text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`
        }
      >
        AICTE Documents
      </NavLink>

    </div>
  )}

</div>

{/* AQAR Dropdown */}
<div>

  <button
    type="button"
    onClick={() => setAqarOpen(!aqarOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <FileText className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span>AQAR</span>
    </div>

    {aqarOpen ? (
      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    )}
  </button>

  {aqarOpen && (
    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/aqar"
        onClick={onClose}
       className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        AQAR Documents
      </NavLink>

      <NavLink
        to="/aqar-committee"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        AQAR Committee
      </NavLink>

    </div>
  )}

</div>

{/* NIRF Dropdown */}
<div>

  <button
    type="button"
    onClick={() => setNirfOpen(!nirfOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span>NIRF</span>
    </div>

    {nirfOpen ? (
      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    )}
  </button>

  {nirfOpen && (
    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/nirf"
        onClick={onClose}
        className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        NIRF Documents
      </NavLink>

    </div>
  )}

</div>

{/* NAAC Dropdown */}
<div>

  <button
    type="button"
    onClick={() => setNaacOpen(!naacOpen)}
    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
      <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span>NAAC</span>
    </div>

    {naacOpen ? (
      <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    ) : (
      <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
    )}
  </button>

  {naacOpen && (
    <div className="ml-8 mt-1 space-y-1">

      <NavLink
        to="/naac"
        onClick={onClose}
       className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
      >
        NAAC Documents
      </NavLink>

    </div>
  )}

</div>

          {/* Governing Body Dropdown */}
          <div>

            <button
              type="button"
              onClick={() =>
                setGoverningOpen(
                  !governingOpen
                )
              }
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-orange-500 hover:text-white"
  >
    <div className="flex items-center gap-3">
           <Image className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                <span className="text-gray-900 dark:text-white">
                  Governing Body
                </span>
              </div>

              {governingOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {governingOpen && (
              <div className="ml-8 mt-1 space-y-1">

                <NavLink
                  to="/governing-body"
                  onClick={onClose}
                  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
                >
                  Governing Body Form
                </NavLink>

                <NavLink
                  to="/founder-message"
                  onClick={onClose}
                  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-orange-500 text-white font-medium"
      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
  }`
}
                >
                  Founder Message
                </NavLink>

<NavLink
  to="/faculty-member"
  onClick={onClose}
  className={({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm transition-colors ${
      isActive
        ? "bg-orange-500 text-white font-medium"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400"
    }`
  }
>
  Faculty Member
</NavLink>
              </div>
            )}

          </div>

        </div>

      </nav>

    </aside>
  );
};

export default AdminSidebar;