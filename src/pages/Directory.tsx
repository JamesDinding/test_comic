import { h, FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";
import Description from "../components/Directory/Description";
import ChapterHead from "../components/Directory/ChapterHead";
import ChapterList from "../components/Directory/ChapterList";
import ReturnBar from "../components/ReturnBar";
import { ObserverProvider } from "../context/observer";
import IconBookmark from "../resources/img/icon-bookmark.svg";

const DirectoryPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div class="grow overflow-hidden overflow-y-auto px-5" ref={containerRef}>
      <ObserverProvider rootElement={containerRef}>
        <ReturnBar title="test" />
        <Description />
        <div className="flex mb-5">
          <button
            className="w-full py-2.5 text-center text-white text-lg bg-[#d19463] rounded-xl"
            onClick={() => {
              console.log("gg4m8");
            }}
          >
            開始閱讀
          </button>
          <button className="flex flex-col items-center ml-5">
            <IconBookmark class="w-8 h-8" />
            <span className="text-xs text-[#666666] whitespace-nowrap">
              收藏
            </span>
          </button>
        </div>
        <ChapterList />
      </ObserverProvider>
    </div>
  );
};

export default DirectoryPage;
