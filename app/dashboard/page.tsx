"use client";

import Footer from "@/components/Footer";
import TimesheetTableWithPagination, {
  PaginationInfo,
} from "@/components/TableWithPagination";
import TimesheetTableSkeleton from "@/components/TimesheetTableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import makeGetRequest from "@/hooks/makeGetRequest";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function TimesheetsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("2");
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [status, setStatus] = useState<string>("");

  const { data, isFetching } = useQuery({
    queryKey: ["/api/timesheets", page, status, limit],
    queryFn: () =>
      makeGetRequest(`/api/timesheets?page=${page}&limit=${limit}`, {
        status: status,
      }),
  });

  useEffect(() => {
    if (data?.data) {
      setPagination({
        page: data.page,
        limit: data.limit,
        totalPages: data.totalPages,
        totalItems: data.totalItems,
      });
    }
  }, [data]);

  return (
    <div>
      <div className="flex flex-col gap-[24px] rounded-[8px] p-6 bg-white">
        <p className="text-[24px] font-bold">Your Timesheets</p>
        <div className="flex gap-3">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[160px] py-[21px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="INCOMPLETE">Incomplete</SelectItem>
              <SelectItem value="MISSING">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="max-w-[330px] md:max-w-[1000px] md:w-full">
          {isFetching ? (
            <TimesheetTableSkeleton rows={Number(limit)} />
          ) : (
            <TimesheetTableWithPagination
              data={data?.data}
              loading={isFetching}
            />
          )}
        </div>
        {pagination && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-[12px] mt-4">
            <Select value={limit} onValueChange={setLimit}>
              <SelectTrigger className="w-[160px] py-[12px]">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent>
                {[2, 3, 5].map((opt) => (
                  <SelectItem key={opt} value={String(opt)}>
                    {opt} per page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                size="sm"
                variant="outline"
                className="border-none rounded-0"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              {[...Array(pagination.totalPages).keys()].map((i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  className="border-none rounded-0"
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                className="border-none rounded-0"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
