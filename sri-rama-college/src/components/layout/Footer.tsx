import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
const quickLinks = [
  { name: "About Us", path: "/about" },
  { name: "Governing Body", path: "/about#governing-body" },
  { name: "Admissions", path: "/admissions" },
  { name: "Campus", path: "/campus" },
  { name: "IQAC", path: "/iqac" },
  { name: "Contact", path: "/contact" },
];

  const contactInfo = [
    { icon: MapPin, text: 'Sri Rama First Grade College, Main Road,Kalladka' },
    { icon: Phone, text: '+91 9141030982' },
    { icon: Mail, text: 'srfgck@gmail. com' },
  ];

  return (
<footer className="bg-orange-500 text-white mt-2 mx-2 sm:mx-0 rounded-lg sm:rounded-none overflow-hidden">
  <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-6">
        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

          {/* About */}
          <div className="col-span-2 md:col-span-1 min-w-0">
            <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">
              Sri Rama First Grade College
            </h3>

            <p className="text-white text-xs sm:text-sm break-words">
              Empowering students with quality education and holistic development since 1995.
              Committed to excellence in higher education.
            </p>

            <div className="flex space-x-3 mt-3">
  <a
    href="https://www.facebook.com/people/Rama-Dhwani/100094036772086/?rdid=WHteAWJbGkDBmIHy&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DcSemqf7W%2F"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaFacebook className="h-5 w-5 cursor-pointer hover:text-blue-500" />
  </a>

  <a
    href="https://www.instagram.com/_ramadhwani_?igsh=MTZiN2p0eDBwYzZ3ZA%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaInstagram className="h-5 w-5 cursor-pointer hover:text-pink-500" />
  </a>

  <a
    href="https://www.youtube.com/@ramadhwani"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaYoutube className="h-5 w-5 cursor-pointer hover:text-red-500" />
  </a>
</div>
          </div>

          {/* Links */}
          <div className="min-w-0">
            <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">
              Quick Links
            </h3>
           <ul className="space-y-1 sm:space-y-2">
  {quickLinks.map((link) => (
    <li key={link.name}>
      <Link
        to={link.path}
        onClick={() => window.scrollTo(0, 0)}
        className="text-xs sm:text-sm text-white hover:text-gray-200 transition-colors"
      >
  {link.name}
</Link>
    </li>
  ))}
</ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">
              Contact Us
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex gap-2 text-white items-start min-w-0">
                  <item.icon className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-xs sm:text-sm break-words">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 min-w-0">
            <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">
              Newsletter
            </h3>

            <p className="text-white text-xs sm:text-sm mb-2 break-words">
              Get updates about admissions and events.
            </p>

            <div className="flex gap-2 min-w-0">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-0 px-2 py-1 text-xs sm:text-sm rounded bg-white text-gray-400 border border-gray-400 focus:outline-none"
              />
              <button className="px-3 py-1 text-xs sm:text-sm bg-primary text-white rounded whitespace-nowrap">
                Go
              </button>
            </div>
          </div>

        </div>

        {/* 🔥 DIVINE LINE */}
        <div className="mt-8 text-center">
<p className="text-sm sm:text-lg md:text-xl font-bold tracking-wide text-white">           
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-6 pt-4 text-center text-white text-xs sm:text-sm">
  <p>&copy;2026 srfgck.com All rights reserved.</p>
</div>

<p className="text-[10px] sm:text-xs mt-1 text-center">
  Developed by{" "}
  <a
    href="https://www.google.com/search?q=vinyasa+software+solutions&rlz=1C1GCEA_enIN1193IN1193&oq=vinyasa+software+solutions&gs_lcrp=EgZjaHJvbWUqDQgAEAAY4wIYgAQYnwQyDQgAEAAY4wIYgAQYnwQyEggBEC4YJxivARjHARiABBiKBTIHCAIQABiABDIHCAMQABiABDIICAQQABgWGB4yCAgFEAAYFhgeMg0IBhAAGIYDGIAEGIoFMg0IBxAAGIYDGIAEGIoFMg0ICBAAGIYDGIAEGIoFMgcICRAAGO8F0gEJODU2NWowajE1qAIAsAIA&sourceid=chrome&ie=UTF-8"
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-blue-400 ">
    VINYASA
  </a>
</p>
</div>
    </footer>
  );
};

export default Footer;