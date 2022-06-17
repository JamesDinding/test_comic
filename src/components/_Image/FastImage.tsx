import { h, FunctionalComponent } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useObserver } from "../../context/observer";
import { useWorker } from "../../context/worker";

import avifDecoder from "./avif-decode/index";

interface ImageProps {
  alt: string;
  path: string;
  setParentPending: StateUpdater<boolean>;
}

class ImageFactory {
  static isRegisted = false;
  static dCtx = null;
  static regist() {}
  static unregist() {}

  create(imageBlob: Blob, type: string) {
    !ImageFactory.isRegisted && ImageFactory.regist();

    if (type === "avif") {
      return;
    }
  }
}

class avifImage {
  imgBase64;
  constructor(imgBlob: Blob) {
    this.imgBase64 = this.decode(imgBlob);
  }

  decode(imageBlob: Blob) {
    return imageBlob;
  }
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
        console.log(res);
        const blob = await res.blob();
        const base64IMG = await avifDecoder(blob);

        setImageBase64(base64IMG);
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
        console.log(res.imageblob);
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
