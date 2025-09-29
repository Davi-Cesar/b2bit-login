import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function Profile() {
  const { profile, loading, error } = useProfile();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Erro: {error}
      </div>
    );
  if (!profile)
    return (
      <div className="flex h-screen items-center justify-center">
        Desculpe Nenhum perfil encontrado <span>erro 404</span>
      </div>
    );

  const handleLogout = () => {
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="flex justify-end p-4 shadow-sm bg-white">
        <Button
          onClick={handleLogout}
          className="bg-blue-900 hover:bg-blue-800 text-white font-semibold"
        >
          Logout
        </Button>
      </header>

      {/* Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <Card className="w-full max-w-md rounded-2xl shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Profile picture
            </CardTitle>
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar ?? ""} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-800">
                Your <span className="font-semibold">Name</span>
              </p>
              <div className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm">
                {profile.name}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-800">
                Your <span className="font-semibold">E-mail</span>
              </p>
              <div className="w-full rounded-md bg-gray-100 px-3 py-2 text-sm">
                {profile.email}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
