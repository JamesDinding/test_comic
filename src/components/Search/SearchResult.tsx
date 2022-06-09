import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useWorker } from "../../context/worker";
import BookList from "../_Book/List";
import EndBottom from "../EndBottom";

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

// props 應該要傳入 url
const SearchResult = () => {
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
    <div class="my-2 bg-white">
      {/* <BookList Items={blocks.slice(0, 4)} ItemPerRow={2} Rows={2} />
      <BookList
        Items={blocks.slice(4)}
        ItemPerRow={3} />
        Rows={Math.ceil((blocks.length - 4) / 3)} */}
      {/* 先用其他api頂替，寫法先改為下方 */}
      {blocks.map((block) => {
        if (block.ID !== 2) return;
        const firstSlice = block.Items.slice(0, 4);
        const restSlice = block.Items.slice(4);
        return (
          <>
            <BookList ItemPerRow={2} Rows={2} Items={firstSlice} />
            <BookList
              Items={restSlice}
              ItemPerRow={3}
              Rows={Math.ceil(restSlice.length / 3)}
            />
          </>
        );
      })}
      <EndBottom />
    </div>
  );
};

export default SearchResult;
