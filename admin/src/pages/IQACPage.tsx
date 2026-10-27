import IQACForm from "@/components/admin/iqac/IQACForm";
import IQACCategory from "@/components/admin/iqac/IQACCategory";
import IQACCompositionTeam from "@/components/admin/iqac/IQACCompositionTeam";

const IQACPage = () => {
  return (
    <div className="space-y-8">
      <IQACForm />
      <IQACCategory />
      <IQACCompositionTeam />
    </div>
  );
};

export default IQACPage;