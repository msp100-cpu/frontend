import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getProductsByproductLink,
  getServiceDetails,
} from "../../api/productsAPIs";
import Loading from "../../components/Loading";
import { NextSeo } from "next-seo";
import ItemSlider from "../../components/ItemSlider";
import Addons from "../../components/Glider/Addons";
import SelectUpgrade from "../../components/ProductUpgrades/Select";
import DropdownUpgrade from "../../components/ProductUpgrades/Dropdown";
import TextUpgrade from "../../components/ProductUpgrades/Text";
import DateUpgrade from "../../components/ProductUpgrades/Date";
import FileUpgrade from "../../components/ProductUpgrades/File";
import LoginModal from "../../components/Modal/Login";
import {
  updateCart,
  toggleCart,
  clearData,
} from "../../Redux/actions/userAction";
import { useRouter } from "next/dist/client/router";

const ImageCarousal = dynamic(() => import("../../components/Carousal"), {
  ssr: false,
});

const ProductPage = ({ productDetails, config = [] }) => {
  const { isLoggedIn, token, pincode, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const router = useRouter();
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState(productDetails);
  const [AddToCartLoading, setAddToCartLoading] = useState(true);
  const [favourite, setFavourite] = useState(false);
  const [state, setState] = useState({
    quantity: 1,
    addingToCart: false,
    tryLogin: false,
    isLoading: true,
  });
  const [errors, seterrors] = useState({
    pincodeError: "",
    pincodeStatus: "",
  });

  useEffect(() => {
    setData(productDetails);

    let upgrades = {};
    if (productDetails?.categoryType) {
      config.forEach((item, k) => {
        if (item.values?.length > 0) {
          if (item.required) {
          } else {
            upgrades[item.uID] = 0;
          }
        } else {
          upgrades[item.uID] = "";
        }
        if (k === config.length - 1) {
          setState({ ...state, isLoading: false });
        }
      });
    }
    if (pincode) {
      upgrades["DestinationDeliveryCheck"] = pincode.pincode;
      checkDelivery(pincode.pincode);
    }

    setInputs(upgrades);
  }, [productDetails]);

  const onAddToCart = (loginSuccess = false) => {
    try {
      seterrors({});
      if (!isLoggedIn) {
        // router.push("/login");
        if (loginSuccess) {
          // router.push("/login");
          setState({ ...state, tryLogin: false });
          return;
        } else {
          setState({ ...state, tryLogin: true });
        }
        return;
      } else {
        setState({ ...state, tryLogin: false, addingToCart: true });
      }

      let newErrors = {};
      for (let x of config) {
        if (x.required) {
          console.log(x.uID, inputs[x.uID]);
          if (inputs[x.uID] === undefined || inputs[x.uID] === "") {
            newErrors[x.uID] = "This field is mandatory";
          }
        }
      }
      console.log(newErrors);

      if (Object.keys(newErrors).length > 0) {
        seterrors(newErrors);
        setState({ ...state, addingToCart: false });
        return;
      }

      let body = {
        productLink: productDetails.productLink,
        requiredUpgrades: inputs,
        quantity: state.quantity,
        pincode: pincode,
      };

      addProductToCart(token, body)
        .then((res) => {
          if (res.isLoggedIn === false) {
            dispatch(clearData());
            return;
          }

          dispatch(updateCart([...res.cart]));
          dispatch(toggleCart());
          setState({ ...state, addingToCart: false, tryLogin: false });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const checkDelivery = (pincode = pincode) => {
    // setData({ success: "", error: "" });
    seterrors({
      ...errors,
      pincodeError: "",
      pincodeStatus: "",
    });

    if (!pincode || pincode.length !== 6) {
      seterrors({
        ...errors,
        pincodeStatus: "",
        pincodeError: "Please enter a pincode to check",
      });
      return;
    }

    getServiceDetails({ productLink: productDetails.productLink, pincode })
      .then((res) => {
        if (res.error) {
          // setData({ ...data, error: res.error });
          seterrors({
            ...errors,
            pincodeError: res.error,
          });
        } else {
          let availability = res.product.availability;

          let exists = availability.specifiedPlaces.filter(
            (place) => place.pincode === pincode
          );

          if (availability.global || exists.length > 0) {
            seterrors({
              ...errors,
              pincodeError: "",
              pincodeStatus: "Deliverable to this pincode",
            });
            return;
          }
          seterrors({
            ...errors,
            pincodeStatus: "",
            pincodeError: "Sorry! Not Deliverable to this pincode.",
          });
        }
      })
      .catch((err) => {
        // setData({ ...data, error: err.error });
      });
  };

  return (
    <div>
      <NextSeo
        title={productDetails?.title}
        description={"Best Giftworld shop online"}
        openGraph={{
          type: "website",
          title: productDetails?.title,
          description: "Best Giftworld shop online",
          images: [
            {
              url: productDetails?.imageURLs[0],
              width: 800,
              height: 600,
              alt: productDetails?.title,
            },
          ],
        }}
      />
      {/* Product Details */}

      {!data || state.isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white pt-3">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <Link href="/">
                    <a className="mr-2 cursor-pointer text-sm font-medium text-gray-900">
                      Home
                    </a>
                  </Link>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li>
                <div className="flex items-center">
                  <Link
                    href={
                      "/category/" + productDetails?.categoryType?.categoryLink
                    }
                  >
                    <a className="mr-2 cursor-pointer text-sm font-medium text-gray-900">
                      {productDetails?.categoryType?.categoryName}
                    </a>
                  </Link>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {productDetails?.title}
                </a>
              </li>
            </ol>
          </nav>
          {/* <!-- Product info --> */}
          <div className="max-w-3xl mx-auto py-5 pb-10 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:px-8 lg:grid lg:grid-cols-4 lg:grid-rows-[auto,auto,1fr] lg:gap-x-6">
            <div className="lg:col-span-2 lg:sticky top-6 lg:border-r lg:pr-4 lg:border-gray-200">
              {/* <!-- Image gallery --> */}
              <ImageCarousal images={productDetails?.imageURLs} />
            </div>

            {/* <!-- Options --> */}
            <div className="mt-4 lg:mt-0 lg:col-span-2 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex justify-between my-auto mb-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {productDetails?.title}
                </h1>
                <div className="my-auto">
                  {favourite ? (
                    <MdFavorite
                      onClick={() => setFavourite(false)}
                      className="text-4xl text-red-500 my-auto cursor-pointer duration-200 hover:scale-125"
                    />
                  ) : (
                    <MdFavoriteBorder
                      onClick={() => setFavourite(true)}
                      className="text-4xl my-auto cursor-pointer duration-200 hover:scale-125"
                    />
                  )}
                </div>
              </div>

              {/* <!-- Reviews --> */}
              <div className="mt-6 flex justify-between">
                <div className="flex">
                  <p className="text-3xl text-gray-900 font-semibold">
                    ₹ {data ? parseInt(data?.basePrice) : ""}
                  </p>
                  <p className="px-1 mt-auto text-sm line-through ml-2 font-bold text-gray-600">
                    ₹{" "}
                    {parseInt(
                      data?.basePrice +
                        (data?.basePrice * data?.discountPercentage) / 100
                    )}
                  </p>
                </div>
                <div className="flex items-center my-auto">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    {/* <!--
                Heroicon name: solid/star

                Active: "text-gray-900", Default: "text-gray-200"
              --> */}
                    {[1, 1, 1, 1, 0].map((rating) => (
                      <svg
                        className={
                          rating
                            ? "text-yellow-500 h-5 w-5 flex-shrink-0"
                            : "text-gray-800 h-5 w-5 flex-shrink-0"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="sr-only">4 out of 5 stars</p>
                  <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {productDetails.numReviews} reviews
                  </a>
                </div>
              </div>

              <hr className="my-6" />

              <div>
                <h3 className="sr-only">Description</h3>

                <h3 className="text-sm text-gray-900 font-semibold">
                  Description
                </h3>
                <div className="space-y-6">
                  <p className="text-sm text-gray-900">
                    {productDetails.description}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {/* <!-- Egg Preference --> */}
                {productDetails?.categoryType &&
                  config.map((upgrade) => {
                    let id = upgrade.uID;
                    if (upgrade.type === "select") {
                      return (
                        <SelectUpgrade
                          data={{
                            ...upgrade,
                            values: productDetails.productUpgrades[id]
                              ? productDetails.productUpgrades[id]
                              : upgrade.values,
                          }}
                          onChange={(selected, extraCost) => {
                            setData({
                              ...data,
                              basePrice: data.basePrice + extraCost,
                            });
                            setInputs({ ...inputs, [id]: selected });
                          }}
                        />
                      );
                    } else if (upgrade.type === "date") {
                      return (
                        <DateUpgrade
                          required={upgrade.required}
                          data={upgrade}
                          error={errors[upgrade.uID]}
                          onChange={(e) => {
                            setInputs({ ...inputs, [id]: e });
                            seterrors({ ...errors, [upgrade.uID]: "" });
                          }}
                        />
                      );
                    } else if (upgrade.type === "text") {
                      return (
                        <TextUpgrade
                          required={upgrade.required}
                          data={upgrade}
                          error={errors[upgrade.uID]}
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              [id]: e,
                            });
                            seterrors({ ...errors, [upgrade.uID]: "" });
                          }}
                        />
                      );
                    } else if (upgrade.type === "number") {
                      return (
                        <TextUpgrade
                          required={upgrade.required}
                          data={upgrade}
                          error={errors[upgrade.uID]}
                          type="number"
                          defaultValue={pincode?.pincode}
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              [id]: e,
                            });
                            seterrors({ ...errors, [upgrade.uID]: "" });
                            checkDelivery(e);
                          }}
                          error={errors.pincodeError || errors[upgrade.uID]}
                          success={errors.pincodeStatus}
                        />
                      );
                    } else if (upgrade.type === "dropdown") {
                      return (
                        <DropdownUpgrade
                          data={upgrade}
                          error={errors[upgrade.uID]}
                          required={upgrade.required}
                          onChange={(k, extraCost) => {
                            setData({
                              ...data,
                              basePrice: data.basePrice + extraCost,
                            });
                            setInputs({ ...inputs, [id]: k });
                            seterrors({ ...errors, [upgrade.uID]: "" });
                          }}
                        />
                      );
                    } else if (upgrade.type === "file") {
                      <FileUpgrade
                        data={upgrade}
                        error={errors[upgrade.uID]}
                        required={upgrade.required}
                        onChange={(k, extraCost) => {
                          // Upload the file to S3 and return the URL
                          setInputs({ ...inputs, [id]: k });
                          seterrors({ ...errors, [upgrade.uID]: "" });
                        }}
                      />;
                    }
                  })}

                <div className="hidden md:block w-full z-20 my-10">
                  <div className="py-3 w-full flex justify-between bg-gray-50">
                    <select
                      className="border-2 border-black rounded-md py-3 pr-10 mx-4 font-bold"
                      onChange={(e) =>
                        setState({ ...state, quantity: e.target.value })
                      }
                    >
                      <option value={1}>01</option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                    </select>
                    <button
                      onClick={() => onAddToCart()}
                      title="We know it's tempting to have it, but, it's your love towards your loved ones🤗!"
                      className="bg-black w-full rounded-md py-3 mx-4 text-base font-bold text-white hover:bg-black focus:outline-none"
                    >
                      {state.addingToCart ? "Adding to cart..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>

              {/* <h3 className="text-md text-gray-900 font-semibold">Addons</h3> */}
              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-gray-200 lg:pr-2">
                {false && <Addons />}
                {/* <!-- Description and details --> */}

                {false && (
                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Hand cut and sewn locally
                          </span>
                        </li>

                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Dyed with our propietary colors
                          </span>
                        </li>

                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Pre-washed &amp; pre-shrunk
                          </span>
                        </li>

                        <li className="text-gray-400">
                          <span className="text-gray-600">
                            Ultra-soft 100% cotton
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      The 6-Pack includes two black, two white, and two heather
                      gray Basic Tees. Sign up for our subscription service and
                      be the first to get new, exciting colors, like our
                      upcoming &quot;Charcoal Gray&quot; limited release.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="px-4 lg:px-10 mb-3">
            <h3 className="font-semibold text-2xl">Similar Products</h3>
          </div>

          <ItemSlider
            category_id={productDetails?.categoryType?.categoryLink}
          />

          <div className="sm:block md:hidden w-full fixed bottom-0 z-20">
            <div className="py-3 w-full flex justify-between bg-gray-50">
              <select className="border-2 border-black rounded-md py-3 pr-10 mx-4 font-bold">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
              <button
                onClick={() => onAddToCart()}
                className="bg-black w-full rounded-md py-3 mx-4 text-base font-medium text-white hover:bg-black focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {state.tryLogin && (
        <LoginModal
          onClose={(e) => {
            if (e === "add") {
              onAddToCart(true);
            } else {
              setState({ ...state, tryLogin: false });
            }
          }}
        />
      )}
    </div>
  );
};

export async function getStaticProps({ params }) {
  let result = await getProductsByproductLink({
    productLink: params.product_id,
  });

  let config = result.config;
  let product = result.product;

  let basePrice =
    product.basePrice - (product.basePrice * product.discountPercentage) / 100;
  product.basePrice = basePrice;

  return {
    props: { productDetails: product, config: config || [] },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  let paths = await fetch(process.env.NEXT_PUBLIC_API + "/admin/products/all")
    .then((res) => res.json())
    .then((res) => {
      return res?.categories?.map((product) => ({
        params: { product_id: product.productLink },
      }));
    });
  return {
    paths: paths || [],
    fallback: true,
  };
}

export default ProductPage;
