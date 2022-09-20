import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import Btn from "../../../UI/Btn";

const Empty: FunctionalComponent = () => {
  return (
    <div className="h-full flex flex-col justify-between pt-[100px] text-center bg-[#fffbf6]">
      <div className="text-[#9e7654] text-center opacity-40">啥都沒有呢~</div>
      <div className="px-5 pb-4">
        <Btn title="去逛逛" cb={() => route("/home")} />
      </div>
    </div>
  );
};

export default Empty;
