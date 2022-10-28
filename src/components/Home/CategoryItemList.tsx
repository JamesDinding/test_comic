import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef, Ref } from "preact/hooks";
import { route } from "preact-router";
import BookList from "../_Book/List";
import { getSpecifiedCategory } from "../../lib/api";

interface CategoryItemListProps {
  catID: Number;
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> = ({
  catID,
}) => {
  const [content, setContent] = useState<Book[]>();
  const [currentNum, setCurrentNum] = useState(30);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver>();

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedCategory(catID.toString());
        setContent(data);
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
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-30px 0px 0px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (e) => {
        if (e.isIntersecting) {
          const { data } = await getSpecifiedCategory(catID.toString());
          setContent((prev) => prev?.concat(data));
          setCurrentNum((prev) => prev + 30);
        }
      });
    }, opt);

    setObserver(ob);

    ob.observe(bottomRef.current!);
  }, [observer]);

  return (
    <Fragment>
      <div id="category-section relative" className="mx-5">
        <BookList
          Items={content}
          ItemPerRow={3}
          type={"separate"}
          isTemp={true}
          itemNum={currentNum}
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
