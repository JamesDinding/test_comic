import { h, FunctionalComponent, Fragment } from "preact";
import {
  useState,
  useRef,
  useEffect,
  StateUpdater,
  useCallback,
} from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import SearchResultList from "../components/Search/SearchResultList";
import MoreResultList from "../components/More/MoreResultList";
import { ObserverProvider } from "../context/observer";
import { getBlockById, getCategories } from "../lib/api";
import SmartBanner from "../components/SmartBanner";

import FooterBar from "../components/FooterBar";
import { defaultLocalStorage } from "../const";
import { useRouter } from "../context/router";

const CategoryPage: FunctionalComponent = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { currentRoute } = useRouter();
  const [categories, setCategories] = useState<
    Array<{ name: string; id: number }>
  >(
    JSON.parse(localStorage.getItem("sjmh") || defaultLocalStorage).home
      .categories
  );

  const currentCategory = currentRoute.split("/").pop() || "0";

  useEffect(() => {
    if (categories.length !== 0) return;
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
            <CategoryItemList
              catID={categories[parseInt(currentCategory, 10) - 1].id}
            />
          </PullToRefresh>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default CategoryPage;
