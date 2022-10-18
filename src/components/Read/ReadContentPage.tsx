import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import { ObserverProvider } from "../../context/observer";
import PopControl from "./PopControl";
import ModalBuy from "../Modal/ModalBuy";
import PopReturn from "./PopReturn";
import PopChapter from "./PopChapter";
import Image from "../_Image/image";
import {
  getSpecifiedBookChapterList,
  getSpecifiedBookIdContent,
} from "../../lib/api";

const ReadContentPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset } = useReadingModal();
  // const [isPopControl, setIsPopControl] = useState(false);

  console.log("popContentpage");

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedBookIdContent(1, 1);
        console.log(data);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);
  useEffect(() => {
    try {
      getSpecifiedBookChapterList();
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);

  return (
    <F>
      <PopChapter chapterList={[]} />
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
          <div>尚未串接api</div>
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
