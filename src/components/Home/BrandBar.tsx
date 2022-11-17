import { FunctionalComponent, h } from "preact";
import { useRef, StateUpdater, MutableRef } from "preact/hooks";
import Logo from "./../../resources/img/logo-text.svg";
import IconSearch from "./../../resources/img/homebrandbar-search.svg";
import IconCoin from "../../resources/img/icon-coin.svg";
import { useRouter } from "../../context/router";
import Router, { route } from "preact-router";
import CustomLink from "../CustomLink";

interface HomeBrandBarProps {}

const HomeBrandBar: FunctionalComponent<HomeBrandBarProps> = () => {
  const { customRouter } = useRouter();

  return (
    <div class="header flex px-4 py-2 items-center shrink-0">
      <a href="#">
        <Logo class="w-24" alt="女神漫画" />
      </a>
      <div
        className="relative grow px-3 cursor-pointer"
        onClick={() => {
          customRouter.push("/search");
          route("/search");
        }}
      >
        <input
          placeholder="更多分类"
          type="text"
          class="cursor-pointer search-box bg-[#f1f1f1] w-full px-5 py-2.5 rounded-full text-xs text-gray-500 font-medium flex"
        />
        <div className="absolute top-1/2 right-8 translate-y-[-50%]">
          <IconSearch class="text-gray-500 h-4" alt="搜索" />
        </div>
      </div>
      <CustomLink href="/charge" className="flex flex-col items-center">
        <IconCoin class="w-6" />
        <span class="text-[#666666] text-xs">充值</span>
      </CustomLink>
    </div>
  );
};

export default HomeBrandBar;
