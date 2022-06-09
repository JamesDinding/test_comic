import { FunctionalComponent, h } from "preact";
import BookList from "../_Book/List";
import RecommendTitleBar from "../Home/RecommendTitleBar";

interface MixRecommendBlockProps {
  BlockID: number;
  BlockName: string;
  Items: Array<Book>;
}

const MixRecommendBlock: FunctionalComponent<MixRecommendBlockProps> = ({
  BlockID,
  BlockName,
  Items,
}) => {
  const firstSlice = Items.slice(0, 4);
  const restSlice = Items.slice(4);

  return (
    <div class="my-3 bg-white">
      <RecommendTitleBar BlockName={BlockName} BlockID={BlockID} />
      <BookList Items={firstSlice} ItemPerRow={2} Rows={2} />
      <BookList Items={restSlice} ItemPerRow={3} Rows={3} />
    </div>
  );
};

export default MixRecommendBlock;
