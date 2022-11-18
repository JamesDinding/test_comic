export const InMemoryStore = {
  // {
  //   data: "",
  //   expired: "",
  // }
};

function curryFetch_GET(route) {
  return async function (dynamic = "", freshness = 0) {
    // InMemoryStore[]
    const r = (route + (dynamic ? "/" + dynamic : "")).toString();

    console.log("inmoemoryStorare[]", InMemoryStore[r]);
    let isUsingCache =
      freshness >
      new Date().valueOf() - (InMemoryStore[r]?.expired?.valueOf() || 0);

    if (isUsingCache) {
      console.log("using cache");
      return InMemoryStore[r].data;
    } else {
      console.log("using fetch");
    const isDynamic = !!dynamic;
    const response = await fetch(
      "/api/v1" + route + (isDynamic ? `/${dynamic.toString()}` : "")
    );
    const data = await response.json();
    if (data.error) throw new Error(data.message || route + " failed");

    // in-memory
    InMemoryStore[r] = { data, expired: new Date() };

    return data;
    }
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

  if (data.error) {
    if (data.message === "already logged") return false;
    throw new Error(data.message);
  }

  return data;
}

export async function logout() {
  try {
    const res = await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });

    const data = await res.json();

    if (data.error) {
      throw new Error("Failed to loggout.");
    }

    return data.error;
  } catch (err) {
    throw new Error(err);
  }
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
  const response = await fetch("/api/v1/my/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: acc,
      password: ps,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || route + " failed");

  return data;
}

// auto register
export async function postMyRegisterRandom() {
  const response = await fetch("/api/v1/my/register/random", {
    method: "POST",
  });

  const data = await response.json();

  if (data.error) throw new Error(data.message || route + " failed");

  return data;
}

// 更新綁定資訊
export async function postMyProfile(phone, mail, name) {
  const response = await fetch("/api/v1/my/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: phone,
      email: mail,
      name: name,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || route + " failed");

  return data;
}

// 修改密碼
export async function postMyPassword(original, new_password) {
  const response = await fetch("/api/v1/my/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_password: new_password,
      old_password: original,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || route + " failed");

  return data;
}

export async function postMyBookmarks(id, action) {
  const response = await fetch("/api/v1/my/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item_id: id,
      action: action,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
}

/****** CONTENT  ******/
// 取得分類清單
export const getCategories = curryFetch_GET("/contents/categories");

// 取得指定分類
export const getSpecifiedCategory = async (category_id, page = 1) => {
  const res = await fetch(
    "/api/v1/contents/categories/" + category_id + "?page=" + page
  );
  const data = await res.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
};

// 取得區塊內容
// export const getAllBlock = curryFetch_GET_QUERY("/contents/blocks");
export const getAllBlock = curryFetch_GET("/contents/blocks");

// 取得指定區塊內容
export const getBlockById = async (id) => {
  const res = await fetch(`/api/v1/contents/blocks/${id}`);
  const data = await res.json();
  if (data.error) throw new Error("failed");
  return data;
};

// 取得指定書本
export const getSpecifiedBook = curryFetch_GET("/contents/items");

// 取得指定書本章節清單
export const getSpecifiedBookChapterList = async (item) => {
  const response = await fetch("/api/v1/contents/items/" + item + "/chapters");
  const data = await response.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
};

// 取得指定書本敘述
export const getSpecifiedBookDescription = async (comic_id) => {
  const res = await fetch(`/api/v1/contents/items/${comic_id}/description`);
  const data = await res.json();

  if (data.error) throw new Error("failed");

  return data;
};

// 取得指定書本章節順序內容
export const getSpecifiedBookContext = () => {};

// 取得指定書本章節ID內容
export const getSpecifiedBookIdContent = async (item, chapter) => {
  const response = await fetch(
    "/api/v1/contents/items/" + item + "/positions/" + chapter
  );
  const data = await response.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
};

// 搜尋
export const getSearch = curryFetch_GET_QUERY("/contents/search");

// 取得搜尋頁的常用關鍵字listk
export const getKeywords = curryFetch_GET("/contents/keywords");

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

// orders
// 內購
export const postOrdersPurchase = async (id) => {
  const response = await fetch("/api/v1/orders/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chapter_id: id,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
};

// 衝直
export const postOrdersCharge = async (
  product_payment_method_id,
  amount,
  client_ip,
  platform
) => {
  const response = await fetch("/api/v1/orders/charge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_payment_method_id,
      amount,
      client_ip,
      platform,
    }),
  });
  const data = await response.json();

  if (data.error) throw new Error(data.message || "failed");

  return data;
};

// 取得充值產品
export const getOrdersProducts = curryFetch_GET("/orders/products");

// 取得充值產品支付方式
export const getOrdersProductsId = curryFetch_GET("/orders/products");

// 跳轉支付位置
export const getOrdersRedirectOrderNum = curryFetch_GET("/orders/redirect");

// /api/v1/domain  RESOURCE
export async function getDomains(type) {
  // const
  const response = await fetch("/test/v1/domain/types?type=" + type.toString());
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
      console.error(err.message || "src not found!");
    });
}
