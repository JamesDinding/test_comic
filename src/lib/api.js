export async function getAllBlock() {
  const response = await fetch("/api/all/block");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "could not get block data");

  return data;
}

export async function getUser() {
  const response = await fetch("/api/v1/users/id");
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "could not get User data");

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

export async function getOrders() {
  const response = await fetch("/api/v1/orders/id");
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
