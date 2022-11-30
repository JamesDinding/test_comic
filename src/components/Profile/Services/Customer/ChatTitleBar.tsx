import { FunctionalComponent, h } from "preact";
import CustomLink from "../../../CustomLink";
import IconCross from "../../../../resources/img/icon-cross.svg";
import IconChevron from "../../../../resources/img/icon-chevron.svg";

interface CharTitleBarProps {
  userName: string;
  ws: null | WebSocket;
  userId: string | null;
}

const CharTitleBar: FunctionalComponent<CharTitleBarProps> = ({
  userName = "",
  ws,
  userId,
}) => {
  return (
    <div className="flex items-center bg-[#1e1e1e] p-2.5">
      <div
        className="cursor-pointer"
        onClick={() => {
          history.back();
        }}
      >
        <span>
          <IconChevron class="h-8 rotate-180 text-white" />
        </span>
      </div>
      <div className="grow">
        <div className="text-center text-white text-lg">
          {"客服小天使 千千"}
        </div>
      </div>
      <div className="w-">
        <CustomLink href="/">
          <IconCross class="h-8 text-white" />
        </CustomLink>
      </div>
    </div>
  );
  // return (
  //   <div className="flex items-center justify-between px-4 py-2 border-b-2 border-solid bg-red-300">
  //     <div className="rounded-full bg-[#d8d8d8] border-[1px] border-[#979797] w-[40px] h-[40px] text-center"></div>
  //     <div className="ml-2 text-white font-medium">{userName}</div>
  //     <div className="grow"></div>
  //     <button
  //       className="text-xl"
  //       onClick={() => {
  //         ws?.send(
  //           JSON.stringify({
  //             type: "disconnect",
  //             identity: "client",
  //             userId: userId,
  //             content: "",
  //           })
  //         );

  //         ws?.close();

  //         route("/profile");
  //       }}
  //     >
  //       <div>
  //         <IconCross class="h-8" />
  //       </div>
  //     </button>
  //   </div>
  // );
};

export default CharTitleBar;
