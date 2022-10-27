import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";
import { getAllBlock } from "../../lib/api";
import { useDomain } from "../../context/domain";

interface BlockNameType {
  ID: number;
  numPerRow: number;
  name:
    | "banner"
    | "吸精首选"
    | "新书强推"
    | "本周更新"
    | "3D主打"
    | "热门cosplay"
    | "私人收藏";
}

interface RecommendProps {
  setTc: StateUpdater<string>;
}

// temp_book name
const block_name: Array<BlockNameType> = [
  { ID: 1234, numPerRow: 1, name: "banner" },
  { ID: 1234, numPerRow: 3, name: "吸精首选" },
  { ID: 1234, numPerRow: 2, name: "新书强推" },
  { ID: 1234, numPerRow: 3, name: "本周更新" },
  { ID: 1234, numPerRow: 2, name: "3D主打" },
  { ID: 1234, numPerRow: 3, name: "热门cosplay" },
  { ID: 1234, numPerRow: 2, name: "私人收藏" },
];

const queryString = block_name.map((b, i, a) => {
  return "type=" + b.name;
});

const HomeRecommend: FunctionalComponent<RecommendProps> = ({ setTc }) => {
  const { setDomain } = useDomain();
  const [blocks, setBlocks] = useState<RecommendationBlock>({});
  const [blockOrder, setBlockOrder] = useState<
    { name: string; count: number }[]
  >([]);

  useEffect(() => {
    try {
      (async () => {
        const { data, domain, referrer, ordering } = await getAllBlock();
        setDomain(domain);
        setBlocks(data);
        setBlockOrder(ordering);
        setTc(referrer.toString() || "");
      })();
    } catch (err: any) {
      console.error(err.message || "failed to get block contents");
    }
  }, []);

  return (
    <div>
      {blockOrder.map((bn, i, arr) => {
        if (bn.name === "banner")
          return <Swiper key={i} banners={blocks[bn.name]} />;

        return (
          <RecommendBlock
            key={i}
            BlockName={bn.name}
            Items={blocks[bn.name as keyof typeof blocks]}
            ItemPerRow={bn.count}
          />
        );
      })}
    </div>
  );
};

export default HomeRecommend;
