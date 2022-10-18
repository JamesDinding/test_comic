import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import BookList from "../_Book/List";
import Image from "../_Image/image";

type slider = null | undefined | HTMLElement;

interface SwiperProps {
  banners: Array<Book> | undefined;
}

const recommendationBlocks = [
  1, 2, 10077, 10078, 10079, 10080, 10081, 10082, 10083, 10084,
];

const recommendationBlocksItemPerRow: {
  [index: number]: number;
} = {
  1: 0,
  2: 3,
  10077: 2,
  10078: 3,
  10079: 2,
  10080: 3,
  10081: 2,
  10082: 3,
  10083: 2,
  10084: 3,
};

const positionList = [
  "translate-x-[-100%] ",
  "translate-x-[0%] ",
  "translate-x-[100%] ",
];
let timer: null | ReturnType<typeof setTimeout> = null;
let swiperLen = 0;

// 只需要x軸
let touchStartPosition = 0;

let cur: slider = null;
let next: slider = null;
let prev: slider = null;

// let touchOffset = 0;
let cur_test = 0;

const Swiper: FunctionalComponent<SwiperProps> = ({ banners }) => {
  // blocks[0]，可以拿到輪播要用的圖片
  const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);
  const [showPending, setPending] = useState(true);
  const [isTouching, setIsTouching] = useState(false);
  const [touchOffset, setTouchOffset] = useState(0);
  const [curSlide, setCurSlide] = useState(0);
  const [transList, setTransList] = useState<Array<string>>([
    "translate-x-[0%] ",
  ]);

  useEffect(() => {
    (() => {
      // (async () => {
      // let res = await send({
      //   action: "Get",
      //   data: {
      //     url:
      //       "/api/v1/content/recommendations?blkID=" +
      //       recommendationBlocks.join(","),
      //   },
      // });
      if (banners) {
        swiperLen = banners.length;
        const temp = new Array(swiperLen).fill(
          "translate-x-[100%] ",
          1,
          swiperLen - 1
        );
        temp[swiperLen - 1] = "translate-x-[-100%] ";
        temp[0] = "translate-x-[0%] ";
        setTransList(temp);
      }
    })();
  }, []);

  // 輪播圖
  useEffect(() => {
    if (isTouching) return;
    timer && clearTimeout(timer);
    timer = setTimeout(() => nextSlide(), 5000);
    // gotoSlide(curSlide);
  });

  const touchStartHandler = (e: TouchEvent) => {
    setIsTouching(true);

    timer && clearTimeout(timer);

    touchStartPosition = e.touches[0].clientX;

    const t = e.target as Element;
    const container = t.closest("div");
    cur = container?.querySelector(".current");
    next = container?.querySelector(".next");
    prev = container?.querySelector(".prev");
  };

  const touchMovingHandler = (e: TouchEvent) => {
    setTouchOffset(e.touches[0].clientX - touchStartPosition);

    cur?.classList.remove("duration-300");
    next?.classList.remove("duration-300");
    prev?.classList.remove("duration-300");

    if (cur) cur.style.transform = `translateX(${Math.floor(touchOffset)}px)`;
    if (next)
      next.style.transform = `translateX(calc(100% + ${Math.floor(
        touchOffset
      )}px))`;
    if (prev)
      prev.style.transform = `translateX(calc(-100% + ${Math.floor(
        touchOffset
      )}px))`;
  };

  const touchEndHandler = (e: TouchEvent) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => nextSlide(), 5000);

    if (cur) cur.style.transform = "";
    if (next) next.style.transform = "";
    if (prev) prev.style.transform = "";

    touchOffset < 0 && nextSlide();
    if (touchOffset > 0) prevSlide();

    setIsTouching(false);
  };

  function nextSlide() {
    const isEnd = curSlide === swiperLen - 1;
    gotoSlide(isEnd ? 0 : curSlide + 1);
    isEnd ? setCurSlide(0) : setCurSlide((prev) => prev + 1);
  }

  function prevSlide() {
    const isFirst = curSlide - 1 === -1;
    if (isFirst) {
      gotoSlide(swiperLen - 1, true);
      setCurSlide(swiperLen - 1);
    } else {
      gotoSlide(curSlide - 1, true);
      setCurSlide((prev) => prev - 1);
    }
  }

  function gotoSlide(target: number, isBackward?: boolean) {
    let tempList = transList;
    // 往前要給duration的元件是不同的，所以寫了一個if
    if (isBackward) {
      transList.forEach((_, i) => {
        tempList[i] = positionList[2];
        if (i === target + 1)
          tempList[i] = positionList[2] + "duration-300 next";
        if (i === target)
          tempList[i] = positionList[1] + "duration-300 current";
        if (i === target - 1) tempList[i] = positionList[0] + "prev";
      });
      if (target + 1 === swiperLen)
        tempList[0] = positionList[2] + "duration-300 next";
      if (target - 1 === -1) tempList[swiperLen - 1] = positionList[0] + "prev";
      setTransList(tempList);
      return;
    }

    transList.forEach((_, i) => {
      tempList[i] = positionList[2];
      if (i === target + 1) tempList[i] = positionList[2] + "duration-300 next";
      if (i === target) tempList[i] = positionList[1] + "duration-300 current";
      if (i === target - 1) tempList[i] = positionList[0] + "duration-300 prev";
    });
    if (target + 1 === swiperLen) tempList[0] = positionList[2] + "next";
    if (target - 1 === -1) tempList[swiperLen - 1] = positionList[0] + "prev";
    setTransList(tempList);
  }
  console.log(banners);

  return (
    <div className="w-full min-h-[190px]">
      <div
        id="carousel"
        className="w-full min-h-[190px] relative overflow-hidden whitespace-nowrap"
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onTouchMove={touchMovingHandler}
      >
        {banners?.map((banner, i) => {
          // if (blk.ID !== 1) return;
          // return blk.Items.map((b, i) => {
          return (
            <a
              href={"/directory/" + banner.ID}
              className={`block w-full absolute ${transList[i]}`}
            >
              <div>
                <Image
                  path={banner.Cover || banner.covers?.thumb || ""}
                  alt={""}
                  setParentPending={setPending}
                />
              </div>
            </a>
          );
        })}
        <ul className="absolute flex bottom-4 left-1/2 translate-x-[-50%] min-w-1/2 z-10">
          {banners?.map((b, i) => {
            // if (blk.ID !== 1) return;
            // return blk.Items.map((_, i) => {
            const bgColor = curSlide === i ? "bg-amber-300" : "bg-slate-300";
            return (
              <li>
                <div
                  className={`h-2.5 w-2.5 mx-1 rounded-full ${bgColor}`}
                ></div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Swiper;
