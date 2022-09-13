import { FunctionalComponent, h } from "preact";
import IconChevron from "../../resources/img/icon-chevron.svg";
import { Link } from "preact-router";
import IconPhone from "../../resources/img/profile-phone.svg";
import IconIdentification from "../../resources/img/profile-identification.svg";
import IconWallet from "../../resources/img/profile-wallet.svg";
import IconWechat from "../../resources/img/profile-wechat.svg";

const serviceList = [
  { title: "註冊", msg: "完成註冊即贈送150金幣!", url: "/register" },
  { title: "完善會員資料", msg: "完成即贈送150金幣!", url: "/profile" },
  { title: "充值服務", msg: "", url: "/charge" },
  { title: "錢包紀錄", msg: "", url: "/profile" },
  { title: "尋回帳戶", msg: "", url: "/profile" },
  { title: "客服中心", msg: "", url: "/profile" },
];

const ServiceList = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="mb-2 rounded-2xl">
        <div className="bg-white mb-4 text-[#4c4c4c] rounded-2xl">
          <ul>
            {serviceList.map((service, i, arr) => {
              return (
                <Link
                  className="flex items-center bg-white py-4 px-5"
                  href={service.url}
                >
                  <div className="text-[#9e7654] text-sm">{service.title}</div>
                  <div className="ml-5 grow text-left text-[#ff978d] text-xs">
                    {service.msg}
                  </div>
                  <div>
                    <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#9e7654] rounded-sm"></div>
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <Link className="bg-white py-4 px-5 text-[#9e7654] text-sm" href="/login">
        登錄
      </Link>
    </div>
  );
};

export default ServiceList;
