import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ value, onChange, min = 1, max = 99, label, className }) => (
  <div className={className}>
    {label && <span className="block mb-1 font-medium">{label}</span>}
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <Minus size={16} />
      </Button>
      <span className="w-8 text-center">{value}</span>
      <Button variant="outline" size="icon" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}>
        <Plus size={16} />
      </Button>
    </div>
  </div>
);

export default Counter; 