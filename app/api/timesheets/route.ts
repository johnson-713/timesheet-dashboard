import { NextRequest, NextResponse } from "next/server";

const timesheets = [
  {
    week: 1,
    date: "1 - 5 January, 2024",
    status: "COMPLETED",
    action: "View",
    id: 1,
  },
  {
    week: 2,
    date: "8 - 12 January, 2024",
    status: "COMPLETED",
    action: "View",
    id: 2,
  },
  {
    week: 3,
    date: "15 - 19 January, 2024",
    status: "INCOMPLETE",
    action: "Update",
    id: 3,
  },
  {
    week: 4,
    date: "22 - 26 January, 2024",
    status: "COMPLETED",
    action: "View",
    id: 4,
  },
  {
    week: 5,
    date: "28 January - 1 February, 2024",
    status: "MISSING",
    action: "Create",
    id: 5,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "5");
  const status = searchParams.get("status");

  let filtered = timesheets;

  // Status filter
  if (status && status !== "") {
    filtered = filtered.filter((t) => t.status === status);
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = filtered.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return NextResponse.json({
    page,
    limit,
    totalPages,
    count: filtered.length,
    data: paginatedData,
  });
}
