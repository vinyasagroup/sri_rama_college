import { useParams } from "react-router-dom";
import courseBg from "@/assets/Course-Background-Image3.jpeg";
// shadcn components
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Clock3, GraduationCap, Users } from "lucide-react";
import {
useEffect,
useState
}
from "react";

import {
getCourseByKey
}
from "@/services/courseApi";


const CourseDetail = () => {
  const { courseName } = useParams();
const tabTriggerClass = `
  flex-none
  shrink-0
  whitespace-nowrap
  rounded-full
  px-4
  py-2
  text-xs
  md:text-sm
  font-medium
  transition-all
  duration-200
  text-slate-600
  dark:text-slate-300
  hover:bg-slate-200
  dark:hover:bg-slate-700
  data-[state=active]:bg-yellow-400
  data-[state=active]:text-orange-700
  dark:data-[state=active]:bg-yellow-500
  dark:data-[state=active]:text-slate-900
  data-[state=active]:shadow-sm
`;

const [
course,
setCourse
]=
useState<any>(
null
);

useEffect(()=>{

fetchCourse();

},[
courseName
]);

const fetchCourse =
async()=>{

try{

const res =
await getCourseByKey(
courseName!
);

setCourse(
res.data
);

}catch(
error
){

console.log(
error
);

}

};

  
 if(
!course
){

return(
<div>
Loading...
</div>
);

}

  return (
    <div className="w-full bg-gradient-to-b from-orange-50/30 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 py-4 md:px-8 md:py-6">
        {/* Header Section */}
        
<div
  className="mb-5 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
  style={{
    backgroundImage: `url(${courseBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className=" backdrop-blur-[1px]">
    <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-yellow-400" />

    <div className="px-4 py-4 md:px-6 md:py-5">
      <span className="mb-2 inline-block rounded-full bg-orange-50 px-3 py-1 text-[11px] font-medium text-orange-600 md:text-xs">
        Programs
      </span>

      <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
        Explore Courses
      </h2>

      <p className="mt-1 max-w-xl text-xs leading-6 text-slate-600 md:text-sm">
        Find detailed information about courses, eligibility, subjects,
        and facilities.
      </p>
    </div>
  </div>
</div>

        {/* Course Title */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
            {course.title}
          </h1>
          <div className="mt-2 h-1 w-16 rounded-full bg-orange-500" />
        </div>

        
        {/* Course Highlights Cards */}
<div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <CardContent className="p-4 md:p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 ring-1 ring-orange-100">
          <Clock3 className="h-5 w-5 text-orange-600" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Duration
          </p>
        <div className="mt-1 text-sm font-semibold text-slate-900 whitespace-pre-line">
  {course.duration}
</div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <CardContent className="p-4 md:p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
          <GraduationCap className="h-5 w-5 text-blue-600" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
  Lab
</p>

<h3 className="mt-1 text-sm font-semibold text-slate-900">
  {course.lab}
</h3>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
    <CardContent className="p-4 md:p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 ring-1 ring-green-100">
          <Users className="h-5 w-5 text-green-600" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Intake
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-900  text-justify">
            {course.intake}
          </h3>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">

  <div
    className="
      mb-5
      w-full
      overflow-x-auto
      overflow-y-hidden
      scrollbar-hide
    "
  >
    <TabsList
      className="
        flex
        min-w-max
        w-max
        flex-nowrap
        items-center
        justify-start
        gap-1
        rounded-full
        border
        border-slate-200
        bg-slate-100
        p-1.5
        dark:border-slate-700
        dark:bg-slate-800

        md:w-full
        md:min-w-0
        md:justify-between
        md:gap-1
        md:overflow-visible
      "
    >

      <TabsTrigger
        value="eligibility"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Eligibility
      </TabsTrigger>

      <TabsTrigger
        value="overview"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Overview
      </TabsTrigger>

      <TabsTrigger
        value="curriculum"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Curriculum
      </TabsTrigger>

      <TabsTrigger
        value="career"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Career Scope
      </TabsTrigger>

      <TabsTrigger
        value="higher"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Higher Education
      </TabsTrigger>

      <TabsTrigger
        value="skills"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Skills Developed
      </TabsTrigger>

      <TabsTrigger
        value="subjects"
        className={`
          ${tabTriggerClass}
          md:flex-1
          md:justify-center
        `}
      >
        Subjects
      </TabsTrigger>

    </TabsList>
  </div>

  {/* TabsContent */}

             <TabsContent value="eligibility">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-4 md:p-5">
                <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
                  Eligibility Criteria
                </h3>
                <p className="text-sm leading-6 text-slate-600 text-justify">
                  {course.eligibility}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-4 md:p-5">
                <h3 className="mb-3 text-base font-semibold text-slate-900 md:text-lg">
                  Course Overview
                </h3>
                <p className="text-sm leading-7 text-slate-600 text-justify">
                  {course.overview}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="curriculum">
  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <CardContent className="p-4 md:p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
        Curriculum
      </h3>

      <p className="text-sm leading-7 text-slate-600 text-justify">
        {course.curriculum}
      </p>
    </CardContent>
  </Card>
</TabsContent>
          <TabsContent value="career">
  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <CardContent className="p-4 md:p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
        Scope and Career Opportunities
      </h3>

      <p className="text-sm leading-7 text-slate-600 text-justify">
        {course.scope_career}
      </p>
    </CardContent>
  </Card>
</TabsContent>

<TabsContent value="higher">
  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <CardContent className="p-4 md:p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
        Higher Education
      </h3>

      <p className="text-sm leading-7 text-slate-600 text-justify">
        {course.higher_education}
      </p>
    </CardContent>
  </Card>
</TabsContent>

<TabsContent value="skills">
  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <CardContent className="p-4 md:p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
        Skills Developed
      </h3>  

      <p className="text-sm leading-7 text-slate-600 text-justify">
        {course.skills_developed}
      </p>
    </CardContent>
  </Card>
</TabsContent>

          <TabsContent value="subjects">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-4 md:p-5">
                <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg   ">
        Subjects
      </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {
Array.isArray(
course.subjects
)

?

course.subjects.join(", ")

:

JSON.parse(
course.subjects
).join(", ")
}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

         

          <TabsContent value="lab">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardContent className="p-4 md:p-5">
                <h3 className="mb-2 text-base font-semibold text-slate-900 md:text-lg">
                  Lab Facilities
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  {course.lab}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;