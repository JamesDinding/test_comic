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
