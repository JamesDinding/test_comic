import { h, FunctionalComponent } from "preact";
import { StateUpdater, useState, useEffect } from "preact/hooks";
import { Link, route } from "preact-router";
import Image from "../_Image/image";

interface CollectItemProps {
  Data: Book;
  index_temp: number;
  curPress: number;
  setCurPress: StateUpdater<number>;
}

let timer: ReturnType<typeof setTimeout>;
const CollectItem: FunctionalComponent<CollectItemProps> = ({
  Data,
  index_temp,
  curPress,
  setCurPress,
}) => {
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
            route("/directory/1234");
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
            route("/directory/1234");
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
          <div className="z-[30] bg-[#ff978d] text-center text-white text-sm font-light h-[30px] leading-[30px]">
            移除
          </div>
        </div>
      </div>
      <div class="title-separate">{Data.Name}</div>
      <div class="rating-separate">★ 7.8&nbsp;&nbsp;◉ 103.5万</div>
    </div>
  );
};

export default CollectItem;
