import { h, FunctionComponent, Fragment as F } from "preact";
import { route } from "preact-router";
import { useRouter } from "../../../context/router";
import { useState, useRef, StateUpdater } from "preact/hooks";
import InputField from "./InputField";
import Btn from "../../UI/Btn";
import { postMyRegister } from "../../../lib/api";
import IconLogo from "../../../resources/img/logo-text.svg";
import { useUser } from "../../../context/user";

interface LoginProps {}

// remove error-shaking, attach it when user click next time.
let timer: ReturnType<typeof setTimeout> | undefined;

const Register: FunctionComponent<LoginProps> = ({}) => {
  const { customRouter } = useRouter();
  const { setLogin } = useUser();

  const [isPending, setIsPending] = useState(false);

  const accountRef = useRef<HTMLInputElement>(null!);
  const psRef = useRef<HTMLInputElement>(null!);
  const psCheckRef = useRef<HTMLInputElement>(null!);

  const [isAccountWrong, setIsAccountWrong] = useState(false);
  const [isPsWrong, setIsPsWrong] = useState(false);
  const [isPsCheckWrong, setIsPsCheckWrong] = useState(false);

  const [accWarning, setAccWarning] = useState("帐号输入错误，请重新输入");
  const [psWarning, setPsWarning] = useState("密码输入错误，请重新输入");
  const [psCheckWarning, setPsCheckWarning] =
    useState("确认密码输入错误，请重新输入");

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
      return /^[A-Za-z0-9\_\-]*$/.test(str);
    }

    if (accLen < 6) {
      // acc len error
      setIsAccountWrong(true);
      isAccCorrect = false;
    }
    if (pwLen < 6) {
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
            placeHolder: "请输入6位以上英文或数字组合帐号",
            type: "text",
            minLen: 6,
          }}
          isWrong={isAccountWrong}
          warningMsg={accWarning}
          inputRef={accountRef}
        />
        <InputField
          title="密码"
          inputSetting={{
            placeHolder: "请输入6位以上英文或数字组合密码",
            type: "text",
            minLen: 6,
            hidePassword: true,
          }}
          isWrong={isPsWrong}
          warningMsg={psWarning}
          inputRef={psRef}
        />
        <InputField
          title="确认密码"
          inputSetting={{
            placeHolder: "请再次输入密码",
            type: "text",
            minLen: 6,
            hidePassword: true,
          }}
          isWrong={isPsCheckWrong}
          warningMsg={psCheckWarning}
          inputRef={psCheckRef}
        />
        <div className="mb-[1.875rem]"></div>
        <div className={isPending ? "opacity-40 w-full" : "w-full"}>
          <Btn
            title="注册"
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
              postMyRegister(accountRef.current.value, psRef.current.value)
                .then((data) => {
                  localStorage.setItem("sjmh_log_status", "true");
                  setLogin();
                  setIsPending(false);
                  customRouter.push("/profile");
                  route("/profile");
                })
                .catch((err) => {
                  setIsPending(false);
                  if (err.message === "username already exists") {
                    setAccWarning("该帐户已被注册，请重新输入");
                    setIsAccountWrong(true);
                  } else {
                    console.error(err);
                  }
                });
            }}
          />
        </div>
        <div className="mt-5 text-sm text-[#999999]">
          已经是会员？
          <span
            className="cursor-pointer px-2 text-[#a1b68b] btn-text"
            onClick={() => {
              customRouter.push("/login", true);
              route("/login", true);
            }}
          >
            立即登录
          </span>
        </div>
      </div>
    </F>
  );
};

export default Register;
