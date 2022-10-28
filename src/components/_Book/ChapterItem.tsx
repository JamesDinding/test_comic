import { h, FunctionalComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useState, useEffect, useRef } from "preact/hooks";
import { useReadingModal } from "../../context/reading";
import IconLock from "../../resources/img/icon-lock.svg";
import Image from "../_Image/image";
import { ObserverProvider } from "../../context/observer";
import ModalBuy from "../Modal/ModalBuy";

const ChapterItem: FunctionalComponent<ChapterItem> = ({
  chapter,
  smallSize = false,
  bookId = 0,
}) => {
  const { popBuy, setStuffInfo } = useReadingModal();
  const [isPending, setIsPending] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <F>
      <div
        ref={containerRef}
        className={
          "cursor-pointer relative overflow-hidden rounded-lg " +
          (smallSize ? "w-[76px] h-[115px]" : "min-w-[105px] h-[72px]")
        }
        onClick={() => {
          if (!chapter.status) {
            setStuffInfo({ ...chapter, bookId });
            popBuy();
            return;
          }
          route(`/read/${bookId}/chapter/${chapter.position}`, true);
        }}
      >
        {!chapter.status && <div className="chapter-item-backdrop"></div>}
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
              path={chapter.covers.thumb}
              alt=""
              setParentPending={setIsPending}
            />
          </div>
        </ObserverProvider>
        <div className="item-overlay-chapter"></div>
        <div className="absolute left-1/2 bottom-[.25rem] translate-x-[-50%] whitespace-nowrap text-sm text-white text-center w-[70px] h-[20px] leading-[20px]">
          第 {chapter.position} 章
        </div>
      </div>
    </F>
  );
};

export default ChapterItem;
