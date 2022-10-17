import { h, FunctionalComponent } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useObserver } from "../../context/observer";
import { useDomain } from "../../context/domain";

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
  const { srcDomain } = useDomain();
  const [imageBlob, setImageBlob] = useState("");

  const observer = useObserver();
  const { ref, isShown } = observer.observe();

  useEffect(() => {
    console.log(isShown, srcDomain);
    if (isShown || !srcDomain) return;
    (async () => {
      try {
        const res = await fetch("//" + srcDomain + "/" + path);

        if (!res.ok) throw new Error("fail to fetch");

        let b64 = await res.text();
        b64 = b64.replace(/\+/g, "*").replace(/\//g, "+").replace(/\*/g, "/");

        setImageBlob(b64);
        setParentPending(false);
      } catch (err) {
        console.log(err);
      }
    })();

    // (async () => {
    //   if (!isShown) return;
    //   let res = await send({
    //     action: "GetResourceImage",
    //     data: {
    //       path: path,
    //     },
    //   });
    //   if (res.imageblob !== undefined) {
    //     setImageBlob(res.imageblob);
    //     setParentPending(false);
    //   }
    // })();
  }, [isShown, srcDomain]);

  return <img src={imageBlob} alt={alt} ref={ref} />;
};

export default Image;
