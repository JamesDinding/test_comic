import { FunctionalComponent, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import IconChevron from "../../resources/img/icon-chevron.svg";

let layerCss = "translate-y-full";
const ControlLayer: FunctionalComponent = ({ children }) => {
  const [isShow, setIsShow] = useState(false);
  layerCss = isShow ? "" : "translate-y-full";

  return (
    <div className="relative" id="control-layer">
      <div
        id="control-view"
        className={`absolute p-2 w-full h-[50px] bottom-0 control-bar ${layerCss}`}
        onClick={(e) => {
          console.log(e);
          setIsShow((prev) => !prev);
        }}
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
      {children}
    </div>
  );
};

export default ControlLayer;
