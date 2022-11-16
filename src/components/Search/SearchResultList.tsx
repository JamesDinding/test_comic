import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef, Ref, MutableRef } from "preact/hooks";
import BookList from "../_Book/List";
import Empty from "../Collect/Empty";
import { getSearch } from "../../lib/api";
import { CATEGORY_PER_PAGE_NUM } from "../../const";

interface SearchResultListProps {
  content: Book[];
  searchRef: MutableRef<HTMLInputElement>;
}

const SearchResultList: FunctionalComponent<SearchResultListProps> = ({
  content,
  searchRef,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  const [moreContent, setMoreContent] = useState<Book[]>([]);
  const pageRef = useRef(2);
  const numRef = useRef(0);

  useEffect(() => {
    if (observer || content.length === 0) return;
    const opt: IntersectionObserverInit = {
      root: document.querySelector("#scroll"),
      // root: document.querySelector("#category-section"),
      // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-30px 0px 0px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const query = searchRef.current.value;
          if (query === "") return;
          getSearch("keyword=" + query + "&page=" + pageRef.current).then(
            (response) => {
              if (response.data.length === 0) {
                // observer.unobserve(e.target);
                return;
              }
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
  }, [observer, bottomRef.current, searchRef.current, pageRef.current]);

  return (
    <Fragment>
      <div id="category-section" className="px-5 relative bg-[#fcf6ff]">
        {content.length === 0 ? (
          <Empty bgColor=" bg-[#fcf6ff]" msg="搜寻无结果，换个关键字试试？" />
        ) : (
          <BookList
            Items={content.concat(moreContent)}
            ItemPerRow={3}
            type={"separate"}
            isTemp={true}
            itemNum={pageRef.current * CATEGORY_PER_PAGE_NUM}
            isLayoutDiff={true}
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

export default SearchResultList;
