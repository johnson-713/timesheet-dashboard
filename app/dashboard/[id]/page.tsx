"use client";

import React from "react";
import timesheet from "./timesheet.json";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { formatDateRange, formatDateToMonthDay } from "@/utils/common";

const TimesheetDetail: React.FC = () => {
  if (!timesheet) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-white shadow-sm flex flex-col gap-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">This week’s timesheet</h2>
        <p>
          {timesheet.totalHours}/{timesheet.targetHours} hrs
        </p>
      </div>
      <p className="text-gray-500">
        {formatDateRange(`${timesheet.weekStart}–${timesheet.weekEnd}`)}
      </p>

      {timesheet.days.map((day) => (
        <div key={day.date} className="flex flex-wrap md:flex-nowrap gap-5">
          <h3 className="flex-shrink-0 w-full sm:w-auto">
            {formatDateToMonthDay(day.date)}
          </h3>
          <div className="flex flex-col gap-2 w-full overflow-x-auto">
            {day.tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-300 rounded-lg p-2 flex justify-between items-center min-w-[300px] sm:min-w-[800px]"
              >
                <p className="text-base font-medium">{task.title}</p>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-400 text-sm">{task.hours} hrs</p>
                  <Badge className="bg-blue-100 text-blue-900">
                    {task.project}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="border border-dotted rounded-lg flex justify-center items-center gap-2 text-gray-500 font-medium text-base w-full p-2 min-w-[300px] sm:min-w-[800px] cursor-pointer">
              <Plus size={14} />
              Add New Task
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimesheetDetail;
