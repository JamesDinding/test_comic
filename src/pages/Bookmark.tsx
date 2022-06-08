import { h, FunctionalComponent, Fragment } from "preact";
import { MutableRef, useRef } from "preact/hooks";
import FooterBar from "../components/FooterBar";
import SelectionBar from "../components/SelectionBar";
import Content from "../components/Bookmark/Content";
import { ObserverProvider } from "../context/observer";

const desArr = [
  { url: "/bookmark", title: "收藏", icon: "" },
  { url: "/book-history", title: "購買", icon: "" },
];

const BookmarkPage: FunctionalComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <SelectionBar destinationArr={desArr} />
      <div class="grow overflow-hidden overflow-y-auto" ref={containerRef}>
        <ObserverProvider rootElement={containerRef}>
          <Content />
        </ObserverProvider>
      </div>
      <FooterBar />
    </>
  );
};

export default BookmarkPage;
