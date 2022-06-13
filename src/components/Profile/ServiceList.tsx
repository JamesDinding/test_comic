import { FunctionalComponent, h } from "preact";
import IconChevron from "../../resources/img/icon-chevron.svg";
import { Link } from "preact-router";
import IconPhone from "../../resources/img/profile-phone.svg";
import IconIdentification from "../../resources/img/profile-identification.svg";
import IconWallet from "../../resources/img/profile-wallet.svg";
import IconWechat from "../../resources/img/profile-wechat.svg";

// const serviceList = [
//   { title: "註冊", img: "", url: "/register" },
//   { title: "立即充值", img: "/assets/img/deposit.gif", url: "/charge" },
//   { title: "錢包紀錄", img: "", url: "/purchase-record" },
//   { title: "尋回帳戶", img: "", url: "/recovery" },
//   { title: "客服中心", img: "", url: "/service" },
// ];

const ServiceList = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="mb-2 rounded-2xl">
        <div className="bg-white mb-4 text-[#4c4c4c] rounded-2xl">
          <div className="m-2">
            <ul>
              <Link
                className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                href="/register"
              >
                <div className="h-[1.5rem] flex items-center grow">
                  <div className="min-w-[2rem]">
                    <IconPhone class="h-6" />
                  </div>
                  註冊
                </div>
                <div>
                  <IconChevron class="h-6" />
                </div>
              </Link>
              <Link
                className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                href="/charge"
              >
                <div className="h-[1.5rem] flex items-center grow">
                  <div className="min-w-[2rem]">
                    <img src="/assets/img/deposit.gif" alt="" />
                  </div>
                  立即充值
                </div>
                <div>
                  <IconChevron class="h-6" />
                </div>
              </Link>
              <Link
                className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                href="/purchase-record"
              >
                <div className="h-[1.5rem] flex items-center grow">
                  <div className="min-w-[2rem]">
                    <IconWallet class="h-6" />
                  </div>
                  錢包紀錄
                </div>
                <div>
                  <IconChevron class="h-6" />
                </div>
              </Link>
              <Link
                className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                href="/recovery"
              >
                <div className="h-[1.5rem] flex items-center grow">
                  <div className="min-w-[2rem]">
                    <IconIdentification class="h-6" />
                  </div>
                  尋回帳戶
                </div>
                <div>
                  <IconChevron class="h-6" />
                </div>
              </Link>
              <Link
                className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                href="/service"
              >
                <div className="h-[1.5rem] flex items-center grow">
                  <div className="min-w-[2rem]">
                    <IconWechat class="h-6" />
                  </div>
                  客服中心
                </div>
                <div>
                  <IconChevron class="h-6" />
                </div>
              </Link>
              {/* {serviceList.map(({ title, img, url }) => {
                return (
                  <Link
                    className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                    href={url}
                  >
                    <div className="h-[1.5rem] flex items-center grow">
                      <div>
                        <img src={img} alt="" />
                      </div>
                      {title}
                    </div>
                    <div>
                      <IconChevron class="h-6" />
                    </div>
                  </Link>
                );
              })} */}
            </ul>
          </div>
        </div>
      </div>
      <Link
        className="block h-[2.4rem] text-white rounded-[2.4rem] text-center leading-[2.4rem] mt-0 mx-[.4rem] mb-2 bg-[#ff978d]"
        href="/login"
      >
        登錄
      </Link>
    </div>
  );
};

export default ServiceList;
