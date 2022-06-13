import { FunctionalComponent, h } from "preact";

interface ServerMessageProps {
  msg: string;
  type: string;
}

const ServerMessage: FunctionalComponent<ServerMessageProps> = ({
  msg,
  type = "msg",
}) => {
  return (
    <div className="self-start my-2 flex items-start">
      <div className="shrink border-solid tracking-wider border-2 rounded-lg max-w-[50%] inline-block chat-text-server break-all">
        {type === "msg" && msg}
      </div>
    </div>
  );
};

export default ServerMessage;
