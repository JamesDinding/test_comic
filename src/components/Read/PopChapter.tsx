import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import ChapterItem from "../_Book/ChapterItem";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconCross from "../../resources/img/icon-cross.svg";
import IconSort from "../../resources/img/icon-sort.svg";

interface PopChapterProps extends ChapterList {
  changeChapter: StateUpdater<number>;
  setCurPage: StateUpdater<number>;
  setPageList: StateUpdater<string[]>;
}

let layerCss = "translate-y-full";
const PopChapter: FunctionalComponent<PopChapterProps> = ({
  chapterList,
  bookId,
  changeChapter,
  setCurPage,
  setPageList,
}) => {
  const { isPopChapter, reset, popControl } = useReadingModal();
  const [isSort, setIsSort] = useState(false);
  layerCss = isPopChapter ? "" : "translate-y-[120%]";

  return (
    <div
      id="control-view"
      className={`modal-bottom bg-white overflow-y-auto no-scollbar ${layerCss}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#6d5694] text-lg border-b-[1px] border-[#6d569466]">
        章节选择
        <div className="overflow-hidden w-8 h-8" onClick={reset}>
          <IconCross class="w-full text-black cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-end mr-5 mt-2.5 text-[#666666]">
        排序
        <span
          className="cursor-pointer"
          onClick={() => setIsSort((prev) => !prev)}
        >
          <IconSort class="w-4 h-4" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5 px-5 py-2.5">
        {chapterList
          .sort((pre, post) =>
            isSort ? post.position - pre.position : pre.position - post.position
          )
          .map((c) => {
            return (
              <div
                onClick={() => {
                  if (!c.status) return;
                  setCurPage(1);
                  setPageList([]);
                  changeChapter(c.position);
                }}
              >
                <ChapterItem
                  chapter={c}
                  bookId={bookId}
                  smallSize={false}
                  routeReplace={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PopChapter;
