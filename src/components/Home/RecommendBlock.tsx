import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import { useEffect } from "preact/hooks";
import RecommendTitleBar from "./RecommendTitleBar";
import BookList from "../_Book/List";

interface RecommendBlockProps {
  BlockID?: number;
  BlockName: string;
  ItemPerRow: number;
  Items: Array<Book> | undefined;
}

const RecommendBlock: FunctionalComponent<RecommendBlockProps> = ({
  BlockName,
  Items,
  ItemPerRow,
}) => {
  return (
    <div class="items mt-[1.2rem] mx-5">
      <RecommendTitleBar BlockName={BlockName} />
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
