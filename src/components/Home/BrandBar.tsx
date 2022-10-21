import { FunctionalComponent, h } from "preact";
import { useRef, StateUpdater } from "preact/hooks";
import Logo from "./../../resources/img/logo-text.svg";
import IconSearch from "./../../resources/img/homebrandbar-search.svg";
import { getSearch } from "../../lib/api";

interface HomeBrandBarProps {
  onShowSearch: StateUpdater<boolean>;
  onSearchResult: StateUpdater<Book[]>;
}

const HomeBrandBar: FunctionalComponent<HomeBrandBarProps> = ({
  onShowSearch,
  onSearchResult,
}) => {
  const searchRef = useRef<HTMLInputElement>(null!);

  return (
    <div class="header flex px-4 py-2 items-center shrink-0">
      <a href="#">
        <Logo class="w-24" alt="女神漫画" />
      </a>
      <div className="relative grow px-3">
        <input
          ref={searchRef}
          placeholder="更多分类"
          type="text"
          class="search-box bg-[#f1f1f1] w-full px-5 py-2.5 rounded-full text-xs text-gray-500 font-medium flex"
          onKeyDown={(e) => {
            const query = searchRef.current.value;
            if (query === "") return;
            if (e.key == "Enter" || e.keyCode === 13) {
              getSearch("keyword=" + query).then((response) => {
                console.log(response);
                onSearchResult(response.data);
                onShowSearch(true);
              });
            }
          }}
        />
        <div
          className="absolute top-1/2 right-8 translate-y-[-50%]"
          onClick={() => {
            const query = searchRef.current.value;
            if (query === "") return;
            getSearch("keyword=" + query).then((response) => {
              console.log(response);
              onSearchResult(response.data);
              onShowSearch(true);
            });
          }}
        >
          <IconSearch class="text-gray-500 h-4" alt="搜索" />
        </div>
      </div>
      <a href="/charge" class="flex flex-col items-center">
        <img src="/assets/img/deposit.gif" className="w-6" alt="充值" />
        <span class="text-[#666666] text-xs">充值</span>
      </a>
    </div>
  );
};

export default HomeBrandBar;
