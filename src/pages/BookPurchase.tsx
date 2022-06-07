import { FunctionalComponent, h, Fragment } from "preact";
import FooterBar from "../components/FooterBar";
import SelectionBar from "../components/SelectionBar";

const desArr = [
  { url: "/bookmark", title: "收藏", icon: "" },
  { url: "/book-history", title: "購買", icon: "" },
];

const BookPurchasePage: FunctionalComponent = () => {
  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <div className="grow">content</div>
      <FooterBar />
    </>
  );
};

export default BookPurchasePage;
