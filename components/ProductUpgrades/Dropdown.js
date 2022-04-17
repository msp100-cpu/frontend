import React, { useState } from "react";
import Dropdown from "../Inputs/Dropdown";

export default function DropdownUpgrade({
  data,
  required = false,
  onChange,
  error = false,
}) {
  const [selected, setSelected] = useState(-1);
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-bold">
          {data.title}
          {required && <span className="text-red-600 pl-1">*</span>}
        </h3>
      </div>
      <fieldset className="mt-4">
        <legend className="sr-only">Select a {data.title}</legend>
        <div className="flex">
          <div className="my-auto">
            Selected:{" "}
            <span className="font-bold">{data.values[selected]?.label}</span>
          </div>
          <div className="mt-1 ml-3 duration-200">
            <Dropdown
              label={`Select ${data.title}`}
              options={data.values}
              onChange={(e) => {
                if (data.values[selected]) {
                  onChange(
                    e,
                    data.values[e].extraCost - data.values[selected].extraCost
                  );
                } else {
                  onChange(e, data.values[e].extraCost);
                }
                setSelected(e);
              }}
            />
          </div>
        </div>
      </fieldset>
      {error && (
        <div className="mt-1 text-sm text-red-600 font-bold">{error}</div>
      )}
    </div>
  );
}
