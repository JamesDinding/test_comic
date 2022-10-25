import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { Link } from "preact-router";
import Image from "../_Image/image";

interface BookListItemProps {
  Data: Book;
  type?: "separate" | "stack" | "original" | "collect";
}

const BookListItem: FunctionalComponent<BookListItemProps> = ({
  Data,
  type = "original",
}) => {
  const [showPending, setPending] = useState(true);

  // cover and title is separated
  if (type === "separate")
    return (
      <Link
        href={"/directory/" + Data.id}
        class={"item-separate flex flex-col "}
      >
        <div class="relative rounded-lg grow">
          {!showPending && (
            <div className="item-overlay z-[25] !h-[60px]"></div>
          )}
          <div
            class={
              "bottom-4 tag " +
              (Data.status === "完结" ? "bg-[#71b3d0]" : "bg-[#d0719a]")
            }
          >
            {Data.status}
          </div>
          <div
            class={
              "bottom-4 tag-decoration " +
              (Data.status === "完结" ? "bg-[#407389]" : "bg-[#ab4b74]")
            }
          ></div>
          <div className="rounded-lg overflow-hidden h-[157px]">
            {/* <div className={showPending ? "z-[20] pending min-h-[157px]" : ""}> */}
            <div
              className={
                "rounded-lg overflow-hidden h-full " +
                (showPending ? "pending" : "")
              }
            >
              <Image
                path={Data.Cover || Data.covers?.thumb || ""}
                alt={Data.Name || ""}
                setParentPending={setPending}
              />
            </div>
          </div>
        </div>
        <div class="title-separate">{Data.Name || Data.title}</div>
        <div class="rating-separate">★ 7.8&nbsp;&nbsp;◉ 103.5万</div>
      </Link>
    );

  // cover and title is stacked ，image 应该要 z-index: 5或6 ?
  if (type === "stack")
    return (
      <Link
        href={"/directory/" + Data.id}
        // class={"relative item " + (showPending ? " pending min-h-[242px]" : "")}
        class={"item h-[242px] " + (showPending ? "pending" : "")}
      >
        <div className="relative z-20 rounded-lg overflow-hidden h-full">
          <Image
            path={Data.Cover || Data.covers?.thumb || ""}
            alt={Data.Name || ""}
            setParentPending={setPending}
          />
        </div>
        <div
          class={
            "bottom-[3.25rem] tag " +
            (Data.status === "完结" ? "bg-[#71b3d0]" : "bg-[#d0719a]")
          }
        >
          {Data.status}
        </div>
        <div
          class={
            "bottom-[3.25rem] tag-decoration " +
            (Data.status === "完结" ? "bg-[#407389]" : "bg-[#ab4b74]")
          }
        ></div>
        {!showPending && <div class="item-overlay z-[5]">&nbsp;</div>}
        <div className="item-overlay z-[25]">
          <span class="title z-30">{Data.Name || Data.title}</span>
          <span class="rating z-30">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
        </div>
      </Link>
    );

  // default return
  return (
    <Link
      href={"/directory/" + Data.ID}
      class={"item " + (showPending ? " pending" : "")}
    >
      <Image
        path={Data.Cover || ""}
        alt={Data.Name || ""}
        setParentPending={setPending}
      />
      <div class="item-overlay">&nbsp;</div>
      <span class="title">{Data.Name || Data.title}</span>
      <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
    </Link>
  );
};

export default BookListItem;
