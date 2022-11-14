import { h, FunctionalComponent } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import SearchResultList from "../components/Search/SearchResultList";
import SearchBar from "../components/Search/SearchBar";
import KeywordSection from "../components/Search/KeywordSection";
import { ObserverProvider } from "../context/observer";

const SearchPage: FunctionalComponent = () => {
  return (
    <div>
      <SearchBar />
      <KeywordSection />
    </div>
  );
};

export default SearchPage;
