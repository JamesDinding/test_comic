import { FunctionalComponent, h } from "preact";

const User = () => {
  return (
    <div className="flex user-card">
      <div className="mr-4 w-[2.86rem] h-[2.86rem] border-2 border-solid border-white rounded-full">
        User icon
      </div>
      <div className="user-card-info">
        <div className="text-xl pt-0">
          訪客
          <span className="text-[.6rem] text-[#a8a8a8] ml-1">ID: user.ID</span>
        </div>
        <div className="text-xs flex items-center">
          <div className="flex items-center basis-[80px]">
            {/* <Image /> */}金幣
          </div>
          <div className="text-[#a8a8a8]">user.remainCoins</div>
        </div>
        <div className="text-xs flex items-center">
          <div className="flex items-center basis-[80px]">
            {/* <Image /> */}VIP
          </div>
          <div className="text-[#a8a8a8]">user.vipState</div>
        </div>
      </div>
    </div>
  );
};

export default User;
