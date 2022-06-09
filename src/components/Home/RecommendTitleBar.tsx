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
    <div class="relative item-header item-header-bg select-none text-center leading-8 text-sm h-8 tracking-[1rem]">
      <img src="/assets/img/item-header-icon.png" class="inline h-6" />
      {BlockName}
      <a
        href={"/book-more/" + BlockID}
        class="block absolute right-4 top-2 text-[10px] text-center font-bold tracking-normal rounded-md bg-[#ff978d] text-white px-1 py-0 leading-[16px]"
      >
        MORE ▶
      </a>
    </div>
  );
};

export default RecommendTitleBar;
