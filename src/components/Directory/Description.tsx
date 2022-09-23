import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import IconCollect from "../../resources/img/dir-collect.svg";
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
        <div className="w-[161px] min-w-[161px] h-[242px] bg-[#a8a8a8] rounded-lg overflow-hidden mr-5">
          {/* <Image alt="image" path="" setParentPending={setPending} /> */}
          <img src="/assets/img/test/Image.png" className="h-full w-full" />
        </div>
        <div className="flex flex-col grow items-start">
          <div className="text-[#666666] text-xl font-semibold book-oneline">
            {fakeData?.title}
          </div>
          <div className="text-[#999999] text-xs mt-2 book-oneline">
            <span className="mr-2">作者:{fakeData?.author}</span>
          </div>

          <p className="book-description">{fakeData?.description}</p>
          <div className="grow"></div>
          <div className="leading-3">
            {new Array(6).fill("test").map((tag, i, arr) => {
              return (
                <span className="text-xs text-[#68b2e1] mr-2 inline-block text-white rounded">
                  #&nbsp;{tag}
                </span>
              );
            })}
          </div>
          <div className="flex items-center w-full mt-1 text-[#a8a8a8]">
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>★&nbsp;{fakeData?.views}</span>
            </span>
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>◉&nbsp;{fakeData?.collections}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
