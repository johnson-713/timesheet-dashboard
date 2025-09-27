import { Skeleton } from "./ui/skeleton";

export default function TimesheetTableSkeleton({
  rows = 5,
}: {
  rows?: number;
}) {
  return (
    <div className="bg-white shadow-md rounded-sm overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-[#F9FAFB]">
            <th className="px-4 py-3">WEEK #</th>
            <th className="px-4 py-3">DATE</th>
            <th className="px-4 py-3">STATUS</th>
            <th className="px-4 py-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="px-4 py-3 min-w-[150px]">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-4 py-3 min-w-[300px]">
                <Skeleton className="h-4 w-32" />
              </td>
              <td className="px-4 py-3 min-w-[300px]">
                <Skeleton className="h-6 w-20 rounded" />
              </td>
              <td className="px-4 py-3 min-w-[200px]">
                <Skeleton className="h-8 w-16 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
