import { FunctionalComponent, h } from "preact";
import { useRef } from "preact/hooks";
import { ObserverProvider } from "../context/observer";
import ControlLayer from "../components/Read/ControlLayer";

const ReadPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div className="grow" ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <ControlLayer>
          <div>Page Content</div>
        </ControlLayer>
      </ObserverProvider>
    </div>
  );
};

export default ReadPage;
