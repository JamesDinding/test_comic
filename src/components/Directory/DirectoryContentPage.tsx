import { h, FunctionalComponent, Fragment as F } from "preact";
import { useRef, useState } from "preact/hooks";
import { route } from "preact-router";
import Description from "./Description";
import ChapterList from "./ChapterList";
import ReturnBar from "../ReturnBar";
import FooterBar from "../FooterBar";
import BookListItem from "../_Book/ListItem";
import RecommendTitleBar from "../Home/RecommendTitleBar";
import { ObserverProvider } from "../../context/observer";
import ModalBuy from "../Modal/ModalBuy";
import IconBookmark from "../../resources/img/icon-bookmark.svg";
import IconBookmarkGray from "../../resources/img/icon-bookmark-gray.svg";

const comicArr = ["123", "234", "345", "456", "567", "678"];
//col-span-full
const adArr = ["fxck_me"];

const DirectoryContentPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  // temp collection state
  const [isCollected, setIsCollected] = useState(false);

  return (
    <F>
      <ModalBuy />
      <ReturnBar title="test" />
      <div class="grow overflow-hidden overflow-y-auto px-5" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <Description />
          <div className="flex mb-5">
            <button
              className="w-full py-2.5 text-center text-white text-lg bg-[#d19463] rounded-xl"
              onClick={() => route("/read/1234")}
            >
              開始閱讀
            </button>
            <button
              className="flex flex-col items-center ml-5 w-12"
              onClick={() => setIsCollected((prev) => !prev)}
            >
              {isCollected ? (
                <IconBookmark class="w-8 h-8" />
              ) : (
                <IconBookmarkGray class="w-8 h-8" />
              )}
              <span className="text-xs text-[#666666] text-center whitespace-nowrap">
                {isCollected ? "已收藏" : "收藏"}
              </span>
            </button>
          </div>
          <div className="pb-10">
            <ChapterList />
          </div>
          <div>
            <RecommendTitleBar BlockID={124} BlockName="舊品下市" />
            <div className="items-box grid grid-cols-3 gap-2.5 py-4">
              {comicArr.concat(adArr).map((el, i, arr) => {
                return i === 0 ? (
                  <div className="min-h-[100px] rounded bg-[#ff978d] col-span-full">
                    <span class="text-white">ad</span>
                  </div>
                ) : (
                  <BookListItem
                    Data={{ ID: 12345, Cover: "", Name: "test" }}
                    type="separate"
                  />
                );
              })}
            </div>
          </div>
        </ObserverProvider>
      </div>
      <FooterBar />
    </F>
  );
};

export default DirectoryContentPage;
