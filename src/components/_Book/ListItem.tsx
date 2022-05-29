import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { Link } from "preact-router";
import Image from "./../_Image/image";

interface BookListItemProps {
    Data: Book
}

const BookListItem: FunctionalComponent<BookListItemProps> = ({ Data }) => {
    const [showPending, setPending] = useState(true);

    return (
        <Link href={"/directory/" + Data.ID} class={"item " + (showPending ? " pending" : "")}>
            <Image path={Data.Cover} alt={Data.Name} setParentPending={setPending} />
            <div class="item-overlay">&nbsp;</div>
            <span class="title">{Data.Name}</span>
            <span class="rating">★ 7.8&nbsp;&nbsp;◉  103.5万</span>
        </Link>
    );
};

export default BookListItem;
