import { useParams } from "react-router-dom";

import { useGetProfileQuery } from "@/features/templates/services/templateApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Profile } from "./Profile";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTemplates } from "./ProfileTemplates";

export default function ProfilePage() {
  const { userId } = useParams();
  const { data, isLoading, isSuccess } = useGetProfileQuery(userId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    isSuccess && (
      <div className="container flex-grow flex flex-col lg:grid grid-cols-4 gap-20">
        <Profile user={data.user} />

        <div className="col-span-3">
          <ProfileHeader user={data.user} totalTempaltes={data.templates.length} />

          <ProfileTemplates {...data} />
        </div>
      </div>
    )
  );
}
