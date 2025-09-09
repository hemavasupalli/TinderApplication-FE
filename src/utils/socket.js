import { BASE_URL } from "../constants"
import { io } from "socket.io-client"
export const formatTime = (isoString) => {
    if (!isoString) return "";
  
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return ""; // invalid date
  
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
  
    return `${hours}:${minutes} ${ampm}`;
  };

  export const formatLastSeen = (isOnline, lastSeen) => {
    if (isOnline) return "Online";
    if (!lastSeen) return "Offline";
  
    // Convert lastSeen to a Date object
    const last = new Date(lastSeen);
    const now = new Date();
    const diff = Math.floor((now - last) / 1000); // difference in seconds
  
    if (diff < 60) return "Last seen just now";
    if (diff < 3600) return `Last seen ${Math.floor(diff / 60)} m ago`;
    if (diff < 86400) return `Last seen ${Math.floor(diff / 3600)} h ago`;
    if (diff < 604800) return `Last seen ${Math.floor(diff / 86400)} d ago`;
  
    // Older than 7 days → show date
    return `Last seen on ${last.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}`;
  };
  
  
  
  
  
export const createSocketConnection = () => {
    if(location.hostname === "localhost")
{    return io(BASE_URL);
}else {
    return io("/" , {path: "/api/socket.io"} );
}
}

