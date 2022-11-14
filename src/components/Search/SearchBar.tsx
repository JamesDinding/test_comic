import { h, FunctionalComponent } from "preact";
import { useRouter } from "../../context/router";
import { route } from "preact-router";
import IconArrow from "../../resources/img/icon-arrow.svg";
import IconSearch from "../../resources/img/homebrandbar-search.svg";

const SearchBar: FunctionalComponent = () => {
  const { customRouter } = useRouter();

  return (
    <div className="return-bar px-5 relative shadow-md">
      <div
        className="h-[37px] flex flex-col justify-end items-center cursor-pointer"
        onClick={() => {
          const des = customRouter.pop();
          // history.back();
          route(des);
        }}
      >
        <span>
          <IconArrow class="w-[1.125rem] text-[#8f6e9f]" />
        </span>
        <div className="pt-1.5 text-[#666666] text-[12px] leading-[12px] whitespace-nowrap">
          返回
        </div>
      </div>
      <div className="relative grow px-3">
        <input
          //   ref={searchRef}
          placeholder="更多分类"
          type="text"
          class="search-box bg-[#f1f1f1] w-full px-5 py-2.5 rounded-full text-xs text-gray-500 font-medium flex"
          onKeyDown={(e) => {
            console.log("key down");
            // const query = searchRef.current.value;
            // if (query === "") return;
            // if (e.key == "Enter" || e.keyCode === 13) {
            //   getSearch("keyword=" + query)
            //     .then((response) => {
            //       onSearchResult(response.data);
            //     })
            //     .catch((err) => {
            //       console.error(err.message || "failed");
            //       onSearchResult([]);
            //     })
            //     .finally(() => {
            //       onShowSearch(true);
            //       onCategoryChanged(0);
            //       const temp = JSON.parse(
            //         localStorage.getItem("sjmh") || defaultLocalStorage
            //       );
            //       temp.home.curCategoryIndex = 0;
            //       localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
            //     });
            // }
          }}
        />
        <div
          className="absolute top-1/2 right-8 translate-y-[-50%]"
          onClick={() => {
            console.log("click");
            // const query = searchRef.current.value;
            // if (query === "") return;
            // getSearch("keyword=" + query).then((response) => {
            //   onSearchResult(response.data);
            //   onShowSearch(true);
            // });
          }}
        >
          <IconSearch class="text-gray-500 h-4" alt="搜索" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
