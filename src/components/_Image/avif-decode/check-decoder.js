import { hasAv1Support } from "./avif-decoder.js";
import { hasWasmSupport } from "./check-wasm.js";

export const checkDecoderSupported = (dataUri) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve("native");
      // using native decode tools browser provided
    };

    image.onerror = () => {
      // check supported decoder, native/av1/dav1d(wasm)
      hasAv1Support() && resolve("av1");
      // check wasm
      hasWasmSupport() && resolve("wasm");

      // no decoder could be used
      reject("no supported decoder");
    };

    image.src = dataUri;
  });
};
