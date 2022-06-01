import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import IconCollect from "../../resources/img/dir-collect.svg";
import Image from "../_Image/image";

const Description = () => {
  const [showPending, setPending] = useState(true);

  return (
    <>
      <div className="flex py-4">
        <div className="w-[112px] h-[160px] bg-[#a8a8a8] rounded mr-4">
          <Image alt="image test" path="" setParentPending={setPending} />
        </div>
        <div className="flex flex-col grow items-start">
          <p className="text-[#4c4c4c] text-lg font-bold book-oneline">title</p>
          <p className="text-[#a8a8a8] mt-0 book-oneline">
            <span className="text-[.6rem] mr-2">作者:</span>
          </p>
          <p>
            <span className="text-[.6rem] mr-2 inline-block py-[.1rem] px-2 bg-[#ff6a6a] text-white rounded">
              tag
            </span>
          </p>
          <p className="book-description">description</p>
          <div className="grow"></div>
          <p className="flex items-center w-full mt-1 text-[#a8a8a8]">
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>★&nbsp;44.5</span>
            </span>
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>◉&nbsp;21</span>
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
