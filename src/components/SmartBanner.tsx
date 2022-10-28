import { FunctionalComponent, h } from "preact";
import Logo from "./../resources/img/logo-text.svg";
import IconClose from "./../resources/img/icon-close.svg";
import { StateUpdater, useState, useEffect } from "preact/hooks";

interface SmartBannerProps {
  SetSmartBannerVisiblity: StateUpdater<boolean>;
  tc?: string;
}

const SmartBanner: FunctionalComponent<SmartBannerProps> = ({
  SetSmartBannerVisiblity,
  tc,
}) => {
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (mobile !== "") return;
    function getMobileOperatingSystem() {
      var userAgent = navigator.userAgent;

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
      }

      if (/android/i.test(userAgent)) {
        return "Android";
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod|Mac/.test(userAgent)) {
        return "iOS";
      }

      return "unknown";
    }
    const os = getMobileOperatingSystem();

    if (os === "iOS") {
      setMobile("mobileconfig");
    } else {
      setMobile("apk");
    }
  }, [mobile]);

  return (
    <div
      class="flex pt-2 pb-3 items-center gap-1.5 border-b border-gray-100 shadow-sm shrink-0"
      id="smartbanner"
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          SetSmartBannerVisiblity(false);
        }}
        id="close-smartbanner-btn"
      >
        <IconClose class="text-gray-500 m-2 ml-3 h-4" />
      </a>

      <a href={`/app/sjmh.${mobile}?tc=${tc}`} target="_blank">
        <img
          src="/assets/favicon.svg"
          class="rounded-lg shadow-md h-12"
          alt="水晶漫画"
        />
      </a>

      <div class="flex flex-col justify-start items-start mt-1 ml-1 grow">
        <a href={`/app/sjmh.${mobile}?tc=${tc}`} target="_blank">
          <Logo class="h-5 mt-1" alt="水晶漫画" />
        </a>
        <span class="text-[11px] text-[#dfad6d] py-1 font-medium tracking-widest whitespace-nowrap">
          最懂您需求的漫画网站
        </span>
      </div>

      <a
        href={`/app/sjmh.${mobile}?tc=${tc}`}
        target="_blank"
        class="rounded-full border-2 border-[#b5a7d0] text-[#6d5694] p-2 text-xs font-bold mr-2 hover:bg-[#fcf6ff] whitespace-nowrap"
      >
        安装 APP
        <img
          src="/assets/img/download.png"
          class="inline mx-1 h-4"
          alt="安装"
        />
      </a>
    </div>
  );
};

export default SmartBanner;
