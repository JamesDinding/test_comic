import { h, FunctionalComponent } from "preact";

interface BtnProps {
  title: string;
  cb?: () => any;
}

const Btn: FunctionalComponent<BtnProps> = ({ title, cb }) => {
  return (
    <button
      className="w-full py-2.5 text-center text-white text-lg bg-[#d19463] rounded-xl"
      onClick={() => {
        cb && cb();
      }}
    >
      {title}
    </button>
  );
};

export default Btn;
