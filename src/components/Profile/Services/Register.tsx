import { h, FunctionComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useState, useRef, StateUpdater } from "preact/hooks";
import InputField from "./InputField";
import Btn from "../../UI/Btn";
import { postMyRegister } from "../../../lib/api";
import IconLogo from "../../../resources/img/logo-text.svg";

interface LoginProps {}

// remove error-shaking, attach it when user click next time.
let timer: ReturnType<typeof setTimeout> | undefined;

const Register: FunctionComponent<LoginProps> = ({}) => {
  const accountRef = useRef<HTMLInputElement>(null!);
  const psRef = useRef<HTMLInputElement>(null!);
  const psCheckRef = useRef<HTMLInputElement>(null!);

  const [isAccountWrong, setIsAccountWrong] = useState(false);
  const [isPsWrong, setIsPsWrong] = useState(false);
  const [isPsCheckWrong, setIsPsCheckWrong] = useState(false);

  const [accWarning, setAccWarning] = useState("帐号输入错误，请重新输入");
  const [psWarning, setPsWarning] = useState("密码输入错误，请重新输入");
  const [psCheckWarning, setPsCheckWarning] =
    useState("密码输入错误，请重新输入");

  const isInputCorrect = () => {
    const acc = accountRef.current.value;
    const pw = psRef.current.value;
    const pwCheck = psCheckRef.current.value;
    const accLen = acc.length;
    const pwLen = pw.length;
    const pwCheckLen = pwCheck.length;
    let isAccCorrect = true;
    let isPwCorrect = true;
    let isPwCheckCorrect = true;

    function onlyLettersAndNumbers(str: string) {
      return /^[A-Za-z0-9]*$/.test(str);
    }

    if (accLen < 4 || accLen > 8) {
      // acc len error
      setIsAccountWrong(true);
      isAccCorrect = false;
    }
    if (pwLen < 4 || pwLen > 8) {
      // pw len error
      setIsPsWrong(true);
      isPwCorrect = false;
    }
    if (!onlyLettersAndNumbers(acc)) {
      // acc pattern error
      setIsAccountWrong(true);
      isAccCorrect = false;
    }
    if (!onlyLettersAndNumbers(pw)) {
      // pw pattern error
      setIsPsWrong(true);
      isPwCorrect = false;
    }
    if (pwCheckLen < 4 || pwCheckLen > 8) {
      setIsPsCheckWrong(true);
      isPwCheckCorrect = false;
    }
    if (pw !== pwCheck) {
      // pwCheck not match
      setIsPsCheckWrong(true);
      isPwCheckCorrect = false;
    }

    isAccCorrect && setIsAccountWrong(false);
    isPwCorrect && setIsPsWrong(false);
    isPwCheckCorrect && setIsPsCheckWrong(false);

    return isAccCorrect && isPwCorrect && isPwCheckCorrect;
  };

  return (
    <F>
      <div className="grow flex flex-col items-center py-5 px-12 w-full text-[#9e7654] bg-cartoon bg-[length:100%_100%] bg-no-repeat">
        <IconLogo class="w-[150px] h-[44px] mt-12 mb-4" />
        <div className="text-xs text-[#8d6d9f] tracking-[10px] mb-5">
          |最多精彩二次元动漫|
        </div>
        <InputField
          title="帐号"
          inputSetting={{
            placeHolder: "请输入4-8位英文字母和数字组合帐号",
            type: "text",
            maxLen: 8,
          }}
          isWrong={isAccountWrong}
          warningMsg={accWarning}
          inputRef={accountRef}
        />
        <InputField
          title="密码"
          inputSetting={{
            placeHolder: "请输入4-8位英文字母和数字组合帐号",
            type: "password",
            maxLen: 8,
          }}
          isWrong={isPsWrong}
          warningMsg={psWarning}
          inputRef={psRef}
        />
        <InputField
          title="确认密码"
          inputSetting={{
            placeHolder: "请再次输入码",
            type: "password",
            maxLen: 8,
          }}
          isWrong={isPsWrong}
          warningMsg={psWarning}
          inputRef={psCheckRef}
        />
        <div className="mb-[1.875rem]"></div>
        <Btn
          title="注册"
          cb={() => {
            const errorTextAll = document.querySelectorAll(
              ".text-input-warning"
            );
            errorTextAll.forEach((errText) => {
              errText.classList.remove("error-shaking");
              errText.classList.add("error-shaking");
            });

            clearTimeout(timer);
            timer = setTimeout(() => {
              errorTextAll.forEach((errText) => {
                errText.classList.remove("error-shaking");
              });
            }, 1000);

            if (!isInputCorrect()) return;
            postMyRegister(accountRef.current.value, psRef.current.value).then(
              (data) => {
                route("/login");
              }
            );
          }}
        />
        <div className="mt-5 text-sm text-[#999999]">
          已经是会员？
          <span
            className="cursor-pointer px-2 text-[#a1b68b] btn-text"
            onClick={() => route("/login")}
          >
            快速登录
          </span>
        </div>
      </div>
    </F>
  );
};

export default Register;
