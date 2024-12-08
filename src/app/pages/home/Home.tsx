import {
  useGetLatestTemplatesQuery,
  useGetTop5TemplatesQuery,
} from "@/app/services/templateApi";
import { TopTemplateComponent } from "./TopTemplateComponent";
import { useGetTagsQuery } from "@/app/services/tagApi";
import { Badge } from "@/app/components/ui/badge";
import { LatestTemplateComponent } from "./LatestTemplateComponent";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function HomePage() {
  const { data: top5Data, isLoading: top5Loading } = useGetTop5TemplatesQuery();
  const { data: latestData, isLoading: latestLoading } = useGetLatestTemplatesQuery();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();

  if (top5Loading || latestLoading || tagsLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container flex-grow grid grid-cols-4 gap-10">
      <div className="col-span-3 flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Top 5 Templates</h3>
          <div className="w-full flex flex-col gap-5">
            {top5Data &&
              top5Data.map((t) => <TopTemplateComponent t={t} key={t.id} />)}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold">Top 10 Latest Templates</h3>
          <div className="w-full flex flex-col gap-5">
            {latestData &&
              latestData.map((t) => (
                <LatestTemplateComponent t={t} key={t.id} />
              ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Search by tags</h3>
        <div className="flex flex-wrap gap-1">
          {tags &&
            tags.map((t) => (
              <Badge className="cursor-pointer" key={t.id}>
                {t.tagName}
              </Badge>
            ))}
        </div>
      </div>
    </div>
  );
}
