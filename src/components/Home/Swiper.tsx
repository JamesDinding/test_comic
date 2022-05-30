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

const Swiper: FunctionalComponent = () => {
  const { send } = useWorker();
  // blocks[0]，可以拿到輪播要用的圖片
  const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);
  const [showPending, setPending] = useState(true);

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
      }
    })();
  }, [send]);

  console.log(blocks);

  return (
    <div>
      <div>
        <div>
          {blocks.map((blk) => {
            if (blk.ID !== 1) return;
            return blk.Items.map((b) => {
              return (
                <Image
                  path={b.Cover}
                  alt={b.Name}
                  setParentPending={setPending}
                />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default Swiper;
