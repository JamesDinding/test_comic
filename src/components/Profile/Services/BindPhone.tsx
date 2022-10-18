import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { postMyProfile } from "../../../lib/api";
import InputField from "./InputField";
import CardBottom from "../../Modal/CardBottom";
import IconCross from "../../../resources/img/icon-cross.svg";

interface BindPhone {
  onClose: () => void;
}

const BindPhone: FunctionalComponent<BindPhone> = ({ onClose }) => {
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
      <div className="flex items-center justify-between w-full px-5 pt-4 pb-2.5 text-[#9e7654] text-lg border-b-[1px] border-[rgba(158,118,84,.4)]">
        綁定會員資料
        <div onClick={(e) => onClose()}>
          <IconCross class="w-8 h-8 text-black cursor-pointer" />
        </div>
      </div>
      <div className="px-5 pt-5 text-[#666666]">
        <InputField
          inputRef={phoneRef}
          title="手机号"
          warningMsg="無效號碼，請重新輸入!"
          isWrong={isPhoneWrong}
          inputSetting={{
            placeHolder: "輸入手機號",
            type: "number",
            minLen: 10,
            maxLen: 12,
          }}
        />
        <InputField
          inputRef={mailRef}
          title="邮箱"
          warningMsg="無效信箱，請重新輸入!"
          isWrong={isMailWrong}
          inputSetting={{
            placeHolder: "輸入郵箱",
            type: "text",
            minLen: 10,
            maxLen: 12,
          }}
        />
        <InputField
          inputRef={nameRef}
          title="昵称"
          warningMsg="無效暱稱，請重新輸入!"
          isWrong={isNameWrong}
          inputSetting={{
            placeHolder: "輸入暱稱",
            type: "text",
            minLen: 10,
            maxLen: 12,
          }}
        />
      </div>
      <div className="px-5 pb-5">
        <button
          className="bg-[#d19463] w-full py-4 mt-8 rounded-lg text-white text-xl"
          onClick={(e) => {
            if (!verifyInput()) return;
            console.log("binding gogo");
            postMyProfile(phoneRef.current.value, mailRef.current.value, nameRef.current.value).then(response=>{
              console.log(response)
              onClose();
            }).catch(err=>{
              console.log(err)
            })
          }}
        >
          提交
        </button>
      </div>
    </CardBottom>
  );
};

export default BindPhone;
