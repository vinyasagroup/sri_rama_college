
import { Star,  } from "lucide-react";
import heroBg from "../../assets/Students_Image-2.jpeg";
const generalDocs = [
  "2 Passport-size Photographs",
  "10th (SSLC) Original Marks Card",
  "2nd PUC (12th) Original Marks Card",
  "Transfer Certificate (TC) from Previous Institution",
  "Aadhaar Card of the Student",
  "Aadhaar Card of Father/Mother (Parent)",
  "Income Certificate",
  "Bank Passbook / Bank Account Xerox Copy",
];

export default function Eligibility() {
  // const [openCourse, setOpenCourse] = useState<string | null>("bca");

  // const toggle = (id: string) => setOpenCourse(openCourse === id ? null : id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Banner */}
     {/* Hero Banner */}
<div
  className="relative overflow-hidden py-16 px-4 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${heroBg})`,
  }}
>
{/* Black Overlay (same style as About cards) */}
<div className="absolute inset-0 bg-black/65" />

{/* Left Glow */}
<div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-orange-500/18 blur-[130px] rounded-full" />

{/* Right Glow */}
<div className="absolute -bottom-24 -right-20 w-[350px] h-[350px] bg-yellow-400/15 blur-[130px] rounded-full" />

{/* Bottom Center Glow */}
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-orange-400/12 blur-[140px] rounded-full" />
  {/* Content */}
  <div className="relative z-10 max-w-5xl mx-auto text-center">

    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
      Eligibility Criteria
    </h1>

    <p className="text-orange-100 text-lg max-w-2xl mx-auto">
      Sri Rama First Grade College, Hanuman Nagara, Kalladka
      <br />
      <span className="text-sm text-orange-200">
        Affiliated to Mangalore University · Managed by Sri Rama Vidyakendra Trust(R)
      </span>
    </p>

    <div className="flex flex-wrap justify-center gap-6 mt-8">
      {[
        { label: "Courses Offered", value: "3 Degrees + Diploma" },
        { label: "University", value: "Mangalore" },
      ].map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-2xl font-bold text-yellow-300">
            {s.value}
          </p>
          <p className="text-orange-200 text-sm">
            {s.label}
          </p>
        </div>
      ))}
    </div>

  </div>
</div>

     {/* General Notice */}
<div className="max-w-5xl mx-auto px-4 -mt-6 relative z-20">
  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-sm">
    <Star className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
    <p className="text-sm text-amber-800 font-medium leading-7">
      <strong>Note:</strong>{" "}
      Students scoring{" "}
      <span className="text-green-700 font-bold">95% &amp; above</span> are
      eligible for <span className="text-green-700 font-bold">FREE Education</span>.{" "}
      Students scoring{" "}
      <span className="text-orange-600 font-bold">92% – 95%</span> are eligible
      for a <span className="text-orange-600 font-bold">50% Fee Concession</span>.{" "}
      Fee concessions will also be provided for{" "}
      <span className="font-bold text-blue-700">
        financially weak students
      </span>.{" "}
      <span className="font-bold text-purple-700">
        Free Midday Meal
      </span>{" "}
      is available for all enrolled students.
    </p>
  </div>
</div>

      

      {/* Documents Required */}
      <div className="max-w-5xl mx-auto px-4 pb-14 mt-4">
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#c2410c] to-[#ea580c] px-6 py-5">
            <h2 className="text-xl font-bold text-white">Documents Required at Admission</h2>
            {/* ✅ UPDATED */}
            <p className="text-orange-200 text-sm mt-1">
              Applicable for all courses — B.A, B.Com, BCA, Diploma
            </p>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-3">
            {generalDocs.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <span className="w-6 h-6 rounded-full bg-[#ea580c] text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-[#c2410c] to-[#ea580c] py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Need Help with Admissions?</h2>
        <p className="text-orange-200 mb-6">Our team is ready to assist you through the process.</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
          {["9141030982"].map((num) => (
            <a
              key={num}
              href={`tel:${num.replace(/\s/g, "")}`}
              className="bg-yellow-300 hover:bg-yellow-300 text-[#c2410c] px-5 py-3 rounded-xl transition-colors shadow"
            >
              📞 {num}
            </a>
          ))}
        </div>
        <p className="text-orange-200 text-sm mt-4">
          ✉️{" "}
          <a href="mailto:srfgck@gmail.com" className="underline hover:text-white">
            srfgck@gmail.com
          </a>
        </p>
      </div>
    </div>
    );
}