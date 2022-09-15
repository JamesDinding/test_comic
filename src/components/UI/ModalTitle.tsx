import { h, FunctionalComponent } from "preact";

interface ModalTitleProps {
  title: string;
}

const ModalTitle: FunctionalComponent<ModalTitleProps> = ({ title }) => {
  return <div className="modal-title">{title}</div>;
};

export default ModalTitle;
