import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import BookList from "../_Book/List";
import { getSpecifiedCategory } from "../../lib/api";
import { CATEGORY_PER_PAGE_NUM } from "../../const";

interface CategoryItemListProps {
  catID: Number;
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> = ({
  catID,
}) => {
  const [content, setContent] = useState<Book[]>();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  // test ref
  const pageRef = useRef(1);
  const curCateId = useRef(catID);
  const numRef = useRef(0);

  useEffect(() => {
    try {
      (async () => {
        pageRef.current = 1;
        curCateId.current = catID;
        const { data } = await getSpecifiedCategory(catID, pageRef.current);
        numRef.current = data?.length;
        pageRef.current++;
        setContent(data?.sort(() => Math.random() - 0.5));
      })();
    } catch (err: any) {
      console.error(err.message || "failed");
    }
  }, [catID]);

  useEffect(() => {
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: document.querySelector("#scroll"),
      // root: document.querySelector("#category-section"),
      // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-30px 0px 0px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (e) => {
        if (e.isIntersecting) {
          if (pageRef.current === 1) return;
          const { data } = await getSpecifiedCategory(
            curCateId.current,
            pageRef.current
          );
          if (data.length === 0) {
            // observer.unobserve(e.target);
            return;
          }
          pageRef.current++;
          numRef.current += data?.length;
          setContent((prev) => prev?.concat(data));
        }
      });
    }, opt);

    setObserver(ob);

    ob.observe(bottomRef.current!);
  }, [observer, bottomRef.current, curCateId.current, pageRef.current]);

  return (
    <Fragment>
      <div id="category-section relative" className="mx-5">
        <BookList
          Items={content}
          ItemPerRow={3}
          type={"separate"}
          isTemp={true}
          itemNum={pageRef.current * CATEGORY_PER_PAGE_NUM}
          isLayoutDiff={true}
        />
        <div
          ref={bottomRef}
          className="w-[100px] h-[1px] invisible  bg-red-400"
        ></div>
      </div>
    </Fragment>
  );
};

export default HomeCategoryItemList;
