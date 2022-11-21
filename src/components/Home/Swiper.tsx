import { FunctionalComponent, h } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useDomain } from "../../context/domain";
import CustomLink from "../CustomLink";
import Image from "../_Image/image";

type slider = null | undefined | HTMLElement;

interface SwiperProps {
  banners: Array<Book> | undefined;
}

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

interface SwiperItemProps {
  bannerId: number;
  translateOffset: string;
  imgPath: string;
}

const SwiperItem: FunctionalComponent<SwiperItemProps> = ({
  bannerId,
  translateOffset,
  imgPath,
}) => {
  const [isPending, setIsPending] = useState(true);

  return (
    <CustomLink
      href={"/directory/" + bannerId}
      className={`block w-full h-full absolute ${translateOffset}`}
    >
      <div className={"relative h-full " + (isPending ? "pending" : "")}>
        <Image
          path={imgPath || ""}
          alt={""}
          setParentPending={setIsPending}
          escapeObserve={true}
        />
      </div>
    </CustomLink>
  );
};

const Swiper: FunctionalComponent<SwiperProps> = ({ banners }) => {
  // prettier-ignore
  // const [imageBlobList, setImageBlobList] = useState<Array<string>>(JSON.parse(localStorage.getItem("swiper") || '{"temp":[]}')?.temp || []);
  const [isPending, setIsPending] = useState(true)

  const [isTouching, setIsTouching] = useState(false);
  const [touchOffset, setTouchOffset] = useState(0);
  const [curSlide, setCurSlide] = useState(0);
  const [transList, setTransList] = useState<Array<string>>([
    "translate-x-[0%] ",
    "translate-x-[100%] ",
    "translate-x-[100%] ",
    "translate-x-[100%] ",
    "translate-x-[-100%] ",
  ]);

  useEffect(() => {
    (() => {
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
  }, [banners]);

  // 輪播圖
  useEffect(() => {
    if (isTouching) return;
    timer && clearTimeout(timer);
    timer = setTimeout(() => nextSlide(), 5000);

    return () => timer && clearTimeout(timer);
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

  return (
    <div className="w-full h-[190px] pb-[.8rem]">
      <div
        id="carousel"
        className="w-full h-full relative overflow-hidden whitespace-nowrap"
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onTouchMove={touchMovingHandler}
      >
        {banners?.map((banner: any, i: number) => {
          return (
            <SwiperItem
              key={i}
              bannerId={banner.id}
              translateOffset={transList[i]}
              imgPath={banner.covers.thumbx}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Swiper;
