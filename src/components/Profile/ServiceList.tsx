import { FunctionalComponent, h } from "preact";
import IconChevron from "../../resources/img/icon-chevron.svg";
import { Link } from "preact-router";

const serviceList = [
  { title: "註冊", img: "", url: "/register" },
  { title: "立即充值", img: "", url: "/charge" },
  { title: "錢包紀錄", img: "", url: "/purchase-record" },
  { title: "尋回帳戶", img: "", url: "/recovery" },
  { title: "客服中心", img: "", url: "/service" },
];

const ServiceList = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="mb-2 rounded-2xl">
        <div className="bg-white mb-4 text-[#4c4c4c] rounded-2xl">
          <div className="m-2">
            <ul>
              {serviceList.map(({ title, img, url }) => {
                return (
                  <Link
                    className="flex justify-between items-center bg-white py-2 px-[.4rem] border-b-[1px] border-solid border-[#f1f1f1]"
                    href={url}
                  >
                    <div className="h-[1.5rem] flex items-center grow">
                      <div>img</div>
                      {title}
                    </div>
                    <div>
                      <IconChevron class="h-6" />
                    </div>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <a className="block h-[2.4rem] text-white rounded-[2.4rem] text-center leading-[2.4rem] mt-0 mx-[.4rem] mb-2 bg-[#ff978d]">
        登錄
      </a>
    </div>
  );
};

export default ServiceList;
