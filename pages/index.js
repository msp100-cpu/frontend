import { useEffect, useRef, useState } from "react";
// import "@brainhubeu/react-carousel/lib/style.css";
// import Carousel, { arrowsPlugin } from "@brainhubeu/react-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import Categories from "../components/Categories";
import { HomepageAPI } from "../api/categoryAPIs";
import Loading from "../components/Loading";
import dynamic from "next/dynamic";
import Modal from "../components/Modal";
import { BiLocationPlus } from "react-icons/bi";

const Banners = dynamic(
  () => import("../components/Carousal/homepageBanners"),
  {
    ssr: false,
  }
);

const HomePage = () => {
  const [data, setData] = useState({
    loading: true,
    topCategories: [],
    featuredProducts: [],
  });
  const pincodeRef = useRef();
  const [pincodeModal, setPincodeModal] = useState(true);

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

  const PincodeModal = () => {
    const [inputPincode, setInputPincode] = useState("");
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
          <h2 className="uppercase my-auto mb-3 mr-auto text-center text-sm font-semibold">
            Webiste is Under Maintenance
          </h2>
        </div>
        <a
          href="https://wa.me/8688336248"
          className="w-full cursor-pointer my-3 mx-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:col-start-2 sm:text-sm"
        >
          <div className="my-auto">
            PLeace call / WhatsApp to: +91 86883 36248
          </div>
        </a>
      </Modal>
    );
  };

  if (data.loading) {
    return <Loading />;
  }

  return (
    <div>
      {pincodeModal && <PincodeModal />}
      <div className="max-w-full z-0 mt-2">
        <Banners />
      </div>
      <div>
        <Categories categories={data.topCategories} />
      </div>
      <div>
        <div className="relative bg-white overflow-hidden">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  Summer styles are finally here
                </h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-500">
                  This year, our new summer collection will shelter you from the
                  harsh elements of a world that doesn't care if you live or
                  die.
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* <!-- Decorative image grid --> */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                  >
                    <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                            <img
                              src="https://sc01.alicdn.com/kf/H6c913bf7cead4353b2f235b2763bb305S/231372502/H6c913bf7cead4353b2f235b2763bb305S.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://cdn.igp.com/f_auto,q_auto/cards/igp_birthday_gifts_new_20210405.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://cdn.igp.com/f_auto,q_auto,t_prodm/products/p-chocolates-and-blueberry-dragees-in-tray-133506-m.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://hpbd.name/uploads/worigin/2021/04/23/white-birthday-cake-with-photo-1_7ca66.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg col-span-6 overflow-hidden">
                            <img
                              src="https://hpbd.name/uploads/worigin/2021/04/23/white-birthday-cake-with-photo-1_7ca66.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://cdn.igp.com/f_auto,q_auto/cards/igp_birthday_gifts_new_20210405.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://cdn.igp.com/f_auto,q_auto,t_prodm/products/p-chocolates-and-blueberry-dragees-in-tray-133506-m.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
