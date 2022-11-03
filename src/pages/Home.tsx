import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect, StateUpdater } from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import SearchResultList from "../components/Search/SearchResultList";
import BookList from "../components/_Book/List";
import { ObserverProvider } from "../context/observer";
import { getCategories } from "../lib/api";
import SmartBanner from "../components/SmartBanner";

import FooterBar from "../components/FooterBar";

interface HomePageProps {
  showBanner: boolean;
  setShowBanner: StateUpdater<boolean>;
}

const HomePage: FunctionalComponent<HomePageProps> = ({
  showBanner,
  setShowBanner,
}) => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [tc, setTc] = useState("");
  const containerRef = useRef<HTMLDivElement>(null!);
  const [categories, setCategories] = useState<
    Array<{ name: string; id: number }>
  >([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResult, setSearchResult] = useState<Book[]>([]);

  const searchRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (categories.length !== 0) return;
    try {
      (async () => {
        const { data } = await getCategories();
        setCategories(data);
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
            onCategoryChanged={setCurrentCategory}
            categories={[{ id: 0, name: "首页" }].concat(categories)}
            searchRef={searchRef}
            setShowResult={setShowSearch}
          />

          <PullToRefresh containerElement={containerRef}>
            {currentCategory == 0 ? (
              showSearch ? (
                // <div className="mx-5">
                //   <BookList
                //     Items={searchResult}
                //     ItemPerRow={3}
                //     type={"separate"}
                //     isTemp={true}
                //   />
                // </div>
                <SearchResultList
                  content={searchResult}
                  searchRef={searchRef}
                />
              ) : (
                <Recommend setTc={setTc} />
              )
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
