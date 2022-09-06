import { h, FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { Link } from "preact-router";
import Image from "./../_Image/image";

interface BookListItemProps {
  Data: Book;
  type?: "separate" | "stack" | "original";
}

const BookListItem: FunctionalComponent<BookListItemProps> = ({
  Data,
  type = "original",
}) => {
  const [showPending, setPending] = useState(true);

  // cover and title is separated
  if (type === "separate")
    return (
      <Link
        href={"/directory/" + Data.ID}
        class={"item-separte " + (showPending ? " pending" : "")}
      >
        <div class="relative">
          <div class="bottom-4 tag">{"連載"}</div>
          <div class="bottom-4 tag-decoration"></div>
          <Image
            path={Data.Cover}
            alt={Data.Name}
            setParentPending={setPending}
          />
        </div>
        <span class="title-separate">{Data.Name}</span>
        <span class="rating-separate">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
      </Link>
    );

  // cover and title is stacked ，image 應該要 z-index: 5或6 ?
  if (type === "stack")
    return (
      <Link
        href={"/directory/" + Data.ID}
        class={"relative item " + (showPending ? " pending" : "")}
      >
        <Image
          path={Data.Cover}
          alt={Data.Name}
          setParentPending={setPending}
        />
        <div class="bottom-[3.25rem] tag">{"連載"}</div>
        <div class="bottom-[3.25rem] tag-decoration"></div>
        <div class="item-overlay z-[5]">&nbsp;</div>
        <span class="title z-10">{Data.Name}</span>
        <span class="rating z-10">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
      </Link>
    );

  // default return
  return (
    <Link
      href={"/directory/" + Data.ID}
      class={"item " + (showPending ? " pending" : "")}
    >
      <Image path={Data.Cover} alt={Data.Name} setParentPending={setPending} />
      <div class="item-overlay">&nbsp;</div>
      <span class="title">{Data.Name}</span>
      <span class="rating">★ 7.8&nbsp;&nbsp;◉ 103.5万</span>
    </Link>
  );
};

export default BookListItem;
