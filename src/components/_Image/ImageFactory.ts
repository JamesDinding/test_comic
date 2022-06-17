import avifDecoder from "./avif-decode";
import { checkDecoderSupported } from "./avif-decode/check-decoder";
import dav1d from "./avif-decode/dav1d";
import FastImage from "./FastImage";

const WASM_URL = "/assets/dav1d.wasm";

class ImageFactory {
  static registeredDecoder = "";
  static dCtx: any = null;

  printDecoder() {
    console.log(ImageFactory.registeredDecoder);
    console.log(ImageFactory.dCtx);
  }

  static async register() {
    // 檢查瀏覽器可使用的decoder
    const decoderType = await checkDecoderSupported(
      "data:image/avif;base64," +
        "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
    );
    ImageFactory.registeredDecoder = decoderType;

    // decoder為dav1d，需要用到wasm，要額外給context
    if (decoderType === "wasm")
      ImageFactory.dCtx = await dav1d.create({ wasmURL: WASM_URL });
  }

  constructor() {
    ImageFactory.register();
  }

  create(imageBlob: Blob, type: string) {
    // !ImageFactory.isRegisted && ImageFactory.register();

    if (type === "avif") {
      const res = new avifImage(imageBlob);

      return res;
    }
  }
}

class avifImage {
  imgBlob;
  constructor(imgBlob: Blob) {
    this.imgBlob = imgBlob;
  }

  async decode() {
    console.log(ImageFactory.dCtx);
    return await avifDecoder(
      this.imgBlob,
      ImageFactory.registeredDecoder,
      ImageFactory.dCtx
    );
  }
}

export const imgFactory = new ImageFactory();
