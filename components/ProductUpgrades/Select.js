import React, { useState } from "react";

export default function SelectUpgrade({ data, onChange }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="mt-10">
      <h3 className="text-sm text-gray-900 font-bold">{data.title}</h3>

      <fieldset className="mt-4">
        <legend className="sr-only">Choose your preference</legend>
        <div className="grid gap-4 grid-cols-3 lg:grid-cols-4">
          {data.values.map((option, k) => (
            <label
              key={option.valueID}
              className={
                selected === k
                  ? "group ring-2 ring-red-600 relative duration-150 hover:border-red border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-red-700 cursor-pointer"
                  : "group relative duration-150 hover:border-red-900 border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-black cursor-pointer"
              }
            >
              <input
                type="radio"
                name={option.valueID}
                value="XS"
                onClick={() => {
                  onChange(
                    k,
                    option.extraCost - data.values[selected].extraCost
                  );
                  setSelected(k);
                }}
                className="sr-only"
                aria-labelledby={`${option.valueID}-label`}
              />
              <p id={`${option.valueID}-label`}>{option.label}</p>

              <div
                className="hover:border-red-400 absolute -inset-px rounded-md pointer-events-none"
                aria-hidden="true"
              ></div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
