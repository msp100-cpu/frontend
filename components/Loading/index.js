import React from "react";
import Image from "next/image";
import Logo from "../../assets/full_logo.png";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center my-auto">
      <div className="flex flex-col justify-center my-auto h-full">
        <Image
          src={Logo}
          // width={320}
          width={160}
          alt="Its12"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};
export default Loading;
