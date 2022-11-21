import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import SearchResultList from "../components/Search/SearchResultList";
import SearchBar from "../components/Search/SearchBar";
import KeywordSection from "../components/Search/KeywordSection";
import RecommendBlock from "../components/Home/RecommendBlock";
import FooterBar from "../components/FooterBar";
import { ObserverProvider } from "../context/observer";
import { getBlockById } from "../lib/api";
import { useDomain } from "../context/domain";
import { useRouter } from "../context/router";

const SearchPage: FunctionalComponent = () => {
  const [hasEnter, setHasEnter] = useState(false);
  const { tempData, setTempData } = useRouter();
  const containerRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState<Book[]>([]);
  const [recommendBlock, setRecommendBlock] = useState<Book[]>([]);
  const { setDomain } = useDomain();

  useEffect(() => {
    if (
      !hasEnter &&
      tempData &&
      tempData.SearchPage.searchWord.length &&
      tempData.SearchPage.searchWord === localStorage.getItem("sjmh_search_key")
    ) {
      setSearchResult(tempData.SearchPage.content);
      setShowSearchResult(true);
      inputRef.current.value = tempData.SearchPage.searchWord;
    } else {
      setTempData({
        SearchPage: {
          content: searchResult,
          searchWord: inputRef.current?.value || "",
        },
      });
    }
    setHasEnter(true);
  }, [searchResult, inputRef.current, hasEnter]);

  useEffect(() => {
    if (searchResult.length !== 0) return;
    setRecommendBlock([{}, {}, {}, {}, {}, {}]);
    getBlockById(44)
      .then((response) => {
        setRecommendBlock(response.data?.sort(() => Math.random() - 0.5));
        setDomain(response.domain);
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }, [searchResult.length]);

  return (
    <>
      <div
        ref={containerRef}
        // className="grow flex flex-col bg-[#fcf6ff]"
        className="grow overflow-hidden flex flex-col bg-[#fcf6ff]"
      >
        <ObserverProvider rootElement={containerRef}>
          <SearchBar
            inputRef={inputRef}
            onShow={setShowSearchResult}
            onSearch={setSearchResult}
          />
          <div id="scroll" className="grow overflow-y-auto no-scrollbar">
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
                setContent={setSearchResult}
                searchRef={inputRef}
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
          </div>
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default SearchPage;
