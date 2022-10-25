import { h, FunctionalComponent, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import IconCollect from "../../resources/img/dir-collect.svg";
import Image from "../_Image/image";

interface DescriptionProps {
  title?: string;
  author?: string;
  description?: string;
  views?: string;
  hot?: string;
  cover?: string;
}

const Description: FunctionalComponent<DescriptionProps> = ({
  title,
  author,
  description,
  cover,
  views,
  hot,
}) => {
  const [showPending, setPending] = useState(true);

  // 資料載入前
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 之後應該會改寫成一個obj包含全部所需資料
    if (title) {
      setIsLoading(false);
    }
  }, [title]);

  return (
    <>
      <div className="flex py-4">
        <div
          className={
            "relative w-[161px] min-w-[161px] h-[242px] bg-[#a8a8a8] rounded-lg overflow-hidden mr-5 " +
            (showPending ? "pending" : "")
          }
        >
          <Image alt="image" path={cover || ""} setParentPending={setPending} />
        </div>
        <div className="flex flex-col grow items-start">
          <div
            className={
              "text-[#666666] text-xl font-semibold book-oneline duration-[1.5s] " +
              (isLoading ? "blur-sm" : "")
            }
          >
            {title || "Titile is loading..."}
          </div>
          <div className="text-[#999999] text-xs mt-2 book-oneline">
            <span
              className={"mr-2 duration-[1.5s] " + (isLoading ? "blur-sm" : "")}
            >
              作者:{author || "loading..."}
            </span>
          </div>

          <p
            className={
              "book-description duraton-1000 " + (isLoading ? "blur-sm" : "")
            }
          >
            {description ||
              "Description is now loading..., please hold on for a second. Thanks for your cooperation."}
          </p>
          <div className="grow"></div>
          {/* <div className="leading-3">
            {new Array(6).fill("test").map((tag, i, arr) => {
              return (
                <span className="text-xs text-[#68b2e1] mr-2 inline-block text-white rounded">
                  #&nbsp;{tag}
                </span>
              );
            })}
          </div> */}
          <div className="flex items-center w-full mt-1 text-[#a8a8a8]">
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>★&nbsp;{hot}</span>
            </span>
            <span className="mr-2 text-[.6rem] book-oneline">
              <span>◉&nbsp;{views}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
