import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import BookListItem from "./ListItem";

interface BookListProps {
  Items: Array<Book>;
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
  if (isTemp) {
    return (
      <div className={`items-box grid grid-cols-${ItemPerRow} gap-2.5 py-4`}>
        {comicArr.map((el, i, arr) => {
          return (
            <BookListItem
              Data={{ ID: 12345, Cover: "", Name: "test" }}
              type={type}
            />
          );
        })}
      </div>
    );
  }

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
