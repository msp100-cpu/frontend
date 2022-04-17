import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getProductsInCart,
  removeProductFromCart,
} from "../../api/productsAPIs";
import {
  clearData,
  updateCart,
  toggleCart,
} from "../../Redux/actions/userAction";
import Link from "next/link";
import { useRouter } from "next/router";

const Cart = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, token, cart } = useSelector((store) => store);
  const [data, setData] = useState({
    subTotal: 0,
    cart: [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const colors = ["#FCFFA6", "#C1FFD7", "#FDB9FC", "#F4D19B", "#EFEFEF"];

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(clearData());
      router.push("/", undefined, { shallow: true });
    }

    setOpen(true);
    getProductsInCart(token)
      .then((response) => {
        console.log(response);

        let subTotal = 0;
        for (let x of response) {
          //

          //  adding subtotal
          subTotal += x.overAllPrice * parseInt(x.quantity);
        }

        console.log(subTotal);

        dispatch(updateCart(response));
        setData({
          ...data,
          cart: response,
          subTotal: parseFloat(subTotal).toFixed(2),
        });
      })
      .catch((err) => {
        console.log(err);
        // if (!err.isLoggedIn) {
        //   dispatch(clearData());
        // }
      });
  }, []);

  const onRemove = (cartItemID) => {
    removeProductFromCart(token, { cartProductID: cartItemID })
      .then((res) => {
        let newCartList = cart.filter((item) => item.cartItemID !== cartItemID);
        dispatch(updateCart(newCartList));
        console.log(newCartList);
        let subTotal = 0;
        for (let x of newCartList) {
          subTotal += x.overAllPrice * parseInt(x.quantity);
        }
        console.log(subTotal);
        setData({ ...data, subTotal, cart: newCartList });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="fixed z-30 inset-0 overflow-hidden"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          onClick={() => {
            setOpen(!open);
            setTimeout(() => {
              onClose();
            }, 400);
          }}
          className={
            open
              ? "ease-in-out opacity-80 duration-300 absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              : "ease-in-out opacity-0 duration-300 absolute inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          }
          aria-hidden="true"
        ></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-4xl flex">
          <div
            className={
              open
                ? "translate-x-0 transform transition ease-in-out duration-300 sm:duration-700 w-screen max-w-xl"
                : "translate-x-full transform transition ease-in-out duration-300 sm:duration-700 w-screen max-w-xl"
            }
          >
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={() => {
                        setOpen(!open);
                        setTimeout(() => {
                          onClose();
                        }, 400);
                      }}
                      className="-m-2 p-2 text-gray-700 hover:text-black"
                    >
                      <span className="sr-only">Close panel</span>
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {data.cart.map((product, k) => (
                        <li key={k} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.productLink.imageURLs[0]}
                              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <a
                                  className="font-semibold"
                                  href={`product/${product.productLink.productLink}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {product.orderName}
                                </a>
                              </div>
                              <div className="flex justify-between">
                                <p className="my-auto text-sm font-medium text-black">
                                  ₹{parseFloat(product.overAllPrice).toFixed(2)}
                                </p>
                                <input
                                  className="border-2 text-sm py-0 w-9 p-1 border-gray-700 rounded-md font-bold"
                                  value={product.quantity}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="max-w-xl">
                                <div className="mt-1 max-w-3xl text-sm text-gray-500 grid grid-cols-3">
                                  {product.properties.map((item, k) => (
                                    <div
                                      style={{
                                        borderColor: colors[k % 5],
                                        backgroundColor: colors[k % 5],
                                      }}
                                      className="m-1 border-2 py-1 px-2 text-center rounded-md text-black"
                                    >
                                      <span className="my-auto text-xs">
                                        {item}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex w-full justify-end">
                                <button
                                  type="button"
                                  onClick={() => onRemove(product.cartItemID)}
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {console.log(data.subTotal)}
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between font-medium text-black">
                  <p>Subtotal</p>
                  <p className="font-bold">₹ {data.subTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link href="/checkout/address">
                    <a
                      onClick={() => {
                        setOpen(!open);
                        setTimeout(() => {
                          onClose();
                        }, 400);
                      }}
                      className="flex cursor-pointer justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-black duration-150"
                    >
                      Checkout
                    </a>
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
