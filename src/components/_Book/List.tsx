import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import BookListItem from "./ListItem";

interface BookListProps {
  Items: Array<Book> | undefined;
  ItemPerRow: number;
  Rows?: number;
  type?: "separate" | "stack" | "original";
  isTemp?: boolean;
}
// temp

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items,
  type = "original",
}) => {
  return (
    <div className={`items-box grid grid-cols-${ItemPerRow} gap-2.5 py-4`}>
      {Items?.slice(0, 6).map((el, i, arr) => {
        return <BookListItem key={i} Data={el} type={type} />;
      })}
    </div>
  );
};

export default BookList;
