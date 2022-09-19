import { h, Fragment as F, FunctionComponent } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import { Link } from "preact-router";
import BookListItem from "../components/_Book/ListItem";
import RecommendTitleBar from "../components/Home/RecommendTitleBar";
import PopConfirm from "../components/Profile/Services/Charge/PopConfirm";
import { ObserverProvider } from "../context/observer";

const comicArr = ["123", "234", "345", "456"];
//col-span-full
const adArr = ["fxck_me"];

const Test: FunctionComponent = () => {
  const [isPop, setIsPop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <F>
      {isPop && <PopConfirm onClose={() => setIsPop(false)} />}
      <div className="overflow-y-scroll no-scrollbar" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <div className="mt-5">
            <RecommendTitleBar BlockID={124} BlockName="舊品下市" />
            <div className="items-box grid grid-cols-2 gap-2.5 py-4 px-5">
              {comicArr.concat(adArr).map((el, i, arr) => {
                return arr.length === i + 1 ? (
                  <div className="min-h-[153px] rounded bg-[#ff978d] col-span-full">
                    <span class="text-white">ad</span>
                  </div>
                ) : (
                  <BookListItem
                    Data={{ ID: 12345, Cover: "", Name: "test" }}
                    type="stack"
                  />
                  // <Link href={"/test"} class={"item min-h-[242px]"}>
                  //   <img src={"imageBlob"} alt="" />
                  //   <div class="bottom-[3.25rem] tag">連載</div>
                  //   <div class="bottom-[3.25rem] tag-decoration"></div>
                  //   <div class="item-overlay">&nbsp;</div>
                  //   <span class="title">test name</span>
                  //   <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
                  // </Link>
                );
              })}
            </div>
          </div>
          <div className="mt-5">
            <RecommendTitleBar BlockID={123} BlockName="新品上市" />
            <div className="items-box grid grid-cols-3 gap-2.5 py-4 px-5">
              {new Array(9).fill("").map((el, i, arr) => {
                return (
                  <BookListItem
                    Data={{ ID: 12345, Cover: "", Name: "test" }}
                    type="separate"
                  />
                  // <Link href="/test" class={"item-separate"}>
                  //   <div class="relative">
                  //     <div class="bottom-4 tag">連載</div>
                  //     <div class="bottom-4 tag-decoration"></div>
                  //     <img
                  //       src="imageBlob"
                  //       alt=""
                  //       class="w-full h-auto z-[5] min-h-[157px] bg-[#ff978d] rounded-lg"
                  //     />
                  //   </div>
                  //   <span class="title-separate">test name</span>
                  //   <span class="rating-separate">
                  //     ★ 7.8&nbsp;&nbsp;◉ 103.5万
                  //   </span>
                  // </Link>
                );
              })}
            </div>
          </div>
        </ObserverProvider>
      </div>
    </F>
  );
};

export default Test;
