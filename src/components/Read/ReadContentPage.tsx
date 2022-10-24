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
  getSpecifiedBookDescription,
} from "../../lib/api";
import { useDomain } from "../../context/domain";

const ReadContentPage: FunctionalComponent = () => {
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset } = useReadingModal();
  const [parentPending, setParentPending] = useState(true);
  const [pageList, setPageList] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [chapterList, setChapterList] = useState([]);
  // 暂时先这样写
  // [ _, _, comicId, _, chapterId ]
  const [curComic, setCurComic] = useState(
    parseInt(window.location.pathname.split("/")[2], 10)
  );
  const [curChapter, setCurChapter] = useState(
    parseInt(window.location.pathname.split("/")[4], 10)
  );
  const [title, setTitle] = useState("");

  // setup intersection observer for detecting current page
  useEffect(() => {
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: containerRef.current,
    };
    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          console.log(e);
        }
      });
    }, opt);
    const targets = document.querySelectorAll(".page");
    console.log("targets: ", targets);
    setObserver(ob);
  }, [observer, containerRef.current]);

  useEffect(() => {
    try {
      (async () => {
        const { data, domain } = await getSpecifiedBookIdContent(
          curComic,
          curChapter
        );
        setDomain(domain);
        setPageList(data.contents.images);
        const targets = document.querySelectorAll(".page");
        console.log("targets: ", targets);
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

  useEffect(() => {
    if (title) return;
    getSpecifiedBookDescription(curComic).then((response) => {
      console.log(response);
      setTitle(response.data.title);
    });
  }, [curComic, title]);

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
      <ModalBuy
        cb={(chapter: number) => {
          setCurChapter(chapter);
        }}
      />
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
        <PopReturn bookId={curComic} title={title} />
        <ObserverProvider rootElement={containerRef}>
          {pageList?.map((page, i, arr) => {
            return (
              <div id={`page-${i}`} className="page">
                <Image
                  path={page}
                  alt=""
                  isFullHeight={false}
                  setParentPending={setParentPending}
                />
              </div>
            );
          })}
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
