import { h, FunctionComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useState, useRef, StateUpdater } from "preact/hooks";
import { useUser } from "../../../context/user";
import InputField from "./InputField";
import Btn from "../../UI/Btn";
import IconLogo from "../../../resources/img/logo-text.svg";

interface LoginProps {}

// remove error-shaking, attach it when user click next time.
let timer: ReturnType<typeof setTimeout> | undefined;

const Login: FunctionComponent<LoginProps> = ({}) => {
  const { login } = useUser();
  const [isPending, setIsPending] = useState(false);

  const accountRef = useRef<HTMLInputElement>(null!);
  const psRef = useRef<HTMLInputElement>(null!);

  const [isAccountWrong, setIsAccountWrong] = useState(false);
  const [isPsWrong, setIsPsWrong] = useState(false);

  const [accWarning, setAccWarning] = useState("帳號輸入錯誤，請重新輸入");
  const [psWarning, setPsWarning] = useState("密碼輸入錯誤，請重新輸入");

  const isInputCorrect = () => {
    const acc = accountRef.current.value;
    const pw = psRef.current.value;
    const accLen = acc.length;
    const pwLen = pw.length;

    let isAccCorrect = true;
    let isPwCorrect = true;

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

    isAccCorrect && setIsAccountWrong(false);
    isPwCorrect && setIsPsWrong(false);

    console.log(isAccCorrect, isPwCorrect);

    return isAccCorrect && isPwCorrect;
  };

  return (
    <F>
      <div className="grow flex flex-col items-center py-5 px-12 w-full text-[#9e7654] bg-cartoon bg-[length:100%_100%] bg-no-repeat">
        <IconLogo class="w-[150px] h-[44px] min-h-[44px] mt-12 mb-4" />
        <div className="text-xs text-[#d29a6a] tracking-[10px] mb-5">
          |最多精彩二次元动漫|
        </div>
        <InputField
          title="帳號"
          inputSetting={{
            placeHolder: "請輸入4-8位英文字母和數字組合帳號",
            type: "text",
            maxLen: 8,
          }}
          isWrong={isAccountWrong}
          warningMsg={accWarning}
          inputRef={accountRef}
        />
        <InputField
          title="密碼"
          inputSetting={{
            placeHolder: "請輸入4-8位英文字母和數字組合帳號",
            type: "password",
            maxLen: 8,
          }}
          isWrong={isPsWrong}
          warningMsg={psWarning}
          inputRef={psRef}
        />
        <div className="flex items-center w-full mt-5 mb-20 text-sm">
          <input type="checkbox" name="memorize" className="cursor-pointer" />
          <label className="ml-2 text-[#666666]" for="memorize">
            記住我的帳號密碼
          </label>
          <div className="grow"></div>
          <div className="cursor-pointer text-[#d19463] btn-text">
            忘記密碼？
          </div>
        </div>
        <Btn
          title="立即登入"
          cb={async () => {
            // for test
            const response = await login(
              accountRef.current.value,
              psRef.current.value
            );

            console.log("login btn response", response);

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
            // login(accountRef.current.value, psRef.current.value);
            // route( "/member");
          }}
        />
        <div className="mt-5 text-sm text-[#999999]">
          不是會員？
          <span
            className="cursor-pointer px-2 text-[#a1b68b] btn-text"
            onClick={() => route("/register")}
          >
            免費註冊
          </span>
        </div>
      </div>
    </F>
  );
};

export default Login;
