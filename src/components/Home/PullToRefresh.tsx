import { h, FunctionalComponent } from "preact";
import { useState, MutableRef } from "preact/hooks";

let startClientY = 0;
let startScrollTop = 0;
let offsetY = 0;
let overScrollOffset = 0;

interface PullToRefresh {
  containerElement: MutableRef<HTMLDivElement>;
}

const PullToRefresh: FunctionalComponent<PullToRefresh> = ({
  containerElement,
  children,
}) => {
  const [dropCss, setDropCss] = useState("hidden");
  const [dropSpace, setDropSpace] = useState(0);
  const [dropText, setDropText] = useState("下拉即可更新");

  const touchStartHandler = (e: TouchEvent) => {
    startClientY = e.touches[0].clientY;
    startScrollTop = containerElement.current.scrollTop;
  };

  const touchMovingHandler = (e: TouchEvent) => {
    offsetY = e.touches[0].clientY - startClientY;
    overScrollOffset = offsetY - startScrollTop;

    if (overScrollOffset > 0) {
      setDropSpace(overScrollOffset);
      setDropCss("");
    } else {
      setDropCss("hidden");
    }
    if (overScrollOffset > 30 && overScrollOffset < 80)
      setDropText("下拉即可刷新...");
    if (overScrollOffset > 80 && overScrollOffset < 100)
      setDropText("释放即可刷新...");
  };

  const touchEndHandler = (e: TouchEvent) => {
    setDropCss("hidden");
    setDropText("");
    offsetY = e.changedTouches[0].clientY - startClientY;
    overScrollOffset = offsetY - startScrollTop;

    if (overScrollOffset < 80) return;

    console.log("trigger Refresh");
  };
  return (
    <div
      onTouchStart={touchStartHandler}
      onTouchMove={touchMovingHandler}
      onTouchEnd={touchEndHandler}
    >
      <p
        className={`${dropCss} text-gray-700 text-xs text-center`}
        style={`height: ${dropSpace}px;line-height: ${dropSpace}px;`}
      >
        {dropText}
      </p>
      {children}
    </div>
  );
};

export default PullToRefresh;
