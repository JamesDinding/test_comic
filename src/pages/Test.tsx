import { h, Fragment, FunctionComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Link } from "preact-router";
import BookListItem from "../components/_Book/ListItem";
import RecommendTitleBar from "../components/Home/RecommendTitleBar";

const Test: FunctionComponent = () => {
  return (
    <div className="mt-5">
      <RecommendTitleBar BlockID={123} BlockName="新品上市" />
      <div className="items-box grid grid-cols-3 gap-2 p-2">
        <Link href={"/test"} class={"item min-h-[163px]"}>
          <img src={"imageBlob"} alt="" />
          <div class="item-overlay">&nbsp;</div>
          <span class="title">test name</span>
          <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
        </Link>
        <Link href={"/test"} class={"item min-h-[163px]"}>
          <img src={"imageBlob"} alt="" />
          <div class="item-overlay">&nbsp;</div>
          <span class="title">test name</span>
          <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
        </Link>
        <Link href={"/test"} class={"item min-h-[163px]"}>
          <img src={"imageBlob"} alt="" />
          <div class="item-overlay">&nbsp;</div>
          <span class="title">test name</span>
          <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
        <Link
          href="/test"
          class={
            "rounded-lg border border-gray-200 shadow-md relative h-full min-h-[163px]"
          }
        >
          <img src="imageBlob" alt="" class="w-full h-auto z-[5]" />
          <div class="absolute bottom-12 left-[-5px] w-[36px] h-[21px] text-[12px] font-light leading-[21px] text-white pl-[7px] pr-[5px] bg-[#d0719a] rounded-r-[7px] rounded-l-sm z-10">
            連載
          </div>
          <div class="absolute bg-red-400 w-3 h-3 rotate-[30deg] bottom-12 left-[-5px] origin-bottom-left"></div>
          <div class="bg-gradient-to-b from-transparent to-black absolute z-[5] bottom-0 left-0 rounded-b-lg w-full h-28">
            &nbsp;
          </div>
          <span class="absolute bottom-6 px-2 text-ellipsis whitespace-nowrap text-sm text-white block w-full overflow-hidden z-10">
            test name
          </span>
          <span class="text-[9px] text-gray-400 absolute bottom-2 left-3 z-10">
            ★ 7.8&nbsp;&nbsp;◉ 103.5万
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Test;
