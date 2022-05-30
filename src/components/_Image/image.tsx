import { h, FunctionalComponent } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useObserver } from "../../context/observer";

import { useWorker } from "../../context/worker";

interface ImageProps {
  alt: string;
  path: string;
  setParentPending: StateUpdater<boolean>;
}

const Image: FunctionalComponent<ImageProps> = ({
  alt,
  path,
  setParentPending,
}) => {
  const { send } = useWorker();
  const [imageBlob, setImageBlob] = useState("");

  const observer = useObserver();
  const { ref, isShown } = observer.observe();

  useEffect(() => {
    (async () => {
      if (!isShown) return;

      let res = await send({
        action: "GetResourceImage",
        data: {
          path: path,
        },
      });

      if (res.imageblob !== undefined) {
        setImageBlob(res.imageblob);
        setParentPending(false);
      }
    })();
  }, [isShown]);

  return <img src={imageBlob} alt={alt} ref={ref} />;
};

export default Image;
