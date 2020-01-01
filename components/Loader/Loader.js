import React from "react";
import { Preloader, Spinning, ThreeDots, Oval, Circles, Audio } from "react-preloader-icon";
const Loading = () => (
  <div className="w-100 h-100 position-absolute" style={{ top: 0, paddingTop: "20%", background: "rgba(84, 84, 84, 0.1)" }}>
    <Preloader className="m-auto" use={Spinning} size={100} strokeWidth={10} strokeColor="#F0AD4E" duration={1500} />
  </div>
);
const Loader = props => {
  const { loader_use, loader_color, loader_size } = props;
  let useL = Spinning;
  switch (loader_use) {
  case "spin":
    useL = Spinning;
    break;
  case "dot":
    useL = ThreeDots;
    break;
  case "circle":
    useL = Circles;
    break;
  case "round":
    useL = Oval;
    break;
  case "audio":
    useL = Audio;
    break;
  default:
    break;
  }
  return (
    <Preloader
      className="m-auto"
      use={useL}
      size={loader_size !== undefined ? loader_size : 100}
      strokeWidth={10}
      strokeColor={loader_color !== undefined ? loader_color : "#F0AD4E"}
      duration={1500}
    />
  );
};
export default Loader;
export { Loading };