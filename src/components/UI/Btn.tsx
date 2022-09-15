import { h, FunctionalComponent } from "preact";

interface BtnProps {
  title: string;
  bgColor?: string;
  cb?: () => any;
}

const Btn: FunctionalComponent<BtnProps> = ({
  title,
  cb,
  bgColor = "bg-[#d19463]",
}) => {
  return (
    <button
      className={`w-full py-4 text-center text-white text-lg ${bgColor} rounded-xl`}
      onClick={() => {
        cb && cb();
      }}
    >
      {title}
    </button>
  );
};

export default Btn;
