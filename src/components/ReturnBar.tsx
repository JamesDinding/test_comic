import { FunctionalComponent, h, Fragment } from "preact";
import IconCs from "../resources/img/btn-cs.svg";
import IconArrow from "../resources/img/icon-arrow.svg";
import IconCross from "../resources/img/icon-cross.svg";
import { Link } from "preact-router";

interface ReturnBarProps {
  title: string;
  type?: "service" | "charge" | "cross";
}

const ReturnBar: FunctionalComponent<ReturnBarProps> = ({
  title,
  type = "service",
}) => {
  return (
    <div className="return-bar px-5 bg-white">
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
      {type === "service" && (
        <div className="h-[30px]">
          <Link href="/profile">
            <IconCs class="h-[37px]" />
          </Link>
        </div>
      )}
      {type === "charge" && (
        <div className="h-[30px]">
          <Link href="/charge">
            <img src="/assets/img/deposit.gif" className="w-full" />
          </Link>
        </div>
      )}
      {type === "cross" && (
        <div className="h-[30px]">
          <div
            className="h-[37px] flex flex-col justify-end items-center cursor-pointer"
            onClick={() => history.back()}
          >
            <span className="mb-[.125rem]">
              <IconCross class="w-8 text-[#8f6e9f]" />
            </span>
            <div className="text-[#666666] text-[12px] leading-[12px]">
              關閉
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBar;
