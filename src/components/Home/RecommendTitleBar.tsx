import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import { useRouter } from "../../context/router";
import IconTriangle from "../../resources/img/icon-triangle.svg";

interface RecommendTitleBarProps {
  BlockName: string;
  BlockID: number;
  onDefaultBehavior?: boolean;
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
  BlockID,
}) => {
  const { customRouter, attachData } = useRouter();
  const pic = blockTitle.get(BlockName) || "crown";
  return (
    <div class="flex items-center item-header item-header-bg select-none text-lg font-semibold leading-8 text-[#6d5694] h-8 tracking-widest">
      <div className="w-[60px]">
        <img
          src={`/assets/img/title/${pic}@3x.png`}
          class={
            "relative z-10 inline-block translate-y-[-10px] w-full px-2.5" +
            (BlockName === "本周更新" ? "!px-0" : "")
          }
        />
      </div>
      {BlockName}
      <div class="grow"></div>
      <div
        onClick={() => {
          attachData(BlockName);
          localStorage.setItem("sjmh_more_type", BlockName);
          customRouter.push("/more/" + BlockID);
          route("/more/" + BlockID);
        }}
        class="cursor-pointer flex items-center block text-sm font-normal tracking-normal leading-[16px]"
      >
        更多{" "}
        <div>
          <IconTriangle class="w-2 ml-1 " />
          {/* <div className="ml-2 h-0 w-0 border-l-[.5rem] border-[.35rem] border-transparent border-l-[#6d569499] rounded-sm"></div> */}
        </div>
      </div>
    </div>
  );
};

export default RecommendTitleBar;
