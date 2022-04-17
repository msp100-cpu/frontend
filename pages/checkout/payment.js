import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GiPartyPopper } from "react-icons/gi";
import { getUserCheckout, updateUserAddress } from "../../api/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import ProgressBar from "../../components/ProgressBar";
import { route } from "next/dist/server/router";
import { withRouter } from "next/router";

function CheckoutPayment(props) {
  const { isLoggedIn } = useSelector((store) => store);
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({
    loading: true,
    error: "",
    orderID: "",
    paymentSuccess: false,
    newAddressModel: false,
    step: 1,
    stages: ["Address", "Confirmation", "Payment"],
  });

  useEffect(() => {
    console.log(props.router.query);
    let data = JSON.parse(props.router.query.data);
    console.log(data);
    setState({ ...state, orderID: data.razorpay_order_id });
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <main className="pb-10">
        <div className="max-w-3xl pt-4 mx-auto grid grid-cols-1 gap-6 duration-300 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-3">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <ProgressBar stages={state.stages} selected={3} />
                <div className="px-4 py-5 sm:px-6 h-96 my-auto flex flex-1">
                  <div className="m-auto text-center">
                    <div className="flex justify-center m-auto">
                      <div>
                        <GiPartyPopper className="text-7xl text-green-600 m-auto" />
                        <h2
                          id="applicant-information-title"
                          className="text-lg leading-6 font-extrabold uppercase mt-6 mb-2 tracking-widest text-gray-900"
                        >
                          Thank You!
                        </h2>
                        <p className="max-w-2xl text-sm text-gray-900">
                          Your order{" "}
                          <span className="underline">{state.orderID}</span> is
                          completed.
                        </p>
                        <p className="max-w-2xl text-sm text-gray-900">
                          Please check the Delivery Status at{" "}
                          <Link href={"/tracking/" + state.orderID}>
                            <a className="font-semibold underline mx-1">
                              {" "}
                              Order Tracking{" "}
                            </a>
                          </Link>
                          pages.
                        </p>
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
}

export default withRouter(CheckoutPayment);
