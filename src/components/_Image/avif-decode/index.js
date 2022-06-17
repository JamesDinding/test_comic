import { checkDecoderSupported } from "./check-decoder.js";
import { decodeMov } from "./avif-decoder.js";

//@ts-ignore
import dav1d from "./dav1d.js";
import { rgba2bmp } from "./bmp.js";
import { avif2obu, avif2mov } from "./mov.js";

const WASM_URL = "./dav1d.wasm";

export function blob2Base64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

function blob2ArrayBuffer(blob) {
  return new Promise((resolve, _) => {
    let arrayBuffer = null;
    const reader = new FileReader();

    reader.onload = function (event) {
      arrayBuffer = event.target.result;
      resolve(arrayBuffer);
    };

    reader.readAsArrayBuffer(blob);
  });
}

function arr2blob(bmpArr) {
  return new Blob([bmpArr], { type: "image/bmp" });
}

// polyfillDecodeAvif => dav1d
function dav1dDecodeAvif(avifArr, decoderContext) {
  const obuArr = avif2obu(avifArr);

  const bmpArr = decoderContext.unsafeDecodeFrameAsBMP(obuArr.data);
  const blob = arr2blob(bmpArr);

  decoderContext.unsafeCleanup();

  return blob;
}

// nativeDecodeAvif => av1
async function av1DecodeAvif(avifArr) {
  const movArr = avif2mov(avifArr);

  const decoded = await decodeMov(movArr);
  const bmpArr = rgba2bmp(decoded.data, decoded.width, decoded.height);

  return arr2blob(bmpArr);
}

// input: Blob
// output: base64
export default function avifDecoder(imgBlob) {
  return new Promise(async (resolve, reject) => {
    const imgUrl = await blob2Base64(imgBlob);
    const avifImgUrl = imgUrl.replace("application/octet-stream", "image/avif");

    // 先檢查是否可以直接解碼
    let decoderType = await checkDecoderSupported(avifImgUrl);

    if (decoderType == "native") {
      return resolve(avifImgUrl);
    }

    let avifArr = null;

    if (!Blob.arrayBuffer) {
      avifArr = await blob2ArrayBuffer(imgBlob);
    } else {
      avifArr = await imgBlob.arrayBuffer();
    }

    if (decoderType === "wasm") {
      let dCtx = await dav1d.create({ wasmURL: WASM_URL });

      // polyfillDecodeAvif(client, id, avifArr) return blob
      return resolve(await blob2Base64(dav1dDecodeAvif(avifArr, dCtx)));
    }

    if (decoderType === "av1") {
      return resolve(await blob2Base64(await av1DecodeAvif(avifArr)));
    }

    return reject("no image found.");
  });
}
