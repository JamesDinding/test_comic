import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import PullToRefresh from "../components/Home/PullToRefresh";
import CategoryListBar from "../components/Home/CategoryListBar";
import BrandBar from "../components/Home/BrandBar";
import Recommend from "../components/Home/Recommend";
import CategoryItemList from "../components/Home/CategoryItemList";
import BookList from "../components/_Book/List";
import { getDomains } from "../lib/api";
import { ObserverProvider } from "../context/observer";
import { useDomain } from "../context/domain";
import useRequest from "../hooks/use-request";
import { getCategories } from "../lib/api";
import SmartBanner from "../components/SmartBanner";

import FooterBar from "../components/FooterBar";

const HomePage: FunctionalComponent = () => {
  const { srcDomain } = useDomain();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [showSmartBanner, setShowSmartBanner] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null!);
  const [categories, setCategories] = useState<Array<{name:string, id:number}>>([])
  const [showSearch, setShowSearch] = useState(false)
  const [searchResult, setSearchResult] = useState<Book[]>([])

    useEffect(()=>{
        try{
            (async()=>{
                const {data} = await getCategories();
                setCategories(data)
            })()
        }catch(err:any){
            console.log(err.message || 'failed')
        }
    }, [])

  return (
    <>
     {showSmartBanner ? (
                <SmartBanner SetSmartBannerVisiblity={setShowSmartBanner} />
              ) : (
                <></>
              )}

      <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <BrandBar onShowSearch={setShowSearch} onSearchResult={setSearchResult} />
          <CategoryListBar onCategoryChanged={setCurrentCategory} categories={[{name:'首頁', id:0}].concat(categories)} />

          <PullToRefresh containerElement={containerRef}>
            {currentCategory == 0 ? (
              showSearch ? <div className="mx-5">
              <BookList
                Items={searchResult}
                ItemPerRow={3}
                type={"separate"}
                isTemp={true}
              />
            </div> : <Recommend />
            ) : (
              <CategoryItemList catID={categories[currentCategory].id} />
            )}
          </PullToRefresh>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default HomePage;
