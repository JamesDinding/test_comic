import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import IconCross from "../../../../resources/img/icon-cross.svg";

const CharTitleBar = ({ userName = "" }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b-2 border-solid bg-red-300">
      <div className="rounded-full bg-[#d8d8d8] border-[1px] border-[#979797] w-[40px] h-[40px] text-center"></div>
      <div className="ml-2 text-white font-medium">{userName}</div>
      <div className="grow"></div>
      <button className="text-xl">
        <Link href="/profile">
          <IconCross class="h-8" />
        </Link>
      </button>
    </div>
  );
};

export default CharTitleBar;
