import { FunctionalComponent, h } from "preact";
import { useRef, MutableRef } from "preact/hooks";
import InputField from "./InputField";
import { Link } from "preact-router";

const Login = () => {
  const phoneRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

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
        <div className="font-extralight block h-[2.4rem] rounded-[2.4rem] text-white text-center leading-[2.4rem] bg-[#ff978d]">
          登錄
        </div>
        <div className="font-extralight text-center text-[.7rem] mt-2">
          <Link href="/register" className="text-[#a8a8a8]">
            沒有帳戶，立即註冊
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
