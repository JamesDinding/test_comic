import { FunctionalComponent, h, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { createPortal } from "preact/compat";
import BackDrop from "../../../BackDrop";
import PopDescription from "./PopDescription";
import InputField from "../InputField";
import Btn from "../../../UI/Btn";
import IconQuestion from "../../../../resources/img/icon-question.svg";

const phaseTitle = ["聯繫客服", "回填單號", "尋回帳戶"];

const Recovery = () => {
  const serialNumRef = useRef<HTMLInputElement>(null!);

  const [isSerialNumWrong, setIsSerialNumWrong] = useState(false);
  const [isPop, setIsPop] = useState(false);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // setIsPop(true);
  }, []);

  return (
    <F>
      {isPop && <BackDrop onClose={setIsPop} />}
      {isPop && <PopDescription onClose={() => setIsPop(false)} />}
      <div className="grow flex flex-col bg-cartoon bg-[length:100%_100%] bg-no-repeat">
        <div className="px-12 pt-10 flex items-center">
          <div className={"recovery-phase-circle"}>1</div>

          <div className="recovery-phase-dash"></div>
          <div className={"recovery-phase-circle"}>2</div>
          <div
            className={
              "recovery-phase-dash " + (phase === 2 ? "" : "opacity-20")
            }
          ></div>
          <div
            className={
              "recovery-phase-circle " + (phase === 2 ? "" : "opacity-20")
            }
          >
            3
          </div>
        </div>
        <div className="px-12 mt-2.5 flex items-center justify-between text-[#957654] text-[12px]">
          {phaseTitle.map((title, i) => {
            return (
              <div
                className={
                  "w-10 flex justify-center whitespace-nowrap " +
                  (phase < i ? "opacity-20" : "")
                }
                key={i}
              >
                {title}
              </div>
            );
          })}
        </div>
        {phase === 1 && (
          <div id="phase-2">
            <div className="text-[#9e7654] px-12 pt-10">
              <InputField
                title="商戶單號"
                inputSetting={{ placeHolder: "請輸入廠商單號", type: "number" }}
                warningMsg="單號格式錯誤，請重新確認"
                isWrong={isSerialNumWrong}
                inputRef={serialNumRef}
              />
            </div>
            <button className="px-12 pt-2.5 w-full flex items-center justify-end text-[#d19463] text-sm font-light">
              尋回帳戶說明
              <div className="ml-1">
                <IconQuestion class="h-4" />
              </div>
            </button>
          </div>
        )}
        {phase === 2 && (
          <div className="flex flex-col items-center text-[#d19463] text-sm">
            <div className="text-[24px] leading-[24px] font-bold tracking-wider mt-10 mb-3">
              太棒了！已尋回帳戶
            </div>
            <div>- 以下是您的帳戶ID，請妥善保存 -</div>
            <div className="py-3 px-8 my-10 bg-white text-[40px] text-[#666666] leading-[40px] border-solid border-[1px] border-[rgba(158,118,84,0.4)] rounded-lg">
              1239020173
            </div>
            <div className="mb-4 text-[#ff978d]">
              請綁定會員資料，避免帳戶再次遺失
            </div>
            <div>點擊換帳戶，即可使用尋回的帳號登入</div>
          </div>
        )}
        <div className="grow"></div>
        <div className="px-5 pb-4">
          {phase !== 2 ? (
            <Btn
              title="下一步"
              cb={() => {
                setPhase((prev) => prev + 1);
              }}
            />
          ) : (
            <Btn
              title="切換帳戶"
              bgColor="bg-[#ff978d]"
              cb={() => {
                console.log("route");
              }}
            />
          )}
        </div>
      </div>
    </F>
  );
};

export default Recovery;
