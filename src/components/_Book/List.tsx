import { h, FunctionalComponent } from "preact";
import { Link } from "preact-router";
import BookListItem from "./ListItem";

interface BookListProps {
    Items: Array<Book>
    ItemPerRow: number
}

const BookList: FunctionalComponent<BookListProps> = ({ ItemPerRow, Items }) => {
    return (
        <div class={"items-box grid grid-cols-" + ItemPerRow + " gap-2 p-2"}>
            {
                Items
                    .sort(() => Math.random() - 0.5)
                    .slice(0, ItemPerRow * 3)
                    .map(i => <BookListItem Data={i} />)
            }
        </div>
    );
};

export default BookList;
