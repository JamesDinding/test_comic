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
  // 暫時先這樣寫
  const cur_path = window.location.pathname;
  // [ _, _, comicId, _, chapterId ]
  const cur_path_arr = cur_path.split('/');
  const [curComic, setCurComic] = useState(parseInt(window.location.pathname.split('/')[2], 10));
  const [curChapter, setCurChapter] = useState(parseInt(window.location.pathname.split('/')[4], 10));

  console.log(curChapter)

  useEffect(() => {
    try {

      (async () => {
        const { data } = await getSpecifiedBookIdContent(curComic, curChapter);
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
      <PopChapter chapterList={chapterList} />
      <PopControl pageNum={pageList.length} curChapter={curChapter} curComic={curComic} changeChapter={setCurChapter} />
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
        <PopReturn />
        <ObserverProvider rootElement={containerRef}>
            {pageList?.map((page, i, arr) => {
              return (
                <Image path={page} alt="" setParentPending={setParentPending} />
              );
            })}
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
