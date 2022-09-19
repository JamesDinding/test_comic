import { h, FunctionalComponent, Fragment as F } from "preact";
import IconCross from "../../resources/img/icon-cross.svg";

interface ModalTitleProps {
  title: string;
  onClose: () => void;
}

const ModalTitle: FunctionalComponent<ModalTitleProps> = ({
  title,
  onClose,
}) => {
  return (
    <F>
      <div className="modal-cross" onClick={() => onClose()}>
        <IconCross class="h-8" />
      </div>
      <div className="modal-title">{title}</div>
    </F>
  );
};

export default ModalTitle;
