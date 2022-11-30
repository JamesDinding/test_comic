import { h, FunctionalComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useState, useRef } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import IconLock from "../../resources/img/icon-lock.svg";
import Image from "../_Image/image";
import { ObserverProvider } from "../../context/observer";
import { useRouter } from "../../context/router";

const ChapterItem: FunctionalComponent<ChapterItem> = ({
  chapter,
  smallSize = false,
  bookId = 0,
  routeReplace = false,
}) => {
  const { customRouter } = useRouter();
  const { reset } = useReadingModal();
  const { popBuy, setStuffInfo } = useReadingModal();
  const [isPending, setIsPending] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  let coverImage = chapter.covers.thumb;

  if (coverImage && coverImage != "") {
    coverImage = chapter.source + "/" + coverImage;
  }

  return (
    <F>
      <div
        ref={containerRef}
        className={
          "cursor-pointer relative overflow-hidden rounded-lg " +
          (smallSize ? "w-[76px] h-[115px]" : "min-w-[105px] h-[72px]")
        }
        onClick={() => {
          setStuffInfo({ ...chapter, bookId });
          if (!chapter.status) {
            popBuy();
            return;
          }

          reset();
          customRouter.push(
            `/read/${bookId}/chapter/${chapter.position}`,
            routeReplace
          );
          route(`/read/${bookId}/chapter/${chapter.position}`, routeReplace);
        }}
      >
        {!chapter.status && (
          <div
            className="chapter-item-backdrop"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))",
            }}
          ></div>
        )}
        {!chapter.status && (
          <div className="absolute left-1/2 translate-x-[-50%] pt-[1.125rem]">
            <IconLock class="w-5 h-5" />
          </div>
        )}
        <ObserverProvider rootElement={containerRef}>
          <div
            className={"overflow-hidden h-full " + (isPending ? "pending" : "")}
          >
            <Image
              path={coverImage}
              alt=""
              setParentPending={setIsPending}
              isChapterCover={true}
              escapeObserve={true}
            />
          </div>
        </ObserverProvider>
        <div
          className="item-overlay-chapter"
          style={{
            backgroundImage:
              "linear-gradient(to bottom,rgba(89, 89, 89, 0),rgba(0, 0, 0, 0.8))",
          }}
        ></div>
        <div className="absolute left-1/2 bottom-[.25rem] translate-x-[-50%] whitespace-nowrap text-sm text-white text-center w-[70px] h-[20px] leading-[20px]">
          第 {chapter.position} 章
        </div>
      </div>
    </F>
  );
};

export default ChapterItem;
