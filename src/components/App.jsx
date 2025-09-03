import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Feed from "./Feed"
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile"
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import SignUp from "./SignUp";
import ResetPassword  from "./ResetPassword";
import Connections from "./Connections";


function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/connections" element={<Connections />}/>
            <Route path="/resetpassword" element={<ResetPassword />}/>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
