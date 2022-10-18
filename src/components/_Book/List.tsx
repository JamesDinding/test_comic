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
const comicArr = ["123", "234", "345", "456", "567", "678"];

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items,
  type = "original",
  isTemp,
}) => {
  return (
    <div className={`items-box grid grid-cols-${ItemPerRow} gap-2.5 py-4`}>
      {Items?.map((el, i, arr) => {
        return <BookListItem key={i} Data={el} type={type} />;
      })}
    </div>
  );
};

export default BookList;
