import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect, StateUpdater } from "preact/hooks";
import RecommendTitleBar from "./RecommendTitleBar";
import BookList from "../_Book/List";

interface RecommendBlockProps {
  BlockID: number;
  BlockName: string;
  ItemPerRow: number;
  Items: Array<Book> | undefined;
  onShowMore: StateUpdater<boolean>;
  setMoreBlockId: StateUpdater<number>;
}

const RecommendBlock: FunctionalComponent<RecommendBlockProps> = ({
  BlockName,
  Items,
  ItemPerRow,
  BlockID,
  onShowMore,
  setMoreBlockId,
}) => {
  return (
    <div class="items mt-[1.2rem] mx-5">
      <RecommendTitleBar
        BlockName={BlockName}
        BlockID={BlockID}
        onShowMore={onShowMore}
        setMoreBlockId={setMoreBlockId}
      />
      <BookList
        Items={Items}
        ItemPerRow={ItemPerRow}
        type={"separate"}
        isTemp={true}
      />
    </div>
  );
};

export default RecommendBlock;
