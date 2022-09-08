import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";

interface PopConfirmProps {
  onClose: StateUpdater<boolean>;
  way: string;
  wire: string;
  coins: number;
  cost: number;
}

let timer: ReturnType<typeof setTimeout>;

const PopConfirm: FunctionalComponent<PopConfirmProps> = ({
  onClose,
  way,
  wire,
  coins,
  cost,
}) => {
  const [countDown, setCountDown] = useState(300);
  const [validationCode, setValidationCode] = useState<Array<number | null>>(
    new Array(4).fill(null)
  );

  useEffect(() => {
    if (countDown === 0) {
      clearTimeout(timer);
      onClose(false);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
  }, [timer, countDown]);

  function paddingZero(num: string, len: number): string {
    return num.length >= len ? num : paddingZero("0" + num, len);
  }

  return (
    <Card>
      <div className="relative flex flex-col items-center h-full p-5">
        <div
          className="absolute cursor-pointer right-4 top-4"
          onClick={() => onClose(false)}
        >
          <IconCross class="h-8" />
        </div>
        <div className="pop-payment-title">訂單確認</div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 border-b-[1px] border-[#e6e6e6] border-solid">
          <div>方案 :</div>
          <div>
            金幣充值 - <span className="text-red-warning">{coins}</span> 枚
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 border-b-[1px] border-[#e6e6e6] border-solid">
          <div>支付方式 :</div>
          <div>
            {way}支付 - 线路{wire}
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 border-b-[1px] border-[#e6e6e6] border-solid">
          <div>金額 :</div>
          <div className="text-red-warning">&#165; {cost}</div>
        </div>
        <div className="w-full pt-2.5 pb-1.5 border-b-[1px] border-[#e6e6e6] border-solid">
          <div className="flex items-center justify-between w-full px-2.5 ">
            <div>驗證碼 :</div>
            <div>
              {new Array(4).fill(0).map((_, i) => {
                return (
                  <input
                    key={i}
                    tabIndex={i}
                    id={"validation-" + i}
                    type="number"
                    max={9}
                    min={0}
                    value={validationCode[i]!}
                    className="w-[40px] h-[50px] px-2 py-1.5 ml-2 border-solid border-2 text-center text-lg"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      setValidationCode((prev) => {
                        const temp = [...prev];
                        const value = parseInt(target!.value, 10);

                        temp[i] = value > 10 ? Math.floor(value / 10) : value;
                        return temp;
                      });

                      const next = document.getElementById(
                        "validation-" + (i + 1)
                      );

                      next?.focus();
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-2.5 mt-2">
            <div className="grow"></div>
            <div className="mr-4 text-[#cccccc]">若訂單無誤，請輸入驗證碼</div>
            <div className="text-logo-primary">
              {Math.floor(countDown / 60) || "0"}:
              {paddingZero((countDown % 60).toString(), 2)}
            </div>
          </div>
        </div>
        <span className="mt-5 text-red-warning whitespace-nowrap">
          送出後將跳轉該官方授權網站，請安心使用
        </span>
        <button
          id="validation-4"
          tabIndex={5}
          className="w-full py-3 mt-[3.625rem] btn-bg-primary rounded-lg text-center text-xl text-white"
        >
          確認充值
        </button>
      </div>
    </Card>
  );
};

export default PopConfirm;
