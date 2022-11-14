import { h, FunctionalComponent } from "preact";

interface EmptyProps {
  bgColor?: string;
  msg?: string;
}

const Empty: FunctionalComponent<EmptyProps> = ({
  bgColor = "bg-[#fcf6ff]",
  msg = "啥都没有呢~",
}) => {
  return (
    <div
      className={`flex justify-center items-center min-h-[160px] ${bgColor}`}
    >
      <span className="text-[#6d5694] opacity-40">{msg}</span>
    </div>
  );
};

export default Empty;
