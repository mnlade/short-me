import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonDashCard() {
  return (
    <div className=" m-2 flex h-[71px] w-[370px] items-center space-x-4 rounded-lg border bg-card shadow-md">
      <Skeleton className="ml-3 h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="ml-2 h-4 w-[200px]" />
        <Skeleton className="ml-2 h-4 w-[250px]" />
      </div>
    </div>
  );
}
