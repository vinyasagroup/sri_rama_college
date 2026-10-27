export interface CourseFormData {
  courseKey: string;
  title: string;
  duration: string;
  intake: string;
  eligibility: string;
  overview: string;

  curriculum: string;
  scopeCareer: string;
  higherEducation: string;
  skillsDeveloped: string;

  subjects: string[];
  campus: string;
  lab: string;
}
export interface CourseItem extends CourseFormData {
  id: string;
}