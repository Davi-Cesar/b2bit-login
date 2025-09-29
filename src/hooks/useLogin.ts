import { useState } from "react";
import { api } from "../services/api";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/auth/login/", data);
      const token = response.data?.tokens?.access;
      if (token) {
        localStorage.setItem("token", token);
      }

      return response.data;
    } catch (err: any) {
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
