export default function HeroSliderSkeleton() {
  return (
    <section className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] w-screen bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-slate-800 animate-pulse" />

      <div className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24">
        <div className="max-w-xl space-y-5">
          <div className="h-10 w-3/4 bg-slate-700 rounded animate-pulse" />
          <div className="h-10 w-2/3 bg-slate-700 rounded animate-pulse" />

          <div className="h-4 w-full bg-slate-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-slate-700 rounded animate-pulse" />

          <div className="h-12 w-40 bg-slate-600 rounded-full animate-pulse mt-6" />
        </div>
      </div>
    </section>
  );
}
