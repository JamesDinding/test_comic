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
  countRef?: MutableRef<number>;
}

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items = [{}, {}, {}, {}, {}, {}],
  type = "original",
  itemNum = 6,
  isLayoutDiff,
  countRef,
}) => {
  console.log("booklist render");
  const layoutType = useRef(0);
  function generateRandomLayout() {
    return Math.floor(Math.random() * 10) % 5;
  }

  return (
    // <div className={`grid grid-cols-${ItemPerRow} gap-2.5 pt-4 pb-[.8rem]`}>
    <div className={`grid grid-cols-6 gap-2.5 pt-4 pb-[.8rem]`}>
      {Items?.sort(() => Math.random() - 0.5)
        .slice(0, ItemPerRow === 2 ? 4 : itemNum)
        .map((el, i, arr) => {
          if (countRef?.current === i && isLayoutDiff) {
            layoutType.current = [4, 9, 4, 9, 4][generateRandomLayout()];
            countRef.current += layoutType.current;
          }

          return (
            <BookListItem
              key={i}
              Data={el}
              type={type}
              customHeight={ItemPerRow === 2 ? "h-[242px]" : "h-[157px]"}
              ItemPerRow={isLayoutDiff ? layoutType.current : ItemPerRow}
            />
          );
        })}
    </div>
  );
};

export default BookList;
