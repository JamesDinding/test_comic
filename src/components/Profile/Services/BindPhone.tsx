import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { postMyProfile } from "../../../lib/api";
import InputField from "./InputField";
import CardBottom from "../../Modal/CardBottom";
import IconCross from "../../../resources/img/icon-cross.svg";
import { useUser } from "../../../context/user";

interface BindPhone {
  onClose: () => void;
  title?: string;
}

const BindPhone: FunctionalComponent<BindPhone> = ({
  onClose,
  title = "绑定会员资料",
}) => {
  const { getUserStatus } = useUser();
  const [isPending, setIsPending] = useState(false);

  const phoneRef = useRef<HTMLInputElement>(null!);
  const mailRef = useRef<HTMLInputElement>(null!);
  const nameRef = useRef<HTMLInputElement>(null!);

  const [isPhoneWrong, setIsPhoneWrong] = useState(false);
  const [isMailWrong, setIsMailWrong] = useState(false);
  const [isNameWrong, setIsNameWrong] = useState(false);

  const verifyInput = () => {
    const phone = phoneRef.current.value;
    const mail = mailRef.current.value;
    const nick = nameRef.current.value;
    const phoneLen = phone.length;
    const nickLen = nick.length;

    let isPhoneCorrect = true;
    let isMailCorrect = true;
    let isNickCorrect = true;

    function onlyNumbers(str: string) {
      return /^[0-9]*$/.test(str);
    }
    function validateEmail(str: string) {
      return String(str)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    if (phoneLen < 8 || phoneLen > 15) {
      setIsPhoneWrong(true);
      isPhoneCorrect = false;
    }
    if (!onlyNumbers(phone)) {
      setIsPhoneWrong(true);
      isPhoneCorrect = false;
    }
    if (!validateEmail(mail)) {
      setIsMailWrong(true);
      isMailCorrect = false;
    }
    if (nickLen < 2 || nickLen > 10) {
      setIsNameWrong(true);
      isNickCorrect = false;
    }

    isPhoneCorrect && setIsPhoneWrong(false);
    isMailCorrect && setIsMailWrong(false);
    isNickCorrect && setIsNameWrong(false);

    return isPhoneCorrect && isMailCorrect && isNickCorrect;
  };

  return (
    <CardBottom>
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#6d5694] text-lg border-b-[1px] border-[#6d569466]">
        {title}
        <div onClick={(e) => onClose()}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      <div className="px-5 pt-5 text-[#666666]">
        <InputField
          inputRef={phoneRef}
          title="手机号"
          warningMsg="无效号码，请重新输入!"
          isWrong={isPhoneWrong}
          inputSetting={{
            placeHolder: "输入手机号",
            type: "number",
            minLen: 10,
            maxLen: 12,
          }}
        />
        <InputField
          inputRef={mailRef}
          title="邮箱"
          warningMsg="无效信箱，请重新输入!"
          isWrong={isMailWrong}
          inputSetting={{
            placeHolder: "输入邮箱",
            type: "text",
            minLen: 6,
            maxLen: 30,
          }}
        />
        <InputField
          inputRef={nameRef}
          title="昵称"
          warningMsg="无效昵称，请重新输入!"
          isWrong={isNameWrong}
          inputSetting={{
            placeHolder: "输入昵称",
            type: "text",
            minLen: 10,
            maxLen: 12,
          }}
        />
      </div>
      <div className="px-5 pb-5">
        <button
          className={
            "bg-[#8d6d9f] w-full py-4 mt-8 rounded-lg text-white text-xl " +
            (isPending ? "opacity-20" : "")
          }
          onClick={(e) => {
            if (!verifyInput()) return;
            setIsPending(true);
            postMyProfile(
              phoneRef.current.value,
              mailRef.current.value,
              nameRef.current.value
            )
              .then(async () => {
                // Complete user state, fetch latest profile
                await getUserStatus();
                setIsPending(false);
                onClose();
              })
              .catch((err) => {
                setIsPending(false);
                // when server error
                setIsMailWrong(true);
                setIsNameWrong(true);
                setIsPhoneWrong(true);
                console.error(err);
              });
          }}
        >
          提交
        </button>
      </div>
    </CardBottom>
  );
};

export default BindPhone;
