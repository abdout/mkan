"use client";

import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange: (value: Range) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ 
  value, 
  onChange, 
  disabledDates 
}) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      onChange={(val: RangeKeyDict) => onChange(val.selection)}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  );
};

export default Calendar;
