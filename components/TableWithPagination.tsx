"use client";
import React from "react";
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
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  action: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface TimesheetTableWithPaginationProps {
  loading: boolean;
  data: Timesheet[];
}

export default function TimesheetTableWithPagination({
  loading,
  data,
}: TimesheetTableWithPaginationProps) {
  const statusBadge = {
    COMPLETED: <Badge className="bg-green-100 text-green-700">COMPLETED</Badge>,
    INCOMPLETE: (
      <Badge className="bg-yellow-100 text-yellow-800">INCOMPLETE</Badge>
    ),
    MISSING: <Badge className="bg-pink-100 text-pink-700">MISSING</Badge>,
  };

  return (
    <div className="bg-white shadow-md rounded-sm">
      <Table className=" table-auto">
        <TableHeader>
          <TableRow className="bg-[#F9FAFB] text-xs md:text-base">
            <TableHead className="px-2 md:px-4">WEEK #</TableHead>
            <TableHead className="px-2 md:px-4">DATE</TableHead>
            <TableHead className="px-2 md:px-4">STATUS</TableHead>
            <TableHead className="px-2 md:px-4">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No Data
              </TableCell>
            </TableRow>
          ) : (
            data?.map((t) => (
              <TableRow key={t.week}>
                <TableCell className="px-2 md:px-4 min-w-[150px]">
                  {t.week}
                </TableCell>
                <TableCell className="px-2 md:px-4 min-w-[300px]">
                  {t.date}
                </TableCell>
                <TableCell className="px-2 md:px-4 min-w-[300px]">
                  {statusBadge[t.status] || t.status}
                </TableCell>
                <TableCell className="px-2 md:px-4 min-w-[200px]">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-none text-primary"
                  >
                    {t.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
