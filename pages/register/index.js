import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import SidePic from "../../assets/boxing_day.jpg";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookCircleFill } from "react-icons/ri";

import { storeAuthData } from "../../Redux/actions/userAction";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Categories from "../../components/Categories";
import { SignupAPI } from "../../api/authAPIs";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((store) => store);
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    rememberMe: false,
    loading: false,
    error: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, loading: true, error: "" });

    SignupAPI({
      email: data.email,
      name: data.name,
      password: data.password,
      rememberMe: data.rememberMe,
    })
      .then((response) => {
        setData({ ...data, loading: false });
        dispatch(
          storeAuthData({
            token: response.token,
            email: response.email,
            name: response.name,
            isLoggedIn: true,
          })
        );
        router.push("/");
      })
      .catch((error) => {
        setData({ ...data, loading: false, error: error.error });
      });
  };

  const responseSuccessGoogle = (response) => {
    fetch(`${process.env.NEXT_PUBLIC_API}/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: response.tokenId }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.error) {
          setData({
            ...data,
            loading: false,
            error: resJson.error,
          });
        } else {
          console.log(resJson);
          dispatch(
            storeAuthData({
              token: resJson.token,
              email: resJson.email,
              name: resJson.name,
              isLoggedIn: true,
            })
          );

          router.push("/", undefined, { shallow: true });
        }
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.error,
        });
      });
  };

  const responseFailGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/", undefined, { shallow: true });
    }
  }, []);

  return (
    <div className="bg-gray-50 mx-auto">
      <div className="flex-1 flex flex-col justify-center py-12 my-auto px-2 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto shadow-xl p-2 md:p-5 rounded-lg w-full max-w-lg">
          <div>
            <h2 className="text-3xl md:mx-auto md:text-center font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm md:text-center text-gray-600">
              and{" "}
              <a
                href="#s"
                className="font-medium text-red-600 hover:text-red-500"
              >
                Save all your favourite gifts to buy
              </a>
            </p>
          </div>

          <div className="mt-4">
            <div>
              <div className="my-3 grid grid-cols-2 gap-3">
                <div>
                  <GoogleLogin
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="w-full inline-flex shadow-effect justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign in with Google</span>
                        <FcGoogle size={20} className="mr-2" /> Google
                      </button>
                    )}
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CONSENT_URL}
                    buttonText="Sign in with Google"
                    className="mx-auto font-bold border-black shadow-lg rounded-lg"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailGoogle}
                    cookiePolicy={"single_host_origin"}
                  />{" "}
                </div>
                <div>
                  <a
                    href="#s"
                    className="w-full inline-flex shadow-effect justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <RiFacebookCircleFill
                      size={20}
                      className="text-blue-600 mr-2"
                    />
                    Facebook
                  </a>
                </div>
              </div>

              <div className="my-3 relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      onChange={(e) =>
                        setData({ ...data, name: e.target.value })
                      }
                      value={data.name}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      onChange={(e) =>
                        setData({ ...data, rememberMe: e.target.value })
                      }
                      value={data.rememberMe}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#s"
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {data.error && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {/* <!-- Heroicon name: solid/exclamation --> */}
                        <svg
                          className="h-4 w-4 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">{data.error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={data.loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  >
                    {data.loading ? "Loading..." : "Create an Account"}
                  </button>
                  <Link href={"/login"}>
                    <a
                      type="submit"
                      className="mt-3 flex justify-end underline border border-transparent rounded-md shadow-sm text-sm font-medium text-black focus:outline-none"
                    >
                      Already a user?
                    </a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
