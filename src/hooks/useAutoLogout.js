import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";

export default function useAutoLogout(userId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); 

    if (!token && userId) {
      dispatch(removeUser());
      navigate("/login");
    }
    let idleTimer, sessionTimer;

    const logout = async () => {
      try {
        if (userId) {
          await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });

        }
      } catch (err) {
        console.error("Logout API error:", err);
      }

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
  }, []);
}
