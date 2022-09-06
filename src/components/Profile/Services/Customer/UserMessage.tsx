import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, MutableRef } from "preact/hooks";

interface UserMessageProps {
  msg: string;
  type: string;
  bottomRef?: MutableRef<HTMLDivElement>;
  lastOne?: boolean;
}

const UserMessage: FunctionalComponent<UserMessageProps> = ({
  msg = "使用者輸入中...",
  type = "msg",
  bottomRef,
  lastOne = false,
}) => {
  useEffect(() => {
    if (!lastOne) return;

    bottomRef?.current.scrollIntoView();
  }, [bottomRef, lastOne]);

  //border-[#855595]
  return (
    <div className="relative flex max-w-[50%] self-end border-solid tracking-wider rounded my-2 chat-text break-all">
      <div className="chat-message-tail top-[.8rem] "></div>
      {type === "image" && <img src={msg} className="" alt="無法顯示圖片" />}
      {type === "msg" && msg}
    </div>
  );
};

export default UserMessage;
