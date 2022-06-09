import { h, FunctionalComponent, Fragment } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";
import FooterBar from "../../components/FooterBar";
import SelectionBar from "../../components/SelectionBar";
import Content from "../../components/Bookmark/Content";
import MixRecommendBlock from "../../components/Bookmark/MixRecommendBlock";
import { useWorker } from "../../context/worker";
import { ObserverProvider } from "../../context/observer";

const desArr = [
  { url: "/bookmark", title: "收藏", icon: "" },
  { url: "/book-history", title: "購買", icon: "" },
];

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

const BookPurchasePage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { send } = useWorker();
  const [blocks, setBlocks] = useState<Array<RecommendationBlock>>([]);

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

  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <div
        class="grow overflow-hidden overflow-y-auto bg-[#efefef]"
        ref={containerRef}
      >
        <ObserverProvider rootElement={containerRef}>
          <Content />
          {/* <MixRecommendBlock /> 先用其他api，所以寫法先用下面的 */}
          {blocks.map((block) => {
            if (block.ID !== 2) return;
            return (
              <MixRecommendBlock
                BlockName={block.Name}
                BlockID={block.ID}
                Items={block.Items}
              />
            );
          })}
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default BookPurchasePage;
