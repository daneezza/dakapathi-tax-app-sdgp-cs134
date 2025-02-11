import React from "react";


interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="progressBar">
      <div className="filled" style={{ width: `${progress * 100}%` }} />
    </div>
  );
};

export default ProgressBar;
