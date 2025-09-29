// import { Profile } from "./screens/profile";
import { Profile } from "./screens/profile";
import { SignIn } from "./screens/signin";

import { Routes, Route, BrowserRouter } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/b2bit-login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
