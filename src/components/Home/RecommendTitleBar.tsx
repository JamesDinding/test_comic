import { FunctionalComponent, h } from "preact";

interface RecommendTitleBarProps {
  BlockName: string;
  BlockID: number;
}

const RecommendTitleBar: FunctionalComponent<RecommendTitleBarProps> = ({
  BlockName,
  BlockID,
}) => {
  return (
    <div class="flex items-center item-header item-header-bg select-none text-xl font-semibold leading-8 text-sm text-[#9e7654] h-8 tracking-widest">
      <img src="/assets/img/item-header-icon.png" class="inline h-6" />
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
