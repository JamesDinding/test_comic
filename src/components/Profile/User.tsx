import { FunctionalComponent, h } from "preact";
import IconCoins from "../../resources/img/icon-coins.svg";
import IconVip from "../../resources/img/icon-vip.svg";

const User = () => {
  return (
    <div className="flex user-card">
      <div className="mr-4 w-[2.86rem] h-[2.86rem] border-2 border-solid border-white rounded-full bg-red-300"></div>
      <div className="user-card-info">
        <div className="text-xl pt-0">
          訪客
          <span className="text-[.6rem] text-[#a8a8a8] ml-1">ID: user.ID</span>
        </div>
        <div className="text-xs flex items-center">
          <div className="flex items-center basis-[60px]">
            <IconCoins class="h-5 pr-1" />
            金幣
          </div>
          <div className="text-[#a8a8a8]">user.remainCoins</div>
        </div>
        <div className="text-xs flex items-center">
          <div className="flex items-center basis-[60px]">
            <IconVip class="h-5 pr-1" />
            VIP
          </div>
          <div className="text-[#a8a8a8]">user.vipState</div>
        </div>
      </div>
    </div>
  );
};

export default User;
