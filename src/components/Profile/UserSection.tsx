import { h, FunctionalComponent } from "preact";

const UserSection: FunctionalComponent = () => {
  return (
    <div className="flex items-center w-full bg-no-repeat bg-userSection bg-[length:100%_50%] min-h-[120px]">
      <div className="bg-white mx-2.5 p-3 rounded-full w-[90px] h-[90px]">
        <div className="user-icon-shadow w-full h-full rounded-full bg-[#ff978d]"></div>
      </div>
      <div className="grow px-5">
        <div className="flex items-center justify-between text-white">
          <span className="text-sm">ID</span>
          <span className="text-lg">1239002029</span>
        </div>
        <div className="flex items-center justify-between text-[#f7bc86]">
          <span className="text-sm">剩餘金幣</span>
          <span className="text-lg">{"0"}&nbsp;元</span>
        </div>
      </div>
    </div>
  );
};

export default UserSection;
