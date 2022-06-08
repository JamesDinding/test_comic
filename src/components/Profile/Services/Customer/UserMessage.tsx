import { FunctionalComponent, h, Fragment } from "preact";
import { useState, useEffect, MutableRef } from "preact/hooks";

interface UserMessageProps {
  msg: string;
  type: string;
  bottomRef?: MutableRef<HTMLDivElement>;
  lastOne?: boolean;
  isTyping?: boolean;
}

const UserMessage: FunctionalComponent<UserMessageProps> = ({
  msg = "使用者輸入中...",
  type = "msg",
  bottomRef,
  lastOne = false,
  isTyping = false,
}) => {
  useEffect(() => {
    if (!lastOne) return;

    bottomRef?.current.scrollIntoView();
  }, [bottomRef, lastOne]);

  return (
    <div className="flex max-w-[50%] self-end border-solid border-2 rounded-lg my-2 chat-text">
      {type === "image" && <img src={msg} className="" alt="無法顯示圖片" />}
      {type === "msg" && isTyping && (
        <>
          <span className="userTypingDot"></span>
          <span className="userTypingDot"></span>
          <span className="userTypingDot"></span>
        </>
      )}
      {type === "msg" && !isTyping && msg}
    </div>
  );
};

export default UserMessage;
