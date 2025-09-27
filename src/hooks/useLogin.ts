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
      const response = await api.post(
        "https://api.homologation.cliqdrive.com.br/auth/login/",
        data
      );
      // Exemplo: salvar token
      localStorage.setItem("token", response.data?.token ?? "");
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro no login");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
