import { h, FunctionalComponent } from "preact";
import CustomLink from "../CustomLink";

interface EmptyProps {
  bgColor?: string;
  msg?: string;
  hasButton?: boolean;
  btnConfig?: any;
}

const Empty: FunctionalComponent<EmptyProps> = ({
  bgColor = "bg-[#fcf6ff]",
  msg = "啥都没有呢~",
  hasButton = false,
  btnConfig = {},
}) => {
  return (
    <div
      className={`flex justify-center items-center min-h-[160px] text-[#6d5694] ${bgColor}`}
    >
      <span className="opacity-40">{msg}</span>
      {hasButton && (
        <CustomLink href={btnConfig.href} className="opacity-80 font-semibold">
          {btnConfig.msg}
        </CustomLink>
      )}
    </div>
  );
};

export default Empty;
