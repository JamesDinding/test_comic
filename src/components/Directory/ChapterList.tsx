import { FunctionalComponent, h, Fragment } from "preact";
import ChapterRow from "./ChapterRow";
import Image from "../_Image/image";

const list = new Array(20).fill({ cover: "", episode: 1, isLocked: true });

const ChapterList = () => {
  return (
    <>
      {list.map((list) => {
        return <ChapterRow />;
      })}
    </>
  );
};

export default ChapterList;
