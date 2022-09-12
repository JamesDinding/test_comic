import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChapterItem from "./ChapterItem";
import { useWorker } from "../../context/worker";

const ChapterList = () => {
  const [fakeData, setFakeData] = useState<Array<ChapterData> | null>(null);
  const [isPending, setIsPending] = useState(true);
  const { send } = useWorker();

  useEffect(() => {
    const fakePromise = new Promise<Array<ChapterData>>((resolve, reject) => {
      setTimeout(() => {
        let temp = new Array(4).fill(
          {
            cover: "temp",
            episode: 2,
            isLocked: true,
          },
          1
        );

        temp[0] = {
          cover: "temp",
          episode: 1,
          isLocked: false,
        };
        resolve(temp);
      }, 3000);
    });

    fakePromise.then((res) => {
      setFakeData(res);
      setIsPending(false);
    });
  }, []);

  return (
    <>
      <div className="chapter-title mb-2.5">章節</div>
      <div className="grid grid-cols-3 gap-2.5 justify-between">
        {!isPending &&
          fakeData?.map((list) => {
            return <ChapterItem chapter={list} />;
          })}
      </div>
    </>
  );
};

export default ChapterList;
