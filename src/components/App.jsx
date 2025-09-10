import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Feed from "./Feed"
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile"
import SignUp from "./SignUp";
import ResetPassword  from "./ResetPassword";
import Requests from "./Requests";
import useAutoLogout from "../hooks/useAutoLogout";
import { useSelector } from "react-redux";
import Connections from "./Connections";
import Messages from "./Messages";


function App() {
  const user = useSelector((store) => store.user);
  useAutoLogout(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;