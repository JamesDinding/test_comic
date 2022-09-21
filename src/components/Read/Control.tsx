import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useRef } from "preact/hooks";
import PopChapter from "./PopChapter";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconMenu from "../../resources/img/icon-menu.svg";

interface ControlProps {
  isShow: boolean;
  onClose: () => void;
}

const fakeList = [{ cover: "", episode: 1, isLocked: false }];

for (let i = 0; i < 25; i++) {
  fakeList.push({ cover: "", episode: 1, isLocked: true });
}

const Control: FunctionalComponent<ControlProps> = ({ isShow, onClose }) => {
  const [curPage, setCurPage] = useState(1);
  const [isPopChapter, setIsPopChapter] = useState(false);

  return (
    <F>
      <PopChapter
        onSetIsPopChapter={setIsPopChapter}
        isPopChapter={isPopChapter}
        chapterList={fakeList}
      />
      <div
        className={
          "absolute z-[30] bottom-0 left-1/2 translate-x-[-50%] h-[50px] max-w-[420px] w-full bg-[rgba(0,0,0,.7)] duration-300 " +
          (isShow ? "" : "translate-y-[120%]")
        }
      >
        <div className="flex items-center h-full w-full">
          <button className="ml-2">
            <IconChevron class="h-10 w-10 text-white rotate-180" />
          </button>
          <div className="flex items-center justify-between font-light text-white text-sm text-center w-[60px]">
            <span className="text-[#9e7654] w-[25px]">{curPage}</span>
            <span className="text-lg">&nbsp;/&nbsp;</span>
            <span className="w-[25px]">30</span>
          </div>

          <input
            type="range"
            id="page"
            min="1"
            max="30"
            value={curPage}
            step="1"
            className="ml-4 w-[120px]"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCurPage(parseInt(target.value, 10));
            }}
          />

          <button className="ml-4">
            <IconChevron class="h-10 w-10 text-white" />
          </button>
          <div className="grow"></div>
          <button className="mr-4" onClick={() => setIsPopChapter(true)}>
            <IconMenu class="h-10 w-10" />
          </button>
        </div>
      </div>
    </F>
  );
};

export default Control;
