import { useGetFormsQuery } from "@/app/services/templateApi";
import { useParams } from "react-router-dom";

export default function FormsPage() {
  const { templateId } = useParams();

  console.log(templateId);

  const { data } = useGetFormsQuery(templateId);
  console.log(data);

  return (
    <main>
      Forms page
    </main>
  );
}
