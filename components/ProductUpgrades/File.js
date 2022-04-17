import moment from "moment";
import React from "react";

export default function FileUpgrade({ data, onChange }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-bold">{data.title}</h3>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Select a {data.title}</legend>
        <div>
          <div className="mt-1 border-b border-l border-gray-300 duration-200 focus-within:border-indigo-600">
            <input
              onChange={(e) => onChange(e.target.value)}
              type="file"
              min={moment().format("YYYY-MM-DD")}
              className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
