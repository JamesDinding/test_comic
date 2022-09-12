import { FunctionalComponent, h, Fragment as F } from "preact";
import { useRef, useState } from "preact/hooks";
import { ObserverProvider } from "../context/observer";
import ControlLayer from "../components/Read/ControlLayer";
import BackDrop from "../components/BackDrop";
import { createPortal } from "preact/compat";

const fakeList = [{ cover: "", episode: 1, isLocked: false }];

for (let i = 0; i < 25; i++) {
  fakeList.push({ cover: "", episode: 1, isLocked: true });
}

const ReadPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className="relative grow overflow-hidden overflow-y-auto no-scollbar"
      onClick={(e) => {
        e.stopPropagation();
        setIsShow((prev) => !prev);
      }}
      ref={containerRef}
    >
      {isShow && (
        <div
          className="back-drop"
          onClick={(e) => {
            e.stopPropagation();
            setIsShow((prev) => !prev);
          }}
        ></div>
      )}
      <ObserverProvider rootElement={containerRef}>
        <ControlLayer
          onSetIsShow={setIsShow}
          isShow={isShow}
          chapterList={fakeList}
        />
        <div>pages.map((page) =&gt; page )</div>
      </ObserverProvider>
    </div>
  );
};

export default ReadPage;
