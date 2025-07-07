import React from 'react';

interface FormFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, description, children, className }) => (
  <div className={className}>
    <label className="block mb-1 font-medium">{label}</label>
    {description && <p className="mb-2 text-muted-foreground text-sm">{description}</p>}
    {children}
  </div>
);

export default FormField; 