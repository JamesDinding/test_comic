import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import IconCross from "../../../../resources/img/icon-cross.svg";

interface CharTitleBarProps {
  userName: string;
  ws: null | WebSocket;
}

const CharTitleBar: FunctionalComponent<CharTitleBarProps> = ({
  userName = "",
  ws,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b-2 border-solid bg-red-300">
      <div className="rounded-full bg-[#d8d8d8] border-[1px] border-[#979797] w-[40px] h-[40px] text-center"></div>
      <div className="ml-2 text-white font-medium">{userName}</div>
      <div className="grow"></div>
      <button
        className="text-xl"
        onClick={() => {
          console.log("應該是因為Link會先轉過去下一個頁面，所以這邊就不回觸發");
          ws?.send(
            JSON.stringify({
              type: "disconnect",
              identity: "client",
              userId: 40001,
              content: "",
            })
          );

          ws?.close();
        }}
      >
        <Link href="/profile">
          <IconCross class="h-8" />
        </Link>
      </button>
    </div>
  );
};

export default CharTitleBar;
