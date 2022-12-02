import { h, FunctionalComponent } from "preact";
import { StateUpdater, useEffect, useState } from "preact/hooks";
import { useObserver } from "../../context/observer";
import { useDomain } from "../../context/domain";

interface ImageProps {
  alt: string;
  path: string;
  isFullHeight?: boolean;
  pendingHeight?: string;
  escapeObserve?: boolean;
  setParentPending: StateUpdater<boolean>;
  isChapterCover?: boolean;
}

const Image: FunctionalComponent<ImageProps> = ({
  alt,
  path,
  isFullHeight = true,
  pendingHeight = "",
  escapeObserve = false,
  setParentPending,
  isChapterCover = false,
}) => {
  const { srcDomain } = useDomain();
  const [imageBlob, setImageBlob] = useState("");

  const observer = useObserver();
  const { ref, isShown } = observer.observe();

  useEffect(() => {
    if (!escapeObserve) {
      if (!isShown) return;
    }

    if (!path && isChapterCover) {
      setImageBlob(
        "/assets/img/chapterCover/" +
          ((Math.floor(Math.random() * 78) % 78) + 1) +
          ".jpg"
      );
      setParentPending(false);
    }

    if (!path || !srcDomain) return;
    (async () => {
      try {
        const res = await fetch("//" + srcDomain + "/" + path);

        if (!res.ok) throw new Error("fail to fetch");

        let b64 = await res.text();
        b64 = b64.replace(/\+/g, "*").replace(/\//g, "+").replace(/\*/g, "/");

        setImageBlob(b64);
        setParentPending(false);
      } catch (err) {
        // setImageBlob(
        //   "/assets/img/chapterCover/" +
        //     ((Math.floor(Math.random() * 10) % 5) + 1) +
        //     ".jpg"
        // );
        setParentPending(true);
        console.error(err);
      }
    })();
  }, [path, isShown, srcDomain]);

  return (
    <img
      draggable={false}
      src={imageBlob || ""}
      className={
        "Image-component " +
        (isShown || escapeObserve
          ? isFullHeight
            ? " h-full "
            : " h-auto "
          : pendingHeight)
      }
      alt={alt}
      ref={ref}
    />
  );
};

export default Image;
