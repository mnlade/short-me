import { Skeleton } from "~/components/ui/skeleton";
export function UserSkeletonDashCard() {
  return (
    <div className=" m-2 flex h-[220px] w-[370px] items-center space-x-4 rounded-lg border bg-card shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Skeleton className="ml-3 h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="ml-2 h-4 w-[200px]" />
            <Skeleton className="ml-2 h-4 w-[250px]" />
          </div>
        </div>
        <div className="mt-3 flex flex-row">
          <div className="gap-2 space-y-2">
            <Skeleton className="ml-2 h-4 w-[200px]" />
            <Skeleton className="ml-2 h-4 w-[250px]" />
            <Skeleton className="ml-2 h-4 w-[200px]" />
            <Skeleton className="ml-2 h-4 w-[250px]" />
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4 ml-4">
            <Skeleton className="ml-2 h-4 w-[200px]" />
          </div>
      </div>
    </div>
  );
}
