import { FunctionalComponent, h, Fragment } from "preact";
import IconCs from "../resources/img/btn-cs.svg";
import IconArrow from "../resources/img/icon-arrow.svg";
import { Link } from "preact-router";

interface ReturnBarProps {
  title: string;
}

const ReturnBar: FunctionalComponent<ReturnBarProps> = ({ title }) => {
  return (
    <div className="return-bar px-5">
      <div
        className="h-[37px] flex flex-col justify-end items-center cursor-pointer"
        onClick={() => history.back()}
      >
        <span className="mb-[.125rem]">
          <IconArrow class="w-[1.125rem] text-[#8f6e9f]" />
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
          <IconCs class="h-[37px]" />
        </Link>
      </div>
    </div>
  );
};

export default ReturnBar;
