import { h, FunctionComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useState, useRef, StateUpdater } from "preact/hooks";
import { useUser } from "../../../context/user";
import InputField from "./InputField";
import Btn from "../../UI/Btn";
import IconLogo from "../../../resources/img/logo-text.svg";
import { CUSTOMER_SERVICE_URL } from "../../../const";

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

  const [accWarning, setAccWarning] = useState("帐号输入错误，请重新输入");
  const [psWarning, setPsWarning] = useState("密码输入错误，请重新输入");

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

    return isAccCorrect && isPwCorrect;
  };

  return (
    <F>
      <div className="grow flex flex-col items-center py-5 px-12 w-full text-[#8d6d9f] bg-cartoon bg-[length:100%_100%] bg-no-repeat">
        <IconLogo class="w-[150px] h-[44px] min-h-[44px] mt-12 mb-4" />
        <div className="text-xs text-[#8d6d9f] tracking-[10px] mb-5">
          |最多精彩二次元动漫|
        </div>
        <InputField
          title="帐号"
          inputSetting={{
            placeHolder: "请输入4-12位英文或数字组合帐号",
            type: "text",
            maxLen: 12,
            minLen: 4,
          }}
          isWrong={isAccountWrong}
          warningMsg={accWarning}
          inputRef={accountRef}
        />
        <InputField
          title="密码"
          inputSetting={{
            placeHolder: "请输入4-12位英文或数字组合密码",
            type: "password",
            maxLen: 12,
            minLen: 4,
          }}
          isWrong={isPsWrong}
          warningMsg={psWarning}
          inputRef={psRef}
        />
        <div className="flex items-center w-full mt-5 mb-20 text-sm">
          <input type="checkbox" name="memorize" className="cursor-pointer" />
          <label className="ml-2 text-[#666666]" for="memorize">
            记住我的帐号密码
          </label>
          <div className="grow"></div>
          <a
            href={`${CUSTOMER_SERVICE_URL}?paymode-=1`}
            target="_blank"
            className="cursor-pointer text-[#8d6d9f] btn-text"
          >
            忘记密码？
          </a>
        </div>
        <Btn
          title="立即登入"
          cb={() => {
            if (isPending) return;

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
            setIsPending(true);
            login(accountRef.current.value, psRef.current.value)
              .then((response) => {
                let hasError = false;
                setIsPending(false);

                switch (response.message) {
                  case "cannot parse request":
                  case "given credential matches no record":
                    setIsAccountWrong(true);
                    setAccWarning("無效的帳號，請確認帳號是否正確。");
                    hasError = true;
                    break;

                  case "given password matches failed":
                    setIsPsWrong(true);
                    setPsWarning("密碼輸入錯誤，請確認後重新輸入。");
                    hasError = true;
                    break;

                  case "already logged":
                    route("/memeber");
                    break;

                  default:
                    break;
                }

                !hasError && route("/profile");
              })
              .catch((err) => {
                console.error("err", err);
              });
          }}
        />
        <div className="mt-5 text-sm text-[#999999]">
          不是会员？
          <span
            className="cursor-pointer px-2 text-[#a1b68b] btn-text"
            onClick={() => route("/register")}
          >
            免费注册
          </span>
        </div>
      </div>
    </F>
  );
};

export default Login;
