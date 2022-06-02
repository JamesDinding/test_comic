import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import IconCollect from "../../resources/img/dir-collect.svg";
import { useWorker } from "../../context/worker";
import Image from "../_Image/image";

interface DesData {
  title: string;
  author: string;
  description: string;
  views: number;
  collections: number;
}

const Description = () => {
  const [showPending, setPending] = useState(true);
  const [fakeData, setFakeData] = useState<DesData | null>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fakePromise = new Promise<DesData>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          title: "測試漫畫名字",
          author: "xiaojun",
          description:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In dolores odit, enim tempora nesciunt, hic sunt pariatur quis eaque laborum minima possimus eum suscipit cumque, ullam harum molestias expedita. Repellendus!",
          views: 2.3,
          collections: 22,
        });
      }, 2000);
    });

    fakePromise.then((res) => {
      setFakeData(res);
      setIsPending(false);
    });
  }, []);

  return (
    <>
      <div className="flex py-4">
        <div className="w-[112px] min-w-[112px] h-[160px] bg-[#a8a8a8] rounded mr-4">
          <Image alt="image test" path="" setParentPending={setPending} />
        </div>
        <div className="flex flex-col grow items-start">
          <p className="text-[#4c4c4c] text-lg font-bold book-oneline">
            {fakeData?.title}
          </p>
          <p className="text-[#a8a8a8] mt-0 book-oneline">
            <span className="text-[.6rem] mr-2">作者:{fakeData?.author}</span>
          </p>
          <p>
            <span className="text-[.6rem] mr-2 inline-block py-[.1rem] px-2 bg-[#ff6a6a] text-white rounded">
              tag
            </span>
          </p>
          <p className="book-description">{fakeData?.description}</p>
          <div className="grow"></div>
          <p className="flex items-center w-full mt-1 text-[#a8a8a8]">
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>★&nbsp;{fakeData?.views}</span>
            </span>
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>◉&nbsp;{fakeData?.collections}</span>
            </span>
            <span className="mr-2 px-1 py-[2px] text-[.6rem] book-oneline p-[1px] pr-[4px] bg-[#ffaea7] text-white ml-auto rounded">
              <IconCollect class="h-3 inline-block pr-1" />
              收藏
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Description;
