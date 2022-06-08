import { FunctionalComponent, h } from "preact";
import { MutableRef, StateUpdater, useState } from "preact/hooks";

interface UserInputProps {
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
    <div className="flex items-center pr-8 py-1 border-t-2 bg-[#ff978d]">
      <div className="px-4 w-[7.5%]">
        <img
          onClick={triggerUploadImg}
          src="/img/upload.png"
          className="w-full cursor-pointer"
          alt="uplaod"
        />
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
        className="outline-none rounded-xl indent-1 py-2.5 px-4 my-2 grow text-base ml-4"
        placeholder="請輸入內容"
        value={clientInput}
        onChange={typeMsgHandler}
        onKeyDown={sendMsgHandler}
      />
      <button className="pl-4">
        <img src="/img/right-arrow.png" className="w-6 h-6" alt="enter" />
      </button>
    </div>
  );
};

export default UserInput;
