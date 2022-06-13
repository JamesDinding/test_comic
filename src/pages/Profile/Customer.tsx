import Customer from "../../components/Profile/Services/Customer";
import { FunctionalComponent, h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import CharTitleBar from "../../components/Profile/Services/Customer/ChatTitleBar";
import ServerMessage from "../../components/Profile/Services/Customer/ServerMessage";
import UserMessage from "../../components/Profile/Services/Customer/UserMessage";
import UserInput from "../../components/Profile/Services/Customer/UserInput";

// test arr
const msgArr = [
  {
    identity: "server",
    type: "msg",
    msg: "這遍都是測試用的文字，用來測試對話框的效果與感覺。",
  },
  { identity: "server", type: "msg", msg: "test message herer!" },
  { identity: "client", type: "msg", msg: "client msg" },
  {
    identity: "server",
    type: "msg",
    msg: "test message herer!test message herer!test message herer!test message herer!test message herer!",
  },
  {
    identity: "client",
    type: "msg",
    msg: "測試用的文字",
  },
  { identity: "server", type: "msg", msg: "final test msg from server side." },
];

// interface CustomerPageProps {
//   userName:string
// }

const CustomerPage: FunctionalComponent = () => {
  const [msgList, setMsgList] = useState(msgArr);
  const [clientInput, setClientInput] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    console.log("re-render");
    bottomRef.current?.scrollIntoView();
  }, []);

  const triggerAudioHandler = (messageType: string) => {
    // const audio: HTMLAudioElement = document.getElementById("audio-player")!;
    // audio.src = `/audio/${messageType}`;
    // audio.currentTime = 0;
    // audio.volume = 0.1;
    // audio.play();
  };

  return (
    <div className="bg-white w-full flex flex-col justify-between grow max-h-screen">
      <CharTitleBar userName={"test"} />
      <audio className="hidden" preload="auto" id="audio-player"></audio>
      <div className="grow flex flex-col overflow-y-auto no-scrollbar px-4">
        {msgList.map(({ identity, type, msg }, i) => {
          if (identity === "server")
            return <ServerMessage msg={msg} type={type} key={i} />;
          if (identity === "client")
            return <UserMessage msg={msg} type={type} key={i} />;
        })}
        {/* {clientInput.length !== 0 && (
          <UserMessage bottomRef={bottomRef} lastOne={true} isTyping={true} />
        )} */}
        <div id="bottom" className="min-h-[64px]" ref={bottomRef}></div>
      </div>

      <UserInput
        clientInput={clientInput}
        onSetClientInput={setClientInput}
        onSetMsg={setMsgList}
        onVoice={triggerAudioHandler}
        bottomRef={bottomRef}
      />
    </div>
  );
};

export default CustomerPage;

// const CustomerPage: FunctionalComponent = () => {
//   return (
//     <div className="grow">
//       <Customer />
//     </div>
//   );
// };

// export default CustomerPage;
