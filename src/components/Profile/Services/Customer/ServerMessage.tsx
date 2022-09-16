import { FunctionalComponent, h, Fragment } from "preact";

interface ServerMessageProps {
  msg: string;
  type: string;
}

const ServerMessage: FunctionalComponent<ServerMessageProps> = ({
  msg,
  type = "msg",
}) => {
  return (
    <div className="relative max-w-[50%] self-start my-2 flex items-start">
      <div className="chat-message-tail--server top-[.8rem] "></div>
      <div className="shrink border-solid tracking-wider rounded inline-block chat-text-server break-all">
        {type === "msg" && msg}
        {type === "image" && <img src={msg} alt="" />}
        {type === "startTyping" && (
          <>
            <span className="userTypingDot"></span>
            <span className="userTypingDot"></span>
            <span className="userTypingDot"></span>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerMessage;
