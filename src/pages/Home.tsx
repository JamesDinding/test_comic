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
  // Part Search
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const searchRef = useRef<HTMLInputElement>(null!);

  // Part More
  const [showMore, setShowMore] = useState(false);
  const [moreResult, setMoreResult] = useState<Book[]>([]);
  const [moreBlockId, setMoreBlockId] = useState(0);

  const stopShowResult = useCallback(() => {
    setShowMore(false);
    setShowSearch(false);
  }, [setShowMore, setShowSearch]);

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

  // fetch more content by moreBlockId
  useEffect(() => {
    if (moreBlockId === 0) return;
    getBlockById(moreBlockId)
      .then((response) => {
        setMoreResult(response.data);
      })
      .catch((err) => {
        console.error(err.message || "failed");
        setMoreResult([]);
      })
      .finally(() => {
        setShowMore(true);
        setCurrentCategory(0);
      });
  }, [moreBlockId]);

  return (
    <>
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
            stopShowResult={stopShowResult}
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
      <FooterBar stopShowResult={stopShowResult} />
    </>
  );
};

export default HomePage;
