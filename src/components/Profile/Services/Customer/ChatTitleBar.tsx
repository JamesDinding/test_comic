import { FunctionalComponent, h } from "preact";
import { route } from "preact-router";
import IconCross from "../../../../resources/img/icon-cross.svg";

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
    <div className="flex items-center justify-between px-4 py-2 border-b-2 border-solid bg-red-300">
      <div className="rounded-full bg-[#d8d8d8] border-[1px] border-[#979797] w-[40px] h-[40px] text-center"></div>
      <div className="ml-2 text-white font-medium">{userName}</div>
      <div className="grow"></div>
      <button
        className="text-xl"
        onClick={() => {
          ws?.send(
            JSON.stringify({
              type: "disconnect",
              identity: "client",
              userId: userId,
              content: "",
            })
          );

          ws?.close();

          route("/profile");
        }}
      >
        <div>
          <IconCross class="h-8" />
        </div>
      </button>
    </div>
  );
};

export default CharTitleBar;
