import { FunctionalComponent, h } from "preact";
import { StateUpdater } from "preact/hooks";

interface PopBackDrop {
  onClose: StateUpdater<boolean>;
  onReset?: () => void;
  onCallback?: () => void;
}

const BackDrop: FunctionalComponent<PopBackDrop> = ({
  onClose,
  onReset,
  onCallback,
}) => {
  return (
    <div
      className="back-drop"
      onClick={() => {
        onReset && onReset();
        onCallback && onCallback();
        onClose(false);
      }}
    ></div>
  );
};

export default BackDrop;
