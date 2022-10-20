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
import { useDomain } from "../../context/domain";

const ReadContentPage: FunctionalComponent = () => {
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset } = useReadingModal();
  const [parentPending, setParentPending] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  // 暫時先這樣寫
  // [ _, _, comicId, _, chapterId ]
  const [curComic, setCurComic] = useState(
    parseInt(window.location.pathname.split("/")[2], 10)
  );
  const [curChapter, setCurChapter] = useState(
    parseInt(window.location.pathname.split("/")[4], 10)
  );

  useEffect(() => {
    try {
      (async () => {
        const { data, domain } = await getSpecifiedBookIdContent(
          curComic,
          curChapter
        );
        setDomain(domain);
        setPageList(data.contents.images);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, [curComic, curChapter]);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedBookChapterList(curComic);
        setChapterList(data);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, [curComic]);

  return (
    <F>
      <PopChapter
        chapterList={chapterList}
        bookId={curComic}
        changeChapter={setCurChapter}
      />
      <PopControl
        pageNum={pageList.length}
        curChapter={curChapter}
        curComic={curComic}
        changeChapter={setCurChapter}
      />
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
        <PopReturn bookId={curComic} />
        <ObserverProvider rootElement={containerRef}>
          {pageList?.map((page, i, arr) => {
            return (
              <Image
                path={page}
                alt=""
                isFullHeight={false}
                setParentPending={setParentPending}
              />
            );
          })}
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
