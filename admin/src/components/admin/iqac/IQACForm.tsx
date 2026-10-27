import React, {useState,useEffect,useRef,} from "react";
import { ShieldCheck, Save,  PencilLine, Trash2} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/config/constants";
import {
  getCategories
} from "@/services/iqacCategoryApi";

import {
  getDocuments,
  saveDocument,
  updateDocument,
  deleteDocument
} from "@/services/iqacDocumentApi";
import Pagination from "@/components/admin/pagination/Pagination";

const IQACForm = () => {
  const iqacPageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({

  category: "",
  year: "",
  file: null as File | null,
});
  

const fetchCategories =
async () => {

try{

const res =
await getCategories();

setCategories(
res.data
);

}catch(error){

console.log(error);

}

};

const fetchDocuments =
async () => {

try{

const res =
await getDocuments();

setIqacList(
res.data
);

}catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchCategories();

fetchDocuments();

},[]);

const handleSubmit =
async (
e:React.FormEvent
)=>{

e.preventDefault();

if(
!formData.category ||
!formData.year
){
alert(
"Category and Year are required"
);
return;
}

const data =
new FormData();

data.append(
"category",
formData.category
);

data.append(
"year",
formData.year
);

if(formData.file){

data.append(
"file",
formData.file
);

}

if(editingId){

data.append(
"oldFile",
oldFile
);

}

try{

if(editingId){

await updateDocument(
editingId,
data
);

alert(
"Document Updated"
);

}else{

await saveDocument(
data
);

alert(
"Document Saved"
);

}

await fetchDocuments();

setEditingId(null);

setOldFile("");

setFormData({
category:"",
year:"",
file:null
});

}catch(error){

console.log(error);

alert(
"Save Failed"
);

}

};

//For Edit sections Form 
const [editingId, setEditingId] =
useState<string | null>(null);

const [oldFile, setOldFile] =
useState("");

const [iqacList, setIqacList] =
useState<any[]>([]);

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(iqacList.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;

const currentDocuments = iqacList.slice(
  startIndex,
  startIndex + itemsPerPage
);

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page);
  }
};

useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(Math.max(1, totalPages));
  }
}, [currentPage, totalPages]);

const [categories, setCategories] =
useState<any[]>([]);

  return (
    <div
  ref={iqacPageRef}
  className="space-y-8 p-2 sm:p-4"
>
      {/* Header */}
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
        <div className="h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="flex items-start gap-4 p-7">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50">
            <ShieldCheck className="h-8 w-8 text-orange-600" />
          </div>

          <div>
            <span className="mb-2 inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              Admin IQAC Management
            </span>

            <h1 className="text-2xl font-bold text-slate-900">
              Add IQAC Details
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Add IQAC information and yearly documents.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card className="rounded-3xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
  <label className="mb-2 block font-medium">
    IQAC Category
  </label>

 <select
  value={formData.category}
  onChange={(e) =>
    setFormData({
      ...formData,
      category: e.target.value,
    })
  }
  className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300">
  <option value="">
    Select Category
  </option>

  {categories.map((item:any) => (
    <option
      key={item.id}
      value={item.category_name}
    >
      {item.category_name}
    </option>
  ))}
</select>
</div>
            {/* Year Wise Documents */}
            <div>
  <label className="mb-2 block font-medium">
    Year
  </label>

  <Input
    placeholder="Ex: 2024-25"
    value={formData.year}
    onChange={(e) =>
      setFormData({
        ...formData,
        year: e.target.value,
      })
    }
    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all 
    focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
  />
</div>

<div>
  <label className="mb-2 block font-medium">
    Upload Document
  </label>

  <Input
    type="file"
    accept=".pdf,.doc,.docx,image/*"
    onChange={(e) =>
      setFormData({
        ...formData,
        file: e.target.files?.[0] || null,
      })
    }
    className="w-full h-10 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-gray-400
     focus:outline-none focus:ring-2 focus:ring-gray-300"
  />
</div>
               

            {/* Save Button */}
           <Button
type="submit"
className="rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-white"
>
<Save className="mr-2 h-4 w-4" />

{editingId
? "Update IQAC"
: "Save IQAC"}

</Button>
          </form>
        </CardContent>
      </Card>


      <Card className="rounded-3xl">
  <CardContent className="p-0">
    <div className="border-b p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Added IQAC Documents
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        View and manage saved IQAC documents.
      </p>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b bg-slate-50">
            <th className="px-6 py-4 text-left font-semibold">
              CATEGORY
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              YEAR
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              FILE
            </th>

            <th className="px-6 py-4 text-left font-semibold">
             STATUS
            </th>

            <th className="px-6 py-4 text-left font-semibold">
              ACTION
            </th>
          </tr>
        </thead>

        <tbody>
          {currentDocuments.map((item) => (
            <tr
              key={item.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="px-6 py-4">
                {item.category}
              </td>

              <td className="px-6 py-4">
                {item.year}
              </td>

              <td className="px-6 py-4">
<a href={`${API_BASE_URL}/files/${encodeURIComponent(item.file_name)}`}
  target="_blank"
  rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange-600 hover:underline"
>
  View Document
</a>
              </td>

              <td className="px-6 py-4">
  <button
    type="button"
    role="switch"
    aria-checked={item.status === "Active"}
    onClick={async () => {
      try {
        const data = new FormData();

        data.append("category", item.category);
        data.append("year", item.year);
        data.append("oldFile", item.file_name);
        data.append(
          "status",
          item.status === "Active" ? "Inactive" : "Active"
        );

        await updateDocument(String(item.id), data);
        await fetchDocuments();
      } catch (error) {
        console.log(error);
        alert("Status update failed");
      }
    }}
    className={`
      relative w-[42px] h-[22px]
      rounded-full p-[2px]
      transition-all duration-300
      focus:outline-none
      ${
        item.status === "Active"
          ? "bg-gradient-to-b from-orange-400 to-red-500"
          : "bg-gray-300"
      }
    `}
  >
    <span
      className={`
        block w-[18px] h-[18px]
        rounded-full bg-white
        shadow-[0_1px_3px_rgba(0,0,0,0.3)]
        transition-transform duration-300
        ${
          item.status === "Active"
            ? "translate-x-[20px]"
            : "translate-x-0"
        }
      `}
    />
  </button>
</td>

              <td className="px-6 py-4">
                <div className="flex gap-3">
                 <Button
type="button"
variant="outline"
className="border-orange-300 text-orange-600 hover:bg-orange-50"
onClick={() => {

setFormData({
category:
item.category,
year:
item.year,
file:null,
});

setOldFile(
item.file_name
);

setEditingId(
String(item.id)
);

setTimeout(() => {
  iqacPageRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, 100);

}}
>
<PencilLine className="mr-2 h-4 w-4" />
Edit
</Button>

                  <Button
type="button"
variant="outline"
className="border-red-300 text-red-600 hover:bg-red-50"
onClick={async()=>{

if(
window.confirm(
"Are you sure you want to delete this document?"
)
){

try{

await deleteDocument(
String(item.id)
);

await fetchDocuments();

alert(
"Document Deleted"
);

}catch(error){

console.log(error);

alert(
"Delete Failed"
);

}

}

}}
>
<Trash2 className="mr-2 h-4 w-4" />
Delete
</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>

    <div className="border-t border-slate-200 px-6 py-4">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  </CardContent>
</Card>
    </div>
  );
};

export default IQACForm;