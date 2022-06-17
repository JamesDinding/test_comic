export function hasAv1Support() {
  const vid = document.createElement("video");
  return vid.canPlayType('video/mp4; codecs="av01.0.05M.08"') === "probably";
}

// Decode AVIF data using native browser's AV1 decoder.
const isEdge = navigator.userAgent.indexOf("Edge") >= 0;
export function decodeMov(arr) {
  // av1解碼，將圖片放盡video中，形成一幀的影片
  const blob = new Blob([arr], { type: "video/mp4" });
  const blobURL = URL.createObjectURL(blob);

  return new Promise((resolve, reject) => {
    const vid = document.createElement("video");

    vid.addEventListener(isEdge ? "ended" : "loadeddata", () => {
      if (
        (vid.mozDecodedFrames == null || vid.mozDecodedFrames > 0) &&
        (vid.webkitDecodedFrameCount == null || vid.webkitDecodedFrameCount > 0)
      ) {
        resolve(vid);
      } else {
        reject(new Error("partial AV1 frame"));
      }
    });
    vid.addEventListener("error", () => {
      reject(new Error("cannot decode AV1 frame"));
    });
    vid.muted = true;
    vid.src = blobURL;
    vid.play();
  })
    .then((vid) => {
      // 利用canvas 把video的畫面繪製在上面，再回傳該畫面的寬、高和buffer
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      c.width = vid.videoWidth;
      c.height = vid.videoHeight;
      ctx.drawImage(vid, 0, 0, c.width, c.height);
      const imgData = ctx.getImageData(0, 0, c.width, c.height);
      return {
        width: c.width,
        height: c.height,
        data: imgData.data.buffer,
      };
    })
    .then(
      (res) => {
        // 註銷
        URL.revokeObjectURL(blobURL);
        return res;
      },
      (err) => {
        URL.revokeObjectURL(blobURL);
        throw err;
      }
    );
}
