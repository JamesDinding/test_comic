import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
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
  const [parentPending, setParentPending] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [chapterList, setChapterList] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedBookIdContent(1, 1);
        setPageList(data.contents.images);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);
  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedBookChapterList(1);
        setChapterList(data);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, []);

  return (
    <F>
      <PopChapter chapterList={chapterList} />
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
          <div>
            {pageList?.map((page, i, arr) => {
              return (
                <Image path={page} alt="" setParentPending={setParentPending} />
              );
            })}
          </div>
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
