import { h, FunctionalComponent } from "preact";

const Empty: FunctionalComponent = () => {
  return (
    <div className="flex justify-center items-center bg-[#fcf6ff] min-h-[170px]">
      <span className="text-[#6d5694] opacity-40">啥都没有呢~</span>
    </div>
  );
};

export default Empty;
