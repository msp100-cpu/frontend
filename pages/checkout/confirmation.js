import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FaOpencart } from "react-icons/fa";
import { RiRecycleFill } from "react-icons/ri";
import { MdLocalOffer } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { BiLocationPlus } from "react-icons/bi";
import { BsShieldShaded } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { getUserCheckout, updateUserAddress } from "../../api/userAPIs";
import { createOrder, confirmPayment } from "../../api/orderAPIs";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import ProgressBar from "../../components/ProgressBar";
import Loading from "../../components/Loading";
import SimpleNotification from "../../components/Notification/simple";

export default function CheckoutConfirmation() {
  const { isLoggedIn, token, name, email, pincode, cart } = useSelector(
    (store) => store
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    loading: true,
    error: "",
    paymentSuccess: false,
    newAddressModel: false,
    step: 1,
    stages: ["Address", "Confirmation", "Payment"],
    paymentProcessing: false,
  });

  const [data, setData] = useState({
    addresses: [],
    totalProductsPrice: 0,
    deliveryPrice: 0,
    offerPrice: 0,
    newAddress: false,
    selectedAddress: false,
    changeAddress: false,
    voucher: "",
    deliveryOptions: [
      {
        cost: 124,
        label: "Standard home Delivery",
        delivered_by: "Saturday, 19th June",
      },
    ],
  });

  useEffect(() => {
    getUserCheckout({ token })
      .then((res) => {
        console.log("CHECKOUT", res);
        let subTotal = 0;
        for (let x of res.cartItems) {
          subTotal += x.price;
        }

        console.log(subTotal);
        setData({
          ...data,
          ...res,
          totalPayablePrice: parseFloat(
            subTotal + res.orderSummary.estimatedDelivery
          ).toFixed(2),
          totalProductsPrice: parseFloat(subTotal).toFixed(2),
          selectedAddress: res.addresses.length
            ? res.addresses[res.lastUsedAddress || 0]
            : false,
        });
        setState({ ...state, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, loading: false });
      });
  }, []);

  const onPaymentClick = async () => {
    if (!isLoggedIn) {
      router.push({
        pathname: "/login",
        query: { error: "Please login first!" },
      });
      return;
    }
    setState({ ...state, paymentProcessing: true });

    let body = {
      shippingAddress: data.addresses[data.selectedAddress],
      voucherCode: data.voucher,
    };

    try {
      const data = await createOrder(token, body);
      console.log(data);

      const options = {
        // //Put this in an API
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        name: "Its12 Giftworld",
        description: `Payment for its12 gifts`,
        order_id: data.id,
        currency: data.currency,
        amount: data.amount,
        //Here dont send amount, but, send
        handler: async (response) => {
          console.log(response);
          const res = await fetch(
            process.env.NEXT_PUBLIC_API + "/payment/accept",
            {
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                amount: data.amount,
                currency: data.currency,
                order_id: data.id,
              }),
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            }
          ).then((res) => res.json());
          console.log(res);
          try {
            if (res.status === "captured") {
              setState(true);
              setState({ ...state, paymentSuccess: "success" });
              setState({ ...state, paymentProcessing: false });
              router.push({
                pathname: "/checkout/payment",
                query: { status: true, data: JSON.stringify(response) },
              });
              return;
            } else {
              console.log(res);
              setState({ ...state, paymentSuccess: "fail" });
              return;
            }
          } catch (error) {
            console.log("ERROR", error);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: "",
        },
        theme: {
          color: "#3d3d3d",
        },
      };

      const rzp1 = await new window.Razorpay(options);
      await rzp1.open();
    } catch (err) {
      console.log(err);
      setData({ ...data, error: err.error ? err.error : err });
    }
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pb-10">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg mt-3 pt-2">
                <ProgressBar stages={state.stages} selected={1} />
                <div className="px-4 pt-7 pb-4 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Delivery to:
                  </h2>
                  <div className="py-3 my-2 mb-4">
                    {data.selectedAddress !== false && (
                      <div style={{ minHeight: "200px" }}>
                        <div className="bg-indigo-100 w-full rounded-md p-4">
                          <div className="my-2">
                            <div className="text-sm flex justify-between font-medium text-gray-900">
                              <div className="font-extrabold uppercase text-black my-auto">
                                {data.selectedAddress.city}
                              </div>
                              <div className="flex-shrink-0">
                                <div
                                  onClick={() =>
                                    router.push("/checkout/address")
                                  }
                                  className="inline-flex cursor-pointer uppercase items-center px-4 ml-2 py-2 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2  text-sm"
                                >
                                  Change
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm font-medium text-black">
                              <div>Name: {data.selectedAddress.fullName}</div>
                              <div className="mt-1 sm:mt-0">
                                {data.selectedAddress.address}
                              </div>
                              <div className="mt-1 sm:mt-0">
                                {data.selectedAddress.city} ,{" "}
                                {data.selectedAddress.pincode}
                              </div>

                              {data.selectedAddress.landmark && (
                                <div className="mt-1 sm:mt-0">
                                  Landmark: {data.selectedAddress.landmark}
                                </div>
                              )}

                              <div className="mt-1 sm:mt-0">India</div>
                              <div className="mt-1 sm:mt-0">
                                Mobile: {data.selectedAddress.mobileNumber}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Delivery Options Available
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Please select your address for delivery and billing purpose.
                    These are delivered via SMS to your mobile phone.
                  </p>
                  {data.deliveryOptions.map((delivery, k) => (
                    <div
                      key={k}
                      className="flex justify-between items-center mt-4 space-y-4 cursor-pointer"
                    >
                      <div className="flex justify-between items-center">
                        <input
                          id={delivery.label.replace(" ", "_")}
                          name="delivery"
                          type="radio"
                          required
                          className="focus:outline-none h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor={delivery.label.replace(" ", "_")}
                          className="ml-5 flex font-bold justify-evenly text-gray-700"
                        >
                          {delivery.delivered_by}
                          <span className="font-medium text-sm my-auto ml-2">
                            - By {delivery.label}
                          </span>
                        </label>
                      </div>
                      <div className="flex justify-evenly">
                        <label
                          htmlFor={delivery.label.replace(" ", "_")}
                          className="ml-3 flex justify-evenly text-black font-bold text-md bg-indigo-100 rounded px-2 py-1 whitespace-nowrap "
                        >
                          ₹ {delivery.cost}
                        </label>
                      </div>
                    </div>
                  ))}
                  {false && (
                    <div class="rounded-md bg-red-50 p-4 mt-6">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: solid/x-circle --> */}
                          <svg
                            class="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <h3 class="text-sm font-medium text-red-800">
                            Please select a delivery means
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white my-3 rounded-md p-3">
              <div className="text-sm font-semibold py-2">Promo Code</div>
              <div className="mb-3 flex justify-between">
                <input
                  className="text-sm w-full focus:outline-none placeholder-black bg-gray-100 p-2 py-3 border border-gray-100 rounded-l-md"
                  placeholder="ENTER VOUCHER CODE"
                />
                <button className="w-24 focus:outline-none rounded-r text-sm bg-gray-100 rounded-md font-extrabold text-black">
                  <div className="flex">
                    <MdLocalOffer className="my-auto text-red-500 text-lg" />
                    <span className="ml-2 uppercase text-red-500 font-semibold ">
                      Apply
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-md font-semibold text-gray-900"
              >
                Order Summary
              </h2>

              <section aria-labelledby="who-to-follow-heading">
                <div className="mt-2 rounded-md">
                  <div className="total-price border border-gray-100 mb-6 rounded-t-md rounded-r-md py-4 shadow px-2">
                    <div className="mt-2 flex justify-between">
                      <div>Total Products (Inc. GST)</div>
                      <div>₹ {data?.totalProductsPrice}</div>
                    </div>

                    <div className="mt-2 flex justify-between pb-3 border-b">
                      <div>Estimated Deilivery</div>
                      <div>₹ {data?.orderSummary?.estimatedDelivery}</div>
                    </div>
                    <div className="mt-3 flex justify-between text-lg font-extrabold">
                      <div className="font-semibold">Total</div>
                      <div>₹ {data?.totalPayablePrice}</div>
                    </div>
                  </div>

                  <div className="my-5">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 border border-gray-100 text-gray-600 shadow-md rounded-md text-sm text-center mx-auto">
                        <RiRecycleFill className="text-2xl text-center mx-auto" />
                        Easy 90 days return
                      </div>
                      <div className="p-2 border border-gray-100 text-gray-600 shadow-md rounded-md text-sm text-center mx-auto">
                        <GrDeliver className="text-2xl text-center mx-auto" />
                        Home Delivery at Your Doorstep
                      </div>
                      <div className="p-2 border border-gray-100 text-gray-600 shadow-md rounded-md text-sm text-center mx-auto">
                        <BsShieldShaded className="text-2xl text-center mx-auto" />
                        Anytime around the clock
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    *By applying a voucher code you agree to our Terms &
                    Conditions
                  </div>

                  <div
                    onClick={() => onPaymentClick()}
                    className="my-5 cursor-pointer flex uppercase justify-center bg-red-500 text-white p-3 text-center rounded-t-md tracking-widest rounded-r-md font-bold"
                  >
                    {state.paymentProcessing
                      ? "Redirecting for Payment..."
                      : "Proceed to Payment"}
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
