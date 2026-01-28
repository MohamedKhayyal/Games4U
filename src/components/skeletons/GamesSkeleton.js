import Skeleton from "@/components/ui/Skeleton";

export default function GamesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-3"
        >
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}
