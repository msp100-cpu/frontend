import React, { useState } from "react";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";

const InputSlider = () => {
  const [state, setState] = useState({
    value: { min: 199, max: 1000 },
  });
  return (
    <InputRange
      draggableTrack
      step={20}
      maxValue={1700}
      minValue={199}
      onChange={(value) => setState({ value: value })}
      onChangeComplete={(value) => console.log(value)}
      value={state.value}
    />
  );
};
export default InputSlider;
