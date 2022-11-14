import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { postMyProfile } from "../../../lib/api";
import InputField from "./InputField";
import CardBottom from "../../Modal/CardBottom";
import IconCross from "../../../resources/img/icon-cross.svg";
import { useUser } from "../../../context/user";

interface Password {
  onClose: () => void;
  title?: string;
}

const Password: FunctionalComponent<Password> = ({
  onClose,
  title = "修改密碼",
}) => {
  const { getUserStatus } = useUser();
  const [isPending, setIsPending] = useState(false);

  const originalPassword = useRef<HTMLInputElement>(null!);
  const newPassword = useRef<HTMLInputElement>(null!);
  const checkNewPassword = useRef<HTMLInputElement>(null!);

  const [isOriginalPasswordWrong, setIsOriginalPasswordWrong] = useState(false);
  const [isNewPasswordWrong, setIsNewPasswordWrong] = useState(false);
  const [isCheckNewPasswordWrong, setIsCheckNewPasswordWrong] = useState(false);

  const verifyInput = () => {
    const original_password = originalPassword.current.value;
    const new_password = newPassword.current.value;
    const check_password = checkNewPassword.current.value;

    let isPhoneCorrect = true;
    let isMailCorrect = true;
    let isNickCorrect = true;

    function check_len(arg: string) {
      return arg.length < 4 || arg.length > 16;
    }

    check_len(original_password) && setIsOriginalPasswordWrong(false);
    check_len(new_password) && setIsNewPasswordWrong(false);
    check_len(check_password) && setIsCheckNewPasswordWrong(false);

    if (new_password !== check_password) {
      isMailCorrect = false;
    }

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
          inputRef={originalPassword}
          title="原密碼"
          warningMsg="无效号码，请重新输入!"
          isWrong={isOriginalPasswordWrong}
          inputSetting={{
            placeHolder: "請輸入原有密碼",
            type: "text",
            minLen: 4,
            maxLen: 16,
          }}
        />
        <InputField
          inputRef={newPassword}
          title="新密碼"
          warningMsg="无效号码，请重新输入!"
          isWrong={isNewPasswordWrong}
          inputSetting={{
            placeHolder: "請輸入新密碼",
            type: "text",
            minLen: 4,
            maxLen: 16,
          }}
        />
        <InputField
          inputRef={checkNewPassword}
          title="確認新密碼"
          warningMsg="无效号码，请重新输入!"
          isWrong={isCheckNewPasswordWrong}
          inputSetting={{
            placeHolder: "请再次输入新密碼",
            type: "text",
            minLen: 4,
            maxLen: 16,
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
              originalPassword.current.value,
              newPassword.current.value,
              checkNewPassword.current.value
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
                setIsNewPasswordWrong(true);
                setIsCheckNewPasswordWrong(true);
                setIsOriginalPasswordWrong(true);
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

export default Password;
