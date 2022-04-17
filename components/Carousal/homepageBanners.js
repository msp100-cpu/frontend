import React, { useState } from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import Carousel, { Dots, arrowsPlugin } from "@brainhubeu/react-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const ImageCarousal = () => {
  const [state, setState] = useState({
    value: 0,
    slides: [
      {
          url : "https://youtu.be/UpEO15qRWbo"
        // url: "https://cdn.igp.com/f_auto,q_auto/banners/IGP_Rakhi_20210625.jpg?v=8",
      },
      // {
      //   url: "https://cdn.igp.com/f_auto,q_auto/banners/sdd_20210527.jpg",
      // },
      // {
      //   url: "https://cdn.igp.com/f_auto,q_auto/banners/ThemeCake2021_05_28.jpg",
      // },
      // {
      //   url: "https://cdn.igp.com/f_auto,q_auto/banners/igp_personalized_20210707.jpg.jpg",
      // },
    ],
  });

  const onchange = (value) => {
    setState({ ...state, value });
  };

  return (
    <div>
      <Carousel
        plugins={[
          "infinite",
          {
            resolve: arrowsPlugin,
            options: {
              arrowLeft: (
                <button>
                  <IoIosArrowBack name="angle-double-left" />
                </button>
              ),
              arrowLeftDisabled: (
                <button>
                  <IoIosArrowBack name="angle-left" />
                </button>
              ),
              arrowRight: (
                <button>
                  <IoIosArrowForward name="angle-double-right" />
                </button>
              ),
              arrowRightDisabled: (
                <button>
                  <IoIosArrowForward name="angle-right" />
                </button>
              ),
              addArrowClickHandler: true,
            },
          },
        ]}
      >
        {state.slides.map((image, k) => (
          <Link key={k} href="/new/somethingnew">
            <a>
              {/* <img src={image.url} className="rounded-lg" /> */}
              <video width="320" height="240" controls>
                <source src="https://youtu.be/UpEO15qRWbo" type="video/mp4" />
              </video>
            </a>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousal;
