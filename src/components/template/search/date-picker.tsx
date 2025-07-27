"use client"

import DateRangePicker from "@/components/atom/date-range-picker"

interface DatePickerProps {
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  onDateChange: (from: Date | undefined, to: Date | undefined) => void
}

export default function DatePickerDropdown({
  dateRange,
  onDateChange
}: DatePickerProps) {
  return (
    <div className="flex justify-center">
      <DateRangePicker 
        className="w-full"
        date={dateRange}
        onDateChange={(date) => {
          if (date) {
            onDateChange(date.from, date.to)
          }
        }}
      />
    </div>
  )
} 