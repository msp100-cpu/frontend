import React from "react";
import InputField from "../../components/Inputs/Text";
import Link from "next/link";
import { RiAccountBoxFill, RiBuilding4Fill } from "react-icons/ri";
import { RiLockPasswordFill, RiLogoutCircleRFill } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { clearData } from "../../Redux/actions/userAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const AccountsPage = () => {
  const dispatch = useDispatch();
  const routes = [
    {
      label: "Account",
      route: "/account/",
      icon: (
        <RiAccountBoxFill className="text-gray-700 group-hover:text-gray-800 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
      ),
    },
    {
      label: "Your Orders",
      route: "/account/orders",
      icon: (
        <FaTruckLoading className="text-gray-700 group-hover:text-gray-800 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
      ),
    },
    {
      label: "Password",
      route: "/account/password",
      icon: (
        <RiLockPasswordFill className="text-gray-700 group-hover:text-gray-800 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
      ),
    },
    {
      label: "Your Wishlist",
      route: "/account/wishlist",
      icon: (
        <BsHeartFill className="text-gray-700 group-hover:text-gray-800 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
      ),
    },
    {
      label: "Your recommendation",
      route: "/account/recommend",
      icon: (
        <RiBuilding4Fill className="text-gray-700 group-hover:text-gray-800 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
      ),
    },
  ];
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      <main className="max-w-8xl mx-auto pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
            <nav className="space-y-1">
              {/* <!-- Current: "bg-gray-50 text-orange-600 hover:bg-white", Default: "text-gray-900 hover:text-gray-900 hover:bg-gray-50" --> */}
              {routes.map((route, k) => (
                <Link key={k} href={route.route}>
                  <a className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                    {/* <!--
              Heroicon name: outline/user-circle

              Current: "text-orange-500", Default: "text-gray-400 group-hover:text-gray-500"
            --> */}
                    {route.icon}
                    <span className="truncate">{route.label}</span>
                  </a>
                </Link>
              ))}
              <a
                onClick={() => {
                  dispatch(clearData());
                  router.push("/login");
                }}
                className="text-red-600 hover:bg-red-600 duration-150 hover:text-white cursor-pointer group rounded-md px-3 py-2 flex items-center text-sm font-bold"
              >
                <RiLogoutCircleRFill className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                <span className="truncate">Logout</span>
              </a>
            </nav>
          </aside>

          {/* <!-- Payment details --> */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-10">
            <section aria-labelledby="payment-details-heading">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h2
                        id="payment-details-heading"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Payment details
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Update your billing information. Please note that
                        updating your location could affect your tax rates.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-4 gap-6">
                      <div className="col-span-4 sm:col-span-2">
                        <InputField
                          title="First Name"
                          name="FirstName"
                          onChange={(e) => console.log(e)}
                          placeholder="Enter your first name"
                          type="text"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <InputField
                          title="Last Name"
                          name="LastName"
                          onChange={(e) => console.log(e)}
                          placeholder="Enter your last name"
                          type="text"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          for="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-1">
                        <label
                          for="expiration-date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Expration date
                        </label>
                        <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          autoComplete="cc-exp"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                          placeholder="MM / YY"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-1">
                        <label
                          for="security-code"
                          className="flex items-center text-sm font-medium text-gray-700"
                        >
                          <span>Security code</span>
                          {/* <!-- Heroicon name: solid/question-mark-circle --> */}
                          <svg
                            className="ml-1 flex-shrink-0 h-5 w-5 text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </label>
                        <input
                          type="text"
                          name="security-code"
                          id="security-code"
                          autoComplete="cc-csc"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          for="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country / Region
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div className="col-span-4 sm:col-span-2">
                        <label
                          for="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          ZIP / Postal
                        </label>
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* <!-- Plan --> */}
            <section aria-labelledby="plan-heading">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h2
                        id="plan-heading"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Plan
                      </h2>
                    </div>

                    <fieldset>
                      <legend className="sr-only">Pricing plans</legend>
                      <div className="relative bg-white rounded-md -space-y-px">
                        {/* <!-- Checked: "bg-orange-50 border-orange-200 z-10", Not Checked: "border-gray-200" --> */}
                        <label className="rounded-tl-md rounded-tr-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none">
                          <div className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="pricing-plan"
                              value="Startup"
                              className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900"
                              aria-labelledby="pricing-plans-0-label"
                              aria-describedby="pricing-plans-0-description-0 pricing-plans-0-description-1"
                            />
                            <span
                              id="pricing-plans-0-label"
                              className="ml-3 font-medium text-gray-900"
                            >
                              Startup
                            </span>
                          </div>
                          <p
                            id="pricing-plans-0-description-0"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                          >
                            {/* <!-- Checked: "text-orange-900", Not Checked: "text-gray-900" --> */}
                            <span className="font-medium">$29 / mo</span>
                            {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                            <span>($290 / yr)</span>
                          </p>
                          {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                          <p
                            id="pricing-plans-0-description-1"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                          >
                            Up to 5 active job postings
                          </p>
                        </label>

                        {/* <!-- Checked: "bg-orange-50 border-orange-200 z-10", Not Checked: "border-gray-200" --> */}
                        <label className="relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none">
                          <div className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="pricing-plan"
                              value="Business"
                              className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900"
                              aria-labelledby="pricing-plans-1-label"
                              aria-describedby="pricing-plans-1-description-0 pricing-plans-1-description-1"
                            />
                            <span
                              id="pricing-plans-1-label"
                              className="ml-3 font-medium text-gray-900"
                            >
                              Business
                            </span>
                          </div>
                          <p
                            id="pricing-plans-1-description-0"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                          >
                            {/* <!-- Checked: "text-orange-900", Not Checked: "text-gray-900" --> */}
                            <span className="font-medium">$99 / mo</span>
                            {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                            <span>($990 / yr)</span>
                          </p>
                          {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                          <p
                            id="pricing-plans-1-description-1"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                          >
                            Up to 25 active job postings
                          </p>
                        </label>

                        {/* <!-- Checked: "bg-orange-50 border-orange-200 z-10", Not Checked: "border-gray-200" --> */}
                        <label className="rounded-bl-md rounded-br-md relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none">
                          <div className="flex items-center text-sm">
                            <input
                              type="radio"
                              name="pricing-plan"
                              value="Enterprise"
                              className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-gray-900"
                              aria-labelledby="pricing-plans-2-label"
                              aria-describedby="pricing-plans-2-description-0 pricing-plans-2-description-1"
                            />
                            <span
                              id="pricing-plans-2-label"
                              className="ml-3 font-medium text-gray-900"
                            >
                              Enterprise
                            </span>
                          </div>
                          <p
                            id="pricing-plans-2-description-0"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                          >
                            {/* <!-- Checked: "text-orange-900", Not Checked: "text-gray-900" --> */}
                            <span className="font-medium">$249 / mo</span>
                            {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                            <span>($2490 / yr)</span>
                          </p>
                          {/* <!-- Checked: "text-orange-700", Not Checked: "text-gray-500" --> */}
                          <p
                            id="pricing-plans-2-description-1"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right"
                          >
                            Unlimited active job postings
                          </p>
                        </label>
                      </div>
                    </fieldset>

                    <div className="flex items-center">
                      {/* <!-- Enabled: "bg-orange-500", Not Enabled: "bg-gray-200" --> */}
                      <button
                        type="button"
                        className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200"
                        role="switch"
                        aria-checked="true"
                        aria-labelledby="annual-billing-label"
                      >
                        {/* <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" --> */}
                        <span
                          aria-hidden="true"
                          className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        ></span>
                      </button>
                      <span className="ml-3" id="annual-billing-label">
                        <span className="text-sm font-medium text-gray-900">
                          Annual billing{" "}
                        </span>
                        <span className="text-sm text-gray-500">
                          (Save 10%)
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </section>

            {/* <!-- Billing history --> */}
            <section aria-labelledby="billing-history-heading">
              <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 sm:px-6">
                  <h2
                    id="billing-history-heading"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Billing history
                  </h2>
                </div>
                <div className="mt-6 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Date
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Description
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Amount
                              </th>
                              {/* <!--
                            `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                          --> */}
                              <th
                                scope="col"
                                className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                <span className="sr-only">View receipt</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                <time datetime="2020-01-01">1/1/2020</time>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Business Plan - Annual Billing
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                CA$109.00
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  href="#"
                                  className="text-orange-600 hover:text-orange-900"
                                >
                                  View receipt
                                </a>
                              </td>
                            </tr>

                            {/* <!-- More payments... --> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
export default AccountsPage;
