import { FunctionalComponent, h, Fragment } from "preact";
import IconHome from "../resources/img/footer-home.svg";
import IconChevron from "../resources/img/icon-chevron.svg";
import IconArrow from "../resources/img/icon-arrow.svg";
import { Link } from "preact-router";
import Image from "./_Image/image";

interface ReturnBarProps {
  title: string;
}

const ReturnBar: FunctionalComponent<ReturnBarProps> = ({ title }) => {
  return (
    <div className="return-bar px-5">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => history.back()}
      >
        <span>
          <IconArrow class="h-5 text-[#8f6e9f]" />
        </span>
        <div className="pt-1 text-[#666666] text-[12px] leading-[12px]">
          返回
        </div>
      </div>
      <div className="grow">
        <div className="text-center text-[#666666] text-xl">{title}</div>
      </div>
      <div className="h-[30px]">
        <Link href="/profile">
          <img src="/assets/img/btn-cs.png" alt="" />
        </Link>
      </div>
    </div>
  );
};

export default ReturnBar;
