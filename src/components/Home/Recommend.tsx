import { h, FunctionalComponent, Fragment } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import RecommendBlock from "./RecommendBlock";
import Swiper from "./Swiper";
import { getAllBlock } from "../../lib/api";
import { useDomain } from "../../context/domain";
import { useRouter } from "../../context/router";

interface RecommendProps {
  setTc: StateUpdater<string>;
}

let initial = true;
let local_blocks = {};
let local_block_order: { id: number; name: string; count: number }[] = [];

const HomeRecommend: FunctionalComponent<RecommendProps> = ({ setTc }) => {
  const { setDomain } = useDomain();
  const { tempData, setTempData } = useRouter();
  const [blocks, setBlocks] = useState<RecommendationBlock>({});
  const [blockOrder, setBlockOrder] = useState<
    { id: number; name: string; count: number }[]
  >([{ id: 1, name: "banner", count: 1 }]);

  useEffect(() => {
    if (!initial) {
      setBlockOrder(local_block_order);
      setBlocks(local_blocks);
      return () => {
        setTempData((prev: any) => {
          let temp = { ...prev };
          if (!temp) temp = {};
          temp.HomePage = {
            container_height:
              document.querySelector("#home-section")?.clientHeight,
            scroll_height:
              document.querySelector("#category-scroll")?.scrollTop || 0,
          };
          return temp;
        });
      };
    }

    try {
      (async () => {
        const { data, domain, referrer, ordering } = await getAllBlock();
        let temp: any = {};
        ordering.map((bn: { id: number; name: string; count: number }) => {
          if (bn.name === "banner") {
            temp[bn.name] = data[bn.name];
          }

          temp[bn.name] = data[bn.name]?.sort(() => Math.random() - 0.5);
        });
        setDomain(domain);
        setBlocks(temp);
        setBlockOrder(ordering);
        local_block_order = ordering;
        local_blocks = temp;
        setTc(referrer.toString() || "");
        initial = false;
      })();
    } catch (err: any) {
      console.error(err.message || "failed to get block contents");
    }

    return () => {
      setTempData((prev: any) => {
        let temp = { ...prev };
        if (!temp) temp = {};
        temp.HomePage = {
          container_height:
            document.querySelector("#home-section")?.clientHeight,
          scroll_height:
            document.querySelector("#category-scroll")?.scrollTop || 0,
        };

        return temp;
      });
    };
  }, []);

  useEffect(() => {
    if (!tempData?.HomePage) return;
    const t = document.querySelector("#home-section") as HTMLDivElement;
    const s = document.querySelector("#category-scroll") as HTMLDivElement;

    const containerHeight = tempData.HomePage?.container_height;
    const scrollHeight = tempData.HomePage?.scroll_height;

    if (containerHeight && t) {
      t.style.minHeight = containerHeight + "px";
    }
    if (scrollHeight && s) {
      s.scrollTo(0, parseInt(scrollHeight, 10));
      s.scrollTop = parseInt(scrollHeight, 10);

      const timer = setTimeout(() => {
        s.scrollTo(0, parseInt(scrollHeight, 10));
        s.scrollTop = parseInt(scrollHeight, 10);
        clearTimeout(timer);
      }, 0);
      t.style.minHeight = "";
    }
  }, [tempData]);

  return (
    <div id="home-section" className="w-full overflow-hidden">
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
