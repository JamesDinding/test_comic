import { FunctionalComponent, h } from "preact";
import { StateUpdater } from "preact/hooks";

interface PopBackDrop {
  onClose: StateUpdater<boolean>;
  onReset?: () => void;
}

const BackDrop: FunctionalComponent<PopBackDrop> = ({ onClose, onReset }) => {
  return (
    <div
      className="back-drop"
      onClick={() => {
        onReset && onReset();
        onClose(false);
      }}
    ></div>
  );
};

export default BackDrop;
