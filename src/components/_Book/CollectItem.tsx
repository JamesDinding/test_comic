import { h, FunctionalComponent } from "preact";
import { StateUpdater, useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Image from "../_Image/image";
import { postMyBookmarks } from "../../lib/api";
import { useUser } from "../../context/user";
import { defaultLocalStorage } from "../../const";
import { useRouter } from "../../context/router";

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
  const { customRouter } = useRouter();
  const { isLogIn } = useUser();
  const [showPending, setPending] = useState(true);
  const [isLongPress, setIsLongPress] = useState(false);

  useEffect(() => {
    curPress !== index_temp && setIsLongPress(false);
  }, [curPress, index_temp]);

  function collectHandler(event: MouseEvent | TouchEvent) {
    clearTimeout(timer);
    event.preventDefault();
    event.stopPropagation();
    if (!isLogIn) {
      const temp = JSON.parse(
        localStorage.getItem("sjmh") || defaultLocalStorage
      );

      temp.collection = temp.collection.filter(
        (collect: Book) => collect.id !== Data?.id
      );
      updateList((prev) => {
        return prev.filter((p) => p.id !== Data.id);
      });

      localStorage.setItem("sjmh", JSON.stringify({ ...temp }));
      setCurPress(-1);

      return;
    }

    postMyBookmarks(Data.id, "remove")
      .then((response) => {
        updateList((prev) => {
          setCurPress(-1);
          return prev.filter((p) => p.id !== Data.id);
        });
      })
      .catch((err) => {
        setCurPress(-1);
        console.error(err.message || "failed");
      });
  }

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
            clearTimeout(timer);
            setCurPress(index_temp);
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
            customRouter.push("/directory/" + (Data.id || Data.ID));
            route("/directory/" + (Data.id || Data.ID));
          }}
          onTouchStart={(e) => {
            if (e.cancelable) e.preventDefault();
            clearTimeout(timer);
            setCurPress(index_temp);
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
            customRouter.push("/directory/" + (Data.id || Data.ID));
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
            onMouseDown={collectHandler}
            onMouseUp={(e) => e.stopPropagation()}
            onTouchStart={collectHandler}
            onTouchEnd={(e) => e.stopPropagation()}
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
