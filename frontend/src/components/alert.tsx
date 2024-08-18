import React from "react";
import classNames from "classnames";

interface AlertProps {
  onDismiss?: () => void;
  type?: "error" | "success" | "info" | "warning";
  children?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  onDismiss = null,
  type = "error",
  children,
}) => {
  const klasses = {
    error:
      "bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4",
    success:
      "bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4",
    info: "bg-blue-50 border border-blue-200 text-sm text-blue-600 rounded-md p-4",
    warning:
      "bg-yellow-50 border border-yellow-200 text-sm text-yellow-600 rounded-md p-4",
  };

  const klass = classNames(klasses[type], "relative");

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  return (
    <div className={klass} role="alert">
      {children}

      {onDismiss && (
        <div
          tabIndex={0}
          onKeyDown={handleDismiss}
          onClick={handleDismiss}
          className="absolute cursor-pointer inset-y-0 right-2 flex flex-col justify-center text-red font-bold"
        >
          X
        </div>
      )}
    </div>
  );
};

export default Alert;
