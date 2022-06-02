import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import ChapterRow from "./ChapterRow";

const list = new Array(20).fill({ cover: "", episode: 1, isLocked: true });

interface ChapterData {
  cover: string;
  episode: number;
  isLocked: boolean;
}

const ChapterList = () => {
  const [fakeData, setFakeData] = useState<Array<ChapterData> | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fakePromise = new Promise<Array<ChapterData>>((resolve, reject) => {
      setTimeout(() => {
        let temp = new Array(100).fill(
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
      {!isPending &&
        fakeData?.map((list) => {
          return <ChapterRow chapter={list} />;
        })}
    </>
  );
};

export default ChapterList;
