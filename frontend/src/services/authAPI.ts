import { fetchClient } from "./apiClient";

export const authAPI = {
  login: async (email: string, password: string) => {
    return fetchClient<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (email: string, password: string) => {
    return fetchClient<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
};
