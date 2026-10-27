import AQARDocument from "@/components/admin/AQAR/AQARDocument";
import AQARCommittee from "@/components/admin/AQAR/AQARCommittee";

const AQARPage = () => {
  return (
    <div className="space-y-8">
      <AQARDocument />
      <AQARCommittee />
    </div>
  );
};

export default AQARPage;