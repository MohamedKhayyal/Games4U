import Skeleton from "@/components/ui/Skeleton";

export default function CartSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 border border-slate-800 rounded-xl"
            >
              <Skeleton className="w-24 h-24 rounded-md" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          ))}
        </div>

        <div className="border border-slate-800 rounded-xl p-4 space-y-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
