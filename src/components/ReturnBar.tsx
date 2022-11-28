import { FunctionalComponent, h, Fragment } from "preact";
import IconCs from "../resources/img/btn-cs.svg";
import IconArrow from "../resources/img/icon-arrow.svg";
import IconCross from "../resources/img/icon-cross.svg";
import IconCoin from "../resources/img/icon-coin.svg";
import IconHome from "../resources/img/icon-reading-home.svg";
import Router, { Link, route } from "preact-router";
import { CUSTOMER_SERVICE_URL } from "../const";
import { useRouter } from "../context/router";
import CustomLink from "./CustomLink";

interface ReturnBarProps {
  title: string;
  type?: "service" | "charge" | "cross" | "reading" | "home";
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
  const { customRouter } = useRouter();

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
            customRouter.push(defaultDestination);
            route(defaultDestination);
          } else {
            // const des = customRouter.pop();
            history.back();
            // route(des);
          }
        }}
      >
        <span className="mb-[.125rem]">
          <IconArrow class="w-[1.125rem] text-[#8f6e9f]" />
        </span>
        <div className="pt-1.5 text-[#666666] text-[12px] leading-[12px] whitespace-nowrap">
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
          <CustomLink href="/charge">
            <img src="/assets/img/deposit.gif" className="w-6" />
          </CustomLink>
        </div>
      )}
      {type === "home" && (
        <div className="h-[30px]">
          <CustomLink href="/home">
            <IconHome class="h-[25px]" />
          </CustomLink>
        </div>
      )}
      {type === "reading" && (
        <div className="h-[30px]">
          <CustomLink href="/charge">
            <span className="mb-[.125rem]">
              <IconCoin class="w-[1.125rem] text-[#8f6e9f]" />
            </span>
            <div className="pt-1 text-[#666666] text-[12px] leading-[12px]">
              返回
            </div>
          </CustomLink>
        </div>
      )}
      {type === "cross" && (
        <div className="h-[30px]">
          <div
            className="h-[37px] flex flex-col justify-end items-center cursor-pointer"
            onClick={() => {
              customRouter.pop();
              history.back();
            }}
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
