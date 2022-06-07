import { h, FunctionalComponent, Fragment } from "preact";
import FooterBar from "../components/FooterBar";
import SelectionBar from "../components/SelectionBar";

const desArr = [
  { url: "/bookmark", title: "收藏", icon: "" },
  { url: "/book-history", title: "購買", icon: "" },
];

const BookmarkPage: FunctionalComponent = () => {
  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <div class="grow overflow-hidden overflow-y-auto">bookmark</div>
      <FooterBar />
    </>
  );
};

export default BookmarkPage;
