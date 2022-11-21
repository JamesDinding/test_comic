import { h, FunctionalComponent } from "preact";
import { MutableRef, useRef } from "preact/hooks";
import BookListItem from "./ListItem";

interface BookListProps {
  Items: Array<Book> | undefined;
  ItemPerRow: number;
  Rows?: number;
  type?: "separate" | "stack" | "original";
  isTemp?: boolean;
  itemNum?: number;
  isLayoutDiff?: boolean;
  catID?: number;
}

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items = [{}, {}, {}, {}, {}, {}],
  type = "original",
  itemNum = 9,
  isLayoutDiff,
  catID = 0,
}) => {
  return (
    // <div className={`grid grid-cols-${ItemPerRow} gap-2.5 pt-4 pb-[.8rem]`}>
    <div className={`grid grid-cols-6 gap-2.5 pt-4 pb-[.8rem]`}>
      {Items.slice(0, ItemPerRow === 2 ? 6 : itemNum).map((el, i, arr) => {
        let layout = i % 13 < 4 ? 4 : 9;

        return (
          <BookListItem
            key={i}
            Data={el}
            type={type}
            customHeight={ItemPerRow === 2 ? "h-[242px]" : "h-[157px]"}
            ItemPerRow={isLayoutDiff ? layout : ItemPerRow}
            catID={catID}
          />
        );
      })}
    </div>
  );
};

export default BookList;
