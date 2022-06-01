import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import Image from "../_Image/image";
import IconOrder from "../../resources/img/dir-order.svg";

const ChapterHead = () => {
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  return (
    <div className="flex items-center py-[.6rem] px-[.8rem] font-xs">
      <div
        className="text-[#a8a8a8] flex items-center"
        onClick={() => setIsReverseOrder((prev) => !prev)}
      >
        <span className="text-sm">{isReverseOrder ? "正序" : "倒序"}</span>
        <div className="inline-block">
          <IconOrder class="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default ChapterHead;
