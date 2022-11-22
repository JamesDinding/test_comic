import { h, FunctionalComponent } from "preact";
import { StateUpdater, useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Image from "../_Image/image";
import { postMyBookmarks } from "../../lib/api";
import { useUser } from "../../context/user";
import { defaultLocalStorage } from "../../const";
import { useRouter } from "../../context/router";
import IconCross from "../../resources/img/icon-cross.svg";
import { publish } from "../../lib/event";

interface CollectItemProps {
  Data: Book;
  index_temp: number;
  curPress: number;
  setCurPress: StateUpdater<number>;
  updateList: StateUpdater<Array<Book>>;
}

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

  function collectHandler(event: MouseEvent | TouchEvent) {
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
      publish("cancelCollect", { target_id: Data.id });

      localStorage.setItem("sjmh", JSON.stringify({ ...temp }));

      return;
    }

    postMyBookmarks(Data.id, "remove")
      .then((_) => {
        updateList((prev) => {
          return prev.filter((p) => p.id !== Data.id);
        });
        publish("cancelCollect", {});
      })
      .catch((err) => {
        console.error(err.message || "failed");
      });
  }

  return (
    <div
      id={(Data.ID || Data.id || "").toString()}
      class={"cursor-pointer item-separate "}
    >
      <div
        class="relative h-[157px] rounded-lg overflow-hidden"
        onClick={() => {
          customRouter.push("/directory/" + Data.id);
          route("/directory/" + Data.id);
        }}
      >
        <div
          className="absolute right-1 top-1 z-10 w-[25px] h-[25px] text-sm text-center text-white leading-[25px] rounded-full"
          style={{ backgroundColor: "rgba(29,25,32,.6)" }}
          onClick={collectHandler}
        >
          &#10005;
        </div>
        <div className={"duration-300 h-full "}>
          <div
            className={
              showPending
                ? "z-[20] h-full h-[157px] pending overflow-hidden"
                : "h-full"
            }
          >
            <Image
              path={Data.Cover || Data.covers?.thumb || ""}
              alt={Data.Name || Data.title || ""}
              setParentPending={setPending}
            />
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
