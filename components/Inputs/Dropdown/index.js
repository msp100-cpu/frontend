import React, { useState } from "react";

export default function Dropdown({ options, label, onChange }) {
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
              setTimeout(() => {
                setHide(!hide);
              }, 200);
            }}
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-border-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {label}
            {/* <!-- Heroicon name: solid/chevron-down --> */}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {hide && (
          <div
            className={
              open
                ? "transition ease-in duration-75 transform opacity-100 scale-100 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                : "transform opacity-0 scale-95 transition ease-out duration-100 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
              {options.map((option, k) => (
                <div
                  key={k}
                  className="text-gray-700 cursor-pointer block px-4 py-2 text-sm"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  onClick={() => {
                    console.log(k);
                    onChange(k);
                    setOpen(!open);
                    setTimeout(() => {
                      setHide(!hide);
                    }, 200);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
