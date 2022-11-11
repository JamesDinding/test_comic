import { h, FunctionalComponent } from "preact";

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
      <div className="text-[#6d5694] text-sm">{title}</div>
      <div className="ml-5 grow text-left text-[#ff978d] text-xs">{msg}</div>
      <div>
        <div className="h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#6d569499] rounded-sm"></div>
      </div>
    </li>
  );
};

export default ServiceRow;
