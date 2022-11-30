import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import { ObserverProvider } from "../context/observer";
import { getCategories } from "../lib/api";

import FooterBar from "../components/FooterBar";
import { defaultLocalStorage } from "../const";

let initial = true;

const HomePage: FunctionalComponent = ({}) => {
  const [currentCategory, setCurrentCategory] = useState(
    initial
      ? 0
      : JSON.parse(localStorage.getItem("sjmh") || defaultLocalStorage).home
          .curCategoryIndex
  );
  const [tc, setTc] = useState("");
  const containerRef = useRef<HTMLDivElement>(null!);
  const [categories, setCategories] = useState<
    Array<{ name: string; id: number }>
  >(
    initial
      ? []
      : JSON.parse(localStorage.getItem("sjmh") || defaultLocalStorage).home
          .categories
  );

  useEffect(() => {
    if (categories.length !== 0) return;
    initial = false;
    try {
      (async () => {
        const { data } = await getCategories();
        setCategories(data);
        const temp = JSON.parse(
          localStorage.getItem("sjmh") || defaultLocalStorage
        );
        temp.home.curCategoryIndex = 0;
        temp.home.categories = data;
        localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
      })();
    } catch (err: any) {
      console.error(err.message || "failed");
    }
  }, [categories]);

  return (
    <>
      {/* <div class={"grow overflow-hidden overflow-y-auto"} ref={containerRef}> */}
      <div
        id="scroll"
        class={"flex flex-col grow overflow-hidden"}
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <BrandBar />
          <CategoryListBar
            curCategory={currentCategory}
            categories={[{ id: 0, name: "首页" }].concat(categories)}
          />
          <PullToRefresh containerElement={containerRef}>
            <Recommend setTc={setTc} />
          </PullToRefresh>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default HomePage;
