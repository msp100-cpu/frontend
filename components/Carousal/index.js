import React, { useState } from "react";
import "@brainhubeu/react-carousel/lib/style.css";
import Carousel, { Dots } from "@brainhubeu/react-carousel";

const ImageCarousal = ({
  images = [
    "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-black-forest-cake-half-kg--13461-m.jpg",
    "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-black-forest-cake-half-kg--13461-m.jpg",
    "https://cdn.igp.com/f_auto,q_auto,t_prodl/products/p-black-forest-cake-half-kg--13461-m.jpg",
  ],
}) => {
  const [state, setState] = useState({
    value: 0,
    slides: images.map((img) => <img src={img} />),
    thumbnails: images.map((img) => (
      <img style={{ height: "80px" }} src={img} />
    )),
  });

  const onchange = (value) => {
    setState({ ...state, value });
  };

  return (
    <div>
      <Carousel value={state.value} slides={state.slides} onChange={onchange} />

      <Dots
        number={state.thumbnails.length}
        thumbnails={state.thumbnails}
        value={state.value}
        onChange={onchange}
        number={state.slides.length}
      />
    </div>
  );
};

export default ImageCarousal;
