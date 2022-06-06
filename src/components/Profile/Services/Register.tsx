import { FunctionalComponent, h } from "preact";
import { useRef, MutableRef } from "preact/hooks";

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
        className="register-form-input rounded-[3rem] h-[45px] indent-[50px] placeholder:font-extralight"
      />
      <span className="absolute top-1/2 translate-y-[-50%] h-auto left-[12px]">
        <div className="w-6">icon</div>
      </span>
    </div>
  );
};

const Register = () => {
  const phoneRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const checkedPasswordRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="register-form">
      <div className="w-[7rem] mb-4">logo</div>
      <div className="mb-6">
        <InputField text="請輸入手機號碼" icon="" ref={phoneRef} />
        <InputField text="請輸入密碼" icon="" ref={passwordRef} />
        <InputField text="請再次輸入密碼" icon="" ref={checkedPasswordRef} />
        <div className="font-extralight block h-[2.4rem] rounded-[2.4rem] text-white text-center leading-[2.4rem] bg-[#ff978d]">
          立即註冊，心上戶即贈送 150 金幣
        </div>
        <div className="font-extralight text-center text-[.7rem] mt-2">
          <a className="text-[#a8a8a8]">已有帳戶，登陸去</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
