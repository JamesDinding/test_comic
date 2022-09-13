import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import ChapterItem from "../Directory/ChapterItem";
import IconChevron from "../../resources/img/icon-chevron.svg";
import IconCross from "../../resources/img/icon-cross.svg";
import IconSort from "../../resources/img/icon-sort.svg";

interface ControlLayerProps {
  onSetIsShow: StateUpdater<boolean>;
  isShow: boolean;
  chapterList: Array<{ cover: string; episode: number; isLocked: boolean }>;
}

let layerCss = "translate-y-full";
const ControlLayer: FunctionalComponent<ControlLayerProps> = ({
  onSetIsShow,
  isShow,
  chapterList,
}) => {
  layerCss = isShow ? "" : "translate-y-full";

  return (
    <div
      id="control-view"
      className={`modal-bottom bg-white overflow-y-auto no-scollbar ${layerCss}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#9e7654] text-lg border-b-[1px] border-[#9e7654]">
        章節選擇
        <div onClick={(e) => onSetIsShow(false)}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-end mr-8 mt-2.5 text-[#666666]">
        排序
        <span>
          <IconSort class="w-4 h-4" />
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2.5 px-5 py-2.5">
        {chapterList.map((c, i, arr) => {
          return <ChapterItem chapter={c} smallSize={true} />;
        })}
      </div>
    </div>
  );
};

export default ControlLayer;
