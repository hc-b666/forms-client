import { Skeleton } from "@/components/ui/skeleton";

export function TemplateSkeletion() {
  return (
    <div className="w-full lg:w-[720px] flex flex-col py-5 mx-auto">
      <div className="flex items-center justify-between mb-10">
        <Skeleton className="w-[200px] h-10" />
        <Skeleton className="w-[160px] h-10" />
      </div>

      <div className="flex flex-col gap-5 mb-8">
        <Skeleton className="w-[360px] h-12" />
        <Skeleton className="w-full h-8" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[240px] h-6" />
          <Skeleton className="h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[240px] h-6" />
          <Skeleton className="h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-[240px] h-6" />
          <Skeleton className="h-10" />
        </div>
      </div>
    </div>
  );
}
