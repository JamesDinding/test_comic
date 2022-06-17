import { h, FunctionalComponent } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useObserver } from "../../context/observer";
import { useWorker } from "../../context/worker";

import avifDecoder from "./avif-decode/index";
import { imgFactory } from "./ImageFactory";

interface ImageProps {
  alt: string;
  path: string;
  setParentPending: StateUpdater<boolean>;
}

const FastImage: FunctionalComponent<ImageProps> = ({
  alt,
  path,
  setParentPending,
}) => {
  const { send } = useWorker();
  const [imageBase64, setImageBase64] = useState("");

  const observer = useObserver();
  const { ref, isShown } = observer.observe();

  useEffect(() => {
    (async () => {
      /*******test start*******/
      fetch("/assets/img/Test-avif/Mexico.avif").then(async (res) => {
        const blob = await res.blob();
        const temp = imgFactory.create(blob, "avif");
        const imgBase = await temp?.decode();

        setImageBase64(imgBase);

        // const base64IMG = await avifDecoder(blob);
      });
      /*******test end*******/

      if (!isShown) return;

      let res = await send({
        action: "GetResourceImage",
        data: {
          path: path,
        },
      });

      if (res.imageblob !== undefined) {
        const avifBase64Img = await avifDecoder(res.imageblob);
        setImageBase64(avifBase64Img);
        setParentPending(false);
      }
    })();
  }, [isShown]);

  //   return <img src="/assets/img/Test-avif/Mexico.avif" alt={alt} ref={ref} />;
  return <img src={imageBase64} alt={alt} ref={ref} />;
};

export default FastImage;
