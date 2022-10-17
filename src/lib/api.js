// /api/v1/auth
export async function login(acc, pw) {
  const res = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ username: acc, password: pw }),
  });

  const data = await res.json();

  if (data.error) throw new Error(data.message);

  return data;
}

export async function logout() {
  const res = await fetch("/api/v1/auth/logout", {
    method: "POST",
    credentials: "same-origin",
  });

  const data = await res.json();

  if (!data.error) {
    throw new Error("Failed to loggout.");
  }

  return data.error;
}

// /api/v1/my
// 取得用戶資訊
export async function getProfile() {
  const response = await fetch("/api/v1/my/profile");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// 取得用戶收藏清單
export async function getMyBookmarks() {
  const response = await fetch("/api/v1/my/bookmarks");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// 取得用戶購買清單
export async function getMyAcquisitions() {
  const response = await fetch("/api/v1/my/acquisitions");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// 取得充值紀錄
export async function getMyOrders() {
  const response = await fetch("/api/v1/my/orders");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// 取得內購紀錄
export async function getMyTransactions() {
  const response = await fetch("/api/v1/my/transactions");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// 註冊帳號
export async function postRegister() {
  const response = await fetch("/api/v1/my/register");
  const data = await response.json();
  if (data.error) throw new Error(data.message || "could not get User data");

  return data;
}

// /api/v1/block
export async function getAllBlock() {
  const response = await fetch("/api/all/block");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "could not get block data");

  return data;
}

export async function createOrder(title, price) {
  const response = await fetch("/api/v1/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_name: title,
      price: price,
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "could not get User data");

  return data;
}

export async function getDomains(type) {
  // const
  const response = await fetch("/test/v1/domain?type=" + type.toString());
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "could not get Domain");

  return data;
}

export async function getImageSource(encSrc) {
  const sourceDomain = "";
  const controller = new AbortController();

  let timer = setTimeout(() => {
    controller.abort();
  }, 6000);

  return await fetch("//" + sourceDomain[0] + "/" + encSrc, {
    signal: controller.signal,
  })
    .then(async (res) => {
      let b64 = await res.text();
      b64 = b64.replace(/\+/g, "*").replace(/\//g, "+").replace(/\*/g, "/");
      clearTimeout(timer);
      return b64;
    })
    .catch((err) => {
      console.log(err.message || "src not found!");
    });
}
