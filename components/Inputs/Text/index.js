import React from "react";

export default function InputField({
  type = "text",
  title,
  name,
  placeholder = "",
  onChange,
  defaultValue = "",
}) {
  return (
    <div>
      <label for={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <div className="mt-1 border-b border-gray-300 duration-200 focus-within:border-red-600">
        <input
          onChange={(e) => onChange(e.target.value)}
          type={type}
          name={name}
          onWheel={(e) => e.target.blur()}
          id={name}
          defaultValue={defaultValue}
          className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-red-600 focus:ring-0 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
