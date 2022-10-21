import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import Card from "../../../Modal/Card";
import {
  getOrdersRedirectOrderNum,
  postOrdersCharge,
} from "../../../../lib/api";

interface PopConfirmProps {
  onClose: () => void;
}

const PopConfirm: FunctionalComponent<PopConfirmProps> = ({ onClose }) => {
  const { payment, userSelect } = useCharge();
  const [countDown, setCountDown] = useState(300);
  const [ip, setIp] = useState<string>();
  const [checkCode, setCheckCode] = useState("");
  const [validationCode, setValidationCode] = useState<Array<number | null>>(
    new Array(4).fill(null)
  );
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    fetch("http://www.cloudflare.com/cdn-cgi/trace")
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const temp = data.split("ip=").pop();
        const temp2 = temp?.split("ts=")[0].trim();
        setIp(temp2);
      })
      .catch((err) => {
        console.log(err.message || "failed");
      });
  }, []);

  // generate check string
  useEffect(() => {
    if (checkCode) return;
    let temp = "";
    for (let i = 0; i < 4; i++) {
      temp += Math.floor(Math.random() * 10);
    }
    setCheckCode(temp);
  }, [checkCode]);

  return (
    <Card>
      <div className="relative overflow-auto no-scrollbar text-[#6d5694] flex flex-col items-center h-full p-5">
        <ModalTitle title="订单确认" onClose={onClose} />
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 mt-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>方案 : </div>
          <div className="text-[#666666]">
            金币充值 -{" "}
            <span className="text-[#dc6060]">{userSelect.token_amount}</span> 枚
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>支付方式 :</div>
          <div className="text-[#666666]">
            {payment?.type} - {payment?.name}
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>金额 :</div>
          <div className="text-[#dc6060]">&#165; {userSelect.cash_amount}</div>
        </div>
        <div className="w-full pt-2.5 pb-1.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div className="w-2/3 pr-2.5 pb-5 pt-2.5 mr-0 ml-auto flex justify-between items-center">
            {checkCode.split("").map((c, i) => {
              return (
                <div className="w-[40px] font-bold text-center text-[32px] text-[#666666]">
                  {c}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between w-full px-2.5 ">
            <div>验证码 :</div>
            <div className="w-2/3 flex justify-between items-center">
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
                    className="w-[40px] h-[50px] px-2 py-1.5 border-solid border-2 rounded text-center text-lg"
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
              {/* <input
                type="text"
                value={validationCode!}
                maxLength={4}
                className="w-full h-[50px] px-2 py-1.5 border-solid border-2 rounded text-right text-lg"
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  setValidationCode(target.value);
                }}
              /> */}
            </div>
          </div>
          <div className="flex items-center justify-between w-full px-2.5 mt-2">
            <div className="grow"></div>
            <div className="mr-4 text-[#cccccc]">
              若订单无误，请输入上方验证码
            </div>
          </div>
        </div>
        <span className="mt-5 text-sm text-[#ff978d] whitespace-nowrap">
          送出后将跳转该官方授权网站，请安心使用
        </span>
        <div className="grow"></div>
        <button
          id="validation-4"
          tabIndex={5}
          className="w-full py-4 mt-[3.625rem] bg-[#eb6f6f] rounded-lg text-center text-xl text-white"
          onClick={() => {
            console.log(
              "id: ",
              userSelect.id,
              " cash_amount: ",
              userSelect.cash_amount
            );
            const temp = checkCode.split("");
            for (let i = 0; i < 4; i++) {
              if (validationCode[i]?.toString() !== temp[i]) return;
            }

            postOrdersCharge(payment?.id, userSelect.cash_amount, ip)
              .then((response) => {
                const { data } = response;
                console.log(data);
                window.location.href =
                  "/api/v1/orders/redirect/" + data.order_num;
              })
              .catch((err) => {
                console.log(err.message || "failed");
              });
          }}
        >
          确认充值
        </button>
      </div>
    </Card>
  );
};

export default PopConfirm;
