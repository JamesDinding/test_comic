import { h, FunctionalComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { StateUpdater, useState } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconMenu from "../../resources/img/icon-menu.svg";

interface PopControlProps {
  curChapter: number;
  curComic: number;
  pageNum: number;
  curPage: number;
  setIsDrag: StateUpdater<boolean>;
  setCurPage: StateUpdater<number>;
  changeChapter: StateUpdater<number>;
}

// 傳chapter.position 取代curChapter會比較好
const PopControl: FunctionalComponent<PopControlProps> = ({
  pageNum,
  curChapter,
  curComic,
  curPage,
  setIsDrag,
  setCurPage,
  changeChapter,
}) => {
  const { isPopControl, popChapter, reset } = useReadingModal();

  return (
    <F>
      <div
        className={
          "fixed z-[30] bottom-0 left-1/2 translate-x-[-50%] h-[50px] max-w-[420px] w-full bg-[rgba(0,0,0,.7)] duration-300 " +
          (isPopControl ? "" : "translate-y-[120%]")
        }
      >
        <div className="flex items-center h-full w-full">
          <button className="ml-2" onClick={popChapter}>
            <IconMenu class="h-10 w-10" />
          </button>
          <div className="grow"></div>
          <button
            className="mr-2"
            onClick={() => {
              if (curChapter > 0) {
                changeChapter((prev) => prev - 1);
                route(`/read/${curComic}/chapter/${curChapter - 1}`, true);
              }
            }}
          >
            <IconChevron class="h-10 w-10 text-white rotate-180" />
          </button>
          <div className="flex items-center justify-between font-light text-white text-sm text-center w-[60px]">
            <span className="text-[#9e7654] w-[25px]">{curPage}</span>
            <span className="text-lg">&nbsp;/&nbsp;</span>
            <span className="w-[25px]">{pageNum}</span>
          </div>

          <input
            type="range"
            id="page"
            min="1"
            max={pageNum}
            value={curPage}
            step="1"
            className="ml-4 w-[150px] input-range-page"
            style={{
              backgroundSize: `${(curPage / pageNum) * 100}% 100%`,
            }}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setIsDrag(true);
              setCurPage(parseInt(target.value, 10));
            }}
          />

          <button
            className="ml-4"
            onClick={() => {
              changeChapter((prev) => prev + 1);
              route(`/read/${curComic}/chapter/${curChapter + 1}`, true);
            }}
          >
            <IconChevron class="h-10 w-10 text-white" />
          </button>
        </div>
      </div>
    </F>
  );
};

export default PopControl;
