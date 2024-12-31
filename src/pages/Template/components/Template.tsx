import { TemplateForm } from "./TemplateForm";
import TemplateHeader from "./TemplateHeader";

interface TemplateProps {
  template: TemplateExtended;
  hasSubmmited: boolean;
  refetch: () => void;
}

export function Template({ template, hasSubmmited, refetch }: TemplateProps) {
  return (
    <div className="w-full lg:w-[720px] flex flex-col gap-5 py-5 mx-auto">
      <TemplateHeader template={template} />

      {!hasSubmmited ? (
        <TemplateForm template={template} refetch={refetch} />
      ) : (
        <p className="text-center py-10">You have already submitted the form</p>
      )}
    </div>
  );
}
