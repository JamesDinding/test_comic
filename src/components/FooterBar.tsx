import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import IconHome from "./../resources/img/footer-home.svg";
import IconBookmark from "./../resources/img/footer-bookmark.svg";
import IconProfile from "./../resources/img/footer-profile.svg";
import { Link } from "preact-router/match";
import CustomLink from "./CustomLink";
import { getMobileOperatingSystem } from "../lib/helper";

const FooterBar: FunctionalComponent = () => {
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (mobile !== "") return;
    const os = getMobileOperatingSystem();

    if (os === "iOS") {
      setMobile("mobileconfig");
    } else {
      setMobile("apk");
    }
  }, [mobile]);

  return (
    <footer
      class={
        "relative h-[60px] border-t border-gray-100 shrink-0 grid grid-cols-3 text-center py-2 select-none " +
        (mobile === "mobileconfig" ? " " : "")
      }
    >
      <CustomLink activeClassName="active" href="/home" className="group">
        <IconHome alt="首页" />
        <span className="text-[12px]">首页</span>
      </CustomLink>
      {/* <Link activeClassName="active" href="/video-home" class="group">
        <IconVideo alt="动漫" />
        <span className="text-[12px]">动漫</span>
      </Link> */}
      <CustomLink activeClassName="active" href="/collect" className="group">
        <IconBookmark alt="收藏" />
        <span className="text-[12px]">收藏</span>
      </CustomLink>
      <CustomLink activeClassName="active" href="/profile" className="group">
        <IconProfile alt="我的" />
        <span className="text-[12px]">我的</span>
      </CustomLink>
    </footer>
  );
};

export default FooterBar;
