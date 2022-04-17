import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import {
  getUserAddresses,
  getUserCheckout,
  updateUserAddress,
  removeUserAddress,
  updateUserDeliveryAddress,
} from "../../api/userAPIs";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import ProgressBar from "../../components/ProgressBar";
import Loading from "../../components/Loading";

export default function Checkout() {
  const { isLoggedIn, token, name, email, pincode, cart } = useSelector(
    (store) => store
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: true,
    error: "",
    paymentSuccess: false,
    newAddressModel: false,
    step: 1,
    selectedAddress: false,
    errorProducts: [],
    error: false,
    stages: ["Address", "Confirmation", "Payment"],
  });

  const [data, setData] = useState({
    addresses: [],
    totalProductsPrice: 0,
    deliveryPrice: 0,
    offerPrice: 0,
    newAddress: false,
    changeAddress: false,
    voucher: "",
    deliveryOptions: [],
  });

  const addAddressRef = useRef();

  useEffect(() => {
    getUserAddresses({ token })
      .then((res) => {
        console.log(res.lastUsedAddress);
        setData({
          ...data,
          ...res,
          addresses: res.addresses,
          selectedAddress: res.lastUsedAddress,
        });

        setState({
          ...state,
          selectedAddress: res.lastUsedAddress,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const AddAddressModal = () => {
    const [newAddress, setNewAddress] = useState(
      (state.selectedAddress !== false && state.selectedAddress) ||
        state.selectedAddress === 0
        ? data.addresses[state.selectedAddress]
        : {
            id: parseInt(Math.random() * 1000),
            fullName: "",
            mobileNumber: "",
            address: "",
            city: "",
            pincode: "",
            landmark: "",
          }
    );

    const handleUpdate = (e) => {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const saveAddress = () => {
      let url = "/user/address";
      if (state.selectedAddress || state.selectedAddress === 0) {
        url = "/user/edit/address";
      }
      updateUserAddress({ token, body: { address: newAddress }, url })
        .then(({ address }) => {
          setData({ ...data, addresses: address });
          setNewAddress({
            id: 123,
            fullName: "",
            mobileNumber: "",
            address: "",
            city: "",
            pincode: "",
            landmark: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <Modal
        ref={addAddressRef}
        onClose={() => setState({ ...state, newAddressModel: false })}
      >
        <div>
          {console.log("addressses-->", data.addresses)}
          {console.log(state.selectedAddress)}
          <div className="font-bold text-lg mb-3">Add a new address : </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="fullName"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={newAddress.fullName}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Jane Doe"
                />
              </div>
            </div>
            <div className="col-span-12 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="mobileNumber"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  value={newAddress.mobileNumber}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="+91 9112233224"
                />
              </div>
            </div>

            <div className="col-span-12 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="address"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={newAddress.address}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="H.No: 12-33, Sector X, Madhapur, Hyderabad"
                />
              </div>
            </div>

            <div className="col-span-12 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="landmark"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  value={newAddress.landmark}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="A mega mart store nearby"
                />
              </div>
            </div>

            <div className="col-span-6 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="city"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={newAddress.city}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Hyderabad"
                />
              </div>
            </div>

            <div className="col-span-6 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  for="pincode"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  value={newAddress.pincode}
                  onChange={handleUpdate}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="5xxxx0"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="button"
              // disabled={
              //   state.selectedAddress !== false && state.selectedAddress
              // }
              onClick={() => {
                saveAddress();
                // setData({
                //   ...data,
                //   addresses: [newAddress, ...data.addresses],
                // });
                addAddressRef.current.closeModal();
              }}
              className="w-full uppercase inline-flex duration-200 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
            >
              {(state.selectedAddress !== false && state.selectedAddress) ||
              state.selectedAddress === 0
                ? "Update Address"
                : "Add new address"}
            </button>

            <button
              type="button"
              onClick={() => {
                addAddressRef.current.closeModal();
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancel
            </button>
          </div>
          {/* {state.selectedAddress !== false && state.selectedAddress && (
            <button
              type="button"
              onClick={() => {
                addAddressRef.current.closeModal();
              }}
              className="w-full inline-flex justify-center rounded-md underline shadow-sm px-4 py-2 text-base font-medium text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Remove
            </button>
          )} */}
        </div>
      </Modal>
    );
  };

  const onPaymentRoute = async () => {
    setState({ ...state, errorProducts: [], error: false });

    if (!isLoggedIn) {
      router.push({
        pathname: "/login",
        state: { error: "Please login first!" },
      });
      return;
    }

    // check if all the cart items are deliverable to the pincode
    let areProductsDeliverable = true,
      errorProducts = [];
    for (let product of cart) {
      let product_delivery_pincode =
        product.requiredUpgrades.DestinationDeliveryCheck;
      if (
        product_delivery_pincode ===
        data.addresses[state.selectedAddress].pincode
      ) {
        areProductsDeliverable = true;
      } else {
        areProductsDeliverable = false;
        errorProducts.push({
          name: product.orderName,
          destination: product.requiredUpgrades.DestinationDeliveryCheck,
          selectedPincode: data.addresses[state.selectedAddress].pincode,
        });
      }
    }

    if (!areProductsDeliverable) {
      console.log(
        "cannot be delivered as not all the products cannot be delivered to the given address"
      );
      setState({ ...state, errorProducts });
      // raise popup
      return;
    }

    console.log("adding address...");

    updateUserDeliveryAddress({
      token,
      body: { lastUsedAddress: state.selectedAddress },
    })
      .then(({ address }) => {
        setData({ ...data, addresses: address });
      })
      .catch((err) => {
        setData({ ...data, error: true });
      });
    // Check if the cart pincode is equal to cart pincode
    //
    router.push({
      pathname: "/checkout/confirmation",
      state: { saved: true },
    });
  };

  const onRemoveAddress = (id) => {
    removeUserAddress({ token, id })
      .then(({ address }) => {
        setData({ ...data, addresses: address });
      })
      .catch((err) => {
        console.log(err);
      });
    // remove k'th address in all the addresses
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {state.newAddressModel && <AddAddressModal />}
      <main className="pb-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-5xl">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <ProgressBar stages={state.stages} selected={0} />
                <div className="px-4 py-5 mt-10 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Select Delivery Address
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Please select your address for delivery and billing purposes
                  </p>
                  <div className="py-3 my-2 mb-4">
                    {data.addresses.length > 0 &&
                      data.addresses.map((address, k) => (
                        <div
                          className={
                            state.selectedAddress === k
                              ? "cursor-pointer w-full rounded-md p-3 my-3 duration-200 bg-indigo-100"
                              : "cursor-pointer w-full rounded-md p-3 my-3 duration-200 bg-white"
                          }
                          onClick={() => {
                            setState({
                              ...state,
                              selectedAddress: k,
                            });
                          }}
                          key={k}
                        >
                          <div className="my-2">
                            <div className="text-sm flex justify-between font-medium text-gray-900">
                              <div className="font-extrabold uppercase text-black my-auto">
                                {address.fullName}
                              </div>
                              <div className="flex-shrink-0">
                                <div
                                  onClick={() => {
                                    onRemoveAddress(address.id);
                                    setData({ ...data, changeAddress: true });
                                  }}
                                  className="inline-flex cursor-pointer duration-150 uppercase items-center px-4 ml-2 py-2 hover:shadow-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  text-sm"
                                >
                                  <MdDelete className="text-red-500 text-xl" />
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 text-sm font-medium text-black">
                              <div className="sm:mt-0">
                                {address.address}, {address.city} ,{" "}
                                {address.pincode}, India
                              </div>
                              {address.landmark && (
                                <div className="mt-1 sm:mt-0">
                                  Landmark: {address.landmark}
                                </div>
                              )}
                              <div className="flex justify-between mt-1 sm:mt-0">
                                {address.mobileNumber}
                                <button
                                  type="button"
                                  onClick={() => {
                                    console.log(address);
                                    setTimeout(() => {
                                      setState({
                                        ...state,
                                        newAddressModel: true,
                                        selectedAddress: k,
                                        errorProducts: [],
                                      });
                                    }, 200);
                                  }}
                                  className="inline-flex font-semibold items-center px-4 py-2 shadow-sm rounded-md text-gray-700 underline hover:bg-gray-50 focus:outline-none focus:ring-2  text-sm"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/*  */}
                    <div className="col-span-1 min-h-full">
                      <div className="bg-white w-full flex my-auto h-full rounded-lg border border-gray-400 border-dashed p-4">
                        <div
                          onClick={() => {
                            setData({ ...data });
                            setState({
                              ...state,
                              newAddressModel: true,
                              selectedAddress: false,
                            });
                          }}
                          className="uppercase cursor-pointer text-center text-sm bg-gray-100 px-7 py-4 m-auto"
                        >
                          Add Address
                        </div>
                      </div>
                    </div>
                  </div>
                  {state.errorProducts.length > 0 && (
                    <div class="rounded-md bg-red-50 p-4">
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
                            Please change the address. Not all items in the cart
                            are deliverable to the selected address.
                          </h3>
                          <div class="mt-2 text-sm text-red-700">
                            <ul class="list-disc pl-5 space-y-1">
                              {state.errorProducts.map((errP, k) => (
                                <li key={k}>
                                  {errP.name}{" "}
                                  <span className="font-semibold">
                                    ({errP.selectedPincode})
                                  </span>{" "}
                                  cannot be delivered to{" "}
                                  <span className="font-semibold">
                                    {errP.destination}
                                  </span>{" "}
                                </li>
                              ))}{" "}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {state.error && (
                    <div class="rounded-md bg-red-50 p-4">
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
                            Something went wrong. Please try again
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-white py-5 sm:rounded-lg">
                    <button
                      onClick={() => onPaymentRoute()}
                      className="my-5 w-full cursor-pointer flex uppercase justify-center bg-black text-white py-3 text-center rounded-t-md rounded-r-md font-extrabold"
                    >
                      Continue
                    </button>
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
