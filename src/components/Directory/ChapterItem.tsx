import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect } from "preact/hooks";
import IconLock from "../../resources/img/icon-lock.svg";

const ChapterItem: FunctionalComponent<ChapterItem> = ({
  chapter,
  smallSize = false,
}) => {
  return (
    <div
      className={
        "relative overflow-hidden rounded-lg " +
        (smallSize ? "w-[76px] h-[115px]" : "w-[105px] h-[157px]")
      }
    >
      {chapter.isLocked && <div className="chapter-item-backdrop"></div>}
      {chapter.isLocked && (
        <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
          <IconLock class="w-5 h-5" />
        </div>
      )}
      <img src="" alt="" />
      <img src="/assets/img/test/Image.png" className="w-full h-full" alt="" />
      <div className="absolute left-1/2 bottom-2.5 translate-x-[-50%] text-sm text-white text-center w-[70px] h-[20px] leading-[20px]">
        名稱最長五
      </div>
    </div>
  );
};

export default ChapterItem;
