import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import { useUser } from "../../../../context/user";
import ModalTitle from "../../../UI/ModalTitle";
import Card from "../../../Modal/Card";
import {
  getOrdersRedirectOrderNum,
  postOrdersCharge,
  postMyRegisterRandom,
} from "../../../../lib/api";

interface PopConfirmProps {
  onClose: () => void;
}

const PopConfirm: FunctionalComponent<PopConfirmProps> = ({ onClose }) => {
  const { isLogIn, setLogin } = useUser();
  const { payment, userSelect, selectCoins, selectPay } = useCharge();
  const [isPosting, setIsPosting] = useState(false);
  const [ip, setIp] = useState<string>();
  const [checkCode, setCheckCode] = useState("");
  const [validationCode, setValidationCode] = useState<Array<number | null>>(
    new Array(4).fill(null)
  );
  const [errMsg, setErrMsg] = useState("若订单无误，请输入上方验证码");
  const [isError, setIsError] = useState(false);

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
        console.error(err.message || "failed");
      });
  }, []);

  // auto focus
  useEffect(() => {
    const firstInput: HTMLInputElement =
      document.querySelector("#validation-0")!;
    firstInput?.focus();
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
        <ModalTitle
          title="订单确认"
          onClose={() => {
            selectCoins(null);
            selectPay(null);
            onClose();
          }}
        />
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 mt-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>方案 : </div>
          <div className="text-[#666666]">
            金币充值 -{" "}
            <span className="text-[#dc6060]">{userSelect.token_amount}</span> 枚
          </div>
        </div>
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>支付方式 :</div>
          <div className="text-[#666666]">分流 {payment?.index ?? ""}</div>
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
                    className={
                      "w-[40px] h-[50px] px-2 py-1.5 border-solid border-2 rounded text-center text-lg " +
                      (isError ? "border-[#ff978d]" : "")
                    }
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
            <div
              className={
                isError ? "error-shaking text-[#ff978d]" : "text-[#cccccc]"
              }
            >
              {errMsg}
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
          className={
            "w-full py-4 mt-[3.625rem] bg-[#eb6f6f] rounded-lg text-center text-xl text-white " +
            (isPosting ? "opacity-20" : "")
          }
          onClick={() => {
            if (isPosting) return;
            setIsPosting(true);
            const temp = checkCode.split("");
            for (let i = 0; i < 4; i++) {
              if (validationCode[i]?.toString() !== temp[i]) {
                setIsPosting(false);
                setIsError(true);
                setErrMsg("验证码错误，请确认后重新输入");
                return;
              }
            }

            if (isLogIn) {
              postOrdersCharge(payment?.id, userSelect.cash_amount, ip)
                .then((response) => {
                  const { data } = response;
                  window.location.href =
                    "/api/v1/orders/redirect/" + data.order_num + "?paymode=1";
                })
                .catch((err) => {
                  console.error(err.message || "failed");
                  setIsPosting(false);
                  setIsError(true);
                  setErrMsg("请求发出失败，请确认网络状况");
                });
            } else {
              postMyRegisterRandom().then((res) => {
                setLogin();
                localStorage.setItem("sjmh_log_status", "true");
                postOrdersCharge(payment?.id, userSelect.cash_amount, ip)
                  .then((response) => {
                    const { data } = response;
                    window.location.href =
                      "/api/v1/orders/redirect/" +
                      data.order_num +
                      "?paymode=1";
                  })
                  .catch((err) => {
                    console.error(err.message || "failed");
                    setIsPosting(false);
                    setIsError(true);
                    setErrMsg("请求发出失败，请确认网络状况");
                  });
              });
            }
          }}
        >
          确认充值
        </button>
      </div>
    </Card>
  );
};

export default PopConfirm;
