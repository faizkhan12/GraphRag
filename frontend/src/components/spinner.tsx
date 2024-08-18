// Spinner.tsx
import React from "react";

const Spinner: React.FC = () => {
  return (
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"
      role="status"
    >
      <span className="sr-only">Uploading...</span>
    </div>
  );
};

export default Spinner;
