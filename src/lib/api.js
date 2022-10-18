function curryFetch_GET(route) {
  return async function (dynamic = "") {
    const isDynamic = !!dynamic;
    const response = await fetch(
      "/api/v1" + route + (isDynamic ? `/${dynamic.toString()}` : "")
    );
    const data = await response.json();
    if (data.error) throw new Error(data.message || route + " failed");

    return data;
  };
}

function curryFetch_GET_QUERY(route) {
  return async function (query = "") {
    const response = await fetch("/api/v1" + route + `?${query.toString()}`);
    const data = await response.json();
    if (data.error) throw new Error(data.message || route + " failed");

    return data;
  };
}

/******  AUTH ******/
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

  console.log();

  return !data.error;
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

/****** MY ******/
// 取得用戶資訊
export const getProfile = curryFetch_GET("/my/profile");

// 取得用戶收藏清單
export const getMyBookmarks = curryFetch_GET("/my/bookmarks");

// 取得用戶購買清單
export const getMyAcquisitions = curryFetch_GET("/my/acquisitions");

// 取得充值紀錄
export const getMyOrders = curryFetch_GET("/my/orders");

// 取得內購紀錄
export const getMyTransactions = curryFetch_GET("/my/transactions");

// 註冊帳號
export async function postMyRegister(acc, ps) {
  const response = await fetch("/my/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      acc: acc,
      ps: ps,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.error || route + " failed");

  return data;
}

// 更新綁定資訊
export async function postMyProfile(phone, mail, name) {
  const response = await fetch("/my/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: phone,
      mail: mail,
      name: name,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || route + " failed");

  return data;
}

/****** CONTENT  ******/
// 取得分類清單
export const getCategories = curryFetch_GET("/contents/categories");

// 取得指定分類
export const getSpecifiedCategory = curryFetch_GET("/contents/categories");

// 取得區塊內容
export const getAllBlock = curryFetch_GET_QUERY("/contents/blocks");

// 取得指定書本
export const getSpecifiedBook = curryFetch_GET("/contents/items");

// 取得指定書本章節清單
export const getSpecifiedBookChapterList = () => {};

// 取得指定書本敘述
export const getSpecifiedBookDescription = () => {};

// 取得指定書本章節順序內容
export const getSpecifiedBookContext = () => {};

// 取得指定書本章節ID內容
export const getSpecifiedBookIdContent = () => {};

// 搜尋
export const getSearch = () => {};

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

// /api/v1/domain  RESOURCE
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
