export async function getAllBlock() {
  const response = await fetch("/api/all/block");
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "could not fecth");

  return data;
}
