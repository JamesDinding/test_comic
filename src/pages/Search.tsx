import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { ObserverProvider } from "../context/observer";
import SearchBar from "../components/Search/SearchBar";
import TagList from "../components/Search/TagList";

const SearchPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <SearchBar />
      <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <TagList />
        </ObserverProvider>
      </div>
    </>
  );
};

export default SearchPage;
