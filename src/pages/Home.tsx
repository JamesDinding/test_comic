import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect, StateUpdater } from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import SearchResultList from "../components/Search/SearchResultList";
import { ObserverProvider } from "../context/observer";
import { getCategories } from "../lib/api";
import SmartBanner from "../components/SmartBanner";

import FooterBar from "../components/FooterBar";
import { defaultLocalStorage } from "../const";

interface HomePageProps {
  showBanner: boolean;
  setShowBanner: StateUpdater<boolean>;
}

let initial = true;

const HomePage: FunctionalComponent<HomePageProps> = ({
  showBanner,
  setShowBanner,
}) => {
  console.log(initial);
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
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<Book[]>([]);

  const searchRef = useRef<HTMLInputElement>(null!);

  //useEffect => figure out app/ios/web

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
      {showBanner ? (
        <SmartBanner SetSmartBannerVisiblity={setShowBanner} tc={tc} />
      ) : (
        <></>
      )}

      {/* <div class={"grow overflow-hidden overflow-y-auto"} ref={containerRef}> */}
      <div
        id="scroll"
        class={"grow overflow-hidden overflow-y-auto"}
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <BrandBar
            onShowSearch={setShowSearch}
            onSearchResult={setSearchResult}
            onCategoryChanged={setCurrentCategory}
            searchRef={searchRef}
          />
          <CategoryListBar
            curCategory={currentCategory}
            onCategoryChanged={setCurrentCategory}
            categories={[{ id: 0, name: "首页" }].concat(categories)}
            searchRef={searchRef}
            setShowResult={setShowSearch}
          />
          <PullToRefresh containerElement={containerRef}>
            {showSearch ? (
              <SearchResultList content={searchResult} searchRef={searchRef} />
            ) : currentCategory == 0 ? (
              <Recommend setTc={setTc} />
            ) : (
              <CategoryItemList catID={categories[currentCategory - 1].id} />
            )}
          </PullToRefresh>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default HomePage;
