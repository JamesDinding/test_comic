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
    content: "這遍都是測試用的文字，用來測試對話框的效果與感覺。",
  },
  { identity: "server", type: "msg", content: "test message herer!" },
  { identity: "client", type: "msg", content: "client msg" },
  {
    identity: "server",
    type: "msg",
    content:
      "test message herer!test message herer!test message herer!test message herer!test message herer!",
  },
  {
    identity: "client",
    type: "msg",
    content: "測試用的文字",
  },
  {
    identity: "server",
    type: "msg",
    content: "final test msg from server side.",
  },
];

let ws: null | WebSocket = null;

// interface CustomerPageProps {
//   userName:string
// }

const CustomerPage: FunctionalComponent = () => {
  const [msgList, setMsgList] = useState(msgArr);
  const [clientInput, setClientInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    console.log("re-render");
    bottomRef.current?.scrollIntoView();
  }, []);

  /* websocket testing start */
  useEffect(() => {
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = () => {
      console.log("open connection");
      // 建立連線後，先向server發送資料來匹配客服人員
      ws?.send(
        JSON.stringify({
          type: "initial",
          identity: "client",
          userId: 40001,
          content: "",
        })
      );
    };

    ws.onclose = () => {
      // disconnected should inform server, then server could delete route from table.

      console.log("close connection");
    };

    ws.onmessage = (e) => {
      const res = JSON.parse(e.data);

      if (res.type === "isTyping") {
        res.content ? setIsTyping(true) : setIsTyping(false);
      }

      if (res.type === "msg") {
        setIsTyping(false);

        setMsgList((prev) => {
          const temp = [...prev];
          temp.push(res);
          return temp;
        });
      }

      bottomRef.current?.scrollIntoView();
    };
  }, []);
  /* sebsocket testing end */

  const triggerAudioHandler = (messageType: string) => {
    // const audio: HTMLAudioElement = document.getElementById("audio-player")!;
    // audio.src = `/audio/${messageType}`;
    // audio.currentTime = 0;
    // audio.volume = 0.1;
    // audio.play();
  };

  return (
    <div className="bg-white w-full flex flex-col justify-between grow max-h-screen">
      <CharTitleBar userName={"test"} ws={ws} />
      <audio className="hidden" preload="auto" id="audio-player"></audio>
      <div className="grow flex flex-col overflow-y-auto no-scrollbar px-4">
        {msgList.map(({ identity, type, content }, i) => {
          if (identity === "server")
            return <ServerMessage msg={content} type={type} key={i} />;
          if (identity === "client")
            return <UserMessage msg={content} type={type} key={i} />;
        })}
        {isTyping && <ServerMessage msg={"輸入中..."} type={"startTyping"} />}
        <div id="bottom" className="min-h-[64px]" ref={bottomRef}></div>
      </div>

      <UserInput
        ws={ws}
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
