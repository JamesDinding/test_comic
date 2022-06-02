import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import IconChevron from "../../resources/img/icon-chevron.svg";

interface ControlLayerProps {
  onSetIsShow: StateUpdater<boolean>;
  isShow: boolean;
}

let layerCss = "translate-y-full";
const ControlLayer: FunctionalComponent<ControlLayerProps> = ({
  onSetIsShow,
  isShow,
}) => {
  layerCss = isShow ? "" : "translate-y-full";

  return (
    <div
      id="control-view"
      className={`absolute p-2 w-full h-[50px] bottom-0 control-bar ${layerCss}`}
    >
      <div className="flex items-center p-2">
        <div>
          <IconChevron class="rotate-180 h-5" />
        </div>
        <div>上一頁</div>
        <div className="grow"></div>
        <div>
          img/<span>目錄</span>
        </div>
        <div>
          img/<span>收藏</span>
        </div>
        <div className="grow"></div>
        <div>下一頁</div>
        <div>
          <IconChevron class="h-5" />
        </div>
      </div>
    </div>
  );
};

export default ControlLayer;
