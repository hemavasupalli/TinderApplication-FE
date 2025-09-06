import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

export default function useAutoLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let idleTimer, sessionTimer;

    const logout = () => {
      Cookies.remove("token"); 
      dispatch(removeUser());
      navigate("/login");
    };

    // ⏳ Auto logout on inactivity (10 min)
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(logout, 10 * 60 * 1000); 
    };

    // 🕒 Absolute timeout (30 min)
    sessionTimer = setTimeout(logout, 30 * 60 * 1000);

    // Reset idle timer on user activity
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("keydown", resetIdleTimer);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(sessionTimer);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("keydown", resetIdleTimer);
    };
  }, [dispatch, navigate]);
}
