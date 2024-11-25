import React from "react";

interface ActionButtonProps {
  title: string;
  color: string;
  hover: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, color, hover, onClick }) => {
  return (
    <button onClick={onClick}
      className={`w-full rounded-lg py-6 font-semibold ${color} ${hover}`}
    >
      {title}
    </button>
  );
};

export default ActionButton;