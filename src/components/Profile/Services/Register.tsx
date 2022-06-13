import { FunctionalComponent, h } from "preact";
import { useRef, MutableRef } from "preact/hooks";
import InputField from "./InputField";
import { Link } from "preact-router";

const Register = () => {
  const phoneRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const checkedPasswordRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="sign-form">
      <div className="w-[7rem] mb-4">logo</div>
      <div className="mb-6">
        <InputField
          text="請輸入手機號碼"
          icon="acc"
          type="number"
          ref={phoneRef}
        />
        <InputField text="請輸入密碼" icon="pw" ref={passwordRef} />
        <InputField text="請再次輸入密碼" icon="pw" ref={checkedPasswordRef} />
        <div className="font-extralight block h-[2.4rem] rounded-[2.4rem] text-white text-center leading-[2.4rem] bg-[#ff978d]">
          立即註冊，心上戶即贈送 150 金幣
        </div>
        <div className="font-extralight text-center text-[.7rem] mt-2">
          <Link className="text-[#a8a8a8]" href="/login">
            已有帳戶，登陸去
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
