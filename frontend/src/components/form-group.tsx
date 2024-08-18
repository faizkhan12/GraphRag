import React from "react";

interface FormGroupProps {
  label: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, children }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label htmlFor="" className="block text-white text-sm mb-2">
          {label} <span className="text-red-600">*</span>
        </label>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};

export default FormGroup;
