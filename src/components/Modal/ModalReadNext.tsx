import { h, FunctionalComponent } from "preact";
import CardBottom from "./CardBottom";
import ModalTitle from "../UI/ModalTitle";
import Btn from "../UI/Btn";
import { useRouter } from "../../context/router";
import { route } from "preact-router";

interface ModalReadNextProps {
  onClose: () => void;
  nextChapter: string;
  resetPageData: () => void;
}

const ModalReadNext: FunctionalComponent<ModalReadNextProps> = ({
  onClose,
  nextChapter,
  resetPageData,
}) => {
  const { customRouter } = useRouter();
  console.log(nextChapter);

  return (
    <CardBottom>
      <ModalTitle title="温馨提示" onClose={onClose} />
      <div className="p-5">
        <Btn
          title="前往下一章"
          bgColor="bg-[#8d6d9f]"
          cb={() => {
            resetPageData();
            customRouter.push(nextChapter);
            onClose();
            route(nextChapter);
          }}
        />
      </div>
    </CardBottom>
  );
};

export default ModalReadNext;
