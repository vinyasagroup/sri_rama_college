import ClubsCategory from "@/components/admin/clubs/ClubsCategory";
import ClubsForm from "@/components/admin/clubs/ClubsForm";

const Clubs = () => {
  return (
    <div className="space-y-8">
      <ClubsCategory />
      <ClubsForm />
    </div>
  );
};

export default Clubs;