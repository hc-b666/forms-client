import { useAuth } from "@/features/auth/hooks/useAuth";
import { TemplateComponent } from "./TemplateComponent";

interface IProfileTemplates {
  templates: IProfileTemplate[];
  user: IUserProfile;
}

export function ProfileTemplates({ user, templates }: IProfileTemplates) {
  const { user: currentUser } = useAuth();
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {templates.length !== 0 ? (
        templates.map((t) => (
          <TemplateComponent
            t={t}
            key={t.id}
            isAuthor={currentUser?.id === user.id}
          />
        ))
      ) : (
        <div>
          {currentUser?.id === user.id ? "You" : "They"} do not have templates.
        </div>
      )}
    </div>
  );
}
