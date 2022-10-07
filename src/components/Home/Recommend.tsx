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
  0: 0,
  1: 3,
  2: 2,
  10077: 3,
  10078: 2,
  10079: 3,
  10080: 2,
  10081: 3,
  10082: 2,
  10083: 3,
  10084: 2,
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
    { ID: 0, Name: "論波圖", Items: [{ ID: 123, Cover: "", Name: "" }] },
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

  const [tempBanner, setTempBanner] = useState<{ Cover: string; ID: number }[]>(
    []
  );

  useEffect(() => {
    // fetch("/api/v1/contents/all")
    //   .then((res) => {
    //     if (!res.ok) throw new Error("no good");
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data.banners);
    //     setTempBanner(data.banners);
    //   })
    //   .catch((err) => {
    //     console.log(err.message || "error happened when fetch banner");
    //   });
  }, []);

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

  console.log(tempBanner, "tempBanners");

  return (
    <div>
      {tempBlocks.map((blk) => {
        if (blk.ID == 0) return <Swiper banners={tempBanner} />;
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
