import { FunctionalComponent, h } from "preact";
import { useState, useRef } from "preact/hooks";
import FastImage from "../components/_Image/FastImage";
import { ObserverProvider } from "../context/observer";

const TestPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isShow, setIsShow] = useState(false);
  const [showPending, setPending] = useState(true);

  return (
    <div ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <FastImage alt="" path="" setParentPending={setPending} />
      </ObserverProvider>
    </div>
  );
};

export default TestPage;
