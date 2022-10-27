import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";
import { getAllBlock } from "../../lib/api";
import { useDomain } from "../../context/domain";

interface RecommendProps {
  setTc: StateUpdater<string>;
}

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
