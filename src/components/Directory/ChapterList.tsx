import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChapterItem from "../_Book/ChapterItem";

const ChapterList: FunctionalComponent<Array<ChapterData>> = (chapterList) => {
  return (
    <>
      <div className="chapter-title mb-2.5">章節</div>
      <div className="grid grid-cols-3 gap-2.5 justify-between">
        {chpaterList?.map((chapter) => {
          return <ChapterItem chapter={chapter} />;
        })}
      </div>
    </>
  );
};

export default ChapterList;
