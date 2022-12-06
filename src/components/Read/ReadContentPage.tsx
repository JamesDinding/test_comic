import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import { ObserverProvider } from "../../context/observer";
import PopControl from "./PopControl";
import ModalBuy from "../Modal/ModalBuy";
import PopReturn from "./PopReturn";
import PopChapter from "./PopChapter";
import ModalReadNext from "../Modal/ModalReadNext";
import Page from "./Page";
import {
  getSpecifiedBookChapterList,
  getSpecifiedBookIdContent,
} from "../../lib/api";
import { useDomain } from "../../context/domain";
import { useRouter } from "../../context/router";
import { useUser } from "../../context/user";

let test: any;
const ReadContentPage: FunctionalComponent = () => {
  const bottomRef = useRef<HTMLDivElement>(null!);
  const [isPopNext, setIsPopNext] = useState(false);
  const { isLogIn } = useUser();
  const { currentRoute } = useRouter();
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset, stuffInfo, setStuffInfo, popBuy } =
    useReadingModal();
  const [pageList, setPageList] = useState<string[]>([]);
  // 控制列的页码
  const [curPage, setCurPage] = useState(1);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [chapterList, setChapterList] = useState<any>([]);
  // 暂时先这样写
  // [ _, _, comicId, _, chapterId ]
  const [curComic, setCurComic] = useState(currentRoute.split("/")[2]);

  const [curChapter, setCurChapter] = useState(
    parseInt(currentRoute.split("/")[4], 10) || stuffInfo?.position || 1
  );

  // 进入页面显示bar，让使用者可以注意到，再来是滚动时消失
  useEffect(() => {
    document.querySelector("#page-1")?.scrollIntoView();
    popControl();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    popControl();

    function removeBar() {
      reset();
    }
    container.addEventListener("scroll", removeBar);

    return () => {
      container.removeEventListener("scroll", removeBar);
    };
  }, [containerRef.current]);

  // setup intersection observer for detecting bottom
  useEffect(() => {
    if (pageList.length === 0 || chapterList.length === 0) return;
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: containerRef.current,
      threshold: [0, 1],
      rootMargin: "",
    };

    const lastPage = document.getElementById("page-" + pageList.length);

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          // 最後一頁載入完才跳通知
          if (!lastPage?.classList.contains("wait")) {
            setStuffInfo({ ...chapterList[curChapter], bookId: curComic });
            if (!chapterList[curChapter].status) {
              popBuy();
              return;
            }
            // pop normal read next chapter
            setIsPopNext(true);
          }
        }
      });
    }, opt);

    ob.observe(bottomRef.current);

    setObserver(ob);
  }, [
    observer,
    containerRef.current,
    pageList.length,
    chapterList,
    curChapter,
    curComic,
  ]);

  useEffect(() => {
    if (!curChapter) {
      console.error("curChapter nan");
    }
    getSpecifiedBookIdContent(curComic, curChapter)
      .then((response) => {
        setDomain(response.domain);
        setPageList(
          response.data.contents.images.map((i: string) => {
            return response.data.source + "/" + i;
          })
        );
      })
      .catch((err) => {
        console.error(err.message);
        // if (err.message === "cannot get chapter by position id") route("/home");
        // setPageList([]);
      });
  }, [curComic, curChapter]);

  // isLogIn => when user has been logout during reading, update the chapterlist status
  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedBookChapterList(curComic);
        setChapterList(data);
      })();
    } catch (err: any) {
      console.error(err.message);
    }
  }, [curComic, isLogIn]);

  return (
    <F>
      <PopChapter
        chapterList={chapterList}
        bookId={curComic}
        curChapter={curChapter}
        changeChapter={setCurChapter}
        setCurPage={setCurPage}
        setPageList={setPageList}
        setOb={setObserver}
        ob={observer}
      />
      <PopControl
        chapterList={chapterList}
        pageNum={pageList.length}
        curChapter={curChapter}
        curComic={curComic}
        curPage={curPage}
        setCurPage={setCurPage}
        setPageList={setPageList}
        changeChapter={setCurChapter}
        setOb={setObserver}
        ob={observer}
      />
      <ModalBuy
        setChapterList={setChapterList}
        curComic={curComic}
        cb={(chapter: number) => {
          setCurPage(1);
          document.querySelector("#page-1")?.scrollIntoView();
          setCurChapter(chapter);
        }}
      />
      {isPopNext && (
        <ModalReadNext
          onClose={() => setIsPopNext(false)}
          nextChapter={`/read/${stuffInfo?.bookId}/chapter/${stuffInfo?.position}`}
          resetPageData={() => {
            setCurPage(1);
            setPageList([]);
            setCurChapter((prev) => prev + 1);
            observer?.disconnect();
            setObserver(null);
          }}
        />
      )}
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
        <PopReturn bookId={curComic} chapterNum={curChapter} />
        <ObserverProvider rootElement={containerRef}>
          {pageList?.map((page, i, arr) => {
            return <Page page={page} pageIndex={i} />;
          })}
          <div id="reading-bottom" ref={bottomRef} className="h-1 w-full"></div>
        </ObserverProvider>
      </div>
    </F>
  );
};

export default ReadContentPage;
