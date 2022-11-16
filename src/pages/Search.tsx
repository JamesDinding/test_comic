import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import SearchResultList from "../components/Search/SearchResultList";
import SearchBar from "../components/Search/SearchBar";
import KeywordSection from "../components/Search/KeywordSection";
import RecommendBlock from "../components/Home/RecommendBlock";
import { ObserverProvider } from "../context/observer";
import { getBlockById } from "../lib/api";
import { useDomain } from "../context/domain";

const SearchPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [recommendBlock, setRecommendBlock] = useState<Book[]>([]);
  const { setDomain } = useDomain();

  //  for random layout
  const countRef = useRef(0);

  useEffect(() => {
    if (searchResult.length !== 0) return;
    countRef.current = 0;
    getBlockById(44)
      .then((response) => {
        setRecommendBlock(response.data);
        setDomain(response.domain);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, [searchResult.length]);

  return (
    <div
      id="scroll"
      ref={containerRef}
      className="grow overflow-y-auto no-scrollbar bg-[#fcf6ff]"
    >
      <ObserverProvider rootElement={containerRef}>
        <SearchBar
          inputRef={inputRef}
          onShow={setShowSearchResult}
          onSearch={setSearchResult}
        />
        {!showSearchResult && (
          <KeywordSection
            inputRef={inputRef}
            onShow={setShowSearchResult}
            onSearch={setSearchResult}
          />
        )}
        {showSearchResult && (
          <SearchResultList
            content={searchResult}
            searchRef={inputRef}
            countRef={countRef}
          />
        )}
        {!searchResult.length && (
          <div className="bg-white pt-[1px]">
            <RecommendBlock
              BlockID={44}
              BlockName="新书上架"
              ItemPerRow={3}
              Items={recommendBlock}
              totalNum={9}
            />
          </div>
        )}
      </ObserverProvider>
    </div>
  );
};

export default SearchPage;
