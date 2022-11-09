import { h, FunctionComponent } from "preact";
import { MutableRef, useEffect, useState } from "preact/hooks";

// type === number => remove char which is not number
type inputConfig = {
  placeHolder: string;
  type: "text" | "number" | "password";
  maxLen?: number;
  minLen?: number;
  hidePassword?: boolean;
};

interface InputProps {
  title: string;
  inputSetting: inputConfig;
  warningMsg: string;
  isWrong: boolean;
  inputRef: MutableRef<HTMLInputElement>;
}

// remove error-shaking, attach it when user click next time.
let timer: ReturnType<typeof setTimeout> | undefined;

const InputField: FunctionComponent<InputProps> = ({
  title,
  inputSetting,
  warningMsg,
  isWrong,
  inputRef,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (!isWrong) return;

    const errorTextAll = document.querySelectorAll(".text-input-warning");
    errorTextAll.forEach((errText, i, arr) => {
      errText.classList.remove("error-shaking");
      errText.classList.add("error-shaking");
    });

    clearTimeout(timer);
    timer = setTimeout(() => {
      errorTextAll.forEach((errText, i, arr) => {
        errText.classList.remove("error-shaking");
      });
    }, 1000);
  }, [isWrong]);

  return (
    <div className="flex flex-col w-full mb-2">
      <div className="flex items-center mb-1">
        <div className="text-lg text-[#6d5694]">{title}</div>
        <div className="grow"></div>
        <div className="text-[#ff978d] text-input-warning text-sm">
          {isWrong ? warningMsg : ""}
        </div>
      </div>
      <div className="relative">
        {inputSetting.hidePassword && (
          <div
            className="absolute flex top-1/2 translate-y-[-50%] ml-5 text-[#6d5694] h-[calc(100%-1.5rem)] bg-white"
            onClick={(e) => {
              const target = e.target as HTMLDivElement;
              target.parentNode?.querySelector("input")?.focus();
              setIsFocus(true);
            }}
          >
            {inputValue.split("").map((_) => "＊")}
            {isFocus && <div className="input-animation-flicker">|</div>}
          </div>
        )}
        <input
          type={inputSetting.type}
          placeholder={inputSetting.placeHolder}
          minLength={inputSetting?.minLen}
          maxLength={inputSetting?.maxLen}
          className={
            "text-[#6d5694] w-full h-[50px] py-3 px-5 text-sm border-[1px] border-solid rounded-lg placeholder:text-[#bbbbbb] " +
            (isWrong ? "border-[#ff978d]" : "border-[rgba(109,86,148,0.4)]") +
            (inputSetting.hidePassword
              ? " caret-transparent"
              : " caret-[#6d5694]")
          }
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onfocusout={() => setIsFocus(false)}
          onChange={() => {
            setIsFocus(true);
            setInputValue(inputRef.current.value);
          }}
        />
      </div>
    </div>
  );
};

export default InputField;

// import { FunctionalComponent, h } from "preact";
// import { MutableRef } from "preact/hooks";
// import IconPhone from "../../../resources/img/profile-phone.svg";
// import IconPassword from "../../../resources/img/sign-password.svg";

// interface InputFieldProps {
//   text: string;
//   icon: string;
//   ref: MutableRef<HTMLInputElement>;
//   type?: string;
// }

// // Input Field Component
// const InputField: FunctionalComponent<InputFieldProps> = ({
//   text,
//   icon,
//   ref,
//   type = "text",
// }) => {
//   return (
//     <div className="relative inline-block text-sm w-full mb-6">
//       <input
//         ref={ref}
//         type={type}
//         autocomplete="off"
//         placeholder={text}
//         className="sign-form-input rounded-[3rem] h-[45px] indent-[50px] placeholder:font-extralight"
//       />
//       <span className="absolute top-1/2 translate-y-[-50%] h-auto left-[12px]">
//         <div className="w-6">
//           {icon === "acc" && <IconPhone class="h-6" />}
//           {icon === "pw" && <IconPassword class="h-6" />}
//         </div>
//       </span>
//     </div>
//   );
// };
