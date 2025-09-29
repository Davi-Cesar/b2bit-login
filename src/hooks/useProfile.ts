import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  avatar: string | null;
  type: string;
  created: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }

        const res = await api.get<UserProfile>("/auth/profile/");
        setProfile(res.data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}
