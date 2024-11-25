import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="font-bold text-xl 2xl:text-2xl mb-2">{title}</h1>
      <span className="text-gray-500 text-sm 2xl:text-base">
        {description}
      </span>
    </div>
  );
};

export default Title;
