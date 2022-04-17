import React from "react";

export default function ProgressBar({ stages = [], selected = 0 }) {
  return (
    <nav className="py-4 px-7" aria-label="Progress">
      <ol role="list" className="flex items-center justify-center">
        {stages.map((stage, k) => {
          if (selected > k) {
            return (
              <li
                key={k}
                className={
                  stages.length === k + 1 ? "relative" : "relative w-full"
                }
              >
                {/* <!-- Completed Step --> */}
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="h-0.5 w-full bg-red-600"></div>
                </div>
                <a
                  href="#"
                  className="relative w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-900"
                >
                  {/* <!-- Heroicon name: solid/check --> */}
                  <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Step {k + 1}</span>
                  <span className="absolute mt-16 text-xs">{stage}</span>
                </a>
              </li>
            );
          } else if (selected === k) {
            return (
              <li
                key={k}
                className={
                  stages.length === k + 1 ? "relative" : "relative w-full"
                }
              >
                {/* <!-- Current Step --> */}
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  {<div className="h-0.5 w-full bg-gray-200"></div>}
                </div>
                <a
                  href="#"
                  className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-red-600 rounded-full"
                  aria-current="step"
                >
                  <span
                    className="h-2.5 w-2.5 bg-red-600 rounded-full"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Step {k + 1}</span>
                  <span className="absolute mt-16 text-xs">{stage}</span>
                </a>
              </li>
            );
          } else {
            return (
              <li
                key={k}
                className={
                  stages.length === k + 1 ? "relative" : "relative w-full"
                }
              >
                {/* <!-- Upcoming Step --> */}
                {k + 1 !== stages.length && (
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    {<div className="h-0.5 w-full bg-gray-200"></div>}
                  </div>
                )}
                <a
                  href="#"
                  className="group relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300"
                    aria-hidden="true"
                  ></span>

                  <span className="sr-only">Step {k + 1}</span>
                  <span className="absolute mt-16 text-xs">{stage}</span>
                </a>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}
