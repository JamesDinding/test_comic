import { FunctionalComponent, h } from "preact";
import { MutableRef } from "preact/hooks";

interface InputFieldProps {
  text: string;
  icon: string;
  ref: MutableRef<HTMLInputElement>;
}

// Input Field Component
const InputField: FunctionalComponent<InputFieldProps> = ({
  text,
  icon,
  ref,
}) => {
  return (
    <div className="relative inline-block text-sm w-full mb-6">
      <input
        ref={ref}
        type="number"
        autocomplete="off"
        placeholder={text}
        className="sign-form-input rounded-[3rem] h-[45px] indent-[50px] placeholder:font-extralight"
      />
      <span className="absolute top-1/2 translate-y-[-50%] h-auto left-[12px]">
        <div className="w-6">icon</div>
      </span>
    </div>
  );
};

export default InputField;
