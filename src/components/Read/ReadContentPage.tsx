import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import { ObserverProvider } from "../../context/observer";
import PopControl from "./PopControl";
import ModalBuy from "../Modal/ModalBuy";
import PopReturn from "./PopReturn";
import PopChapter from "./PopChapter";

const fakeList = [{ cover: "", episode: 1, isLocked: false }];

for (let i = 0; i < 25; i++) {
  fakeList.push({ cover: "", episode: 1, isLocked: true });
}

const ReadContentPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset } = useReadingModal();
  // const [isPopControl, setIsPopControl] = useState(false);

  console.log("popContentpage");

  return (
    <F>
      <PopChapter chapterList={fakeList} />
      <PopControl />
      <ModalBuy />
      <div
        className="relative grow overflow-hidden overflow-y-auto no-scollbar"
        onClick={(e) => {
          e.stopPropagation();
          if (isPopControl) {
            reset();
            return;
          }

          popControl();
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

export default ReadContentPage;
