import { h, FunctionalComponent } from "preact";

const Empty: FunctionalComponent = () => {
  return (
    <div className="flex justify-center items-center bg-[#fffbf6] min-h-[170px]">
      <span className="text-[#9e7654] opacity-40">啥都沒有呢~</span>
    </div>
  );
};

export default Empty;
