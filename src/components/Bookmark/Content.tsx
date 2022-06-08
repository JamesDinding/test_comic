import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import BookListItem from "../_Book/ListItem";
import { useWorker } from "../../context/worker";
import EmptyContent from "./EmptyContent";
import Empty from "../Profile/Services/Record/Empty";

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

const Content = () => {
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
    <ul className="py-0 px-[2%]">
      {[].length === 0 && <EmptyContent title="立刻去收藏" />}
      {/* {blocks.map((block, i) => {
        // 先用其他api拿資料
        if (i !== 1) return;
        return block.Items.map((c) => {
          console.log(c);
          return (
            <li className="inline-flex box-border w-[32%] h-[160px] py-[.4rem] px-0">
              <BookListItem Data={c} />
            </li>
          );
        });
      })} */}
    </ul>
  );
};

export default Content;
