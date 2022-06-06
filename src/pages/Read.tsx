import { FunctionalComponent, h } from "preact";
import { useRef, useState } from "preact/hooks";
import { ObserverProvider } from "../context/observer";
import ControlLayer from "../components/Read/ControlLayer";

const ReadPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className="grow overflow-hidden overflow-y-auto"
      ref={containerRef}
      onClick={() => setIsShow((prev) => !prev)}
    >
      <ObserverProvider rootElement={containerRef}>
        <ControlLayer onSetIsShow={setIsShow} isShow={isShow} />
        <div>pages.map((page) =&gt; page )</div>
      </ObserverProvider>
    </div>
  );
};

export default ReadPage;
