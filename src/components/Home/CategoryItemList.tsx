import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import BookList from "../_Book/List";
import { getSpecifiedCategory } from "../../lib/api";

interface CategoryItemListProps {
  catID: Number;
}

const HomeCategoryItemList: FunctionalComponent<CategoryItemListProps> = ({
  catID,
}) => {
  const [content, setContent] = useState<Book[]>();

  useEffect(() => {
    try {
      (async () => {
        const { data } = await getSpecifiedCategory(catID.toString());
        console.log(data);
        setContent(data);
      })();
    } catch (err: any) {
      console.log(err.message || "failed");
    }
  }, [catID]);

  return (
    <div className="mx-5">
      <BookList
        Items={content}
        ItemPerRow={3}
        type={"separate"}
        isTemp={true}
        itemNum={30}
      />
    </div>
  );
};

export default HomeCategoryItemList;
