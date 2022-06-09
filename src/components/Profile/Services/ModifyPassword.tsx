import { FunctionalComponent, h } from "preact";
import { useRef, MutableRef } from "preact/hooks";
import InputField from "./InputField";

const ModifyPassword = () => {
  const passwordRef = useRef<HTMLInputElement>(null!);
  const checkedPasswordRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="sign-form">
      <div className="w-[7rem] mb-4">logo</div>
      <div className="mb-6">
        <InputField text="請輸入密碼" icon="" ref={passwordRef} />
        <InputField text="請再次輸入密碼" icon="" ref={checkedPasswordRef} />
        <div className="font-extralight block h-[2.4rem] rounded-[2.4rem] text-white text-center leading-[2.4rem] bg-[#ff978d]">
          修改密碼
        </div>
      </div>
    </div>
  );
};

export default ModifyPassword;
