import { NavLink, useParams } from "react-router-dom";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useGetTemplateByIdQuery } from "@/app/services/templateApi";
import { User } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";

export default function TemplatePage() {
  const { templateId } = useParams();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data, isLoading, isSuccess } = useGetTemplateByIdQuery(templateId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container flex-grow flex justify-center">
      
      {isSuccess && (
        <div className="w-[720px] h-full flex flex-col gap-5 border-x py-5 px-10">
          <NavLink to={`/profile/${data.userId}`} className="w-full flex justify-end gap-1">
            <span className="ml-auto hover:underline">{data.email}</span>
            <div className="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </NavLink>

          <h1 className="text-2xl border-b pb-3 mb-5">{data.title}</h1>
          <p className="mb-5 border-b pb-5">{data.description}</p>

          {data.questions.map((q) => (
            <div className="flex flex-col gap-3 border-y py-2" key={q.id}>
              <h3>{q.question}</h3>
              {q.type === "short" && <Input readOnly={!user.id} placeholder="Your answer" />}
              {q.type === "paragraph" && <Textarea readOnly={!user.id} placeholder="Your answer" />}
              {q.type === "mcq" && (
                <div className="flex flex-col gap-2">
                  {q.options.map((o, id) => (
                    <div key={id} className="flex items-center gap-3">
                      <input type="radio" />
                      <Label>{o}</Label>
                    </div>
                  ))}                  
                </div>
              )}
              {q.type === "checkbox" && (
                <div className="flex flex-col gap-2">
                  {q.options.map((o, id) => (
                    <div key={id} className="flex items-center gap-3">
                      <input type="checkbox" />
                      <Label>{o}</Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
