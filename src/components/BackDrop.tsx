import { FunctionalComponent, h } from "preact";
import { StateUpdater } from "preact/hooks";

interface PopBackDrop {
  onClose: StateUpdater<boolean>;
}

const BackDrop: FunctionalComponent<PopBackDrop> = ({ onClose }) => {
  return <div className="back-drop" onClick={() => onClose(false)}></div>;
};

export default BackDrop;
