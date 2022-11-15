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
  const [dropText, setDropText] = useState("");
  // const [dropText, setDropText] = useState("");

  const touchStartHandler = (e: TouchEvent) => {
    startClientY = e.touches[0].clientY;
    startScrollTop = containerElement.current.scrollTop;
  };

  const touchMovingHandler = (e: TouchEvent) => {
    offsetY = e.touches[0].clientY - startClientY;
    overScrollOffset = offsetY - startScrollTop;

    if (overScrollOffset > 30) {
      setDropSpace(Math.floor(overScrollOffset * 0.3));
      setDropCss("");
    } else {
      setDropCss("hidden");
    }
    if (overScrollOffset > 30 && overScrollOffset < 100) setDropText("");
    // setDropText("下拉即可刷新...");
    if (overScrollOffset > 100 && overScrollOffset < 150) setDropText("");
    // setDropText("释放即可刷新...");
  };

  const touchEndHandler = (e: TouchEvent) => {
    setDropCss("hidden");
    setDropText("");
    offsetY = e.changedTouches[0].clientY - startClientY;
    overScrollOffset = offsetY - startScrollTop;

    if (overScrollOffset < 80) return;
  };
  return (
    <div
      className="grow overflow-y-auto"
      onTouchStart={touchStartHandler}
      onTouchMove={touchMovingHandler}
      onTouchEnd={touchEndHandler}
    >
      <p
        className={`${dropCss} text-gray-700 text-xs flex items-end justify-center mb-4 tracking-wider`}
        style={`height: ${dropSpace}px;`}
      >
        {dropText}
      </p>
      {children}
    </div>
  );
};

export default PullToRefresh;
