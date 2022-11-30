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
import { useRouter } from "../../context/router";
import { useUser } from "../../context/user";

let test: any;
const ReadContentPage: FunctionalComponent = () => {
  const { isLogIn } = useUser();
  const { currentRoute } = useRouter();
  const { setDomain } = useDomain();
  const containerRef = useRef<HTMLDivElement>(null!);
  const { isPopControl, popControl, reset, stuffInfo } = useReadingModal();
  const [parentPending, setParentPending] = useState(true);
  const [pageList, setPageList] = useState<string[]>([]);
  // 控制列的页码
  const [isDrag, setIsDrag] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [observer, setObserver] = useState<IntersectionObserver>();
  const [chapterList, setChapterList] = useState([]);
  // 暂时先这样写
  // [ _, _, comicId, _, chapterId ]
  const [curComic, setCurComic] = useState(currentRoute.split("/")[2]);

  const [curChapter, setCurChapter] = useState(
    parseInt(currentRoute.split("/")[4], 10) || stuffInfo?.position || 1
  );
  // const [curChapter, setCurChapter] = useState(
  //   parseInt(window.location.pathname.split("/")[4], 10) ||
  //     stuffInfo?.position ||
  //     1
  // );

  // 进入页面显示bar，让使用者可以注意到，再来是滚动时消失
  useEffect(() => {
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

  // setup intersection observer for detecting current page
  useEffect(() => {
    if (pageList.length === 0) return;
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: containerRef.current,
      threshold: [0.1, 1],
      rootMargin: "",
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
      ob.observe(target);
    });

    setObserver(ob);
  }, [observer, containerRef.current, pageList.length]);

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

  // 随页码条滚动
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
        curChapter={curChapter}
        changeChapter={setCurChapter}
        setCurPage={setCurPage}
        setPageList={setPageList}
      />
      <PopControl
        chapterList={chapterList}
        pageNum={pageList.length}
        curChapter={curChapter}
        curComic={curComic}
        curPage={curPage}
        setIsDrag={setIsDrag}
        setCurPage={setCurPage}
        setPageList={setPageList}
        changeChapter={setCurChapter}
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
            return (
              <div
                id={`page-${i + 1}`}
                className={"page" + (parentPending ? " min-h-[160px]" : "")}
              >
                <Image
                  path={page}
                  alt=""
                  isFullHeight={false}
                  setParentPending={setParentPending}
                  pendingHeight="min-h-[160px]"
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
