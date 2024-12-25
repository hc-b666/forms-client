import { Loader } from "@/components/common/LoadingSpinner";
import { TemplateCard } from "../../components/common/TemplateCard";
import { Tags } from "@/features/search/components/Tags";
import {
  useGetLatestTemplatesQuery,
  useGetTopTemplatesQuery,
} from "./services";
import { useTranslations } from "@/hooks/useTranslations";

export default function HomePage() {
  const { t } = useTranslations();

  const { data: topData, isLoading: topLoading } = useGetTopTemplatesQuery();
  const { data: latestData, isLoading: latestLoading } =
    useGetLatestTemplatesQuery();

  return (
    <div className="container flex-grow flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold border-b pb-3">
          {t("homepage.searchtags")}
        </h3>
        <Tags />
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold border-b pb-3">
            {t("homepage.toptemplates")}
          </h3>
          {topLoading && <Loader />}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {topData &&
              topData.map((template) => (
                <TemplateCard template={template} key={template.id} />
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold border-b pb-3">
            {t("homepage.latesttemplates")}
          </h3>
          {latestLoading && <Loader />}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {latestData &&
              latestData.map((template) => (
                <TemplateCard template={template} key={template.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
