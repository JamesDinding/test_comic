import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChapterItem from "../_Book/ChapterItem";

const ChapterList: FunctionalComponent<ChapterList> = ({ chapterList }) => {
  return (
    <>
      <div className="chapter-title mb-2.5">章節</div>
      <div className="grid grid-cols-3 gap-2.5 justify-between">
        {chapterList?.map((l) => {
          return <ChapterItem chapter={l} />;
        })}
      </div>
    </>
  );
};

export default ChapterList;
