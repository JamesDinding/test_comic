import Customer from "../../components/Profile/Services/Customer";
import { FunctionalComponent, h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import CharTitleBar from "../../components/Profile/Services/Customer/ChatTitleBar";
import ServerMessage from "../../components/Profile/Services/Customer/ServerMessage";
import UserMessage from "../../components/Profile/Services/Customer/UserMessage";
import UserInput from "../../components/Profile/Services/Customer/UserInput";

type MessageResponse = {
  type: string;
  content: string;
  identity: string;
};

let ws: null | WebSocket = null;

const CustomerPage: FunctionalComponent = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [msgList, setMsgList] = useState<Array<MessageResponse>>([]);
  const [clientInput, setClientInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, []);

  // 讀取先前的聯天室內容
  useEffect(() => {
    if (!isInitialLoad) return;

    setIsInitialLoad(false);
    fetch("http://192.168.1.247:3000/chat/client/40001")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed!");
        return res.json();
      })
      .then((data) => {
        setMsgList(data.conversation || []);
      })
      .catch((err) => console.log(err.message || "Something wrong!"));
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
      // initial 要順帶把使用者資料傳送過去
      // 先寫死 使用者 測試傳送資料的api
      fetch("http://192.168.1.247:3000/user/profile/40001", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: 40002,
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("failed");
          return res.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message || "error happen");
        });
    };

    ws.onclose = () => {
      // disconnected should inform server, then server could delete route from table.

      console.log("close connection");
    };

    ws.onmessage = (e) => {
      const res: MessageResponse = JSON.parse(e.data);

      if (res.type === "isTyping") {
        res.content ? setIsTyping(true) : setIsTyping(false);
      }

      if (res.type === "msg") {
        setIsTyping(false);

        setMsgList((prev) => {
          console.log(prev);
          const temp = [...prev];
          temp.push(res);
          return temp;
        });
      }

      bottomRef.current?.scrollIntoView();
    };
  }, []);
  /* websocket testing end */

  const triggerAudioHandler = (messageType: string) => {
    // const audio: HTMLAudioElement = document.getElementById("audio-player")!;
    // audio.src = `/audio/${messageType}`;
    // audio.currentTime = 0;
    // audio.volume = 0.1;
    // audio.play();
  };

  console.log(msgList);

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
