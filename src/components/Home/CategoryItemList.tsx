import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef, StateUpdater } from "preact/hooks";
import BookList from "../_Book/List";
import { useDomain } from "../../context/domain";
import { useRouter } from "../../context/router";
import { getSpecifiedCategory } from "../../lib/api";
import { CATEGORY_PER_PAGE_NUM } from "../../const";
import { subscribe, unsubscribe } from "../../lib/event";

interface CategoryItemListProps {
  catID: number;
  content: Book[];
  setContent: StateUpdater<Book[]>;
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> = ({
  catID,
  content,
  setContent,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const { setDomain } = useDomain();
  const { tempData, setTempData, attachment, attachData } = useRouter();
  // test ref
  const topRef = useRef<HTMLDivElement>(null!);
  const pageRef = useRef(1);
  const curCateId = useRef(catID);
  const numRef = useRef(0);

  function memorizePageRefHandler() {
    let temp = JSON.parse(localStorage.getItem("category_page") || "");
    if (!temp) return;
    temp[catID] = pageRef.current;
    localStorage.setItem("category_page", JSON.stringify(temp));
  }

  useEffect(() => {
    subscribe("memorizePageRef", memorizePageRefHandler);

    return () => {
      unsubscribe("memorizePageRef", memorizePageRefHandler);
    };
  }, []);

  useEffect(() => {
    pageRef.current = JSON.parse(
      localStorage.getItem("category_page") || '{"[catID]": 1}'
    )[catID];
    if (!pageRef.current) pageRef.current = 1;
    if (attachment && tempData && tempData.CategoryPage[catID]) {
      setContent(tempData.CategoryPage[catID].content);
      return;
    }

    // attachData(null);
    const abortController = new AbortController();

    topRef.current.scrollIntoView();

    curCateId.current = catID;
    setContent([{}, {}, {}, {}, {}, {}, {}]);

    console.log(pageRef.current);
    // pageRef.current = 1;

    getSpecifiedCategory(catID, pageRef.current, abortController.signal)
      .then(({ data, domain }) => {
        numRef.current = data?.length;
        pageRef.current++;
        const random_order_data = data?.sort(() => Math.random() - 0.5);

        setTempData((prev: any) => {
          const t = { ...prev };
          if (t.CategoryPage) {
            t.CategoryPage[catID] = {
              content: random_order_data,
            };
          } else {
            t.CategoryPage = {};
            t.CategoryPage[catID] = { content: random_order_data };
          }

          return t;
        });
        setContent(random_order_data);
        setDomain(domain);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });

    return () => {
      abortController.abort();
    };
  }, [catID, attachment]);

  useEffect(() => {
    if (!attachment || !tempData) return;
    const t = document.querySelector("#category-section") as HTMLDivElement;
    const s = document.querySelector("#category-scroll") as HTMLDivElement;

    const containerHeight = tempData.CategoryPage[catID]?.container_height;
    const scrollHeight = tempData.CategoryPage[catID]?.scroll_height;

    if (containerHeight && t) {
      t.style.minHeight = containerHeight + "px";
    }
    if (scrollHeight && s) {
      s.scrollTo(0, parseInt(scrollHeight, 10));
      t.style.minHeight = "";
    }
  }, [attachment, tempData, catID]);

  useEffect(() => {
    if (observer) return;
    const opt: IntersectionObserverInit = {
      root: document.querySelector("#category-scroll"),
      // root: document.querySelector("#scroll"),
      // root: document.querySelector("#category-section"),
      // threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-30px 0px 100px 0px",
    };

    const ob = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (e) => {
        if (e.isIntersecting) {
          console.log(pageRef.current);
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
          memorizePageRefHandler();
          setTempData((prev: any) => {
            const temp = { ...prev };
            console.log(temp);
            if (temp && temp.CategoryPage[curCateId.current]) {
              console.log(
                "previous temp:",
                temp.CategoryPage[curCateId.current].content
              );
              temp.CategoryPage[curCateId.current].content =
                temp.CategoryPage[curCateId.current].content.concat(data);
            }
            return temp;
          });
        }
      });
    }, opt);

    setObserver(ob);

    ob.observe(bottomRef.current!);
  }, [observer, bottomRef.current, curCateId.current, pageRef.current]);

  return (
    <Fragment>
      <div id="category-section" className="mx-5 relative">
        <div ref={topRef}></div>
        <BookList
          catID={catID}
          Items={content}
          ItemPerRow={3}
          type={"separate"}
          isTemp={true}
          itemNum={
            tempData && tempData.CategoryPage[catID]
              ? tempData.CategoryPage[catID].content.length
              : pageRef.current * CATEGORY_PER_PAGE_NUM
          }
          isLayoutDiff={true}
        />
        <div
          ref={bottomRef}
          className="w-[100px] h-[1px] mb-[1px] invisible  bg-red-400"
        ></div>
      </div>
    </Fragment>
  );
};

export default HomeCategoryItemList;
