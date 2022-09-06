import { FunctionalComponent, h } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import CharTitleBar from "../../components/Profile/Services/Customer/ChatTitleBar";
import ServerMessage from "../../components/Profile/Services/Customer/ServerMessage";
import UserMessage from "../../components/Profile/Services/Customer/UserMessage";
import UserInput from "../../components/Profile/Services/Customer/UserInput";

import { API_ROUTE } from "../../const";

// 透過某個地方放
localStorage.setItem("room-id", JSON.stringify({ id: "111206" }));

// 這個component拿
const retrieveObj = JSON.parse(localStorage.getItem("room-id")!);
const ID_LOCAL_STORAGE = retrieveObj.id;

console.log("ID_LOCAL_STORAGE: ", ID_LOCAL_STORAGE);

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
  const [haveService, setHaveService] = useState(true);

  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null!);

  // 可以被放到拿完先前聊天內容if(data.length === 0) 在給罐頭
  useEffect(() => {
    if (msgList.length === 0) {
      setMsgList((prev) => {
        const temp = [...prev];
        temp.push({
          type: "msg",
          identity: "server",
          content:
            "很高兴为您服务，平均回覆时间约在5分钟内，还请您静候一会儿。",
        });
        return temp;
      });
      return;
    }
    bottomRef.current?.scrollIntoView();
  }, [msgList]);

  // 讀取先前的聯天室內容
  useEffect(() => {
    if (!isInitialLoad) return;

    setIsInitialLoad(false);
    fetch(`${API_ROUTE}/chat/client/${ID_LOCAL_STORAGE}`)
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
    ws = new WebSocket("ws://192.168.1.247:3000");
    ws.onopen = () => {
      console.log("open connection");
      // 建立連線後，先向server發送資料來匹配客服人員
      ws?.send(
        JSON.stringify({
          type: "initial",
          identity: "client",
          userId: ID_LOCAL_STORAGE,
          content: "",
        })
      );
      // initial 要順帶把使用者資料傳送過去
      // 先寫死 使用者 測試傳送資料的api
      fetch(`${API_ROUTE}/user/profile/${ID_LOCAL_STORAGE}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: ID_LOCAL_STORAGE,
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

      if (res.type === "image") {
        setMsgList((prev) => {
          const temp = [...prev];
          temp.push(res);
          return temp;
        });
      }

      if (res.type === "NOT_IN_SERVICE_AREA") {
        setHaveService(false);
      }

      bottomRef.current?.scrollIntoView();
    };
  }, []);
  /* websocket testing end */

  useEffect(() => {
    if (!window) return;
    window.onbeforeunload = () => {
      console.log("user leaving");
      ws?.send(
        JSON.stringify({
          type: "disconnect",
          identity: "client",
          userId: ID_LOCAL_STORAGE,
          content: "",
        })
      );

      ws?.close();
    };
  }, []);

  const triggerAudioHandler = (messageType: string) => {
    // const audio: HTMLAudioElement = document.getElementById("audio-player")!;
    // audio.src = `/audio/${messageType}`;
    // audio.currentTime = 0;
    // audio.volume = 0.1;
    // audio.play();
  };

  return (
    <div className="bg-black w-full flex flex-col justify-between grow max-h-screen">
      <CharTitleBar userName={"用戶名稱"} ws={ws} userId={ID_LOCAL_STORAGE} />
      {/* <audio className="hidden" preload="auto" id="audio-player"></audio> */}
      {haveService ? (
        <div className="grow flex flex-col overflow-y-auto no-scrollbar px-4">
          {msgList.map(({ identity, type, content }, i) => {
            if (identity === "server")
              return <ServerMessage msg={content} type={type} key={i} />;
            if (identity === "client")
              return <UserMessage msg={content} type={type} key={i} />;
          })}
          {isTyping && <ServerMessage msg={"輸入中..."} type={"startTyping"} />}
          <div id="bottom" className="min-h-[54px]" ref={bottomRef}></div>
        </div>
      ) : (
        <div className="text-center">
          <div>使用者不在服務範圍內</div>
          <div>請確認網路狀況或向ISP洽詢。</div>
        </div>
      )}

      <UserInput
        ws={ws}
        clientInput={clientInput}
        onSetClientInput={setClientInput}
        onSetMsg={setMsgList}
        onVoice={triggerAudioHandler}
        bottomRef={bottomRef}
        userId={ID_LOCAL_STORAGE}
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
