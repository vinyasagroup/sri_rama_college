import React, { useState } from 'react';
import { Link, useLocation,  } from 'react-router-dom';
import { Menu, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {Sheet,SheetContent,SheetTrigger,SheetHeader,SheetTitle,SheetDescription,} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';

interface NavbarProps {
  onAboutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const location = useLocation();

  // const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },

    {
      name: 'About',
      path: '/about',
      dropdown: [
  "About Us",
  "Achievements",
  "Feedback",
  "Governing Body",
  
],
    },

    {
      name: 'Courses',
      path: '/courses',
      dropdown: ['BCA', 'B.Com', 'BA', 'AI&ML', 'SCLM'],
    },

    {
      name: 'Admissions',
      path: '/admissions',
      dropdown: ['Eligibility', 'Application Form'],
    },

  {
  name: "Campus",
  path: "/campus",
  dropdown: [
    { label: "Campus View", key: "campusView" },
    { label: "Extracurricular", key: "clubsPage" },
  ],
},

    {
  name: "IQAC",
  path: "/iqac",
  dropdown: [
    "IQAC Meeting",
    "AICTE",
    "AQAR",
    "NIRF",
    "NAAC",
  ],
},

    {
      name: 'News',
      path: '/news',
     
    },
    {
      name: 'Contact',
      path: '/contact',
      
    },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center space-x-6">
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Main Nav Item */}
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md bg-transparent text-white hover:text-yellow-300 cursor-pointer',
                    isActive(item.path) && 'text-yellow-300'
                  )}
                >
                  <Link to={item.path}>{item.name}</Link>

                  {item.dropdown && <ChevronDown className="h-4 w-4" />}
                </div>

                {/* Dropdown */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-md border bg-white shadow-lg overflow-hidden">
                    {item.dropdown.map((sub: any, index) => {
                      const isCampusItem = typeof sub === 'object';
                      const label = isCampusItem ? sub.label : sub;
const to = isCampusItem
  ? sub.key === "clubsPage"
    ? "/clubs"
    : "/campus"
  // ABOUT
 : item.name === "About"
? sub === "About Us"
  ? "/about"
  : sub === "Achievements"
  ? "/about#achievements"
  : `/about#${sub.toLowerCase().replace(/\s+/g, "-")}`
  // SPECIAL CASES
  : sub === "Location"
  ? "/about/location"

  : sub === "Eligibility"
  ? "/admissions/eligibility"

  : sub === "Application Form"
  ? "/admissions/application-form"
// IQAC
: sub === "IQAC Meeting"
? "/iqac"

: sub === "IQAC Notification"
? "/iqac#notification"

: sub === "AICTE"
? "/aicte"

: sub === "AQAR"
? "/aqar"

: sub === "NIRF"
? "/nirf"

: sub === "NAAC"
? "/naac"

  // COURSES
  : item.name === "Courses"
  ? `/courses/${sub.toLowerCase()}`

  // NEWS
  : item.name === "News"
  ? "/news"

  // CONTACT
  : item.name === "Contact"
  ? "/contact"

  // DEFAULT
  : item.path;
                      return (
                        <Link
                          key={index}
                          to={to}
                          onClick={() => {
                            setActiveDropdown(null);

                      if (isCampusItem && sub.key !== "clubsPage") {
                             const key = sub.key;

setTimeout(() => {
  const el = document.querySelector(
    `[data-section="${key}"]`
  ) as HTMLElement;

  if (el) {
    const top =
      el.getBoundingClientRect().top +
      window.scrollY -
      172;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }
}, 100);
                            }
                          }}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-yellow-400 hover:text-black transition-colors"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button
  asChild
  className="ml-4 bg-primary hover:bg-primary/90"
>
  <Link to="/admissions/application-form">
    Apply Now
  </Link>
</Button>
      </div>

     
      {/* Mobile Navbar */}
<Sheet open={isOpen} onOpenChange={setIsOpen}>
  <SheetTrigger asChild className="md:hidden">
    <Button variant="ghost" size="icon" className="text-white">
      <Menu />
    </Button>
  </SheetTrigger>

<SheetContent
  side="right"
  className="w-[85%] max-w-[320px] overflow-y-auto border-l border-gray-200 bg-white text-gray-900 p-6"
>
  <SheetHeader className="sr-only">
    <SheetTitle>Navigation Menu</SheetTitle>
    <SheetDescription>
      Mobile navigation menu
    </SheetDescription>
  </SheetHeader>
    <div className="flex flex-col gap-2">

      {navItems.map((item) => (
        <div key={item.name} className="border-b pb-2">

          {/* Main Item */}
          <button
            onClick={() =>
              setActiveDropdown(
                activeDropdown === item.name ? null : item.name
              )
            }
            className="flex w-full items-center justify-between py-2 text-left text-base font-medium text-gray-900 transition-colors hover:text-orange-500"          >
            <span>{item.name}</span>

            {item.dropdown && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  activeDropdown === item.name && "rotate-180"
                )}
              />
            )}
          </button>

          {/* Dropdown Items */}
          {item.dropdown && activeDropdown === item.name && (
            <div className="ml-4 mt-2 flex flex-col gap-2">

              {item.dropdown.map((sub: any, index) => {
                const isCampusItem = typeof sub === "object";
                const label = isCampusItem ? sub.label : sub;

                const to = isCampusItem
  ? sub.key === "clubsPage"
    ? "/clubs"
    : "/campus"
                  // ABOUT
                  : item.name === "About"
                  ? sub === "About Us"
                    ? "/about"
                    : `/about#${sub
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`

                  // SPECIAL CASES
                  : sub === "Location"
                  ? "/about/location"

                  : sub === "Eligibility"
                  ? "/admissions/eligibility"

                  : sub === "Application Form"
                  ? "/admissions/application-form"

                : sub === "Application Form"
? "/admissions/application-form"

: sub === "IQAC Meeting"
? "/iqac"

: sub === "AICTE"
? "/aicte"

: sub === "AQAR"
? "/aqar"

: sub === "NIRF"
? "/nirf"

: sub === "NAAC"
? "/naac"

: item.name === "Courses"
? `/courses/${sub.toLowerCase()}`

                  // NEWS
                  : item.name === "News"
                  ? "/news"

                  // DEFAULT
                  : item.path;

                return (
                  <Link
                    key={index}
                    to={to}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveDropdown(null);
                    }}
                    className="py-1 text-sm text-gray-700 transition-colors hover:text-orange-500"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Direct Link for Non Dropdown */}
          {!item.dropdown && (
            <Link
              to={item.path}
              onClick={() => setIsOpen(false)}
             className="mt-1 block text-sm text-gray-700 hover:text-orange-500"
            >
              Go to {item.name}
            </Link>
          )}
        </div>
      ))}

      <Button className="mt-4 bg-primary hover:bg-primary/90">
        Apply Now
      </Button>
    </div>
  </SheetContent>
</Sheet>
    </>
  );
};

export default Navbar;