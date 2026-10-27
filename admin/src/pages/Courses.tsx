// src/pages/Course.tsx

import React, { useEffect, useRef, useState } from "react";
import CourseHeader from "@/components/admin/courses/CourseHeader";
import CourseForm from "@/components/admin/courses/CourseForm";
import CourseList from "@/components/admin/courses/CourseList";
import type { CourseFormData, CourseItem } from "@/components/admin/courses/types";

import { getCourses,addCourse,updateCourse,deleteCourse,} from "@/services/courseApi";


const initialForm: CourseFormData = {
  courseKey: "",
  title: "",
  duration: "",
  intake: "",
  eligibility: "",
  overview: "",
  curriculum: "",
  scopeCareer: "",
  higherEducation: "",
  skillsDeveloped: "",

  subjects: [""],
  campus: "",
  lab: "",
};

const Course: React.FC = () => {
  const [formData, setFormData] = useState<CourseFormData>(initialForm);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const coursePageRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    field: keyof CourseFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, ""],
    }));
  };

  const handleChangeSubject = (
    index: number,
    value: string
  ) => {
    const updated = [...formData.subjects];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      subjects: updated,
    }));
  };

  const handleRemoveSubject = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

 const handleReset = () => {

  setFormData(initialForm);

  setIsEditing(false);

  setEditingId(null);

};

  const handleSave = async () => {
  try {

    if (!formData.courseKey || !formData.title) {
      alert("Course Key and Title are required");
      return;
    }

    if (isEditing && editingId) {

      await updateCourse(
        editingId,
        formData
      );

      alert("Course Updated");

    } else {

      await addCourse(
        formData
      );

      alert("Course Saved");

    }

    await fetchCourses();

    setFormData(initialForm);

    setIsEditing(false);

    setEditingId(null);

  } catch (error: any) {

    console.log(error);

    console.log(
      error?.response?.data
    );

    alert(
      error?.response?.data?.message ||
      "Save Failed"
    );
  }
};  

const handleEdit = (course: CourseItem) => {
  setFormData({
    ...course,
  });

  setEditingId(course.id);
  setIsEditing(true);

  setTimeout(() => {
    coursePageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};
const handleDelete = async (
  id: string
) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this course?"
    );

  if (!confirmDelete) return;

  try {

    await deleteCourse(id);

    await fetchCourses();

    alert("Course Deleted");

  } catch (error) {

    console.log(error);

    alert("Delete Failed");

  }

};

const [editingId, setEditingId] =
  useState<string | null>(null);


  useEffect(() => {
  fetchCourses();
}, []);

const fetchCourses = async () => {
  try {
    const res = await getCourses();

    const formatted = res.data.map((item: any) => ({
      id: String(item.id),

      courseKey: item.course_key,
      title: item.title,

      duration: item.duration,
      intake: item.intake,

      eligibility: item.eligibility,
      overview: item.overview,

      curriculum: item.curriculum,
      scopeCareer: item.scope_career,
      higherEducation: item.higher_education,
      skillsDeveloped: item.skills_developed,

      subjects:
        typeof item.subjects === "string"
          ? JSON.parse(item.subjects)
          : [],

      campus: item.campus,
      lab: item.lab,
    }));

    setCourses(formatted);
  } catch (error) {
    console.log(error);
  }
};

 return (
  <div
    ref={coursePageRef}
    className="space-y-6 p-6"
  >
    <CourseHeader />

    <CourseForm
      formData={formData}
      isEditing={isEditing}
      onChange={handleChange}
      onAddSubject={handleAddSubject}
      onChangeSubject={handleChangeSubject}
      onRemoveSubject={handleRemoveSubject}
      onReset={handleReset}
      onSave={handleSave}
    />

    <CourseList
      courses={courses}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  </div>
);
};

export default Course;