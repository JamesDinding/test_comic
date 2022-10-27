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
      root: document.querySelector("#category-section"),
      threshold: [0, 1],
      rootMargin: "-30px 0px 0px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          console.log("bottom ref show");
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
          className="w-[1px] h-[100px] absolute invisible"
        ></div>
      </div>
    </Fragment>
  );
};

export default HomeCategoryItemList;
