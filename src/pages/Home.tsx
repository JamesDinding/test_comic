import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import { ObserverProvider } from "../context/observer";

import FooterBar from "../components/FooterBar";

const HomePage: FunctionalComponent = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <BrandBar />
          <CategoryListBar onCategoryChanged={setCurrentCategory} />

          <PullToRefresh containerElement={containerRef}>
            {currentCategory == 0 ? (
              <Recommend />
            ) : (
              <CategoryItemList catID={currentCategory} />
            )}
          </PullToRefresh>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default HomePage;
