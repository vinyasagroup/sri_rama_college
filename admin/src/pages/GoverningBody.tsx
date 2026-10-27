import GoverningBodyForm from "@/components/admin/governingBody/GoverningBodyForm";
import FounderMessage from "@/components/admin/governingBody/FounderMessage";

const GoverningBody = () => {
  return (
    <div className="space-y-8">
      <GoverningBodyForm />
      <FounderMessage />
    </div>
  );
};

export default GoverningBody;