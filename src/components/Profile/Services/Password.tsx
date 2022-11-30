import { h, FunctionalComponent, Fragment as F } from "preact";
import { useState, useRef, StateUpdater } from "preact/hooks";
import { postMyPassword } from "../../../lib/api";
import InputField from "./InputField";
import CardBottom from "../../Modal/CardBottom";
import IconCross from "../../../resources/img/icon-cross.svg";
import { useUser } from "../../../context/user";

interface Password {
  onClose: () => void;
  title?: string;
  popSuccess: StateUpdater<boolean>;
}

const Password: FunctionalComponent<Password> = ({
  onClose,
  title = "修改密码",
  popSuccess,
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

    let isOriginalCorrect = true;
    let isNewCorrect = true;
    let isCheckCorrect = true;

    function check_len(arg: string) {
      return arg.length >= 4 && arg.length <= 16;
    }

    isOriginalCorrect = check_len(original_password);
    isNewCorrect = check_len(new_password);
    isCheckCorrect = check_len(check_password);

    if (new_password !== check_password) {
      setIsNewPasswordWrong(true);
      isCheckCorrect = false;
    }

    !isOriginalCorrect && setIsOriginalPasswordWrong(true);
    !isNewCorrect && setIsNewPasswordWrong(true);
    !isCheckCorrect && setIsCheckNewPasswordWrong(true);

    return isOriginalCorrect && isNewCorrect && isCheckCorrect;
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
          title="原密码"
          warningMsg="密码错误，请重新输入"
          isWrong={isOriginalPasswordWrong}
          inputSetting={{
            placeHolder: "请输入原有密码",
            type: "text",
            minLen: 4,
            maxLen: 16,
          }}
        />
        <InputField
          inputRef={newPassword}
          title="新密码"
          warningMsg="无效号码，请重新输入!"
          isWrong={isNewPasswordWrong}
          inputSetting={{
            placeHolder: "请输入4-16位新密码",
            type: "text",
            minLen: 4,
            maxLen: 16,
          }}
        />
        <InputField
          inputRef={checkNewPassword}
          title="确认新密码"
          warningMsg="密码错误，请重新输入"
          isWrong={isCheckNewPasswordWrong}
          inputSetting={{
            placeHolder: "请再次输入4-16位新密码",
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
            postMyPassword(
              originalPassword.current.value,
              newPassword.current.value
            )
              .then(async (res) => {
                // Complete user state, fetch latest profile
                if (res.status !== 200)
                  throw new Error(res.message || "failed");
                await getUserStatus();
                setIsPending(false);
                onClose();
                popSuccess(true);
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
