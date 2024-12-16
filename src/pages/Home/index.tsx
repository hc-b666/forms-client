import { useIntl } from "react-intl";

import {
  useGetLatestTemplatesQuery,
  useGetTopTemplatesQuery,
} from "@/features/templates/services/templateApi";
import { useGetTagsQuery } from "@/features/tags/services/tagApi";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { TemplateCard } from "./TemplateCard";

export default function HomePage() {
  const intl = useIntl();

  const { data: top5Data, isLoading: top5Loading } = useGetTopTemplatesQuery();
  const { data: latestData, isLoading: latestLoading } = useGetLatestTemplatesQuery();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();

  if (top5Loading || latestLoading || tagsLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container flex-grow flex flex-col gap-10">
      
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold border-b pb-3">
          {intl.formatMessage({ id: "homepage.searchtags" })}
        </h3>
        <div className="flex flex-wrap gap-1">
          {tags &&
            tags.map((t) => (
              <Badge className="cursor-pointer" key={t.id}>
                {t.tagName}
              </Badge>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold border-b pb-3">
            {intl.formatMessage({ id: "homepage.toptemplates" })}
          </h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {top5Data && top5Data.map((t) => <TemplateCard t={t} key={t.id} />)}
          </div>
        </div>
        
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold border-b pb-3">
            {intl.formatMessage({ id: "homepage.latesttemplates" })}
          </h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {latestData && latestData.map((t) => <TemplateCard t={t} key={t.id} />)}
          </div>
        </div>
      </div>

    </div>
  );
}
