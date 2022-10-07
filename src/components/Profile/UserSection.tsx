import { h, FunctionalComponent } from "preact";
import { useUser } from "../../context/user";

interface UserSectionProps {
  showVIP?: boolean;
}

const UserSection: FunctionalComponent<UserSectionProps> = ({
  showVIP = false,
}) => {
  const { isLogIn, userStatus } = useUser();

  return (
    <div className="flex  w-full bg-no-repeat bg-userSection bg-[length:100%_50%] min-h-[120px]">
      <div className="mt-2.5 mx-2.5 p-3 bg-white rounded-full w-[90px] h-[90px]">
        <div className="user-icon-shadow w-full h-full rounded-full bg-[#ff978d]"></div>
      </div>
      <div className="grow px-5 mt-[30px]">
        <div className="h-[30px] flex items-center justify-between text-white">
          <span className="text-sm">ID</span>
          <span className={showVIP ? "text-sm" : "text-lg"}>1239002029</span>
        </div>
        <div className="h-[17px] mt-[3px] flex items-center justify-between text-[#f7bc86]">
          <span className="text-xs">剩餘金幣</span>
          <span className={showVIP ? "text-xs" : "text-lg"}>
            {userStatus.coins || 0}&nbsp;元
          </span>
        </div>
        {showVIP && (
          <div className="h-[17px] mt-[1px] flex items-center justify-between text-[#999999]">
            <span className="text-xs">VIP 會員</span>
            <span className="text-xs">
              {userStatus.vip?.split(" ")[0] || "尚未開通"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSection;
