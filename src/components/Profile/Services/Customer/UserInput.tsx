import { FunctionalComponent, h } from "preact";
import { MutableRef, StateUpdater, useState } from "preact/hooks";
import IconImage from "../../../../resources/img/chat-image.svg";
import IconSend from "../../../../resources/img/chat-send.svg";

interface UserInputProps {
  ws: null | WebSocket;
  clientInput: string;
  onSetClientInput: StateUpdater<string>;
  onSetMsg: StateUpdater<
    Array<{
      identity: string;
      type: string;
      msg: string;
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
}) => {
  const typeMsgHandler = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = e.target as HTMLInputElement;
    onSetClientInput(target.value);
  };

  const sendMsgHandler = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement;
    if (e.keyCode !== 13 || !target.value) return;

    // send msg to backend
    ws?.send(
      JSON.stringify({ identity: "client", type: "msg", msg: target.value })
    );

    onSetMsg((prev) => {
      const temp = [...prev];
      temp.push({ identity: "client", type: "msg", msg: target.value });
      return temp;
    });

    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    onVoice("friend-request-14878.mp3");
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
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onSetMsg((prev) => {
        const temp = [...prev];
        temp.push({ identity: "client", type: "image", msg: result });
        return temp;
      });

      // 滾動功能未作用
      bottomRef.current.scrollIntoView();
      onVoice("emotional-damage.mp3");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center py-1 border-t-2 bg-red-300 min-h-[64px]">
      <div className="px-4 h-6">
        <div className="bg-white h-6" onClick={triggerUploadImg}>
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
        className="outline-none rounded-xl indent-1 py-2.5 px-4 my-2 mr-2 grow text-base"
        placeholder="請輸入內容"
        value={clientInput}
        onChange={typeMsgHandler}
        onKeyDown={sendMsgHandler}
      />
      <button className="pr-2">
        <IconSend class="h-6" />
      </button>
    </div>
  );
};

export default UserInput;
