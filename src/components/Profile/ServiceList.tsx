import { FunctionalComponent, h, Fragment as F } from "preact";
import { StateUpdater, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { useUser } from "../../context/user";
import { Link } from "preact-router";
import { route } from "preact-router";
import ServiceRow from "./ServiceRow";
import BindPhone from "./Services/BindPhone";
import PopLogout from "./Services/PopLogout";
import BackDrop from "../BackDrop";
import { CUSTOMER_SERVICE_URL } from "../../const";

const serviceList = [
  { title: "注册", msg: "完成注册即赠送150金币!", url: "/register" },
  { title: "完善会员资料", msg: "完成即赠送150金币!", url: "bind" },
  { title: "充值服务", msg: "", url: "/charge" },
  { title: "钱包纪录", msg: "", url: "/record" },
  // { title: "寻回帐户", msg: "", url: "/recovery" },
  {
    title: "客服中心",
    msg: "",
    url: CUSTOMER_SERVICE_URL,
  },
];

const ServiceList: FunctionalComponent = () => {
  const { isLogIn, logout, userStatus } = useUser();
  const [isPopBinding, setIsPopBinding] = useState(false);
  const [isPopLogout, setIsPopLogout] = useState(false);

  return (
    <F>
      {(isPopBinding || isPopLogout) &&
        createPortal(
          <BackDrop
            onClose={() => {
              setIsPopBinding(false);
              setIsPopLogout(false);
            }}
          />,
          document.getElementById("back-drop")!
        )}
      {isPopBinding && (
        <BindPhone
          title={
            userStatus.status === "active" ? "修改会员资料" : "绑定会员资料"
          }
          onClose={() => setIsPopBinding(false)}
        />
      )}
      {isPopLogout && <PopLogout onClose={() => setIsPopLogout(false)} />}
      <div className="flex flex-col overflow-auto">
        <div className="mb-2 rounded-2xl">
          <div className="bg-white mb-4 text-[#4c4c4c] rounded-2xl">
            <ul>
              {serviceList.map(({ title, url, msg }, i, arr) => {
                if (!isLogIn && url === "bind") return;
                if (isLogIn && url === "/register") return;
                if (userStatus.status === "active" && url === "bind") {
                  return (
                    <ServiceRow
                      url={url}
                      title={"修改会员资料"}
                      msg=""
                      clickCb={() => {
                        if (url === "bind") {
                          setIsPopBinding(true);
                          return;
                        }
                        route(url);
                      }}
                    />
                  );
                }

                if (url === CUSTOMER_SERVICE_URL) {
                  return (
                    <a href={`${url}?paymode=1`} target="_blank">
                      <li className="cursor-pointer flex items-center bg-white py-4 px-5">
                        <div className="text-[#6d5694] text-sm">{title}</div>
                        <div className="ml-5 grow text-left text-[#ff978d] text-xs">
                          {msg}
                        </div>
                        <div>
                          <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#6d569499] rounded-sm"></div>
                        </div>
                      </li>
                    </a>
                  );
                }

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
            className="cursor-pointer bg-white mb-5 py-2.5 px-5 text-[#6d5694] text-sm"
            onClick={() => {
              setIsPopLogout((prev) => !prev);
            }}
          >
            登出
          </div>
        ) : (
          <Link
            className="bg-white mb-5 py-2.5 px-5 text-[#6d5694] text-sm"
            href="/login"
          >
            登录
          </Link>
        )}
      </div>
    </F>
  );
};

export default ServiceList;
