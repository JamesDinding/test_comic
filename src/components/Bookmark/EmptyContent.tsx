import { FunctionalComponent, h } from "preact";
interface EmptyContentProps {
  title: string;
}

const EmptyContent: FunctionalComponent<EmptyContentProps> = ({ title }) => {
  return (
    <div className="w-[10rem] my-12 mx-auto text-center text-[#cecece]">
      <div className="opacity-50 grayscale mx-auto w-16">img</div>
      <div>{title}</div>
    </div>
  );
};

export default EmptyContent;
