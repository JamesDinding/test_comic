import { FunctionalComponent, h } from "preact";

interface EmptyProps {
  title: string;
  url: string;
}

const Empty: FunctionalComponent<EmptyProps> = ({ title, url }) => {
  return (
    <div className="pt-[100px] text-center">
      <button className="rounded-[2.4rem] text-white text-center py-[10px] px-[64px] bg-[#ff978d]">
        {title}
      </button>
    </div>
  );
};

export default Empty;
