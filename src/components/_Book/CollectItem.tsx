import { h, FunctionalComponent } from "preact";
import { StateUpdater, useState, useEffect } from "preact/hooks";
import { Link, route } from "preact-router";
import Image from "../_Image/image";
import { postMyBookmarks } from "../../lib/api";
import { useUser } from "../../context/user";

interface CollectItemProps {
  Data: Book;
  index_temp: number;
  curPress: number;
  setCurPress: StateUpdater<number>;
  updateList: StateUpdater<Array<Book>>;
}

let timer: ReturnType<typeof setTimeout>;
const CollectItem: FunctionalComponent<CollectItemProps> = ({
  Data,
  index_temp,
  curPress,
  setCurPress,
  updateList,
}) => {
  const { isLogIn } = useUser();
  const [showPending, setPending] = useState(true);
  const [isLongPress, setIsLongPress] = useState(false);

  useEffect(() => {
    curPress !== index_temp && setIsLongPress(false);
  }, [curPress, index_temp]);

  return (
    <div
      id={(Data.ID || Data.id || "").toString()}
      class={"cursor-pointer item-separate "}
    >
      <div class="relative h-[157px] rounded-lg overflow-hidden">
        <div
          className={
            "duration-300 h-full " + (isLongPress ? "translate-y-[-30px]" : '"')
          }
          onMouseDown={(e) => {
            e.preventDefault();
            setCurPress(index_temp);
            clearTimeout(timer);
            timer = setTimeout(() => {
              setIsLongPress(true);
            }, 400);
          }}
          onMouseUp={(e) => {
            clearTimeout(timer);
            if (isLongPress) {
              e.stopPropagation();
              return;
            }
            route("/directory/" + (Data.id || Data.ID));
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setCurPress(index_temp);
            clearTimeout(timer);
            timer = setTimeout(() => {
              setIsLongPress(true);
            }, 400);
          }}
          onTouchEnd={(e) => {
            clearTimeout(timer);
            if (isLongPress) {
              e.stopPropagation();
              return;
            }
            route("/directory/" + (Data.id || Data.ID));
          }}
        >
          {/* <div className={showPending ? "z-[20] pending h-[157px]" : ""}> */}
          <div
            className={
              showPending ? "z-[20] h-full h-[157px] overflow-hidden" : "h-full"
            }
          >
            <Image
              path={Data.Cover || Data.covers?.thumb || ""}
              alt={Data.Name || Data.title || ""}
              setParentPending={setPending}
            />
            {/* <img src="/assets/img/test/Image.png" className="" /> */}
          </div>
          <div
            className="z-[30] bg-[#ff978d] text-center text-white text-sm font-light h-[30px] leading-[30px]"
            onClick={(e) => {
              if (!isLogIn) {
                const temp = JSON.parse(
                  localStorage.getItem("sjmh") || '{"collection":[]}'
                );

                temp.collection = temp.collection.filter(
                  (collect: Book) => collect.id !== Data?.id
                );
                updateList((prev) => {
                  return prev.filter((p) => p.id !== Data.id);
                });

                localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
                return;
              }
              postMyBookmarks(Data.id, "remove")
                .then((response) => {
                  updateList((prev) => {
                    return prev.filter((p) => p.id !== Data.id);
                  });
                })
                .catch((err) => {
                  console.error(err.message || "failed");
                });
            }}
          >
            移除
          </div>
        </div>
      </div>
      <div class="title-separate">{Data.Name || Data.title}</div>
      <div class="rating-separate">
        ★ {Data.hot}&nbsp;&nbsp;◉ {Data.views}万
      </div>
    </div>
  );
};

export default CollectItem;
