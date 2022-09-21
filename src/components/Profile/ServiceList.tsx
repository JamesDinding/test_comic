import { FunctionalComponent, h, Fragment as F } from "preact";
import { StateUpdater, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { Link } from "preact-router";
import { route } from "preact-router";
import BindPhone from "./Services/BindPhone";
import BackDrop from "../BackDrop";

const serviceList = [
  { title: "註冊", msg: "完成註冊即贈送150金幣!", url: "/register" },
  { title: "完善會員資料", msg: "完成即贈送150金幣!", url: "bind" },
  { title: "充值服務", msg: "", url: "/charge" },
  { title: "錢包紀錄", msg: "", url: "/record" },
  { title: "尋回帳戶", msg: "", url: "/recovery" },
  { title: "客服中心", msg: "", url: "/profile" },
];

// interface ServiceListProps {
//   isPopBinding: boolean;
//   setIsPopBinding: StateUpdater<boolean>;
// }

const ServiceList: FunctionalComponent = (
  {
    // isPopBinding,
    // setIsPopBinding,
  }
) => {
  const [isPopBinding, setIsPopBinding] = useState(false);

  return (
    <F>
      {isPopBinding &&
        createPortal(
          <BackDrop onClose={() => setIsPopBinding(false)} />,
          document.getElementById("back-drop")!
        )}
      {isPopBinding && <BindPhone onClose={() => setIsPopBinding(false)} />}
      <div className="flex flex-col overflow-auto">
        <div className="mb-2 rounded-2xl">
          <div className="bg-white mb-4 text-[#4c4c4c] rounded-2xl">
            <ul>
              {serviceList.map((service, i, arr) => {
                return (
                  <li
                    className="cursor-pointer flex items-center bg-white py-4 px-5"
                    onClick={() => {
                      if (service.url === "bind") {
                        setIsPopBinding(true);
                        return;
                      }
                      route(service.url);
                    }}
                    href={service.url}
                  >
                    <div className="text-[#9e7654] text-sm">
                      {service.title}
                    </div>
                    <div className="ml-5 grow text-left text-[#ff978d] text-xs">
                      {service.msg}
                    </div>
                    <div>
                      <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#9e765499] rounded-sm"></div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Link
          className="bg-white pt-2.5 pb-12 px-5 text-[#9e7654] text-sm"
          href="/login"
        >
          登錄
        </Link>
      </div>
    </F>
  );
};

export default ServiceList;
