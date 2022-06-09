import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { ObserverProvider } from "../context/observer";
import SearchBar from "../components/Search/SearchBar";
import SearchResult from "../components/Search/SearchResult";
import TagList from "../components/Search/TagList";

const SearchPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [showResult, setShowResult] = useState(false);

  // 實際串接api後，應該會把滿多useState移到這個component
  // SearchBar TagList 都會決定 Result

  return (
    <>
      <SearchBar />
      <div
        class="grow overflow-hidden overflow-y-auto bg-[#efefef]"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <TagList />
          <SearchResult />
        </ObserverProvider>
      </div>
    </>
  );
};

export default SearchPage;
