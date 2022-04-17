import React, { useEffect, useState } from "react";
import Link from "next/link";
import Categories from "../../components/Categories";
import { HomepageAPI } from "../../api/categoryAPIs";

import Loading from "../../components/Loading";
import InputSlider from "../../components/Inputs/slider";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { getProductsByCategoryID } from "../../api/productsAPIs";
import Feature from "../../components/Categories/Feature";
import { VscSettings } from "react-icons/vsc";

const CategoryPage = () => {
  const router = useRouter();
  const { category_id } = router.query;

  const [state, setStates] = useState({
    sortOpen: false,
    FilterOpen: false,
    onlyMobile: false,
  });
  const [data, setData] = useState({
    loading: true,
    error: false,
    products: [],
    FilterOpen: false,
    filterTypes: {},
    filters: [],
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    let category_id = window.location.pathname.split("/")[2];
    console.log("################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(category_id);

    getProductsByCategoryID({
      categoryLink: category_id,
      pageNumber: 1,
      count: 20,
      filters: {},
    })
      .then((response) => {
        if (response.error) {
          setData({ ...data, loading: true, error: response.error });
        } else {
          console.log("--", response);
          setData({ ...data, loading: false, ...response });
        }
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, loading: false, error: error.error });
      });
  }, []);


  return (
    <div className="bg-white">
      <NextSeo
        title={category_id?.replace("-", " ")}
        description={"Best Giftworld shop online"}
        openGraph={{
          type: "website",
          title: category_id,
          description: "Best Giftworld shop online",
          images: [
            {
              url: "/assets/full_logo.png",
              width: 800,
              height: 600,
              alt: category_id,
            },
          ],
        }}
      />
      {data.loading ? (
        <Loading />
      ) : (
        <div>
          {state.onlyMobile && (
            <div
              className="flex fixed inset-0 z-40 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div
                className={
                  state.FilterOpen
                    ? "opacity-100 transition-opacity ease-linear duration-300 fixed inset-0 bg-black bg-opacity-25"
                    : "opacity-0 transition-opacity ease-linear duration-300 fixed inset-0 bg-black bg-opacity-25"
                }
                onClick={() => {
                  setStates({ ...state, FilterOpen: !state.FilterOpen });
                  setTimeout(() => {
                    setStates({ ...state, onlyMobile: !state.onlyMobile });
                  }, 300);
                }}
                aria-hidden="true"
              ></div>

              <div
                className={
                  state.FilterOpen
                    ? "translate-y-0 transition ease-in-out duration-300 transform ml-auto relative max-w-full w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
                    : "translate-y-full transition ease-in-out duration-300 transform ml-auto relative max-w-full w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto"
                }
              >
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-gray-900">
                    Filters
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setStates({ ...state, FilterOpen: false });
                      setTimeout(() => {
                        setStates({
                          ...state,
                          onlyMobile: false,
                          FilterOpen: false,
                        });
                      }, 300);
                    }}
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    {/* <!-- Heroicon name: outline/x --> */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* <!-- Filters --> */}
                <form className="mt-4 border-t border-gray-200">
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Color</span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-mobile-0">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-0"
                            name="color[]"
                            value="white"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            White
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-1"
                            name="color[]"
                            value="beige"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Beige
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-2"
                            name="color[]"
                            value="blue"
                            type="checkbox"
                            checked
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Blue
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-3"
                            name="color[]"
                            value="brown"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Brown
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-4"
                            name="color[]"
                            value="green"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Green
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-color-5"
                            name="color[]"
                            value="purple"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-color-5"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Purple
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Category
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-mobile-1">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-0"
                            name="category[]"
                            value="new-arrivals"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {category_id?.split("-", " ")?.join(" ")}
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-1"
                            name="category[]"
                            value="sale"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Sale
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-2"
                            name="category[]"
                            value="travel"
                            type="checkbox"
                            checked
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Travel
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-3"
                            name="category[]"
                            value="organization"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Organization
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-category-4"
                            name="category[]"
                            value="accessories"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-category-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            Accessories
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">Size</span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-mobile-2">
                      <div className="space-y-6">
                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-0"
                            name="size[]"
                            value="2l"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            2L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-1"
                            name="size[]"
                            value="6l"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-1"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            6L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-2"
                            name="size[]"
                            value="12l"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-2"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            12L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-3"
                            name="size[]"
                            value="18l"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-3"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            18L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-4"
                            name="size[]"
                            value="20l"
                            type="checkbox"
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-4"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            20L
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="filter-mobile-size-5"
                            name="size[]"
                            value="40l"
                            type="checkbox"
                            checked
                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            for="filter-mobile-size-5"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            40L
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-mobile-0"
                        aria-expanded="false"
                      >
                        <span className="font-bold text-gray-900">Price</span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                    Expand icon, show/hide based on section open state.

                    Heroicon name: solid/plus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                    Collapse icon, show/hide based on section open state.

                    Heroicon name: solid/minus-sm
                  --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-mobile-0">
                      <div className="space-y-6">
                        <input
                          className="rounded-lg w-full overflow-hidden appearance-none bg-gray-400 h-3 w-128"
                          type="range"
                          min="1"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          <main className="max-w-7xl xl:max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between py-6 pb-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {category_id.replace("-", " ").toLocaleUpperCase()}
              </h1>

              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                      id="menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      Sort
                      {/* <!-- Heroicon name: solid/chevron-down --> */}
                      <svg
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                  {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}
                  {false && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div className="py-1" role="none">
                        {/* <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                --> */}
                        <a
                          href="#"
                          className="font-medium text-gray-900 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                        >
                          Most Popular
                        </a>

                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-1"
                        >
                          Best Rating
                        </a>

                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-2"
                        >
                          Newest
                        </a>

                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-3"
                        >
                          Price: Low to High
                        </a>

                        <a
                          href="#"
                          className="text-gray-500 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-4"
                        >
                          Price: High to Low
                        </a>
                      </div>
                    </div>
                  )}{" "}
                </div>

                <button
                  type="button"
                  className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  {/* <!-- Heroicon name: solid/view-grid --> */}
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStates({ ...state, onlyMobile: true });
                    setTimeout(() => {
                      setStates({
                        ...state,
                        FilterOpen: true,
                        onlyMobile: true,
                      });
                    }, 50);
                  }}
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  {/* <!-- Heroicon name: solid/filter --> */}
                  <VscSettings className="w-5 h-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                {/* <!-- Filters --> */}
                <form className="hidden lg:block">
                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Price Range
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-0">
                      <div className="space-y-4 my-3">
                        <InputSlider />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-0"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Cake Flavor
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-0">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                         <a href="/product"> <span className="mx-auto"  onClick={
                                                  async ()=>{
                                                    const result =  fetch(process.env.NEXT_PUBLIC_API+'/product/butterscotch',{
                                                          headers : { 
                                                            'Content-Type': 'application/json',
                                                            'Accept': 'application/json'
                                                           }
                                                        })
                                                        .then(response => response.json())
                                                        .then((res) =>{
                                                          return res;
                                                        } );
                                                   const a = await result;
                                                   console.log(a)
                                                      
                                                    }
                   
                          }>Butterscotch</span>
                         </a>
                        </div>
                        <div className="my-auto cursor-pointer bg-black text-white rounded-md hover:bottom-2 border-gray-200 duration-200 hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">Vanilla</span>
                        </div>
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">Chocolate</span>
                        </div>
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">Mango</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-1"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Pastery Preference
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="my-auto cursor-pointer bg-black text-white hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">Cool Cake</span>
                        </div>
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">Normal Cake</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 py-6">
                    <h3 className="-my-3 flow-root">
                      {/* <!-- Expand/collapse section button --> */}
                      <button
                        type="button"
                        className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                        aria-controls="filter-section-2"
                        aria-expanded="false"
                      >
                        <span className="font-medium text-gray-900">
                          Rating
                        </span>
                        <span className="ml-6 flex items-center">
                          {/* <!--
                      Expand icon, show/hide based on section open state.

                      Heroicon name: solid/plus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {/* <!--
                      Collapse icon, show/hide based on section open state.

                      Heroicon name: solid/minus-sm
                    --> */}
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </h3>
                    {/* <!-- Filter section, show/hide based on section state. --> */}
                    <div className="pt-6" id="filter-section-2">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">4+</span>
                        </div>
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">3+</span>
                        </div>
                        <div className="my-auto cursor-pointer hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">2+</span>
                        </div>
                        <div className="my-auto cursor-pointer bg-black text-white hover:bottom-2 border-gray-200 duration-200 rounded-md hover:border-gray-600 text-center p-3 border">
                          <span className="mx-auto">1+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* <!-- Product grid --> */}
                <div className="lg:col-span-3 xl:col-span-4 bg-white">
                  {/* <!-- Replace with your content --> */}
                  {/* PRODUCTS */}

                  <div className="mx-auto px-4">
                    <div className="mt-2 grid grid-cols-2 xs:grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                      {data.products.map((product) => (
                        <a
                          className="relative shadow-box duration-200 p-1"
                          href={"/product/" + product.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {product.feature && (
                            <Feature
                              color={product.feature.color}
                              background={product.feature.background}
                              label={product.feature.label}
                            />
                          )}

                          <div className="group relative transform group-hover:scale-105 duration-200">
                            <div className="w-full min-h-52 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-64 lg:aspect-none">
                              <img
                                src={product.imageURLs[0]}
                                alt={product.title}
                                className="w-full h-full object-center object-cover hover:scale-110 duration-300 lg:w-full lg:h-full"
                              />
                            </div>
                            <h3 className="text-lg my-1 text-black">
                              <a
                                href={"/product/" + product.productLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-sm"
                              >
                                {product.title}
                              </a>
                            </h3>

                            <div className="mb-4 group flex justify-between">
                              <div className="flex">
                                {
                                  
                                  (()=>{
                                    console.log("666666666666666^^^^^^^^^^^^^6666^^^^^^^^^^^^^^^^^^^^^^^^^");
                                    console.log(product);
                                    if( product.categoryType.categoryLink === 'customized-cakes'){
                                      return(
                                        <div>
                                          
                                        </div>

                                      )
                                    }
                                    else{
                                      return(
                                        <div>
                                           <p className="text-lg font-semibold text-red-500">
                                              ₹{" "}
                                              {parseInt(
                                                (product.basePrice *
                                                  (100 - product.discountPercentage)) /
                                                  100
                                              )}
                                            </p>
                                            <p className="text-sm mt-auto pb-1 md:text-xs pl-2 text-gray-900 line-through">
                                              ₹ {product.basePrice}
                                            </p>
                                        </div>
                                      )
                                      }
                                  })()
                                } 
                                
                               
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}{" "}
    </div>
  );
};

export default CategoryPage;

const Filters = () => {
  return <div></div>;
};
