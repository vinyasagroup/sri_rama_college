import {
useState,
useEffect
}from "react";

import {getCourses}from "@/services/courseApi";
import {User,BookOpen,ChevronRight,ChevronLeft,CheckCircle,FileText,
} from "lucide-react";

import {
  saveApplication
} from "@/services/applicationApi";


// ── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 – Application For
  applicationFor: string;
  specialization: string;

  // Step 2 – Personal Info
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  nationality: string;
  motherTongue: string;
  languages: string;
  placeOfBirth: string;
  state: string;
  religion: string;
  caste: string;
  category: string;
  // Parent / Guardian Details
fatherName: string;
fatherOccupation: string;
fatherPhone: string;

motherName: string;
motherOccupation: string;
motherPhone: string;

guardianName: string;
guardianPhone: string;

parentIncome: string;
activities: string[];

maritalStatus: string;
hostelApplied: string;



studyStatus: string;

computerLiteracy: string;

clubs: string[];

  // Step 3 – SSLC / 10th
  sslcSchool: string;
  sslcBoard: string;
  sslcPercentage: string;
  sslcYear: string;

  // Step 4 – PUC / 10+2
  pucSchool: string;
  pucBoard: string;
  pucPercentage: string;
  pucYear: string;
  // Step 5 – Declaration
  declaration: boolean;
}

const initialForm: FormData = {
  applicationFor: "",
  specialization: "",
  fullName: "",
  gender: "",
  dob: "",
  email: "",
  phone: "",
  nationality: "",
  motherTongue: "",
  languages: "",
  placeOfBirth: "",
  state: "",
  religion: "",
  caste: "",
  category: "",
  fatherName: "",
fatherOccupation: "",
fatherPhone: "",

motherName: "",
motherOccupation: "",
motherPhone: "",

parentIncome: "",

activities: [],

maritalStatus: "",
hostelApplied: "",
studyStatus: "",

computerLiteracy: "",

clubs: [],

guardianName: "",
guardianPhone: "",
  sslcSchool: "",
  sslcBoard: "",
  sslcPercentage: "",
  sslcYear: "",
  pucSchool: "",
  pucBoard: "",
  pucPercentage: "",
  pucYear: "",
  declaration: false,
};

const steps = [
  { label: "Course", icon: BookOpen },
  { label: "Personal", icon: User },
  { label: "Parent / Guardian", icon: User },
  { label: "Academic Details", icon: FileText },
  { label: "Submit", icon: CheckCircle },
];

// ── Reusable Field Components ─────────────────────────────────────────────────
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition placeholder:text-slate-400 bg-white";

const selectCls =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition bg-white";

// ── Main Component ────────────────────────────────────────────────────────────
export default function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  const [
courses,
setCourses
]=
useState<any[]>(
[]
);

useEffect(()=>{
fetchCourses();

},[]);

const fetchCourses = async () => {
  try {
    const res = await getCourses();
    setCourses(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchCourses();
}, []);

 const set = (
  key: keyof FormData,
  value: string | boolean | string[]
) => {
  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));
};
  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErr: Partial<Record<keyof FormData, string>> = {};
if (step === 0) {

if (!form.applicationFor) {

newErr.applicationFor =
"Please select a course.";

}

// specialization removed

}
    if (step === 1) {
      if (!form.fullName.trim()) newErr.fullName = "Full name is required.";
      if (!form.gender) newErr.gender = "Please select gender.";
      if (!form.dob) newErr.dob = "Date of birth is required.";
      if (!form.email.trim()) newErr.email = "Email is required.";
      if (!form.phone.trim()) {
  newErr.phone = "Phone number is required.";
} else if (!/^[0-9]{10}$/.test(form.phone)) {
  newErr.phone = "Phone number must be 10 digits.";
}

    }
   if (step === 2) {

  if (!form.fatherName.trim()) {
    newErr.fatherName = "Father name is required.";
  }

  if (!form.motherName.trim()) {
    newErr.motherName = "Mother name is required.";
  }

  if (!form.fatherPhone.trim()) {
  newErr.fatherPhone = "Father phone is required.";
} else if (!/^[0-9]{10}$/.test(form.fatherPhone)) {
  newErr.fatherPhone = "Father phone must be 10 digits.";
}

  if (!form.motherPhone.trim()) {
  newErr.motherPhone = "Mother phone is required.";
} else if (!/^[0-9]{10}$/.test(form.motherPhone)) {
  newErr.motherPhone = "Mother phone must be 10 digits.";
}

  if (
    form.guardianPhone &&
    !/^[0-9]{10}$/.test(form.guardianPhone)
  ) {
    newErr.guardianPhone =
      "Guardian phone must be 10 digits.";
  }
}

    if (step === 3) {
  if (!form.sslcSchool.trim())
    newErr.sslcSchool = "School name is required.";

  if (!form.sslcBoard.trim())
    newErr.sslcBoard = "Board name is required.";

  if (!form.sslcPercentage.trim())
    newErr.sslcPercentage = "Percentage is required.";

  if (!form.sslcYear.trim())
    newErr.sslcYear = "Year of passing is required.";

  if (!form.pucSchool.trim())
    newErr.pucSchool = "College name is required.";

  if (!form.pucBoard.trim())
    newErr.pucBoard = "Board name is required.";

  if (!form.pucPercentage.trim())
    newErr.pucPercentage = "Percentage is required.";

  if (!form.pucYear.trim())
    newErr.pucYear = "Year of passing is required.";
}
    if (step === 4) {
      if (!form.declaration) newErr.declaration = "You must agree to the declaration.";
    }

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const next = () => {
  if (validate()) {
    setStep((s) => Math.min(s + 1, steps.length - 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};  const prev = () => { setErrors({}); setStep((s) => Math.max(s - 1, 0)); };

 const handleSubmit = async () => {

  if (!validate()) return;

  try {

    await saveApplication(form);

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error:any) {

  console.log(error);

  console.log(error.response);

  alert(
    error?.response?.data?.message ||
    "Application submission failed"
  );

}
};
  // ── Success Screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-green-100 animate-in fade-in zoom-in duration-500">

      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-slate-800 mb-3">
        🎉 Application Submitted Successfully!
      </h2>

      <p className="text-slate-600 mb-4">
        Dear <span className="font-semibold text-orange-600">{form.fullName}</span>,
        thank you for choosing Sri Rama First Grade College.
      </p>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5">
        <p className="text-sm text-slate-700">
          Your application for
        </p>
        <p className="font-bold text-lg text-orange-600">
          {form.applicationFor}
        </p>
        <p className="text-sm text-slate-600 mt-2">
          has been received successfully.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-slate-700">
          📧 Confirmation will be sent to
        </p>
        <p className="font-semibold">{form.email}</p>

        <p className="text-sm text-slate-700 mt-3">
          📱 Our team may contact you at
        </p>
        <p className="font-semibold">{form.phone}</p>
      </div>

      <p className="text-sm text-slate-500 mb-6">
        We look forward to welcoming you to our campus. 🌟
      </p>

      <button
        onClick={() => {
          setSubmitted(false);
          setForm(initialForm);
          setStep(0);
        }}
        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition"
      >
        Submit Another Application
      </button>
    </div>
  </div>
);
  }

  // ── Progress Bar ────────────────────────────────────────────────────────────
  const progress = Math.round((step / (steps.length - 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-[#c2410c] via-[#ea580c] to-[#c2410c] py-10 px-4 text-center">
       
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">Application Form</h1>
        <p className="text-orange-200 text-sm mt-1">
          Sri Rama First Grade College, Hanuman Nagara, Kalladka
        </p>
      </div>

      {/* ── Step Indicator ── */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        {/* Progress bar */}
        <div className="relative mb-8">
          <div className="h-1.5 bg-slate-200 rounded-full">
            <div
              className="h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const done = i < step;
              const active = i === step;
              return (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      done
                        ? "bg-orange-600 text-white"
                        : active
                        ? "bg-white border-2 border-orange-600 text-orange-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-semibold hidden sm:block ${
                      active ? "text-blue-700" : done ? "text-blue-500" : "text-slate-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Form Card ── */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden mb-12">
          {/* Card Header */}
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-800">
              Step {step + 1} — {steps[step].label}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fields marked with <span className="text-red-500">*</span> are required
            </p>
          </div>

          <div className="px-6 py-7 space-y-6">

            {/* ── STEP 0: Course Selection ── */}
            {step === 0 && (
<>
<Field label="Application For" required>

<select
className={selectCls}
value={form.applicationFor}
onChange={(e)=>{

set(
"applicationFor",
e.target.value
);

}}
>

<option value="">
-- Select Course --
</option>

{
courses.map(
(course:any)=>(
<option
key={course.id}
value={course.title}
>
{course.title}
</option>
)
)
}

</select>

{errors.applicationFor && (

<p className="text-red-500 text-xs">

{errors.applicationFor}

</p>

)}

</Field>

<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm">

<p>

🎓 Scholarship Reminder

</p>

</div>

</>
)}

            {/* ── STEP 1: Personal Info ── */}
            {step === 1 && (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name (as per certificate)" required>
                    <input
                      className={inputCls}
                      placeholder="Enter your full name"
                      value={form.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                  </Field>

                  <Field label="Gender" required>
                    <select
                      className={selectCls}
                      value={form.gender}
                      onChange={(e) => set("gender", e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                  </Field>

                  <Field label="Date of Birth (dd/mm/yyyy)" required>
                    <input
                      type="date"
                      className={inputCls}
                      value={form.dob}
                      onChange={(e) => set("dob", e.target.value)}
                    />
                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob}</p>}
                  </Field>

                  <Field label="Email ID" required>
                    <input
                      type="email"
                      className={inputCls}
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </Field>

                  <Field label="Phone Number" required>
                    <input type="tel" maxLength={10} className={inputCls} value={form.phone} onChange={(e) =>set("phone", e.target.value.replace(/\D/g, "")
    )
  }
/>
                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  </Field>

                  <Field label="Nationality">
                    <input
                      className={inputCls}
                      placeholder="e.g. Indian"
                      value={form.nationality}
                      onChange={(e) => set("nationality", e.target.value)}
                    />
                  </Field>

                  <Field label="Mother Tongue">
                    <input
                      className={inputCls}
                      placeholder="e.g. Kannada"
                      value={form.motherTongue}
                      onChange={(e) => set("motherTongue", e.target.value)}
                    />
                  </Field>

                  <Field label="Languages (read, write & speak)">
                    <input
                      className={inputCls}
                      placeholder="e.g. Kannada, English, Hindi"
                      value={form.languages}
                      onChange={(e) => set("languages", e.target.value)}
                    />
                  </Field>

                  <Field label="Place of Birth (Place, Taluk & District)">
                    <input
                      className={inputCls}
                      placeholder="Address"
                      value={form.placeOfBirth}
                      onChange={(e) => set("placeOfBirth", e.target.value)}
                    />
                  </Field>

                  <Field label="State">
                    <input
                      className={inputCls}
                      placeholder="e.g. Karnataka"
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                    />
                  </Field>

                  <Field label="Religion">
                    <input
                      className={inputCls}
                      placeholder="e.g. Hindu"
                      value={form.religion}
                      onChange={(e) => set("religion", e.target.value)}
                    />
                  </Field>

                  <Field label="Caste">
                    <input
                      className={inputCls}
                      placeholder="Enter caste"
                      value={form.caste}
                      onChange={(e) => set("caste", e.target.value)}
                    />
                  </Field>

                  <Field label="Category">
  <select
    className={selectCls}
    value={form.category}
    onChange={(e) => set("category", e.target.value)}
  >
    <option value="">-- Select --</option>
    <option>General / OC</option>
    <option>OBC</option>
    <option>SC</option>
    <option>ST</option>
    <option>EWS</option>
  </select>
</Field>

<Field label="Marital Status">
  <select
    className={selectCls}
    value={form.maritalStatus}
    onChange={(e) => set("maritalStatus", e.target.value)}
  >
    <option value="">-- Select --</option>
    <option value="Married">Married</option>
    <option value="Unmarried">Unmarried</option>
  </select>
</Field>

</div>
</>
)}


{/* Parent Details Heading */}

            {/* ── STEP 2: SSLC ── */}
           
{step === 2 && (
  <div className="grid sm:grid-cols-2 gap-5">

    <div className="sm:col-span-2">
      <h3 className="text-xl font-bold text-slate-800 border-b pb-3">
        Parent / Guardian Details
      </h3>
    </div>

    <Field label="Father Name">
      <input
        className={inputCls}
        value={form.fatherName}
        onChange={(e) => set("fatherName", e.target.value)}
      />
    </Field>

    <Field label="Father Occupation">
      <input
        className={inputCls}
        value={form.fatherOccupation}
        onChange={(e) => set("fatherOccupation", e.target.value)}
      />
    </Field>


    <Field label="Mother Name">
      <input
        className={inputCls}
        value={form.motherName}
        onChange={(e) => set("motherName", e.target.value)}
      />
    </Field>

    <Field label="Mother Occupation">
      <input
        className={inputCls}
        value={form.motherOccupation}
        onChange={(e) => set("motherOccupation", e.target.value)}
      />
    </Field>

     <Field label="Father Phone">
  <input
    type="tel"
    maxLength={10}
    className={inputCls}
    value={form.fatherPhone}
    onChange={(e) =>
      set("fatherPhone", e.target.value.replace(/\D/g, ""))
    }
  />
  {errors.fatherPhone && (
    <p className="text-red-500 text-xs">{errors.fatherPhone}</p>
  )}
</Field>

<Field label="Mother Phone">
  <input
    type="tel"
    maxLength={10}
    className={inputCls}
    value={form.motherPhone}
    onChange={(e) =>
      set("motherPhone", e.target.value.replace(/\D/g, ""))
    }
  />
  {errors.motherPhone && (
    <p className="text-red-500 text-xs">{errors.motherPhone}</p>
  )}
</Field>

    <Field label="Guardian Name">
      <input
        className={inputCls}
        value={form.guardianName}
        onChange={(e) => set("guardianName", e.target.value)}
      />
    </Field>

    <Field label="Guardian Phone">
  <input
    type="tel"
    maxLength={10}
    className={inputCls}
    value={form.guardianPhone}
    onChange={(e) =>
      set("guardianPhone", e.target.value.replace(/\D/g, ""))
    }
  />
  {errors.guardianPhone && (
    <p className="text-red-500 text-xs">{errors.guardianPhone}</p>
  )}
</Field>

    <Field label="Parent / Guardian Income (Annual)">
      <input
        className={inputCls}
        value={form.parentIncome}
        onChange={(e) => set("parentIncome", e.target.value)}
      />
    </Field>



    <Field label="Applied for Hostel">
      <select
        className={selectCls}
        value={form.hostelApplied}
        onChange={(e) => set("hostelApplied", e.target.value)}
      >
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </Field>

    <Field label="Study Status">
      <select
        className={selectCls}
        value={form.studyStatus}
        onChange={(e) => set("studyStatus", e.target.value)}
      >
        <option value="">Select</option>
        <option>Regular</option>
        <option>Private</option>
      </select>
    </Field>

    <Field label="Computer Literacy">
      <select
        className={selectCls}
        value={form.computerLiteracy}
        onChange={(e) => set("computerLiteracy", e.target.value)}
      >
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </Field>
  </div>
)}

              
            {/* ── STEP 3: PUC / 10+2 ── */}
            {step === 3 && (
  <div className="space-y-8">

    {/* SSLC Section */}
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        SSLC / 10th Details
      </h3>

      <div className="grid sm:grid-cols-2 gap-5">

        <div className="sm:col-span-2">
          <Field
            label="School Name & Address"
            required
          >
            <textarea
              className={inputCls}
              rows={2}
              value={form.sslcSchool}
              onChange={(e) =>
                set("sslcSchool", e.target.value)
              }
            />
            {errors.sslcSchool && (
              <p className="text-red-500 text-xs">
                {errors.sslcSchool}
              </p>
            )}
          </Field>
        </div>

        <Field label="Board" required>
          <input
            className={inputCls}
            value={form.sslcBoard}
            onChange={(e) =>
              set("sslcBoard", e.target.value)
            }
          />
          {errors.sslcBoard && (
            <p className="text-red-500 text-xs">
              {errors.sslcBoard}
            </p>
          )}
        </Field>

        <Field label="Year of Passing" required>
          <input
            className={inputCls}
            value={form.sslcYear}
            onChange={(e) =>
              set("sslcYear", e.target.value)
            }
          />
          {errors.sslcYear && (
            <p className="text-red-500 text-xs">
              {errors.sslcYear}
            </p>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Percentage / Class" required>
            <input
              className={inputCls}
              value={form.sslcPercentage}
              onChange={(e) =>
                set("sslcPercentage", e.target.value)
              }
            />
            {errors.sslcPercentage && (
              <p className="text-red-500 text-xs">
                {errors.sslcPercentage}
              </p>
            )}
          </Field>
        </div>

      </div>
    </div>

    {/* PUC Section */}
    <div className="border-t pt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4">
        PUC / 10+2 Details
      </h3>

      <div className="grid sm:grid-cols-2 gap-5">

        <div className="sm:col-span-2">
          <Field
            label="College Name & Address"
            required
          >
            <textarea
              className={inputCls}
              rows={2}
              value={form.pucSchool}
              onChange={(e) =>
                set("pucSchool", e.target.value)
              }
            />
            {errors.pucSchool && (
              <p className="text-red-500 text-xs">
                {errors.pucSchool}
              </p>
            )}
          </Field>
        </div>

        <Field label="Board" required>
          <input
            className={inputCls}
            value={form.pucBoard}
            onChange={(e) =>
              set("pucBoard", e.target.value)
            }
          />
          {errors.pucBoard && (
            <p className="text-red-500 text-xs">
              {errors.pucBoard}
            </p>
          )}
        </Field>

        <Field label="Year of Passing" required>
          <input
            className={inputCls}
            value={form.pucYear}
            onChange={(e) =>
              set("pucYear", e.target.value)
            }
          />
          {errors.pucYear && (
            <p className="text-red-500 text-xs">
              {errors.pucYear}
            </p>
          )}
        </Field>

        <div className="sm:col-span-2">
          <Field label="Percentage / Class" required>
            <input
              className={inputCls}
              value={form.pucPercentage}
              onChange={(e) =>
                set("pucPercentage", e.target.value)
              }
            />
            {errors.pucPercentage && (
              <p className="text-red-500 text-xs">
                {errors.pucPercentage}
              </p>
            )}
          </Field>
        </div>

      </div>
    </div>

  </div>
)}


            {/* ── STEP 4: Review & Declaration ── */}
            {step === 4 && (
              <>
                {/* Summary */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-700 text-sm uppercase tracking-widest">
                    Application Summary
                  </h3>

                  {[
                    {
                      section: "Course",
                     rows: [
                    ["Course", form.applicationFor]
                     ],
                    },
                    {
                      section: "Personal",
                      rows: [
                        ["Full Name", form.fullName],
                        ["Gender", form.gender],
                        ["Date of Birth", form.dob],
                        ["Email", form.email],
                        ["Phone", form.phone],
                        ["Nationality", form.nationality],
                        ["State", form.state],
                        ["Category", form.category],
                      ],
                    },
                    {
                      section: "SSLC / 10th",
                      rows: [
                        ["School", form.sslcSchool],
                        ["Board", form.sslcBoard],
                        ["Percentage", form.sslcPercentage],
                        ["Year", form.sslcYear],
                      ],
                    },
                    {
                      section: "PUC / 10+2",
                      rows: [
                        ["College", form.pucSchool],
                        ["Board", form.pucBoard],
                        ["Percentage", form.pucPercentage],
                        ["Year", form.pucYear],
                      ],
                    },
                  ].map(({ section, rows }) => (
                    <div key={section} className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                      <div className="bg-[#ea580c] px-4 py-2">
                        <p className="text-white text-xs font-bold uppercase tracking-wider">{section}</p>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {rows.map(([label, val]) =>
                          val ? (
                            <div key={label} className="flex px-4 py-2.5 gap-4">
                              <p className="text-xs text-slate-500 w-32 shrink-0">{label}</p>
                              <p className="text-xs font-medium text-slate-800">{val}</p>
                            </div>
                          ) : null
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Declaration */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-900 font-semibold mb-2">Declaration</p>
                  <p className="text-xs text-amber-800 mb-3 leading-relaxed">
                    I hereby declare that all the information furnished in this application form is true,
                    complete and correct to the best of my knowledge and belief. I understand that in the
                    event of any information being found false or incorrect, my admission is liable to be
                    cancelled.
                  </p>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-orange-600"
                      checked={form.declaration}
                      onChange={(e) => set("declaration", e.target.checked)}
                    />
                    <span className="text-xs text-amber-900 font-medium">
                      I agree to the above declaration.
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>
                  {errors.declaration && (
                    <p className="text-red-500 text-xs mt-1">{errors.declaration}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* ── Navigation Buttons ── */}
          <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 bg-[#ea580c] hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Application
              </button>
            )}
          </div>
        </div>

        {/* ── Contact Footer ── */}
        <div className="text-center pb-10 text-sm text-slate-500">
          Need help?{" "}
          <span className="font-semibold text-blue-700"> 9141030982</span>
          {" · "}
          <a href="mailto:srfgck@gmail.com" className="text-orange-600 underline">
            srfgck@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}