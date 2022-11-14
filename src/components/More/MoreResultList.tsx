import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef, Ref, MutableRef } from "preact/hooks";
import BookList from "../_Book/List";
import Empty from "../Collect/Empty";
import { getBlockById } from "../../lib/api";
import { CATEGORY_PER_PAGE_NUM } from "../../const";

interface MoreResultListProps {
  content: Book[];
  moreBlockId: number;
}

const MoreResultList: FunctionalComponent<MoreResultListProps> = ({
  content,
  moreBlockId,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const [moreContent, setMoreContent] = useState<Book[]>([]);
  const pageRef = useRef(2);
  const numRef = useRef(0);

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (observer || content.length === 0) return;
    const opt: IntersectionObserverInit = {
      root: document.querySelector("#scroll"),
      // root: document.querySelector("#category-section"),
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-30px 0px 0px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          if (isEnd) return;
          const query = moreBlockId;
          getBlockById(moreBlockId + "?page=" + pageRef.current).then(
            (response) => {
              if (response.data.length === 0) {
                observer.unobserve(e.target);
              }
              console.log(response.data.length === 0);
              setMoreContent((prev) => prev.concat(response.data));
              pageRef.current++;
              numRef.current += response.data?.length;
            }
          );
        }
      });
    }, opt);

    setObserver(ob);

    ob.observe(bottomRef.current!);
  }, [observer, bottomRef.current, moreBlockId, , pageRef.current]);

  return (
    <Fragment>
      <div id="category-section relative" className="mx-5">
        {content.length === 0 ? (
          <Empty bgColor="bg-[#fcf6ff]" msg="搜寻无结果" />
        ) : (
          <BookList
            Items={content.concat(moreContent)}
            ItemPerRow={3}
            type={"separate"}
            isTemp={true}
            itemNum={pageRef.current * CATEGORY_PER_PAGE_NUM}
          />
        )}
        <div
          ref={bottomRef}
          className="w-[100px] h-[1px] invisible  bg-red-400"
        ></div>
      </div>
    </Fragment>
  );
};

export default MoreResultList;
