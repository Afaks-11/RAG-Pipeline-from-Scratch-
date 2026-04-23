const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export async function fetchClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Force fetch to throw an error on bad status codes (4xx, 5xx)
  if (!response.ok) {
    let errorMessage = `HTTP Error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (err) {}
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
}
