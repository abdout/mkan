"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={onReduce}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          disabled={value === 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="font-medium text-lg min-w-[20px] text-center">
          {value}
        </div>
        <Button
          onClick={onAdd}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Counter;
