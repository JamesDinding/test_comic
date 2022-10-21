import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChapterItem from "../_Book/ChapterItem";

const ChapterList: FunctionalComponent<ChapterList> = ({
  chapterList,
  bookId = 0,
}) => {
  return (
    <>
      <div className="chapter-title mb-2.5">章节</div>
      <div className="grid grid-cols-3 gap-2.5 justify-between">
        {chapterList?.map((c) => {
          return <ChapterItem chapter={c} bookId={bookId} />;
        })}
      </div>
    </>
  );
};

export default ChapterList;
