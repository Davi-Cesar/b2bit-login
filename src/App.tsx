// import { Profile } from "./screens/profile";
import { SignIn } from "./screens/signin";

import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Routes>
      {/* <Route path="/profile" element={<Profile />} /> */}
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}
