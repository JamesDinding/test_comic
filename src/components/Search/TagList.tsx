import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";

const tagList = [
  "連載",
  "完結",
  "紳士",
  "淑女",
  "玄幻",
  "獸交",
  "亂倫",
  "3D",
  "同仁致",
  "獵奇",
  "角色扮演",
  "劇情",
  "遊戲CG",
  "強姦",
  "多人",
  "喃喃",
  "真人",
  "偷情",
  "言情",
  "流氓",
  "學員",
  "驚悚",
];

const TagList = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const selectedTagHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    setSelectedTag(target.innerText);
  };

  return (
    <div className="bg-white pb-2">
      <div className="text-sm mx-4 pt-4">
        <div className="inline-block">i</div>
        <span className="ml-2 text-[#ff978d] font-extralight inline-block">
          熱門分類
        </span>
      </div>
      <div
        className="flex flex-wrap font-light m-3"
        onClick={selectedTagHandler}
      >
        {tagList.map((tag, index) => {
          let selectedTagCss =
            tag === selectedTag
              ? "border-[#ff978d] bg-[#ff978d] text-white"
              : "border-[#ccc] text-[#ccc]";

          return (
            <div
              className={`cursor-pointer text-xs border-2 rounded px-2 bg-white m-[.3rem] ${selectedTagCss}`}
              key={index}
            >
              {tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagList;
