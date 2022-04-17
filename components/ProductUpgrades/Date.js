import moment from "moment";
import React, { useState } from "react";

export default function DateUpgrade({
  data,
  required = false,
  error,
  onChange,
}) {
  const [date, setDate] = useState("");
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-bold">
          {data.title} {required && <span className="text-red-600">*</span>}
        </h3>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Select a {data.title}</legend>
        <div>
          <div className="mt-1 border-b border-l border-gray-300 duration-200 focus-within:border-red-600">
            <input
              onChange={(e) => {
                if (moment().format("YYYY-MM-DD") < e.target.value) {
                  console.log("future");
                  onChange(e.target.value);
                  setDate(e.target.value);
                }
              }}
              value={date}
              type="date"
              min={moment().format("YYYY-MM-DD")}
              className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-red-600 focus:ring-0 sm:text-sm"
            />
          </div>
          {date && moment().format("YYYY-MM-DD") > date && (
            <div className="text-red-500 text-sm font-semibold pt-1">
              Please enter a valid date
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm font-semibold pt-1">
              {error}
            </div>
          )}
        </div>
      </fieldset>
    </div>
  );
}
