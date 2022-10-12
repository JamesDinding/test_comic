import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import ChapterItem from "../_Book/ChapterItem";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconCross from "../../resources/img/icon-cross.svg";
import IconSort from "../../resources/img/icon-sort.svg";

interface PopChapterProps {
  chapterList: Array<{ cover: string; episode: number; isLocked: boolean }>;
}

let layerCss = "translate-y-full";
const PopChapter: FunctionalComponent<PopChapterProps> = ({ chapterList }) => {
  const { isPopChapter, reset } = useReadingModal();
  layerCss = isPopChapter ? "" : "translate-y-[120%]";

  return (
    <div
      id="control-view"
      className={`modal-bottom bg-white overflow-y-auto no-scollbar ${layerCss}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#9e7654] text-lg border-b-[1px] border-[rgba(158,118,84,.4)]">
        章節選擇
        <div onClick={reset}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-end mr-8 mt-2.5 text-[#666666]">
        排序
        <span>
          <IconSort class="w-4 h-4" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 px-5 py-2.5">
        {chapterList.map((c, i, arr) => {
          return <ChapterItem chapter={c} smallSize={false} />;
        })}
      </div>
    </div>
  );
};

export default PopChapter;
