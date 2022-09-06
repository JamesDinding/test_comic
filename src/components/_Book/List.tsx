import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import BookListItem from "./ListItem";

interface BookListProps {
  Items: Array<Book>;
  ItemPerRow: number;
  Rows?: number;
  type?: "separate" | "stack" | "original";
}

const BookList: FunctionalComponent<BookListProps> = ({
  Rows = 3,
  ItemPerRow,
  Items,
  type = "original",
}) => {
  return (
    <div
      class={"items-box grid grid-cols-" + ItemPerRow + " gap-2.5 py-4 px-5"}
    >
      {Items.sort(() => Math.random() - 0.5)
        .slice(0, ItemPerRow * Rows)
        .map((i) => (
          <BookListItem Data={i} type={type} />
        ))}
    </div>
  );
};

export default BookList;
