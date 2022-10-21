import { FunctionalComponent, h } from "preact";
import { MutableRef, StateUpdater, useState } from "preact/hooks";
import IconImage from "../../../../resources/img/chat-image.svg";
import IconSend from "../../../../resources/img/chat-send.svg";

interface UserInputProps {
  ws: null | WebSocket;
  clientInput: string;
  userId: string | null;
  onSetClientInput: StateUpdater<string>;
  onSetMsg: StateUpdater<
    Array<{
      identity: string;
      type: string;
      content: string;
    }>
  >;
  onVoice: (messageType: string) => void;
  bottomRef: MutableRef<HTMLDivElement>;
}

const UserInput: FunctionalComponent<UserInputProps> = ({
  ws,
  clientInput,
  onSetClientInput,
  onSetMsg,
  onVoice,
  bottomRef,
  userId,
}) => {
  const typeMsgHandler = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;
    onSetClientInput(target.value);

    // 把使用者正在打字的内容传送过去
    ws?.send(
      JSON.stringify({
        type: "isTyping",
        identity: "client",
        userId: userId,
        content: target.value,
      })
    );
  };

  const sendMsgHandler = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (e.keyCode !== 13 || !target.value) return;

    // send msg to backend 发送讯息时，要包含自己的userId，这样server回传知道你谁
    ws?.send(
      JSON.stringify({
        type: "msg",
        identity: "client",
        userId: userId,
        content: target.value,
      })
    );

    onSetMsg((prev) => {
      const temp = [...prev];
      temp.push({ type: "msg", identity: "client", content: target.value });
      return temp;
    });

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    onSetClientInput("");
  };

  const clickSendMsgHandler = (e: MouseEvent) => {
    ws?.send(
      JSON.stringify({
        type: "msg",
        identity: "client",
        userId: userId,
        content: clientInput,
      })
    );

    onSetMsg((prev) => {
      const temp = [...prev];
      temp.push({ type: "msg", identity: "client", content: clientInput });
      return temp;
    });

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    onSetClientInput("");
  };

  const triggerUploadImg = (e: MouseEvent) => {
    e.preventDefault();

    const uploadInput = document.getElementById("user-upload");
    uploadInput?.click();
  };

  const uploadImgHandler = (
    e: h.JSX.TargetedEvent<HTMLInputElement, Event>
  ) => {
    e.preventDefault();

    const target = e.target as HTMLInputElement;

    if (!target.files) return;
    const file = target.files[0];

    const reader = new FileReader();
    reader.onload = async (e) => {
      const result = e.target?.result as string;

      ws?.send(
        JSON.stringify({
          type: "image",
          identity: "client",
          userId: userId,
          content: result,
        })
      );

      onSetMsg((prev) => {
        const temp = [...prev];
        temp.push({ type: "image", identity: "client", content: result });
        return temp;
      });

      // 滚动功能未作用
      bottomRef.current.scrollIntoView();
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative flex items-center py-1 px-2 bg-white min-h-[60px]">
      <div className="chat-input-shadow mx-[-.5rem]"></div>
      <div className="px-4 h-6">
        <div className="bg-white h-6 cursor-pointer" onClick={triggerUploadImg}>
          <IconImage class="h-6" />
        </div>
        <input
          onChange={uploadImgHandler}
          id="user-upload"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
        />
      </div>

      <input
        type="text"
        className="outline-none py-1.5 px-2 my-2 mr-2 grow text-base border-solid border-[#d19463] border-[1px] rounded"
        placeholder=""
        value={clientInput}
        onChange={typeMsgHandler}
        onKeyDown={sendMsgHandler}
      />
      <button
        className="py-1.5 px-2.5 rounded cursor-pointer text-white bg-[#d19463] opacity-40 hover:opacity-100"
        onClick={clickSendMsgHandler}
      >
        送出
      </button>
    </div>
  );
};

export default UserInput;
