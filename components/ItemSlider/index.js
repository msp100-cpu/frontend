import React, { useState } from "react";
import { useEffect, useRef } from "react";

import Glider from "react-glider";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { getProductsByCategoryID } from "../../api/productsAPIs";

const SimilarProducts = ({ category_id = "cakes" }) => {
  const gliderRef = useRef(null);
  const similarProducts = [
    {
      _id: "60f300f6d8d2c24ec865dccc",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-classic-red-velvet-cake-half-kg--109230-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "butterscotch_cake_01",
      title: "Butterscotch Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 695,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcce",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-delicious-chocolate-cake-with-premium-frosting-half-kg--135596-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "vanilla_coolcake_1",
      title: "Vanilla Coolcake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 400,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcd1",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-black-forest-cake-half-kg--13461-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "black_forest_cake_33",
      title: "Black Forest Chocolate Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 555,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dccc",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-classic-red-velvet-cake-half-kg--109230-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "butterscotch_cake_01",
      title: "Butterscotch Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 695,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcce",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-delicious-chocolate-cake-with-premium-frosting-half-kg--135596-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "vanilla_coolcake_1",
      title: "Vanilla Coolcake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 400,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcd1",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-black-forest-cake-half-kg--13461-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "black_forest_cake_33",
      title: "Black Forest Chocolate Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 555,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dccc",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-classic-red-velvet-cake-half-kg--109230-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "butterscotch_cake_01",
      title: "Butterscotch Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 695,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcce",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-delicious-chocolate-cake-with-premium-frosting-half-kg--135596-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "vanilla_coolcake_1",
      title: "Vanilla Coolcake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 400,
      discountPercentage: 10,
    },
    {
      _id: "60f300f6d8d2c24ec865dcd1",
      specialProperties: {
        new: true,
        topProduct: false,
        bestValue: false,
        bestSeller: false,
        mostPopular: false,
      },
      imageURLs: [
        "https://cdn.igp.com/f_auto,q_auto,t_pnopt6prodlp/products/p-black-forest-cake-half-kg--13461-m.jpg",
      ],
      rating: 0,
      countInStock: 25,
      productLink: "black_forest_cake_33",
      title: "Black Forest Chocolate Cake",
      categoryType: {
        categoryLink: "cakes",
        categoryName: "Cakes",
      },
      basePrice: 555,
      discountPercentage: 10,
    },
  ];
  const [data, setData] = useState({
    similarProducts: [],
    loading: true,
  });

  useEffect(() => {
    getProductsByCategoryID({
      categoryLink: category_id,
      pageNumber: 1,
      count: 20,
      filters: {},
    })
      .then((response) => {
        if (response.error) {
          setData({ ...data, loading: true, error: response.error });
        } else {
          setData({
            ...data,
            loading: false,
            similarProducts: response.products,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setData({ ...data, loading: false, error: error.error });
      });
  }, []);

  const SliderSetting = {
    skipTrack: true,
    responsive: [
      {
        breakpoint: 375,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 120,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 230,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 230,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 250,
        },
      },
    ],
  };

  if (data.loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ margin: "0 30px", position: "relative" }}>
      <Glider
        ref={gliderRef}
        hasArrows
        arrows={{
          next: `#rightSlide`,
          prev: `#leftSlide`,
        }}
        {...SliderSetting}
      >
        <div className="glider-track">
          {data.similarProducts.map((product, i) => (
            <div className="mx-auto px-4">
              <div className="mt-2  ">
                <a
                  className="relative hover:shadow-xl duration-200"
                  href={"/product/" + product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {product.feature && (
                    <Feature
                      color={product.feature.color}
                      background={product.feature.background}
                      label={product.feature.label}
                    />
                  )}

                  <div className="group relative transform group-hover:scale-105 duration-100">
                    <div className="w-full min-h-52 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-64 lg:aspect-none">
                      <img
                        src={product.imageURLs[0]}
                        alt={product.title}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      />
                    </div>
                    <h3 className="text-lg my-1 text-black">
                      <a
                        href={"/product/" + product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-sm"
                      >
                        {product.title}
                      </a>
                    </h3>

                    <div className="mb-4 group flex justify-between">
                      <div className="flex">
                        <p className="text-lg font-bold text-red-500">
                          ₹{" "}
                          {parseInt(
                            (product.basePrice *
                              (100 - product.discountPercentage)) /
                              100
                          )}
                        </p>
                        <p className="text-sm my-auto md:text-sm pl-3 text-gray-900 line-through">
                          ₹ {product.basePrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Glider>
      <div className="arrowdiv arrowdiv__one  ">
        <div className="border bg-gray-200 ">
          <IoMdArrowDropleft
            size={30}
            id={`leftSlide`}
            className=" cursor-pointer "
          />
        </div>
      </div>
      <div className="arrowdiv arrowdiv__two">
        <div className="border bg-gray-200 ">
          <IoMdArrowDropright
            size={30}
            id={`rightSlide`}
            className=" cursor-pointer "
          />
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
// <div className="absolute arrowdiv__one flex justify-center align-items-center">
