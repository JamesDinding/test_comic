import { FunctionalComponent, h } from "preact";
import { MutableRef } from "preact/hooks";
import IconPhone from "../../../resources/img/profile-phone.svg";
import IconPassword from "../../../resources/img/sign-password.svg";

interface InputFieldProps {
  text: string;
  icon: string;
  ref: MutableRef<HTMLInputElement>;
  type?: string;
}

// Input Field Component
const InputField: FunctionalComponent<InputFieldProps> = ({
  text,
  icon,
  ref,
  type = "text",
}) => {
  return (
    <div className="relative inline-block text-sm w-full mb-6">
      <input
        ref={ref}
        type={type}
        autocomplete="off"
        placeholder={text}
        className="sign-form-input rounded-[3rem] h-[45px] indent-[50px] placeholder:font-extralight"
      />
      <span className="absolute top-1/2 translate-y-[-50%] h-auto left-[12px]">
        <div className="w-6">
          {icon === "acc" && <IconPhone class="h-6" />}
          {icon === "pw" && <IconPassword class="h-6" />}
        </div>
      </span>
    </div>
  );
};

export default InputField;
