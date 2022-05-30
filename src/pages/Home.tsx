import { h, FunctionalComponent } from "preact";
import { useState, useRef } from "preact/hooks";

import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import Swiper from "../components/Home/Swiper";
import { ObserverProvider } from "../context/observer";

const HomePage: FunctionalComponent = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <BrandBar />
        <CategoryListBar onCategoryChanged={setCurrentCategory} />
        <Swiper />
        {currentCategory == 0 ? (
          <Recommend />
        ) : (
          <CategoryItemList catID={currentCategory} />
        )}
      </ObserverProvider>
    </div>
  );
};

export default HomePage;
