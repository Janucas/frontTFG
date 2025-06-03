const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

function getAuthHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getEquipajes() {
  const response = await fetch(`${API_URL}/equipajes`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("No se pudieron obtener los equipajes");
  }
  return await response.json();
}
