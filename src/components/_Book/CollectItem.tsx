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
    <Link href={"/directory/" + Data.ID} class={"item-separate "}>
      <div class="relative h-[157px] rounded-lg overflow-hidden">
        <div
          className={
            "duration-300 " + (isLongPress ? "translate-y-[-30px]" : '"')
          }
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
            if (isLongPress) return;
            route("/directory/1234");
          }}
        >
          {/* <div className={showPending ? "z-[20] pending h-[157px]" : ""}> */}
          <div
            className={showPending ? "z-[20]  h-[157px] overflow-hidden" : ""}
          >
            {/* <Image
              path={Data.Cover}
              alt={Data.Name}
              setParentPending={setPending}
            /> */}
            <img src="/assets/img/test/Image.png" className="" />
          </div>
          <div className="z-[30] bg-[#ff978d] text-center text-white text-sm font-light h-[30px] leading-[30px]">
            移除
          </div>
        </div>
      </div>
      <div class="title-separate">{Data.Name}</div>
      <div class="rating-separate">★ 7.8&nbsp;&nbsp;◉ 103.5万</div>
    </Link>
  );
};

export default CollectItem;
