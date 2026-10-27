import React from "react";

import ClubsList from "@/components/clubs/ClubsList";
import ClubDetail from "@/components/clubs/ClubDetail";

const Club: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ClubsList />
      <ClubDetail />
    </div>
  );
};

export default Club;