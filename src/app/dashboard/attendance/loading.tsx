import { Skeleton } from "@/components/ui/skeleton"

export default function AttendanceLoading() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header Skeleton */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64 rounded-lg hidden md:block" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <Skeleton className="h-10 w-80 rounded-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-40 rounded-md" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>

              <div className="pt-4">
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full rounded-md" />
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>

              <Skeleton className="h-64 w-full rounded-md mt-6" />
            </div>

            <div className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-6 w-48 ml-2" />
                  </div>
                </div>

                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

