import React from 'react';

interface StepTitleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const StepTitle: React.FC<StepTitleProps> = ({ title, description, className }) => (
  <div className={className}>
    <h3>{title}</h3>
    {description && <p>{description}</p>}
  </div>
);

export default StepTitle; 