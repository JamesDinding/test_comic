## AVIF DECODER

### INPUT

`Blob`

### OUTPUT

`base64`

### FLOW

### First step

宣告工廠在 APP 的 root component
載入範例的 avif 檔案，測試當前瀏覽器支援版本(native, av1 and dav1d)，並存取

### Second step

將 blob 轉成 base64

native：

`瀏覽器可直接解碼，直接回傳base64`

## 原生不支援時

將 blob 轉成 arraybuffer

解碼器為 av1：

`將arraybuffer => obu => mov，轉成 mov : arraybuffer 的形式，<video> 才能解讀`

`生成blob再生成url，放在<video>，形成1幀的影片`

`再利用<canvas>擷取該畫面資訊，生成{width, height, buffer}`

`最後將此資料轉成base64後回傳`

解碼器為 dav1d：

`載入dav1d.wasm後生成一個class dav1d，儲存在dContext`

`將arraybuffer => obu，{width, height, data: Unit8Array}`

`將obu解碼成，bmp format 的 Unit8Array`

`在將bmp轉成blob，最後blob轉成base64後回傳`
