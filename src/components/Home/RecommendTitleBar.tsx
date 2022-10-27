import { FunctionalComponent, h } from "preact";

interface RecommendTitleBarProps {
  BlockName: string;
  BlockID?: number;
}

const blockTitle = new Map([
  ["吸睛首选", "crown"],
  ["新书强推", "premium-quality"],
  ["本周更新", "img-new"],
  ["3D主打", "3-d-glasses"],
  ["热门Cosplay", "cosplayer"],
  ["私人收藏", "gift-2"],
]);

const RecommendTitleBar: FunctionalComponent<RecommendTitleBarProps> = ({
  BlockName,
}) => {
  const pic = blockTitle.get(BlockName) || "crown";
  return (
    <div class="flex items-center item-header item-header-bg select-none text-lg font-semibold leading-8 text-[#6d5694] h-8 tracking-widest">
      <div className="w-[60px]">
        <img
          src={`/assets/img/title/${pic}@3x.png`}
          class={
            "inline-block translate-y-[-10px] w-full px-2.5" +
            (BlockName === "本周更新" ? "!px-0" : "")
          }
        />
      </div>
      {BlockName}
      <div class="grow"></div>
      {/* <a
        href={"/book-more/" + BlockID}
        class="block text-sm font-normal tracking-normal leading-[16px]"
      >
        更多 ▶
      </a> */}
    </div>
  );
};

export default RecommendTitleBar;
