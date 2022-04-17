import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";
// import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Footer from "../Footer";
import Cart from "../Cart";
import Modal from "../Modal";
import { pincodeData } from "../../api/productsAPIs";
import { updatePincode, toggleCart } from "../../Redux/actions/userAction";

var path = require('path');

// Images
import Logo from "../../assets/full_logo.png";
import { HomepageAPI } from "../../api/categoryAPIs";
import {
  RiAccountBoxFill,
  RiBuilding4Fill,
  RiLockPasswordFill,
} from "react-icons/ri";
import { FaTruckLoading } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
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

const Layout = (props) => {
  const dispatch = useDispatch();
  const searchItems = [
    { title: "Cakes", redirectUrl: "" },
    { title: "Birthday Gifts", redirectUrl: "" },
    { title: "Personalised GIfts", redirectUrl: "" },
    { title: "Flowers", redirectUrl: "" },
    { title: "Premium Gifts", redirectUrl: "" },
    { title: "Plants", redirectUrl: "" },
    { title: "Anniversary Gifts", redirectUrl: "" },
  ];

  const {
    isLoggedIn,
    name = "",
    cart,
    pincode,
    openCart,
  } = useSelector((store) => store);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [data, setData] = useState(false);
  const [state, setState] = useState({
    selectedSection: 0,
    hide: true,
  });
  const [pincodeModal, setPincodeModal] = useState(false);
  const pincodeRef = useRef();
  const searchRef = useRef(false);

  const PincodeModal = () => {
    const [inputPincode, setInputPincode] = useState(
      pincode ? pincode.pincode : ""
    );
    const onPincodeChange = () => {
      pincodeData(inputPincode).then((res) => {
        console.log(res);
        if (res.Status) {
          dispatch(
            updatePincode({
              pincode: inputPincode,
              location: res.PostOffice[0].Block,
            })
          );
          setTimeout(() => {
            pincodeRef.current.closeModal();
          }, 50);
        } else {
        }
      });
    };

    return (
      <Modal ref={pincodeRef} onClose={() => setPincodeModal(false)}>
        <div>
          <h2 className="flex my-auto mb-3 mr-auto text-sm font-semibold">
            <BiLocationPlus className="my-auto text-3xl" />
            <span className="my-auto"> Enter your pincode here</span>
          </h2>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 mt-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus:outline-none focus-within:ring-indigo-600 focus-within:border-indigo-600">
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
                  value={inputPincode}
                  onChange={(e) => setInputPincode(e.target.value)}
                  className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none"
                  placeholder="5xxxx0"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            onPincodeChange();
          }}
          className="w-full cursor-pointer my-3 mx-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
        >
          Check availablility
        </div>
      </Modal>
    );
  };

  useEffect(() => {
    HomepageAPI()
      .then((response) => {
        if (response.error) {
          setData({ ...data, loading: true, error: response.error });
        } else {
          console.log(response);
          setData({ ...data, loading: false, ...response });
        }
      })
      .catch((error) => {
        setData({ ...data, loading: false, error: error.error });
      });
  }, []);

  return (

    <div className="bg-white duration-200">
      
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
    <style>
       
    </style>
    <a
    style={{
      position: 'fixed' ,
      width: "60px",
      height: '60px',
      bottom: '40px',
      right: '40px',
      backgroundColor: '#25d366',
      color: '#FFF',
      borderRadius: '50px',
      textAlign: "center",
      fontSize: '30px',
      boxShadow: '2px 2px 3px #999',
      zIndex: 100,
      "@media screen and (max-width: 767px)":{
        width: '40px',
              height: '40px',
              bottom: '20px',
              right: '10px',
              fontSize : '22px',
       }
    }}
        
        href="https://wa.me/2348100000000"
        class="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i style={{marginTop: "16px",
         "@media screen and (max-width: 767px)":{
          marginTop: "10px",
         }
      }} class="fa fa-whatsapp whatsapp-icon"></i>
        
      </a>
      {!state.hide && (
        <div
          className="mobile-hide fixed inset-0 flex z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Canvas */}
          <div
            onClick={() => {
              setOpenSidebar(!openSidebar);
              setTimeout(() => {
                setState({ ...state, hide: true });
              }, 200);
            }}
            className={
              openSidebar
                ? "opacity-100 fixed inset-0 bg-black bg-opacity-25"
                : "opacity-0 transition-opacity ease-linear duration-300 fixed inset-0 bg-black bg-opacity-25"
            }
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div
            className={
              openSidebar
                ? "translate-x-0 transition ease-in-out duration-300 transform relative max-w-xs w-full bg-white shadow-xl flex flex-col overflow-y-auto"
                : "-translate-x-full transition ease-in-out duration-300 transform relative max-w-xs w-full bg-white shadow-xl flex flex-col overflow-y-auto"
            }
          >
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                onClick={() => {
                  setOpenSidebar(!openSidebar);
                  setTimeout(() => {
                    setState({ ...state, hide: true });
                  }, 200);
                }}
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Links --> */}
            <div className="mt-2">
              <div className="border-b border-gray-200">
                <div
                  className="-mb-px flex px-4 space-x-8"
                  aria-orientation="horizontal"
                  role="tablist"
                >
                  {/* <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" --> */}
                  <button
                    id="tabs-1-tab-1"
                    onClick={() => {
                      setState({ ...state, selectedSection: 0 });
                    }}
                    className={
                      state.selectedSection === 0
                        ? "text-gray-900 border-b-2 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-red-600 text-base font-medium"
                        : "text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                    }
                    aria-controls="tabs-1-panel-1"
                    role="tab"
                    type="button"
                  >
                    Categories
                  </button>

                  {/* <!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" --> */}
                  <button
                    id="tabs-1-tab-2"
                    onClick={() => {
                      setState({ ...state, selectedSection: 1 });
                    }}
                    className={
                      state.selectedSection === 1
                        ? "text-gray-900 border-b-2 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-red-600 text-base font-medium"
                        : "text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                    }
                    aria-controls="tabs-1-panel-2"
                    role="tab"
                    type="button"
                  >
                    Account
                  </button>
                </div>
              </div>

              {/* <!-- 'Women' tab panel, show/hide based on tab state. --> */}
              {state.selectedSection === 0 && (
                <div
                  id="tabs-1-panel-1"
                  className="pt-10 pb-8 px-4 space-y-10"
                  aria-labelledby="tabs-1-tab-1"
                  role="tabpanel"
                  tabindex="0"
                >
                  {false && (
                    <div className="flex flex-row overflow-x-scroll">
                      {[0, 1, 2, 3, 4, 5, 1, 2, 3, 2, 2].map((arrivals, k) => (
                        <div className="group relative text-sm mx-2" key={k}>
                          <div className="aspect-w-16 aspect-h-16 rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg"
                              alt="Models sitting back to back, wearing Basic Tee in black and bone."
                              className="object-center object-cover"
                            />
                          </div>
                          <a
                            href="#"
                            className="mt-6 block font-medium  text-xs text-gray-900"
                          >
                            New Arrivals
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <p
                      id="category-heading-mobile"
                      className="font-medium text-gray-900"
                    >
                      Top Categories
                    </p>
                    <ul
                      role="list"
                      aria-labelledby="category-heading-mobile"
                      className="mt-6 flex flex-col space-y-6"
                    >
                      {data.topCategories.map((category) => (
                        <li className="flex justify-between shadow-effect px-2 py-1">
                          <div className="flex">
                            <div className="rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img
                                src={category.categoryImage}
                                alt={category.categoryName}
                                className="w-16 object-center object-cover"
                              />
                            </div>
                            <a
                              href="#"
                              className="p-2 pl-4 my-auto font-medium text-gray-900"
                            >
                              {category.categoryName}
                            </a>
                          </div>
                          <FiChevronRight className="my-auto font-medium text-black text-lg" />
                        </li>
                      ))}

                      <li className="flow-root">
                        <a
                          href="#"
                          className="-m-2 p-2 block font-medium text-gray-900"
                        >
                          Browse All
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {/* <!-- 'Men' tab panel, show/hide based on tab state. --> */}
              {state.selectedSection === 1 && (
                <div
                  id="tabs-1-panel-2"
                  className="pt-10 pb-8 px-4 space-y-10 mb-52"
                  aria-labelledby="tabs-1-tab-2"
                  role="tabpanel"
                  tabindex="0"
                >
                  {false && (
                    <div className="grid grid-cols-2 gap-x-4">
                      <div className="group relative text-sm">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg"
                            alt="Drawstring top with elastic loop closure and textured interior padding."
                            className="object-center object-cover"
                          />
                        </div>
                        <a
                          href="#"
                          className="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            className="absolute z-10 inset-0"
                            aria-hidden="true"
                          ></span>
                          New Arrivals
                        </a>
                        <p aria-hidden="true" className="mt-1">
                          Shop now
                        </p>
                      </div>

                      <div className="group relative text-sm">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                          <img
                            src="https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg"
                            alt="Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt."
                            className="object-center object-cover"
                          />
                        </div>
                        <a
                          href="#"
                          className="mt-6 block font-medium text-gray-900"
                        >
                          <span
                            className="absolute z-10 inset-0"
                            aria-hidden="true"
                          ></span>
                          Artwork Tees
                        </a>
                        <p aria-hidden="true" className="mt-1">
                          Shop now
                        </p>
                      </div>
                    </div>
                  )}

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
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                {isLoggedIn ? (
                  <Link href="/account">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      {/* {name.split(" ")[0]} */}
                    </a>
                  </Link>
                ) : (
                  <Link href="/login">
                    <a className="-m-2 p-2 block font-medium text-gray-900">
                      Sign in
                    </a>
                  </Link>
                )}
              </div>
              {!isLoggedIn && (
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <div
                onClick={() => {
                  localStorage.clear();
                  window.location.reload("/login");
                }}
                className="border-t bg-red-600 sticky text-white bottom-0 border-gray-200 p-4"
              >
                <a href="#" className="-m-2 p-2 flex items-center">
                  <BiLogOut className="w-5 h-auto block flex-shrink-0 text-white" />
                  <span className="ml-3 block text-base font-medium text-white">
                    Logout
                  </span>
                </a>
              </div>
            ) : (
              <div
                onClick={() => {
                  localStorage.clear();
                  window.location.reload("/login");
                }}
                className="border-t bg-red-600 sticky text-white bottom-0 border-gray-200 p-4"
              >
                <a href="#" className="-m-2 p-2 flex items-center">
                  <BiLogOut className="w-5 h-auto block flex-shrink-0 text-white" />
                  <span className="ml-3 block text-base font-medium text-white">
                    Login
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <header className="relative bg-white">
        <nav aria-label="Top" className="max-w-full mx-auto pr-3 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-14 my-1 mb-3 flex items-center">
              {/* <!-- Mobile menu toggle, controls the 'mobileMenuOpen' state. --> */}
              <button
                type="button"
                onClick={() => {
                  setState({ ...state, hide: false });
                  setTimeout(() => {
                    setOpenSidebar(true);
                  }, 50);
                }}
                className="bg-white p-2 rounded-md text-gray-800 lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                {/* <!-- Heroicon name: outline/menu --> */}
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex lg:ml-0 my-auto">
                <Link href="/">
                  <a className="cursor-pointer my-auto">
                    <img
                      src='data:image/png;base64,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'
                      width={"70%"}
                      height="auto"
                      style={{ maxWidth: "170px" }}
                      alt="Its12"
                    />
                  </a>
                </Link>
              </div>

              {/* <!-- Flyout menus --> */}
              <div className="hidden mr-auto w-9/12	h-12 lg:block ">
                <div className="rounded-md">
                  <input
                    ref={searchRef}
                    type="text"
                    name="search"
                    id="search"
                    onFocus={() => {
                      searchRef.current = true;
                    }}
                    onBlur={() => {
                      searchRef.current = false;
                    }}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({ ...data, search: e.target.value })
                    }
                    value={data.search}
                    className="block w-full ml-5 px-4 h-14 border-none my-auto
                  placeholder-gray-500 focus:outline-none max-w-2xl
                  focus:max-w-5xl bg-gray-100 rounded-md"
                    placeholder="Search
                  100s of gifts waiting for your loved ones"
                  />
                  {/* <button className="absolute my-auto inset-y-0 right-0 px-3 flex items-center pointer-cursor focus:outline-none ">
                      <!-- Heroicon name: solid/exclamation-circle --> 
                    <AiOutlineSearch className="text-black text-2xl" />
                  </button> */}
                </div>
                {data.search && (
                  <div
                    className=" relative block ml-5 px-4 mt-1 h-auto border-none my-auto bg-gray-100 z-10 rounded-md"
                    style={{ width: "64rem" }}
                  >
                    <div className="flex item-center">
                      <FiTrendingUp className="text-gray-500 italic mt-4 " />
                      <p className="text-gray-500 italic m-3">
                        Popular Searches
                      </p>
                    </div>
                    {searchItems.map((item, i) => {
                      return (
                        <div className="flex item-center" key={i}>
                          <AiOutlineSearch className="text-black mt-4 " />
                          <p className=" m-3">{item.title}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex ml-auto items-center">
                {/* <!-- Search --> */}
                <div className="flex lg:ml-6">
                  <div
                    onClick={() => setPincodeModal(true)}
                    className="p-2 mb-auto cursor-pointer text-gray-800 hover:text-black"
                  >
                    <span className="sr-only">Pincode</span>
                    {/* <!-- Heroicon name: outline/search --> */}
                    {pincode && pincode.pincode ? (
                      <span className="w-5 h-5 mb-auto font-semibold text-sm text-gray-800">
                        {pincode.location.length > 5
                          ? pincode.location.substring(0, 5) + "..."
                          : pincode.location}
                      </span>
                    ) : (
                      <div className="flex">
                        {isLoggedIn && (
                          <span className="text-sm w-24 hidden lg:block">
                            Enter Pincode
                          </span>
                        )}
                        <GoLocation className="w-5 h-5 mr-4 my-auto text-gray-800" />
                      </div>
                    )}
                  </div>
                </div>

                {/* <!-- Sign In --> */}
                <div className="hidden lg:flex lg:items-center lg:justify-end">
                  {isLoggedIn ? (
                    <Link href="/account">
                      <a className="text-sm cursor-pointer font-medium text-gray-700 hover:text-gray-800">
                        {name.split(" ")[0]}
                      </a>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <a className="text-sm cursor-pointer whitespace-nowrap font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </a>
                    </Link>
                  )}
                </div>

                {/* <!-- Search --> */}
                <div className="flex lg:hidden lg:ml-6">
                  <a href="#" className="p-2 text-gray-800 hover:text-black">
                    <span className="sr-only">Search</span>
                    {/* <!-- Heroicon name: outline/search --> */}
                    <svg
                      className="w-6 h-6"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </a>
                </div>

                {/* <!-- Cart --> */}
                <div className="ml-1 flow-root lg:ml-6">
                  <span
                    onClick={() => {
                      dispatch(toggleCart());
                    }}
                    className="group cursor-pointer -m-2 p-2 flex items-center"
                  >
                    {/* <!-- Heroicon name: outline/shopping-bag --> */}
                    <svg
                      className="flex-shink-0 h-6 w-6 text-gray-800 group-hover:text-black"
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span className="ml-2 text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                      {cart.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* content goes here */}
      <main className="mx-auto">{props.children}</main>
      {/* Footer */}
      {openCart && (
        <Cart
          onClose={() => {
            dispatch(toggleCart());
          }}
        />
      )}

      {pincodeModal && <PincodeModal />}
      <Footer />
    </div>
  );
};
export default Layout;
