import { h, FunctionalComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { StateUpdater, useState } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconMenu from "../../resources/img/icon-menu.svg";

interface PopControlProps {
  chapterList: ChapterData[];
  curChapter: number;
  curComic: number;
  pageNum: number;
  curPage: number;
  setIsDrag: StateUpdater<boolean>;
  setCurPage: StateUpdater<number>;
  setPageList: StateUpdater<string[]>;
  changeChapter: StateUpdater<number>;
}

const PopControl: FunctionalComponent<PopControlProps> = ({
  chapterList,
  curChapter,
  curComic,
  setCurPage,
  setPageList,
  changeChapter,
}) => {
  const { isPopControl, popChapter, reset, popBuy, setStuffInfo, popControl } =
    useReadingModal();

  return (
    <F>
      <div
        className={
          "fixed z-[30] bottom-0 left-1/2 translate-x-[-50%] h-[50px] max-w-[420px] w-full bg-[rgba(0,0,0,.7)] duration-300 " +
          (isPopControl ? "" : "translate-y-[120%]")
        }
      >
        <div className="flex items-center justify-between h-full w-full">
          <button
            className="mr-2"
            onClick={(e) => {
              if (curChapter > 1) {
                // chapterList count from 0, curChapter count from 1
                if (!chapterList[curChapter - 2].status) {
                  setStuffInfo(chapterList[curChapter - 2]);
                  popBuy();
                  return;
                }
                document.querySelector("#page-1")?.scrollIntoView();
                setCurPage(1);
                setPageList([]);
                changeChapter((prev) => prev - 1);
                popControl();
                route(`/read/${curComic}/chapter/${curChapter - 1}`, true);
              }
            }}
          >
            <IconChevron class="h-10 w-10 text-white rotate-180" />
          </button>
          <button className="ml-2" onClick={popChapter}>
            <IconMenu class="h-10 w-10" />
          </button>
          <button
            className="ml-4"
            onClick={() => {
              // chapterList count from 0, curChapter count from 1
              if (!chapterList[curChapter].status) {
                setStuffInfo(chapterList[curChapter]);
                popBuy();
                return;
              }
              document.querySelector("#page-1")?.scrollIntoView();
              setCurPage(1);
              setPageList([]);
              changeChapter((prev) => prev + 1);
              popControl();
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
