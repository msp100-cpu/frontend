import { useEffect, useRef, useState } from "react";

import OrderTrackingSteps from "../../components/OrderTrackingSteps";
import { FaCheckSquare } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { getOrderDetails } from "../../api/orderAPIs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";

export default function TrackingPage() {
  const { isLoggedIn, token, name, email, pincode, cart } = useSelector(
    (store) => store
  );
  const router = useRouter();
  const { tracking_id } = router.query;

  const [data, setData] = useState({
    rating: 4.5,
    isItemDelivered: false,
  });
  const [stars, setStars] = useState([]);
  const [state, setState] = useState({ loading: true, rating: 4.5 });

  useEffect(() => {
    let all_stars = [];
    for (let i = 1; i <= 5; i++) {
      if (state.rating >= i) {
        all_stars.push(true);
      } else {
        all_stars.push(false);
      }
    }
    if (parseInt(state.rating) !== state.rating) {
      all_stars.pop();
    }
    setStars(all_stars);
    if (tracking_id) {
      getOrderDetails(token, { order_id: tracking_id }).then((res) => {
        console.log(res);
        console.log({ ...data, ...res[0] });
        setState({ ...state, loading: false });
        if (res.length > 0) {
          setData({
            ...data,
            ...res[0],
            isItemDelivered: res[0].deliveryInfo.isDelivered,
          });
        }
      });
    }
  }, [tracking_id]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <main className="py-2">
        <div className="mt-2 sm:mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-2 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          {/* Left side section */}

          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white sm:border sm:first-letter:border-gray-300 rounded-md ">
                <div className="px-1 sm:px-6 sm:py-4">
                  <div className="px-4 col-span-2">
                    {/*  */}
                    <h2 className="my-2 text-3xl ml-4 font-bold">
                      {!data.isItemDelivered
                        ? "Arriving 15 jun"
                        : "Delivered 15 jun"}
                    </h2>
                    {!data.isItemDelivered ? (
                      <OrderTrackingSteps />
                    ) : (
                      <div className="total-price border border-gray-300 mb-6 rounded-t-md sm:rounded-lg rounded-r-md py-4 px-2">
                        <div className="px-4 py-5 sm:p-4">
                          <div className="flex justify-between">
                            <div className="flex items-center	">
                              <h3 className="text-lg font-bold tracking-tight text-gray-900">
                                Delivery feedback
                              </h3>
                            </div>
                          </div>

                          {
                            //-- ---- stars--------- -----
                          }
                          <p className="text-yellow-500 mt-4">
                            <div className="flex">
                              {stars.map(
                                (item, k) =>
                                  item && (
                                    <RiStarFill
                                      className="ml-1 text-xl md:text-md lg:text-lg"
                                      key={k}
                                    />
                                  )
                              )}

                              {parseInt(state.rating) !== state.rating && (
                                <RiStarHalfFill className="ml-1 text-xl md:text-md lg:text-lg" />
                              )}
                              {stars.map(
                                (item, k) =>
                                  !item && (
                                    <RiStarLine
                                      className="ml-1 text-xl md:text-md lg:text-lg"
                                      key={k}
                                    />
                                  )
                              )}
                            </div>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="total-price border border-gray-300 mb-6 rounded-t-md sm:rounded-lg rounded-r-md py-4  px-2">
                      <p className="text-md mb-2 font-bold px-4">
                        {data.isItemDelivered ? "Delivered " : "Shipping"}{" "}
                        Address
                      </p>
                      <div className="mt-1 text-sm font-medium text-black px-4">
                        <div>{data?.shippingAddress?.fullName}</div>
                        <div className="mt-1 sm:mt-0">
                          {data?.shippingAddress?.address}{" "}
                          {data?.shippingAddress?.landmark}
                        </div>
                        <div className="mt-1 sm:mt-0">
                          {" "}
                          {data?.shippingAddress?.city}{" "}
                          {data?.shippingAddress?.pincode}
                        </div>

                        <div className="mt-1 sm:mt-0">India</div>
                        <div className="mt-1 sm:mt-0">
                          Mobile:{" "}
                          <span className="font-semibold">
                            {data?.shippingAddress?.mobileNumber}
                          </span>
                        </div>
                      </div>
                      {data.isItemDelivered && (
                        <div className="mt-4 px-4">
                          <div className="mt-3 text-sm">
                            <a
                              href="#"
                              className="font-medium text-green-600 hover:text-green-500"
                            >
                              {" "}
                              See all updates
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Right side section */}
          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white border border-gray-300 rounded-lg mb-4 mx-4 sm:mx-0">
              <div className="px-4 py-4">
                <div className="flex  justify-between">
                  <div className="flex items-center	">
                    <h3 className="text-lg  font-bold tracking-tight text-gray-900">
                      Order info
                    </h3>
                  </div>
                </div>

                {
                  //-------------------------------------------- ID---------------------
                }
                <div className="divide-y border border-gray-300 rounded-mdf15 jun divide-light-blue-400 mt-4">
                  <div className="p-4">
                    {" "}
                    <div className="flex  justify-between">
                      <div className="flex items-center	">
                        <h3 className="text-sm font-bold tracking-tight   text-gray-900">
                          {!data.isItemDelivered
                            ? "Cancel order"
                            : " Return or replace item"}
                        </h3>
                      </div>
                      <div className="sm:mt-0 sm:ml-6 sm:flex-shrink-0  flex items-center ">
                        <IoIosArrowForward className="ml-auto text-sm font-light" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    {" "}
                    <div className="flex  justify-between">
                      <div className="flex items-center	">
                        <h3 className="text-sm font-bold tracking-tight   text-gray-900">
                          View order details
                        </h3>
                      </div>
                      <div className="sm:mt-0 sm:ml-6 sm:flex-shrink-0  flex items-center ">
                        <IoIosArrowForward className="ml-auto text-sm font-light" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* item  Delivery id */}
            <div className="bg-white mx-4 sm:mx-0 flex justify-between border sm:rounded-lg border-gray-300 rounded-t-lg  rounded-r-lg py-4  px-2">
              <div className="flex p-2 ">
                <div>
                  <h3 className="text-lg  font-bold tracking-tight   text-gray-900">
                    Delivery by Its12 Logistics
                  </h3>
                  {
                    //-------------------------------------------- ID---------------------
                  }
                  <h4 className="text-sm  font-bold tracking-tight mt-4 text-gray-700">
                    Tracking id : {tracking_id}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
