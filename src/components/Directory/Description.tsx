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

  // 资料载入前
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 之后应该会改写成一个obj包含全部所需资料
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
          <Image
            alt="image"
            path={cover || ""}
            escapeObserve={true}
            setParentPending={setPending}
          />
        </div>
        <div className="flex flex-col grow items-start">
          <div
            className={
              "text-[#666666] text-xl font-semibold book-oneline duration-[1.5s] " +
              (isLoading ? "blur-sm" : "")
            }
          >
            {title || "标题载入中"}
          </div>
          <div className="text-[#999999] text-xs mt-2 book-oneline">
            <span
              className={"mr-2 duration-[1.5s] " + (isLoading ? "blur-sm" : "")}
            >
              作者:{author || "作者载入中"}
            </span>
          </div>

          <p
            className={
              "book-description duration-1000 " + (isLoading ? "blur-sm" : "")
            }
          >
            {description ||
              "亲爱的使用者您好，现在正在载入资料，还请您稍等一会儿。若等待时间过久，请检查网络状况，皆无法解决时，请洽客服反映相关问题，谢谢您的配合。"}
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
            <span className="mr-2 min-w-6 text-[.6rem] book-oneline">
              <span>★&nbsp;{hot}</span>
            </span>
            <span className="mr-2 min-w-6 text-[.6rem] book-oneline">
              <span>◉&nbsp;{views}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
