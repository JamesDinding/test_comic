import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";

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

// temp_book name
const temp_book_name = [
  "吸睛首選",
  "新書強推",
  "本週更新",
  "3D主打",
  "熱門Cosplay",
  "私人收藏",
];

const HomeRecommend: FunctionalComponent = () => {
  const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);
  // temp
  const [tempBlocks, setTempBlocks] = useState([
    { ID: 1, Name: "吸睛首選", Items: [{ ID: 123, Cover: "", Name: "" }] },
    { ID: 2, Name: "新書強推", Items: [{ ID: 123, Cover: "", Name: "" }] },
    { ID: 10077, Name: "本週更新", Items: [{ ID: 123, Cover: "", Name: "" }] },
    { ID: 10078, Name: "3D主打", Items: [{ ID: 123, Cover: "", Name: "" }] },
    {
      ID: 10079,
      Name: "熱門Cosplay",
      Items: [{ ID: 123, Cover: "", Name: "" }],
    },
    { ID: 10080, Name: "私人收藏", Items: [{ ID: 123, Cover: "", Name: "" }] },
  ]);

  useEffect(() => {
    // (async () => {
    //   let res = await send({
    //     action: "Get",
    //     data: {
    //       url:
    //         "/api/v1/content/recommendations?blkID=" +
    //         recommendationBlocks.join(","),
    //     },
    //   });
    //   if (res.blocks !== undefined) {
    //     setBlocks(res.blocks);
    //   }
    // })();
  }, []);

  return (
    <div>
      {tempBlocks.map((blk) => {
        if (blk.ID == 1) return <Swiper />;
        return (
          <>
            <RecommendBlock
              BlockID={blk.ID}
              BlockName={blk.Name}
              Items={blk.Items}
              ItemPerRow={recommendationBlocksItemPerRow[blk.ID]}
            />
          </>
        );
      })}
    </div>
  );
};

export default HomeRecommend;
