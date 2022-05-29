
import { useContext, useEffect } from "preact/hooks";
import { h, createContext, FunctionComponent, Provider } from "preact";

// 建立上下文
const WorkerContext = createContext<WorkerContextType>(null!);

// 建立 Worker
const worker = new Worker("/api/sdk/worker.js");

// 是否為首次載入？
let isInitial = true;

export const WorkerProvider: FunctionComponent = ({ children }) => {

    const send = (msg: WorkerTask): Promise<WorkerResponse> => {
        return new Promise<WorkerResponse>((resolve, reject) => {
            let chan = new MessageChannel();

            chan.port1.onmessage = (ev: MessageEvent<WorkerResponse>) => {
                chan.port1.close();

                if (ev.data.status !== 200) {
                    return reject(ev.data.msg);
                }

                return resolve(ev.data.data);
            };

            worker.postMessage(msg, [chan.port2]);
        });
    };

    useEffect(() => {
        // token 只拿一次
        if (!isInitial) return;

        isInitial = false;
        (async () => {
            let challenge = await send({ action: "Init" });

            let body = await fetch("/api/v1/auth/preflight", {
                method: "POST",
                body: JSON.stringify({
                    Challenge: challenge,
                }),
                credentials: "include",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });

            await send({ action: "AuthSetPreflight", data: await body.json() });
            await send({ action: "AuthGetToken" });
            await send({ action: "GetResourceDomain" });
        })();
    });

    return (
        <WorkerContext.Provider value={{ send }}>
            {children}
        </WorkerContext.Provider>
    );
};


export function useWorker(): WorkerContextType {
    return useContext<WorkerContextType>(WorkerContext);
}
