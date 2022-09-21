import { FunctionalComponent, h, Fragment as F } from "preact";
import { useRef, useState } from "preact/hooks";
import { Link } from "preact-router";
import { ObserverProvider } from "../context/observer";
import IconArrow from "../resources/img/icon-arrow.svg";
import IconCoin from "../resources/img/icon-coin.svg";
import Control from "../components/Read/Control";
import PopReturn from "../components/Read/PopReturn";

const ReadPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isPopControl, setIsPopControl] = useState(false);

  return (
    <F>
      <Control isShow={isPopControl} onClose={() => setIsPopControl(false)} />
      <div
        className="relative grow overflow-hidden overflow-y-auto no-scollbar"
        onClick={(e) => {
          e.stopPropagation();
          setIsPopControl((prev) => !prev);
        }}
        ref={containerRef}
      >
        <PopReturn isPop={isPopControl} />
        <ObserverProvider rootElement={containerRef}>
          <div>pages.map((page) =&gt; page )</div>
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadPage;
