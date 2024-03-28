import { Skeleton } from "~/components/ui/skeleton";

export function SkeletonDashCard() {
  return (
   
      <div className=" rounded-lg border bg-card w-[370px] h-[71px] shadow-md m-4 flex items-center space-x-4">
        <Skeleton className="ml-3 h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="ml-3 h-4 w-[200px]" />
          <Skeleton className="ml-3 h-4 w-[250px]" />
        </div>
      </div>
   
  );
}
