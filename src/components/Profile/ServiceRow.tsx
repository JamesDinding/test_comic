import { h, FunctionalComponent } from "preact";
import { route } from "preact-router";

interface ServiceRowProps {
  url: string;
  title: string;
  msg: string;
  clickCb?: () => void;
}

const ServiceRow: FunctionalComponent<ServiceRowProps> = ({
  url,
  title,
  msg = "",
  clickCb,
}) => {
  return (
    <li
      className="cursor-pointer flex items-center bg-white py-4 px-5"
      onClick={() => {
        clickCb && clickCb();
      }}
    >
      <div className="text-[#9e7654] text-sm">{title}</div>
      <div className="ml-5 grow text-left text-[#ff978d] text-xs">{msg}</div>
      <div>
        <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#9e765499] rounded-sm"></div>
      </div>
    </li>
  );
};

export default ServiceRow;
