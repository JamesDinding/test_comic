import avifDecoder from "./avif-decode";
import { checkDecoderSupported } from "./avif-decode/check-decoder";

class ImageFactory {
  static registeredDecoder = "";

  // check current registered decoder
  printDecoder() {
    console.log(ImageFactory.registeredDecoder);
  }

  static async register() {
    // 利用小的avif檔案，檢查瀏覽器可使用的decoder
    const decoderType = await checkDecoderSupported(
      "data:image/avif;base64," +
        "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="
    );
    ImageFactory.registeredDecoder = decoderType;
  }

  constructor() {
    ImageFactory.register();
  }

  // factory pattern
  create(imageBlob: Blob, type: string) {
    if (type === "avif") {
      const res = new avifImage(imageBlob);

      return res;
    }
  }
}

// AVIF image instance created by factory
class avifImage {
  imgBlob;
  constructor(imgBlob: Blob) {
    this.imgBlob = imgBlob;
  }

  // decode avif for browser
  async decode() {
    return await avifDecoder(this.imgBlob, ImageFactory.registeredDecoder);
  }
}

export const imgFactory = new ImageFactory();
