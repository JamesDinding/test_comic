import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { useWorker } from "../../context/worker";
import BookList from "../_Book/List";
import Image from "../_Image/image";

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
  "translate-x-[-100%]",
  "translate-x-[0%]",
  "translate-x-[100%]",
];
let timer: null | ReturnType<typeof setTimeout> = null;
let swiperLen = 0;

const Swiper: FunctionalComponent = () => {
  const { send } = useWorker();
  // blocks[0]，可以拿到輪播要用的圖片
  const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);
  const [showPending, setPending] = useState(true);
  const [curSlide, setCurSlide] = useState(1);
  const [transList, setTransList] = useState<Array<position>>([
    "translate-x-[0%]",
  ]);

  useEffect(() => {
    (async () => {
      let res = await send({
        action: "Get",
        data: {
          url:
            "/api/v1/content/recommendations?blkID=" +
            recommendationBlocks.join(","),
        },
      });

      if (res.blocks !== undefined) {
        setBlocks(res.blocks);

        swiperLen = res.blocks[0].Items.length;
        const temp = new Array(swiperLen).fill("translate-x-[100%]", 2);
        temp[0] = "translate-x-[-100%]";
        temp[1] = "translate-x-[0%]";
        setTransList(temp);
      }
    })();
  }, [send]);

  // 輪播圖
  useEffect(() => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      nextSlide();
    }, 3000);
  });

  function nextSlide() {
    curSlide === swiperLen - 1
      ? setCurSlide(0)
      : setCurSlide((prev) => prev + 1);
  }

  function prevSlide() {
    curSlide === 0
      ? setCurSlide(swiperLen - 1)
      : setCurSlide((prev) => prev - 1);
  }

  function gotoSlide(target: number) {
    const order = target - curSlide;
    let tempList = transList;
    transList.forEach((trans, i) => {
      switch (trans.split(" ")[0]) {
        case "translate-x-[-100%]":
          tempList[i] = positionList[2];
          break;
        case "translate-x-[0%]":
          tempList[i] = positionList[0] + " duration-300";
          break;
        case "translate-x-[100%]":
          tempList[i] = positionList[1] + " duration-300";
          break;
      }
    });
    setTransList(tempList);
  }

  gotoSlide(curSlide);

  return (
    <div className="w-full min-h-[300px]">
      <div className="w-full min-h-[300px] relative overflow-hidden whitespace-nowrap">
        {blocks.map((blk) => {
          if (blk.ID !== 1) return;
          return blk.Items.map((b, i) => {
            return (
              <a
                href={"/directory/" + b.ID}
                className={`block w-full absolute ${transList[i]}`}
              >
                <Image
                  path={b.Cover}
                  alt={b.Name}
                  setParentPending={setPending}
                />
              </a>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Swiper;
