import React from "react";
import InputField from "../Inputs/Text";

export default function TextUpgrade({
  data,
  onChange,
  defaultValue = "",
  type = "text",
  required = false,
  error = "",
  success = "",
}) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-900 font-bold">
          {data.title}
          {required && <span className="text-red-600 pl-1">*</span>}
        </h3>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">
          {data.title}
          {required && <span className="text-red-600">*</span>}
        </legend>

        <InputField
          defaultValue={defaultValue}
          onChange={onChange}
          type={type}
        />
      </fieldset>

      {error && (
        <div className="mt-1 text-sm text-red-600 font-bold">{error}</div>
      )}
      {success && (
        <div className="mt-1 text-sm text-green-600 font-bold">
          Yay! This product is deliverable to this pincode!
        </div>
      )}
    </div>
  );
}
