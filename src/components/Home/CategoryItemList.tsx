import { h, FunctionalComponent, Fragment } from "preact";
import { route } from "preact-router";
import BookList from "../_Book/List";

interface CategoryItemListProps {
  catID: Number;
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> = ({
  catID,
}) => {
  return (
    <div className="mx-5">
      <BookList
        Items={[{ ID: 123, Cover: "", Name: "" }]}
        ItemPerRow={3}
        type={"separate"}
        isTemp={true}
      />
    </div>
  );
};

export default HomeCategoryItemList;
