import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";

const Profile = () => {
  const profileItems = [
    { id: "01", title: "My Orders ", navigate: "/editProfile" },
    { id: "02", title: "My Favourites", navigate: "/editProfile" },
    { id: "03", title: "Shipping Address ", navigate: "/editProfile" },
    { id: "04", title: "My Saved Cards", navigate: "/editProfile" },
    { id: "05", title: "Gift  Cards & Vouchers ", navigate: "/editProfile" },
    { id: "06", title: "Logout ", navigate: "/editProfile" },
  ];

  const [userData, setUserData] = useState({
    userId: "0001",
    userName: "Mehdi Hussain Mohammed",
    userEmail: "mehdihussain@gmail.com",
    userImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    userIsVerified: true,
  });

  return (
    <div className="mx-auto">
      {/* // ----------------------------------------------------------Mobile view--------------------------------------------- */}

      <div className="flex-1 flex flex-col justify-center  my-auto bg-gray-50 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        {/* // ----------------------------------------------------------Card View Start--------------------------------------------- */}
        <p className="text-2xl font-bold text-gray-900 p-3 flex justify-center">
          Profile
        </p>
        <div className="mx-auto shadow-xl p-5 rounded-lg w-full max-w-lg bg-white ">
          <div className="grid grid-cols-1 ">
            <div className="relative   bg-white flex items-center space-x-3  ">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-lg "
                  src={userData.userImage}
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-md font-bold text-gray-900">
                  {userData.userName}
                </p>
                <p className="text-md text-gray-500 truncate">
                  {userData.userEmail}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              {userData.userIsVerified && (
                <div className="relative bg-white flex items-center space-x-3  ">
                  <div className="flex items-center">
                    <div className="">
                      <GoVerified name="angle-double-right" />
                    </div>
                    <p className="text-smtext-gray-900">Verified</p>
                  </div>
                </div>
              )}
              <div className="  min-w-0">
                <button
                  type="button"
                  className="inline-flex items-center px-1.5 py-1.5 border border-transparent text-sm leading-4 font-medium rounded-sm text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2  "
                >
                  <FiEdit className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* // ----------------------------------------------------------Card View End--------------------------------------------- */}

        <div className="mt-5 mb-10">
          {profileItems.map((item, id) => {
            return (
              <div key={item.id}>
                <div className="flex justify-between mt-5 py-2">
                  <div>
                    <p className="text-md font-bold">{item.title} </p>
                  </div>

                  <div>
                    <FaChevronRight name="angle-double-right" />
                  </div>
                </div>

                <div className="w-full border-t border-gray-400 mt-3"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;

//<div className="w-full border-t border-red-400"></div>
