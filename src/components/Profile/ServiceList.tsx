import { FunctionalComponent, h, Fragment as F } from "preact";
import { StateUpdater, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { useUser } from "../../context/user";
import { Link } from "preact-router";
import { route } from "preact-router";
import ServiceRow from "./ServiceRow";
import BindPhone from "./Services/BindPhone";
import BackDrop from "../BackDrop";

const serviceList = [
  { title: "註冊", msg: "完成註冊即贈送150金幣!", url: "/register" },
  { title: "完善會員資料", msg: "完成即贈送150金幣!", url: "bind" },
  { title: "充值服務", msg: "", url: "/charge" },
  { title: "錢包紀錄", msg: "", url: "/record" },
  // { title: "尋回帳戶", msg: "", url: "/recovery" },
  { title: "客服中心", msg: "", url: "/profile" },
];

const ServiceList: FunctionalComponent = () => {
  const { isLogIn, logout } = useUser();
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
              {serviceList.map(({ title, url, msg }, i, arr) => {
                if (!isLogIn && url === "bind") return;
                if (isLogIn && url === "/register") return;
                return (
                  <ServiceRow
                    url={url}
                    title={title}
                    msg={msg}
                    clickCb={() => {
                      if (url === "bind") {
                        setIsPopBinding(true);
                        return;
                      }
                      route(url);
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        {isLogIn ? (
          <div
            className="bg-white mb-5 py-2.5 px-5 text-[#6d5694] text-sm"
            onClick={() => {
              logout();
            }}
          >
            登出
          </div>
        ) : (
          <Link
            className="bg-white mb-5 py-2.5 px-5 text-[#6d5694] text-sm"
            href="/login"
          >
            登錄
          </Link>
        )}
      </div>
    </F>
  );
};

export default ServiceList;
