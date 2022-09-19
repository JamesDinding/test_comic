import { h, FunctionComponent } from "preact";
import { MutableRef, useEffect } from "preact/hooks";

// type === number => remove char which is not number
type inputConfig = {
  placeHolder: string;
  type: "text" | "number" | "password";
  maxLen?: number;
  minLen?: number;
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
        <div className="font-bold text-lg">{title}</div>
        <div className="grow"></div>
        <div className="text-[#ff978d] text-input-warning text-sm">
          {isWrong ? warningMsg : ""}
        </div>
      </div>
      <input
        type={inputSetting.type}
        placeholder={inputSetting.placeHolder}
        className={
          "w-full h-[50px] py-3 px-5 text-sm border-2 border-solid border-[#e6e6e6] rounded-lg placeholder:text-[#bbbbbb] " +
          (isWrong ? "border-[#ff978d]" : "")
        }
        ref={inputRef}
      />
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
