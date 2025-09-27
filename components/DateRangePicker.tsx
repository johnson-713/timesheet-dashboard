/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import AppText from "./AppText";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface AppDateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  label?: string;
  filterLabel?: string;
}

const AppDateRangePicker = ({
  value,
  onChange,
  label,
  filterLabel,
}: AppDateRangePickerProps) => {
  const [date, setDate] = useState<DateRange | undefined>(value);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange?.(newDate);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 w-full">
          {/* FROM date input */}
          <div className="relative flex-1">
            {label && <Label className="mb-[8px]">{`${label} From`}</Label>}
            <input
              type="date"
              className="w-full rounded-[8px] border p-2 pr-8"
              value={date?.from ? dayjs(date.from).format("YYYY-MM-DD") : ""}
              onChange={(e) => {
                const from = e.target.value
                  ? new Date(e.target.value)
                  : undefined;
                handleSelect({ from, to: date?.to });
              }}
              aria-label="Start date"
            />
          </div>
          {/* TO date input */}
          <div className="relative flex-1">
            {label && <Label className="mb-[8px]">{`${label} To`}</Label>}
            <input
              type="date"
              className="w-full rounded-[8px] border p-2 pr-8"
              value={date?.to ? dayjs(date.to).format("YYYY-MM-DD") : ""}
              onChange={(e) => {
                const to = e.target.value
                  ? new Date(e.target.value)
                  : undefined;
                handleSelect({ from: date?.from, to });
              }}
              aria-label="End date"
            />
          </div>
        </div>
      </div>
    );
  }

  // Default desktop popover version with portal disabled to avoid layering issues
  return (
    <Popover>
      {label && <Label className="mb-[-8px]">{label}</Label>}
      <PopoverTrigger asChild>
        <Button
          className={cn(
            `pl-3 text-left font-normal h-[43px] rounded-[8px] hover:bg-white ${
              !date
                ? "bg-white border text-[#b4b4b4]"
                : "bg-white border text-[#4d4b4b]"
            }`
          )}
        >
          <AppText>
            {!date
              ? filterLabel ?? "Select date"
              : `${filterLabel ? `${filterLabel}: ` : ""}${dayjs(
                  date.from ?? dayjs().startOf("month")
                ).format("MMM DD")} - ${dayjs(date.to ?? dayjs()).format(
                  "MMM DD"
                )}`}
          </AppText>
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 !z-[2000]" align="end">
        <Calendar
          mode="range"
          selected={date as any}
          onSelect={handleSelect}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppDateRangePicker;
