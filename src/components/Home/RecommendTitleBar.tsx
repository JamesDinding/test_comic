import { FunctionalComponent, h } from "preact";

interface RecommendTitleBarProps {
  BlockName: string;
  BlockID: number;
}

const blockTitle = new Map([
  ["吸睛首選", "crown"],
  ["新書強推", "premium-quality"],
  ["本週更新", "img-new"],
  ["3D主打", "3-d-glasses"],
  ["熱門Cosplay", "cosplayer"],
  ["私人收藏", "gift-2"],
]);

const RecommendTitleBar: FunctionalComponent<RecommendTitleBarProps> = ({
  BlockName,
  BlockID,
}) => {
  return (
    <div class="flex items-center item-header item-header-bg select-none text-lg font-semibold leading-8 text-[#9e7654] h-8 tracking-widest">
      <div className="w-[60px]">
        <img
          src={`/assets/img/title/${blockTitle.get(BlockName)}@3x.png`}
          class="inline-block translate-y-[-10px] w-full px-2.5"
        />
      </div>
      {BlockName}
      <div class="grow"></div>
      <a
        href={"/book-more/" + BlockID}
        class="block text-sm font-normal tracking-normal leading-[16px]"
      >
        更多 ▶
      </a>
    </div>
  );
};

export default RecommendTitleBar;
