import React from "react";

const Feature = ({ color, background, label }) => {
  return (
    <div className="absolute top-0 z-30 flex">
      <div
        className={`${background} ${color} p-1 font-semibold px-2 text-white z-10 transform text-xs`}
      >
        {label}
      </div>
      <div
        className={`${background} z-0 w-5 text-white transform text-xs skew-x-12 -ml-4`}
      ></div>
    </div>
  );
};

export default Feature;
