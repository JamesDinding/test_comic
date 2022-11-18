import { h, FunctionalComponent, Fragment as F } from "preact";

const Loading: FunctionalComponent = () => {
  return (
    <div
      className="absolute w-full h-full z-[99999] flex justify-center items-center"
      style={{ backgroundColor: "rgba(109,86,148,.1)" }}
    >
      <div class="lds-ring absolute">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
