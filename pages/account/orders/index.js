import React, { useEffect, useState } from "react";
import InputField from "../../../components/Inputs/Text";
import Link from "next/link";
import { RiAccountBoxFill, RiBuilding4Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { GrDeliver } from "react-icons/gr";
import { useSelector } from "react-redux";
import moment from "moment";

const OrdersPage = () => {
  const { token } = useSelector((store) => store);
  const [data, setState] = useState({
    allOrders: [],
  });

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

  const orderItems = [
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "ASFG2084023",
      orderDatePlace: "Nov 15, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "30,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "QWERT3434R",
      orderDatePlace: "Nov 25, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "40,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "ASFG2084023",
      orderDatePlace: "Nov 25, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "10,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "ASFG2084023",
      orderDatePlace: "Nov 25, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "20,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "ASFG2084023",
      orderDatePlace: "Nov 25, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "20,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
    {
      orderId: "001",
      orderStatus: "deliverd",
      orderNumber: "ASFG2084023",
      orderDatePlace: "Nov 25, 2020",
      orderDeliveryDate: "Nov 25, 2020",
      orderTotalAmount: "20,000",
      orderImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      orderTitle: "Micro Back Pack",
      orderDescription:
        "Easy-access sleek front zipper compartment houses a Key holder, cardholder and a zipper pocket to secure important documents.",
    },
  ];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API}/user/orders`, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          return;
        }
        setState({ ...data, allOrders: res });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            </nav>
          </aside>

          {/* <!-- Order details --> */}
          <div className="space-y-6 sm:px-6 lg:px-0 col-span-10">
            <div className="flex-1 relative flex h-auto">
              <main className="flex-1 relative overflow-y-auto focus:outline-none">
                {/* <!-- Start main area--> */}
                <div className="py-6 px-4">
                  <div className="h-full rounded-lg">
                    <div className="text-2xl font-semibold">My Orders </div>
                    {/* <!-- Box Start --> */}
                    {data.allOrders.map((item, id) => {
                      return (
                        <div
                          className="bg-white shadow border mt-5 overflow-hidden sm:rounded-lg"
                          key={id}
                        >
                          {/* <!-- Box Head start --> */}

                          {console.log(item)}
                          <div className="flex justify-between">
                            <div className="grid grid-cols-3   ">
                              <div className="px-4 py-5 sm:px-6 ">
                                <p className="text-sm leading-6 font-medium text-gray-900 whitespace-nowrap	">
                                  Order Number
                                </p>
                                <p className="mt-1 max-w-2xl overflow-hidden text-xs text-gray-500">
                                  {item.orderID}
                                </p>
                              </div>
                              <div className="px-4 py-5 sm:px-6">
                                <p className="text-sm whitespace-nowrap leading-6 font-medium text-gray-900">
                                  Date Placed
                                </p>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                  {item.orderDatePlace}
                                  {moment(item.createdAt).format("DD-MM-YYYY")}
                                </p>
                              </div>
                              <div className="px-4 py-5 sm:px-6">
                                <p className="text-sm leading-6 font-medium text-gray-900 whitespace-nowrap	">
                                  Total Amount
                                </p>
                                <p className="mt-1 max-w-2xl whitespace-nowrap text-sm font-medium text-gray-900">
                                  ₹ {parseFloat(item.totalPrice).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="grid  grid-cols-2">
                              <div className="flex justify-center center px-4 py-5 sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex whitespace-nowrap items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  View Orders
                                </button>
                              </div>
                              <div className="flex justify-center center px-4 py-5 sm:px-6">
                                <button
                                  type="button"
                                  className="inline-flex  whitespace-nowrap items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  View Invoice
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* <!-- Box Body start --> */}

                          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="flex whitespace-nowrap overflow-x-scroll w-full">
                              {item?.orderItems.map((orderItem, k) => (
                                <div key={k} className="mb-3">
                                  <div className="flex border rounded-lg px-1 mr-2 flex-row overflow-hidden">
                                    <img
                                      className="h-16 w-16 rounded-lg m-2"
                                      src={orderItem.imageURL}
                                      alt=""
                                    />

                                    <div className="m-2 max-w-72">
                                      <p
                                        title={`${orderItem.title} ( x ${orderItem.quantity})`}
                                        className="text-sm font-medium text-gray-800"
                                      >
                                        {`${orderItem.title} ( x ${orderItem.quantity})`}
                                      </p>
                                      <p className="mt-1 text-sm font-medium text-gray-500  ">
                                        ₹{orderItem.price}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 mt-5">
                              <div className="sm:col-span-1">
                                {item.deliveryInfo.isDelivered ? (
                                  <p className="text-sm font-medium flex text-gray-500">
                                    <GoVerified className="text-green-600 flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
                                    Deliverd on {item.orderDeliveryDate}
                                  </p>
                                ) : (
                                  <p className="text-sm font-medium flex text-gray-900">
                                    <GrDeliver className="text-green-600 flex-shrink-0 -ml-1 mr-3 h-5 w-5" />
                                    Estimated Deilivery on:{" "}
                                    <span className="font-semibold ml-1">
                                      {item.orderDeliveryDate || "05 Feb, 2022"}
                                    </span>
                                  </p>
                                )}
                              </div>
                              <div className="sm:col-span-1 flex justify-evenly ">
                                <p className="text-sm font-medium text-blue-500 cursor-pointer">
                                  View Product
                                </p>
                                <p className="text-sm font-medium text-gray-300">
                                  |
                                </p>
                                <p className="text-sm font-medium text-blue-500 cursor-pointer">
                                  Buy Again
                                </p>
                              </div>
                            </dl>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* <!-- End main area --> */}
              </main>
              <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200">
                {/* <!-- Start secondary column (hidden on smaller screens) --> */}
                <div className="py-6 px-4">
                  <div className="h-full rounded-lg">
                    <div className="text-2xl font-semibold">Your Wishlist</div>
                  </div>
                </div>
                {/* <!-- End secondary column --> */}
              </aside>
            </div>{" "}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
