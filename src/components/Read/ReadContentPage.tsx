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
  // 控制列的頁碼
  const [isDrag, setIsDrag] = useState(false);
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
    if (pageList.length === 0) return;
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: containerRef.current,
      threshold: [0.8],
    };

    const targets = document.querySelectorAll(".page");

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const p = parseInt(e.target.id.split("-").pop()!, 10);
          setCurPage(p);
        }
      });
    }, opt);

    targets.forEach((target, i) => {
      // 一開始全部的圖片就會intersect 導致一開始頁碼會錯
      // 暫時先這樣做
      // hot fix 頁碼issue
      i === 0 && ob.observe(target);
      if (i !== 0) {
        setTimeout(() => {
          ob.observe(target);
        }, 1000);
      }
    });

    setObserver(ob);
  }, [observer, containerRef.current, pageList.length]);

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

  useEffect(() => {
    if (title) return;
    getSpecifiedBookDescription(curComic).then((response) => {
      setTitle(response.data.title);
    });
  }, [curComic, title]);

  // 隨頁碼條滾動
  useEffect(() => {
    if (!isDrag) return;
    const target = document.querySelector("#page-" + curPage);

    target?.scrollIntoView();
    setIsDrag(false);
  }, [curPage, isDrag]);

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
        curPage={curPage}
        setIsDrag={setIsDrag}
        setCurPage={setCurPage}
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
              <div
                id={`page-${i + 1}`}
                className={"page" + (parentPending ? " min-h-[200px]" : "")}
              >
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
