import { FunctionalComponent, h, Fragment as F } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { useUser } from "../../context/user";
import CustomLink from "../CustomLink";
import { useRouter } from "../../context/router";
import { route } from "preact-router";
import ServiceRow from "./ServiceRow";
import BindPhone from "./Services/BindPhone";
import PopLogout from "./Services/PopLogout";
import BackDrop from "../BackDrop";
import { CUSTOMER_SERVICE_URL } from "../../const";
import Password from "./Services/Password";
import { getMobileOperatingSystem } from "../../lib/helper";
import IconTriangle from "../../resources/img/icon-triangle.svg";
import ModalSafari from "../Modal/ModalSafari";
import ModalPassword from "../Modal/ModalPassword";

const serviceList = [
  { title: "注册", msg: "完成注册即赠送50金币!", url: "/register" },
  { title: "完善会员资料", msg: "完成即赠送70金币!", url: "#bind" },
  { title: "修改密码", msg: "", url: "#password" },
  { title: "下载", msg: "", url: "#app" },
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
  const { customRouter, tc } = useRouter();
  const { isLogIn, logout, userStatus } = useUser();
  const [isPopBinding, setIsPopBinding] = useState(false);
  const [isPopPassword, setIsPopPassword] = useState(false);
  const [isPopLogout, setIsPopLogout] = useState(false);
  const [isPopSafari, setIsPopSafari] = useState(false);
  const [isPopPasswordSuccess, setIsPopPasswordSuccess] = useState(false);

  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (mobile) return;
    const os = getMobileOperatingSystem();

    if (os === "iOS") {
      setMobile("mobileconfig");
    } else {
      setMobile("apk");
    }
  }, [mobile]);

  return (
    <F>
      {(isPopBinding ||
        isPopPassword ||
        isPopLogout ||
        isPopSafari ||
        isPopPasswordSuccess) &&
        createPortal(
          <BackDrop
            onClose={() => {
              setIsPopBinding(false);
              setIsPopLogout(false);
              setIsPopPassword(false);
              setIsPopSafari(false);
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
      {isPopPassword && (
        <Password
          onClose={() => setIsPopPassword(false)}
          popSuccess={setIsPopPasswordSuccess}
        />
      )}
      {isPopLogout && <PopLogout onClose={() => setIsPopLogout(false)} />}
      {isPopSafari && <ModalSafari onClose={() => setIsPopSafari(false)} />}
      {isPopPasswordSuccess && (
        <ModalPassword onClose={() => setIsPopPasswordSuccess(false)} />
      )}
      <div className="flex flex-col overflow-auto">
        <div className="mb-[.625rem] rounded-2xl">
          <div className="bg-white text-[#4c4c4c] rounded-2xl">
            <ul>
              {serviceList.map(({ title, url, msg }, i, arr) => {
                if (!isLogIn && url === "#bind") return;
                if (!isLogIn && url === "#password") return;
                if (isLogIn && url === "/register") return;
                if (userStatus.status === "active" && url === "#bind") {
                  return (
                    <ServiceRow
                      url={url}
                      title={"修改会员资料"}
                      msg=""
                      clickCb={() => {
                        if (url === "#bind") {
                          setIsPopBinding(true);
                          return;
                        }
                        customRouter.push(url);
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
                          <IconTriangle class="w-2 mr-4" />
                          {/* <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#6d569499] rounded-sm"></div> */}
                        </div>
                      </li>
                    </a>
                  );
                }
                if (url === "#app") {
                  if (localStorage.getItem("sjmh_device") !== "web") return;
                  return (
                    <a
                      href={`/app/sjmh.${mobile}?tc=${tc}`}
                      target="_blank"
                      onClick={(e) => {
                        if (mobile !== "mobileconfig") return;
                        const UA = navigator.userAgent.toLowerCase();
                        let shouldPopSafari = false;
                        shouldPopSafari =
                          UA.includes("mqqbrowser".toLowerCase()) ||
                          UA.includes("ucbrowser".toLowerCase()) ||
                          UA.includes("baidu".toLowerCase());
                        if (shouldPopSafari) {
                          e.preventDefault();
                          setIsPopSafari(true);
                        }
                      }}
                    >
                      <li className="cursor-pointer flex items-center bg-white py-4 px-5">
                        <div className="text-[#6d5694] text-sm">
                          {"下载 " +
                            (mobile === "mobileconfig" ? "iOS" : "Android") +
                            " App"}
                        </div>
                        <div className="ml-5 grow text-left text-[#ff978d] text-xs">
                          {mobile === "mobileconfig"
                            ? "苹果用户请使用safari下载"
                            : ""}
                        </div>
                        <div>
                          <IconTriangle class="w-2 mr-4" />
                          {/* <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#6d569499] rounded-sm"></div> */}
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
                      if (url === "#bind") {
                        setIsPopBinding(true);
                        return;
                      }
                      if (url === "#password") {
                        setIsPopPassword(true);
                        return;
                      }
                      customRouter.push(url);
                      route(url);
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div
            className="cursor-pointer bg-white py-2.5 px-5 text-[#6d5694] text-sm"
            onClick={() => {
              setIsPopLogout((prev) => !prev);
            }}
          >
            登出
          </div> */}
        {!isLogIn && (
          <CustomLink
            className="cursor-pointer bg-white py-2.5 px-5 text-[#6d5694] text-sm"
            href="/login"
          >
            登录
          </CustomLink>
        )}
      </div>
    </F>
  );
};

export default ServiceList;
