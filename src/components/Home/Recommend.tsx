import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";
import { getAllBlock } from "../../lib/api";
import { useDomain } from '../../context/domain'

interface BlockNameType {
  ID: number;
  numPerRow: number;
  name:
    | "banner"
    | "吸睛首選"
    | "新書強推"
    | "本週更新"
    | "3D主打"
    | "熱門Cosplay"
    | "私人收藏";
}

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
const block_name: Array<BlockNameType> = [
  { ID: 1234, numPerRow: 1, name: "banner" },
  { ID: 1234, numPerRow: 3, name: "吸睛首選" },
  { ID: 1234, numPerRow: 2, name: "新書強推" },
  { ID: 1234, numPerRow: 3, name: "本週更新" },
  { ID: 1234, numPerRow: 2, name: "3D主打" },
  { ID: 1234, numPerRow: 3, name: "熱門Cosplay" },
  { ID: 1234, numPerRow: 2, name: "私人收藏" },
];

const queryString = block_name.map((b, i, a) => {
  return "type=" + b.name;
});

const qeury_block = queryString.join("&");

const HomeRecommend: FunctionalComponent = () => {
  const {setDomain} = useDomain();
  const [blocks, setBlocks] = useState<RecommendationBlock>({});


  useEffect(() => {
    try {
      (async () => {
        const { data, domain } = await getAllBlock(qeury_block);
        setDomain(domain)
        setBlocks(data);
      })();
    } catch (err: any) {
      console.log(err.message || "failed to get block contents");
    }
  }, []);

  return (
    <div>
      {block_name.map((bn, i, arr) => {
        if (bn.name === "banner") return <Swiper banners={blocks[bn.name]} />;

        return (
          <RecommendBlock
            BlockID={bn.ID}
            BlockName={bn.name}
            Items={blocks[bn.name]}
            ItemPerRow={bn.numPerRow}
          />
        );
      })}
    </div>
  );
};

export default HomeRecommend;
