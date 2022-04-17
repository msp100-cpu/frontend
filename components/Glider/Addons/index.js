import React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Glider from "react-glider";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const index = () => {
  const gliderRef = useRef(null);
  const addonProducts = [
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

  const SliderSetting = {
    skipTrack: true,
    responsive: [
      {
        breakpoint: 375,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 150,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 170,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: "auto",
          slidesToScroll: "auto",
          itemWidth: 200,
        },
      },
    ],
  };

  return (
    <div style={{ margin: "0 30px", position: "relative" }}>
      <Glider ref={gliderRef} hasArrows {...SliderSetting}>
        <div className="glider-track">
          {addonProducts.map((product, i) => (
            <div className="mx-auto px-4" key={i} title={product.title}>
              <div className="mt-2">
                <Link href={"/product/" + "product.productLink"}>
                  <a className="relative hover:shadow-xl duration-200">
                    {product.feature && (
                      <Feature
                        color={product.feature.color}
                        background={product.feature.background}
                        label={product.feature.label}
                      />
                    )}

                    <div className="group relative transform hover:scale-105 duration-200 overflow-hidden">
                      <img
                        src={product.imageURLs[0]}
                        alt={product.title}
                        className="rounded-md object-center object-cover"
                      />
                      <h3 className="text-sm my-1 text-black">
                        <a
                          href={"/product/" + product.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-sm whitespace-nowrap"
                          title={product.title}
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Glider>
    </div>
  );
};

export default index;
