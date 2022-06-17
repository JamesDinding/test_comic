import { FunctionalComponent, h } from "preact";
import { useState, useRef } from "preact/hooks";
import FastImage from "../components/_Image/FastImage";
import { ObserverProvider } from "../context/observer";

import ReturnBar from "../components/ReturnBar";
import FooterBar from "../components/FooterBar";

import { imgFactory } from "../components/_Image/ImageFactory";

const TestPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [isShow, setIsShow] = useState(false);
  const [showPending, setPending] = useState(true);

  return (
    <div ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <div className="flex flex-col max-h-screen">
          <ReturnBar title="test" />
          <button
            onClick={() => {
              imgFactory.printDecoder();
            }}
          >
            show decoder
          </button>
          <div className="grow overflow-hidden overflow-y-auto">
            {[0, 0, 0, 0].map((el) => {
              return <FastImage alt="" path="" setParentPending={setPending} />;
            })}
          </div>
          <FooterBar />
        </div>
      </ObserverProvider>
    </div>
  );
};

export default TestPage;
