import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";
import { useCharge } from "../../../../context/charge";
import ModalTitle from "../../../UI/ModalTitle";
import Card from "../../../Modal/Card";
import IconCross from "../../../../resources/img/icon-cross.svg";
import {getOrdersRedirectOrderNum, postOrdersCharge} from '../../../../lib/api';

interface PopConfirmProps {
  onClose: () => void;
}

let timer: ReturnType<typeof setTimeout>;

const PopConfirm: FunctionalComponent<PopConfirmProps> = ({ onClose }) => {
  const { payment, userSelect } = useCharge();
  const [countDown, setCountDown] = useState(300);
  const [ip, setIp] = useState<string>()
  const [validationCode, setValidationCode] = useState<Array<number | null>>(
    new Array(4).fill(null)
  );

  useEffect(()=>{
    fetch('http://www.cloudflare.com/cdn-cgi/trace').then(res=>{
      return res.text()
    }).then(data=>{
      const temp = data.split('ip=').pop()
      const temp2 = temp?.split('ts=')[0].trim()
      setIp(temp2)
    }).catch(err=>{
      console.log(err.message || "failed")
    })
  }, [])


  useEffect(() => {
    if (countDown === 0) {
      clearTimeout(timer);
      onClose();
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
      <div className="relative overflow-auto no-scrollbar text-[#6d5694] flex flex-col items-center h-full p-5">
        <ModalTitle title="訂單確認" onClose={onClose} />
        <div className="flex items-center justify-between w-full px-2.5 py-2.5 mt-2.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
          <div>方案 : </div>
          <div className="text-[#666666]">
            金幣充值 -{" "}
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
          <div>金額 :</div>
          <div className="text-[#dc6060]">&#165; {userSelect.cash_amount}</div>
        </div>
        <div className="w-full pt-2.5 pb-1.5 text-sm border-b-[1px] border-[#e6e6e6] border-dashed">
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
                    className="w-[40px] h-[50px] px-2 py-1.5 ml-2 border-solid border-2 rounded text-center text-lg"
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
        <span className="mt-5 text-sm text-[#ff978d] whitespace-nowrap">
          送出後將跳轉該官方授權網站，請安心使用
        </span>
        <div className="grow"></div>
        <button
          id="validation-4"
          tabIndex={5}
          className="w-full py-4 mt-[3.625rem] bg-[#eb6f6f] rounded-lg text-center text-xl text-white"
          onClick={()=>{
            console.log("id: ",userSelect.id, " cash_amount: ",userSelect.cash_amount)
            postOrdersCharge(payment?.id, userSelect.cash_amount, ip).then(response=>{
              const {data} = response;
              console.log(data)
              window.location.href = '/api/v1/orders/redirect/'+data.order_num
            }).catch(err=>{
              console.log(err.message || 'failed')
            })
          }}
        >
          確認充值
        </button>
      </div>
    </Card>
  );
};

export default PopConfirm;
