import { useEffect, useRef, useState } from "react";

import OrderTrackingSteps from "../../components/OrderTrackingSteps";
import { FaCheckSquare } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import moment from "moment";

const DATA = [
  {
    order_id: "001",
    order_date: "22/12/2021",
    order_total: "1050",
    items: 1,
    viewSummary_link: "",
    downloadInvioce_link: "",
    shipping_details: {
      status: "delivered",
      delivery_estimate: "26/12/2021",
      shipping_address: {
        name: "Amruth Kuntamalla",
        address1: "Anjana FLex, near Sri Rama Udipi Hotel",
        city: "Warangal",
        state: "telangana",
        pin_code: "506164",
      },
    },
    products: [
      {
        product_link: "/Warmth-Pineapple-Cake",
        product_img: "http://www.cakeworld.in/images/web/201.jpg",
        product_name:
          "Warmth Pineapple Cake Warmth Pineapple Cake Warmth Pineapple Cake",
        pruduct_price: "1100",
      },
    ],
    payment_info: {
      payment_method: "Credit Card",
    },
    order_summary: {
      items: 1050,
      tax: 100,
      delivery_charge: 0,
      total: 1100,
      coupon_applied: 50,
      order_total: 1050,
    },
  },
  {
    order_id: "002",
    order_date: "22/12/2021",
    order_total: "2100",
    items: 2,
    viewSummary_link: "",
    downloadInvioce_link: "",
    shipping_details: {
      status: "delivered",
      delivery_estimate: "26/12/2021",
      shipping_address: {
        name: "Amruth Kuntamalla",
        address1: "Anjana FLex, near Sri Rama Udipi Hotel",
        city: "Warangal",
        state: "telangana",
        pin_code: "506164",
      },
    },
    products: [
      {
        product_link: "/Sweet-Delight-Choco-Truffle-Cake",
        product_img: "http://www.cakeworld.in/images/web/130.jpg",
        product_name: "Sweet Delight Choco Truffle Cake",
        pruduct_price: "1100",
      },
      {
        product_link: "/Warmth-Pineapple-Cake",
        product_img: "http://www.cakeworld.in/images/web/201.jpg",
        product_name:
          "Warmth Pineapple Cake Warmth Pineapple Cake Warmth Pineapple Cake",
        pruduct_price: "1100",
      },
    ],
    payment_info: {
      payment_method: "Credit Card",
    },
    order_summary: {
      items: 2200,
      tax: 100,
      delivery_charge: 0,
      total: 2300,
      coupon_applied: 200,
      order_total: 2100,
    },
  },
];

export async function getServerSideProps({ query }) {
  const { order_id } = query;
  const orderData = DATA.find((order) => {
    return order.order_id === order_id;
  });
  return {
    props: {
      orderData,
    },
  };
}

export default function orderDetails(props) {
  const { orderData } = props;
  return (
    <div className="min-h-screen">
      <main className="py-2">
        <div className="mt-2 sm:mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-2 sm:px-6 md:max-w-7xl md:grid-flow-col-dense md:grid-cols-3">
          {/* Left side section */}

          <div className="space-y-6 md:col-start-1 md:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="px-4 col-span-2">
                <h2 className="my-2 text-xl font-bold">View Order Details</h2>
                <div className="flex flex-col divide-y total-price border border-gray-300 mb-6 rounded-lg py-2">
                  <div className="py-2 px-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold tracking-tight text-gray-500">
                        Order Date
                      </h3>
                      <p className="text-gray-900 text-sm font-semibold">
                        {moment(Date(orderData.order_date)).format("LL")}
                      </p>
                    </div>
                    <div className="flex  justify-between ">
                      <h3 className="text-sm font-semibold tracking-tight   text-gray-500">
                        Order ID
                      </h3>
                      <p className="text-gray-900 text-sm font-semibold">
                        {orderData.order_id}
                      </p>
                    </div>
                    <div className="flex  justify-between">
                      <h3 className="text-sm font-semibold  tracking-tight   text-gray-500">
                        Order Total
                      </h3>
                      <p className="text-gray-900 text-sm font-semibold">
                        {orderData.order_total}{" "}
                        <span className="text-gray-500 text-sm">{`(${orderData.items} item)`}</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-4 ">
                    <div className="flex justify-between ">
                      <h3 className="text-sm font-semibold  tracking-tight text-gray-500">
                        View Order Summary
                      </h3>
                      <Link href={orderData.viewSummary_link}>
                        <a className="sm:mt-0 sm:ml-6 sm:flex-shrink-0  flex items-center ">
                          <IoIosArrowForward className="ml-auto text-sm font-light" />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex  justify-between ">
                      <h3 className="text-sm font-semibold  tracking-tight text-gray-500">
                        Download Invoice
                      </h3>
                      <Link href={orderData.downloadInvioce_link}>
                        <a className="sm:mt-0 sm:ml-6 sm:flex-shrink-0  flex items-center ">
                          <IoIosArrowForward className="ml-auto text-sm font-light" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <h2 className="my-2 text-xl font-bold">Shipping Details</h2>
                <div className="flex flex-col divide-y total-price border border-gray-300 mb-6 rounded-lg py-2">
                  <div className="py-2 px-4">
                    <h3 className="text-sm font-semibold tracking-tight text-gray-500">
                      Free Delivery on eligible orders
                    </h3>
                  </div>
                  <div className="py-3 px-4">
                    <h2 className="text-md font-bold capitalize">
                      {orderData.shipping_details.status}
                    </h2>
                    <p className="text-md font-semibold text-gray-500">
                      Delivery Estimate:
                    </p>
                    <p className="text-md font-bold text-green-700">
                      {moment(
                        Date(orderData.shipping_details.delivery_estimate)
                      ).format("LL")}
                    </p>
                    {orderData.products.map((product, i) => {
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-6 gap-4 sm:gap-8 mt-2"
                        >
                          <img
                            src={product.product_img}
                            className="rounded-sm col-span-2"
                          />
                          <Link href={`/product${product.product_link}`}>
                            <a className="col-span-3 text-gray-900 text-md font-bold">
                              {product.product_name}
                            </a>
                          </Link>
                          <div className="text-gray-700 text-sm font-semibold">
                            ₹ {product.pruduct_price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Right side section */}
          <section
            aria-labelledby="timeline-title"
            className="md:col-start-3 md:col-span-1"
          >
            <div className="px-4">
              <h2 className="my-2 text-xl font-bold">Order Summary</h2>
              <div className="flex flex-col divide-y total-price border border-gray-300 mb-6 rounded-lg py-2">
                <div className="py-2 px-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold tracking-tight text-gray-500">
                      Items
                    </h3>
                    <p className="text-gray-900 text-sm font-medium">
                      ₹ {orderData.order_summary.items}
                    </p>
                  </div>
                  <div className="flex  justify-between ">
                    <h3 className="text-sm font-semibold tracking-tight text-gray-500">
                      Tax
                    </h3>
                    <p className="text-gray-900 text-sm font-medium">
                      ₹ {orderData.order_summary.tax}
                    </p>
                  </div>
                  <div className="flex  justify-between">
                    <h3 className="text-sm font-semibold  tracking-tight   text-gray-500">
                      Delivery Charge
                    </h3>
                    <p className="text-gray-900 text-sm font-medium">
                      ₹ {orderData.order_summary.delivery_charge}
                    </p>
                  </div>
                  <div className="flex  justify-between">
                    <h3 className="text-sm font-semibold  tracking-tight   text-gray-500">
                      Total
                    </h3>
                    <p className="text-gray-900 text-sm font-medium">
                      ₹ {orderData.order_summary.total}
                    </p>
                  </div>
                  <div className="flex  justify-between">
                    <h3 className="text-sm font-semibold  tracking-tight   text-gray-500">
                      Coupon Applield
                    </h3>
                    <p className="text-gray-900 text-sm font-medium">
                      - ₹ {orderData.order_summary.coupon_applied}
                    </p>
                  </div>

                  <div className="flex  justify-between">
                    <h3 className="text-md font-bold  tracking-tight   text-gray-700">
                      Order Total
                    </h3>
                    <p className="text-red-700 text-md font-bold">
                      ₹ {orderData.order_summary.order_total}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="my-2 text-xl font-bold">Shipping Address</h2>
              <div className="total-price border border-gray-300 mb-6 rounded-lg py-4  px-2">
                <div className="mt-1 text-sm font-semibold text-gray-700 px-4">
                  <p>{orderData.shipping_details.shipping_address.name}</p>
                  <p className="mt-1 sm:mt-0">
                    {orderData.shipping_details.shipping_address.address1}
                  </p>
                  <p className="mt-1 sm:mt-0">
                    {orderData.shipping_details.shipping_address.city},
                    {orderData.shipping_details.shipping_address.state},
                    {orderData.shipping_details.shipping_address.pin_code}
                  </p>
                  <p className="mt-1 sm:mt-0">India</p>
                </div>
              </div>
              <h2 className="my-2 text-xl font-bold">Payment Information</h2>
              <div className="flex flex-col divide-y total-price border border-gray-300 mb-6 rounded-lg py-2">
                <div className="py-2 px-4 text-sm font-semibold">
                  <h3 className="  text-gray-900">Payment Method</h3>
                  <p className="text-gray-500">
                    {orderData.payment_info.payment_method}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
