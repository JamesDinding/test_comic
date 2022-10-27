import { FunctionalComponent, h, Fragment } from "preact";
import IconCs from "../resources/img/btn-cs.svg";
import IconArrow from "../resources/img/icon-arrow.svg";
import IconCross from "../resources/img/icon-cross.svg";
import IconCoin from "../resources/img/icon-coin.svg";
import { Link, route } from "preact-router";
import { CUSTOMER_SERVICE_URL } from "../const";

interface ReturnBarProps {
  title: string;
  type?: "service" | "charge" | "cross" | "reading";
  defaultDestination?: string;
  bgColor?: string;
  hasShadow?: boolean;
}

const ReturnBar: FunctionalComponent<ReturnBarProps> = ({
  title,
  type = "service",
  bgColor = "bg-white",
  hasShadow = false,
  defaultDestination,
}) => {
  return (
    <div
      className={
        `return-bar px-5 ${bgColor} ` + (hasShadow ? "relative shadow-md " : "")
      }
    >
      <div
        className="h-[37px] flex flex-col justify-end items-center cursor-pointer"
        onClick={() => {
          if (defaultDestination) {
            route(defaultDestination);
          } else {
            history.back();
          }
        }}
      >
        <span className="mb-[.125rem]">
          <IconArrow class="w-[1.125rem] text-[#8f6e9f]" />
        </span>
        <div className="pt-1 text-[#666666] text-[12px] leading-[12px] whitespace-nowrap">
          返回
        </div>
      </div>
      <div className="grow overflow-hidden mx-4">
        <div className="text-center text-[#666666] book-oneline whitespace-nowrap">
          {title}
        </div>
      </div>
      {type === "service" && (
        <div className="h-[30px]">
          <a href={`${CUSTOMER_SERVICE_URL}?paymode=1`} target="_blank">
            <IconCs class="h-[37px]" />
          </a>
        </div>
      )}
      {type === "charge" && (
        <div className="h-[30px]">
          <Link href="/charge">
            <img src="/assets/img/deposit.gif" className="w-6" />
          </Link>
        </div>
      )}
      {type === "reading" && (
        <div className="h-[30px]">
          <Link href="/charge">
            <span className="mb-[.125rem]">
              <IconCoin class="w-[1.125rem] text-[#8f6e9f]" />
            </span>
            <div className="pt-1 text-[#666666] text-[12px] leading-[12px]">
              返回
            </div>
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
              关闭
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnBar;
