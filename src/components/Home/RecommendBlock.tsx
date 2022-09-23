import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import RecommendTitleBar from "./RecommendTitleBar";
import BookList from "../_Book/List";

interface RecommendBlockProps {
  BlockID: number;
  BlockName: string;
  ItemPerRow: number;
  Items: Array<Book>;
}

const RecommendBlock: FunctionalComponent<RecommendBlockProps> = ({
  BlockID,
  BlockName,
  Items,
  ItemPerRow,
}) => {
  return (
    <div class="items my-3 mx-5">
      <RecommendTitleBar BlockName={BlockName} BlockID={BlockID} />
      <BookList
        Items={Items}
        ItemPerRow={ItemPerRow}
        type={ItemPerRow === 2 ? "stack" : "separate"}
        isTemp={true}
      />
    </div>
  );
};

export default RecommendBlock;
