import { h, FunctionalComponent } from "preact";
import BookListItem from "./ListItem";

interface BookListProps {
  Items: Array<Book> | undefined;
  ItemPerRow: number;
  Rows?: number;
  type?: "separate" | "stack" | "original";
  isTemp?: boolean;
  itemNum?: number;
}

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items = [{}, {}, {}, {}, {}, {}],
  type = "original",
  itemNum = 6,
}) => {
  return (
    <div className={`grid grid-cols-${ItemPerRow} gap-2.5 pt-4 pb-[.8rem]`}>
      {Items?.slice(0, ItemPerRow === 2 ? 4 : itemNum).map((el, i, arr) => {
        return (
          <BookListItem
            key={i}
            Data={el}
            type={type}
            customHeight={ItemPerRow === 2 ? "h-[242px]" : "h-[157px]"}
          />
        );
      })}
    </div>
  );
};

export default BookList;
