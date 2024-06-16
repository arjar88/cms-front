import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { updateFormData } from "../store/slices/formSlice";

interface DatePickerProps {
  propertyId: string;
}

export function DatePicker({ propertyId }: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdate = (newValue: Date | undefined) => {
    if (newValue) {
      setDate(newValue);
      dispatch(updateFormData({ key: propertyId, value: newValue }));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => handleUpdate(value)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
