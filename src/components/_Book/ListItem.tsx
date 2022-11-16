import { h, FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import CustomLink from "../CustomLink";
import Image from "../_Image/image";
import { useUser } from "../../context/user";
import IconBookmark from "../../resources/img/icon-bookmark.svg";
import IconBookmarkGray from "../../resources/img/icon-bookmark-gray.svg";
import { defaultLocalStorage } from "../../const";
import { postMyBookmarks } from "../../lib/api";

interface BookListItemProps {
  Data: Book;
  type?: "separate" | "stack" | "original" | "collect";
  customHeight?: string;
  ItemPerRow?: number;
}

const BookListItem: FunctionalComponent<BookListItemProps> = ({
  Data,
  type = "original",
  customHeight = "h-[157px]",
  ItemPerRow = 3,
}) => {
  const { isLogIn } = useUser();
  const [showPending, setPending] = useState(true);
  const [isCollected, setIsCollected] = useState(false);

  // for random layout
  const rl = {
    4: "col-span-3",
    2: "col-span-3",
    3: "col-span-2",
    9: "col-span-2",
  }[ItemPerRow];

  const customHeightByRow = {
    4: "h-[242px]",
    2: "h-[242px]",
    3: "h-[157px]",
    9: "h-[157px]",
  }[ItemPerRow];

  useEffect(() => {
    if (isLogIn) {
      setIsCollected(Data.bookmark_status || false);
    } else {
      const collections = JSON.parse(
        localStorage.getItem("sjmh") || defaultLocalStorage
      ).collection;

      const hasBook = collections.find(
        (collect: Book) => collect.id === Data?.id
      );

      if (hasBook) setIsCollected(true);
    }
  }, [isLogIn]);

  if (type === "separate")
    return (
      <CustomLink
        href={"/directory/" + Data.id}
        className={"item-separate flex flex-col " + rl}
      >
        <div class="relative rounded-lg grow">
          {
            <button
              className="absolute z-20 right-0"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsCollected((prev) => !prev);
                if (isLogIn) {
                  postMyBookmarks(Data?.id, isCollected ? "remove" : "add")
                    .then((data) => {})
                    .catch((err) => console.error(err.message));
                } else {
                  //using localStorage
                  const temp = JSON.parse(
                    localStorage.getItem("sjmh") || defaultLocalStorage
                  );
                  if (isCollected) {
                    temp.collection = temp.collection.filter(
                      (collect: Content) => collect.id !== Data?.id
                    );
                  } else {
                    temp.collection.push({
                      id: Data?.id,
                      title: Data?.title,
                      hot: Data?.hot,
                      views: Data?.views,
                      covers: { thumb: Data?.covers?.thumb },
                    });
                  }
                  localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
                }
              }}
            >
              {isCollected ? (
                <IconBookmark class="w-7 h-7" />
              ) : (
                <IconBookmarkGray class="w-7 h-7" />
              )}
            </button>
          }
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
          <div className={`rounded-lg overflow-hidden ${customHeightByRow}`}>
            <div
              className={
                "rounded-lg overflow-hidden h-full relative z-[11] " +
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
        <div class="rating-separate">
          ★ {Data.hot}&nbsp;&nbsp;◉ {Data.views}万
        </div>
      </CustomLink>
    );

  if (type === "stack")
    return (
      <CustomLink
        href={"/directory/" + Data.id}
        className={"item h-[242px] " + (showPending ? "pending" : "")}
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
          <span class="rating z-30">
            ★ {Data.hot}&nbsp;&nbsp;◉ {Data.views}万
          </span>
        </div>
      </CustomLink>
    );

  // default return
  return (
    <CustomLink
      href={"/directory/" + Data.ID}
      className={"item " + (showPending ? " pending" : "")}
    >
      <Image
        path={Data.Cover || ""}
        alt={Data.Name || ""}
        setParentPending={setPending}
      />
      <div class="item-overlay">&nbsp;</div>
      <span class="title">{Data.Name || Data.title}</span>
      <span class="rating">
        ★ {Data.hot}&nbsp;&nbsp;◉ {Data.views}万
      </span>
    </CustomLink>
  );
};

export default BookListItem;
