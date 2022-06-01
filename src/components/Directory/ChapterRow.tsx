import { FunctionalComponent, h } from "preact";
import Image from "../_Image/image";
import IconLock from "../../resources/img/dir-lock.svg";
import IconChevron from "../../resources/img/icon-chevron.svg";

const ChapterRow = () => {
  return (
    <li className="list-none">
      <a className="flex py-2 px-0 bourder-t-[1px] border-solid border-[#f5f5f5]">
        <div className="w-24 h-[45px] bg-[#a8a8a8] mr-2">{/* <Image /> */}</div>
        <div className="flex items-center grow text-[#4c4c4c]">
          <span>第1話</span>
          <div className="grow"></div>
          <span className="opacity-70 flex items-center px-2">
            <span className="inline-block h-[16px] w-[16px] mr-2">
              <IconLock />
            </span>
            <span className="text-[#ff978d] text-[12px]">立即解鎖</span>
          </span>
          <span className="h-[20px] w-[20px]">
            <IconChevron />
          </span>
        </div>
      </a>
    </li>
  );
};

export default ChapterRow;
