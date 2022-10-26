import { h, Fragment as F, FunctionComponent } from "preact";
import { useState, useRef, useEffect } from "preact/hooks";
import BookListItem from "../components/_Book/ListItem";
import RecommendTitleBar from "../components/Home/RecommendTitleBar";
import { ObserverProvider } from "../context/observer";
import IconCoin from "../resources/img/icon-coin.svg";
import ModalBuy from "../components/Modal/ModalBuy";
import { useDomain } from "../context/domain";
import Image from "../components/_Image/image";
import { getSpecifiedCategory, postOrdersCharge } from "../lib/api";

const Test: FunctionComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { srcDomain } = useDomain();
  const [src, setSrc] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (!srcDomain) return;
    fetch(
      "//" + srcDomain + "/4682/coverba658621760039d79eed365098351a46.js"
    ).then(async (res) => {
      let b64 = await res.text();
      b64 = b64.replace(/\+/g, "*").replace(/\//g, "+").replace(/\*/g, "/");
      setSrc(b64);
    });
  }, [srcDomain]);

  useEffect(() => {
    postOrdersCharge().then((data) => {
      console.log(data);
    });
  });

  return <F></F>;
};

export default Test;
