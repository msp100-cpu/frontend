import React, { useEffect, useState } from "react";
// import { CheckIcon } from "@heroicons/react/solid";
import { TiTick } from "react-icons/ti";

const steps = [
  {
    name: "Order today",
    description: "s ",
    href: "#",
    status: "complete",
  },
  {
    name: "Shipped",
    description: "ss ",
    href: "#",
    status: "current",
  },
  {
    name: "Out of delivery",
    description: "ds ",
    href: "#",
    status: "upcoming",
  },
  {
    name: "Arriving  15 jun",
    description: "sd ",
    href: "#",
    status: "upcoming",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const OrderTrackingSteps = () => {
  return (
    <div className="bg-white rounded-md sm:rounded-lg p-4 mt-2 mb-2">
      <nav aria-label="Progress">
        <ol className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className={classNames(
                stepIdx !== steps.length - 1 ? "pb-10" : "",
                "relative"
              )}
            >
              {step.status === "complete" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-green-600"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                  >
                    <span className="h-9 flex items-center">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-green-600 rounded-full group-hover:bg-green-800">
                        <TiTick
                          className="w-5 h-5 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="ml-4">
                      <span className="text-xs font-semibold tracking-wide uppercase">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              ) : step.status === "current" ? (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                    aria-current="step"
                  >
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-yellow-600 rounded-full">
                        <span className="h-2.5 w-2.5 bg-yellow-600 rounded-full" />
                      </span>
                    </span>
                    <span className="ml-4">
                      <span className="text-xs font-semibold tracking-wide uppercase text-yellow-600">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {stepIdx !== steps.length - 1 ? (
                    <div
                      className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300"
                      aria-hidden="true"
                    />
                  ) : null}
                  <a
                    href={step.href}
                    className="relative flex items-start group"
                  >
                    <span className="h-9 flex items-center" aria-hidden="true">
                      <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                      </span>
                    </span>
                    <span className="ml-4">
                      <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">
                        {step.name}
                      </span>
                    </span>
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default OrderTrackingSteps;
