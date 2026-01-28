import Skeleton from "@/components/ui/Skeleton";

export default function BestSellerSkeleton() {
  return (
    <section className="relative mt-5 max-w-7xl mx-auto px-2 py-10">
      <div className="flex items-center justify-between mb-6 px-2">
        <Skeleton className="h-7 w-40" />
        <div className="hidden sm:flex gap-2">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-9 h-9 rounded-full" />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-hidden px-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="
              min-w-[260px]
              sm:min-w-[280px]
              md:min-w-[300px]
              bg-slate-900
              border border-slate-800
              rounded-xl
              overflow-hidden
              p-4
              space-y-3
            "
          >
            <Skeleton className="h-44 sm:h-48 w-full rounded-lg" />

            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />

            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
