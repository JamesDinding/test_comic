import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import Btn from "../../../UI/Btn";

const Empty: FunctionalComponent = () => {
  return (
    <div className="h-full flex flex-col justify-between pt-[100px] text-center bg-[#faf6ff]">
      <div className="text-[#6d5694] text-center opacity-40">啥都没有呢~</div>
      <div className="grow bg-[#faf6ff]"></div>
      <div className="px-5 pb-4">
        <Btn title="去逛逛" cb={() => route("/home")} />
      </div>
    </div>
  );
};

export default Empty;
