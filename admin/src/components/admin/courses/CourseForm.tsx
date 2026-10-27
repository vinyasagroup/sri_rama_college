import { Plus, Trash2, Save, RotateCcw, PencilLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AutoTextarea from "@/components/ui/AutoTextarea";
import { Button } from "@/components/ui/button";
import type { CourseFormData } from "./types";


interface CourseFormProps {
  formData: CourseFormData;
  isEditing: boolean;
  onChange: (field: keyof CourseFormData, value: string) => void;
  onAddSubject: () => void;
  onChangeSubject: (index: number, value: string) => void;
  onRemoveSubject: (index: number) => void;
  onReset: () => void;
  onSave: () => void;
}

const CourseForm = ({
  formData,
  isEditing,
  onChange,
  onAddSubject,
  onChangeSubject,
  onRemoveSubject,
  onReset,
  onSave,
}: CourseFormProps) => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5 md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Edit Course" : "Course Details Form"}
          </h2>
          <p className="text-sm text-slate-500">
            Fill all details for the course in one form.
          </p>
        </div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Course Key
    </label>
    <Input
      value={formData.courseKey}
      onChange={(e) => onChange("courseKey", e.target.value)}
      placeholder="Ex: BCA"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Course Title
    </label>
    <Input
      value={formData.title}
      onChange={(e) => onChange("title", e.target.value)}
      placeholder="Ex: BCA (Bachelor of Computer Applications)"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    />
  </div>

  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      Intake
    </label>
    <Input
      value={formData.intake}
      onChange={(e) => onChange("intake", e.target.value)}
      placeholder="Ex: 60 Seats"
      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
    />
  </div>
</div>

{/* Duration Full Width */}
<div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Duration
  </label>
<AutoTextarea
  value={formData.duration}
  onChange={(e) => onChange("duration", e.target.value)}
  placeholder="Enter duration details"
  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
/>
</div>

{/* Eligibility */}
<div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Eligibility
  </label>
  <AutoTextarea
    value={formData.eligibility}
    onChange={(e) => onChange("eligibility", e.target.value)}
    placeholder="Enter eligibility details"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
  />
</div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Overview
          </label>
          <AutoTextarea
            value={formData.overview}
            onChange={(e) => onChange("overview", e.target.value)}
            placeholder="Enter course overview"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Curriculum
  </label>
  <AutoTextarea
    value={formData.curriculum}
    onChange={(e) => onChange("curriculum", e.target.value)}
    placeholder="Enter curriculum details"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
  />
</div>

<div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Scope and Career Opportunities
  </label>
  <AutoTextarea
    value={formData.scopeCareer}
    onChange={(e) => onChange("scopeCareer", e.target.value)}
    placeholder="Enter scope and career opportunities"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
  />
</div>

<div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Higher Education
  </label>
  <AutoTextarea
    value={formData.higherEducation}
    onChange={(e) => onChange("higherEducation", e.target.value)}
    placeholder="Enter higher education opportunities"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
  />
</div>

<div className="mt-5">
  <label className="mb-2 block text-sm font-medium text-slate-700">
    Skills Developed
  </label>
  <AutoTextarea
    value={formData.skillsDeveloped}
    onChange={(e) => onChange("skillsDeveloped", e.target.value)}
    placeholder="Enter skills developed"
    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
  />
</div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Subjects
            </label>



            <Button
              type="button"
              variant="outline"
              onClick={onAddSubject}
              className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>

          <div className="space-y-3">
            {formData.subjects.map((subject, index) => (
              <div key={index} className="flex items-center gap-3">
                <Input
                  value={subject}
                  onChange={(e) => onChangeSubject(index, e.target.value)}
                  placeholder={`Subject ${index + 1}`}
  
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onRemoveSubject(index)}
                  className="h-11 rounded-xl border-red-200 px-3 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Lab Facilities
          </label>
          <AutoTextarea
            value={formData.lab}
            onChange={(e) => onChange("lab", e.target.value)}
            placeholder="Enter lab facilities"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="rounded-xl"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-orange-500 text-white hover:bg-orange-600"
          >
            {isEditing ? (
              <PencilLine className="mr-2 h-4 w-4" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isEditing ? "Update Course" : "Save Course"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseForm;