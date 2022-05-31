import { h, FunctionalComponent } from "preact";
import { useState, useRef } from "preact/hooks";

import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import Swiper from "../components/Home/Swiper";
import { ObserverProvider } from "../context/observer";

let startPositionY = 0;
let offsetY = 0;

const HomePage: FunctionalComponent = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const touchStartHandler = (e: TouchEvent) => {
    // console.log(e.touches[0].clientY);
  };

  return (
    <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <BrandBar />
        <CategoryListBar onCategoryChanged={setCurrentCategory} />
        <div id="refresh-container">
          <p className="hidden text-center">refresh</p>
          <Swiper />
          {currentCategory == 0 ? (
            <Recommend />
          ) : (
            <CategoryItemList catID={currentCategory} />
          )}
        </div>
      </ObserverProvider>
    </div>
  );
};

export default HomePage;
