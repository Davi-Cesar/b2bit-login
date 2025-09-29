// import { Profile } from "./screens/profile";
import { Profile } from "./screens/profile";
import { SignIn } from "./screens/signin";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter basename="/b2bit-login">
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
