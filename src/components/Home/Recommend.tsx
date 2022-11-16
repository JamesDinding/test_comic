import { h, FunctionalComponent, Fragment } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";
import { getAllBlock } from "../../lib/api";
import { useDomain } from "../../context/domain";
import SmartBanner from "../SmartBanner";

interface RecommendProps {
  setTc: StateUpdater<string>;
}

const HomeRecommend: FunctionalComponent<RecommendProps> = ({ setTc }) => {
  const { setDomain } = useDomain();
  const [blocks, setBlocks] = useState<RecommendationBlock>({});
  const [blockOrder, setBlockOrder] = useState<
    { id: number; name: string; count: number }[]
  >([{ id: 1, name: "banner", count: 1 }]);

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
      {/* {blockOrder.map((bn, i, arr) => { */}
      {blockOrder.map((bn, i, arr) => {
        if (bn.name === "banner")
          return <Swiper key={i} banners={blocks[bn.name]} />;

        return (
          <Fragment>
            <RecommendBlock
              key={i}
              BlockID={bn.id}
              BlockName={bn.name}
              Items={blocks[bn.name as keyof typeof blocks]}
              ItemPerRow={bn.count}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export default HomeRecommend;
