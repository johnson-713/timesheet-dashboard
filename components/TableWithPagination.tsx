"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Timesheet {
  week: number;
  date: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING" | string;
  action: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface TimesheetTableWithPaginationProps {
  fetchData: (
    page: number,
    limit: number
  ) => Promise<{
    data: Timesheet[];
    pagination: PaginationInfo;
  }>;
  initialPage?: number;
  initialLimit?: number;
}

export default function TimesheetTableWithPagination({
  fetchData,
  initialPage = 1,
  initialLimit = 5,
}: TimesheetTableWithPaginationProps) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const statusBadge = {
    COMPLETED: <Badge className="bg-green-100 text-green-700">COMPLETED</Badge>,
    INCOMPLETE: (
      <Badge className="bg-yellow-100 text-yellow-800">INCOMPLETE</Badge>
    ),
    MISSING: <Badge className="bg-pink-100 text-pink-700">MISSING</Badge>,
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/timesheets?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setTimesheets(data.data);
        setPagination({
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages,
          totalItems: data.totalItems,
        });
        setLoading(false);
      });
  }, [page, limit]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>WEEK #</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : timesheets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No Data</TableCell>
            </TableRow>
          ) : (
            timesheets.map((t) => (
              <TableRow key={t.week}>
                <TableCell>{t.week}</TableCell>
                <TableCell>{t.date}</TableCell>
                <TableCell>{statusBadge[t.status] || t.status}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    {t.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-between items-center mt-4">
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[5, 10, 20].map((opt) => (
              <option key={opt} value={opt}>
                {opt} per page
              </option>
            ))}
          </select>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>

            {[...Array(pagination.totalPages).keys()].map((i) => (
              <Button
                key={i + 1}
                size="sm"
                variant={page === i + 1 ? "default" : "ghost"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="ghost"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
