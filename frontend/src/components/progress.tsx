import React, { useEffect, useState } from "react";

interface ProgressProps {
  progress: number;
  children?: React.ReactNode;
}

const Progress: React.FC<ProgressProps> = ({ progress, children }) => {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const animationDuration = 1000; // Duration in milliseconds

    const startWidth = width;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsedTime = time - startTime;
      const progressFraction = Math.min(elapsedTime / animationDuration, 1);
      const newWidth = startWidth + (progress - startWidth) * progressFraction;
      setWidth(newWidth);

      if (progressFraction < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [progress]);

  return (
    <>
      {children && width === 100 ? (
        children
      ) : (
        <div className="flex my-3 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
          <div
            className="flex flex-col justify-center overflow-hidden bg-blue-800"
            role="progressbar"
            style={{ width: `${width}%` }}
          />
        </div>
      )}
    </>
  );
};

export default Progress;
