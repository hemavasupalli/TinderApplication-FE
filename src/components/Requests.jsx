import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import ConnectionCard from "./ConnectionCard";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const handleRequests = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error("Error handling request:", err);
    }
  };

  const fetchRequests = async () => {
    if (requests.length > 0) return; // only fetch if empty
    try {
      const res = await axios.get(`${BASE_URL}/user/requests`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <h1 className="text-center text-gray-500 mt-10">No requests found</h1>
    );
  }

  return (
    <div className="flex flex-col items-center my-5 px-2 md:px-0 w-full">
      {/* Section Heading */}
      <h1 className="text-xl font-bold text-gray-900 mb-4 text-center tracking-wide relative">
        Requests
        <div className="w-16 h-1 bg-black mx-auto mt-2 rounded-full"></div>
      </h1>

      {/* Scrollable request list */}
      <div className="w-full max-w-3xl max-h-[70vh] overflow-y-auto space-y-4 pr-2">
        {requests.map((req) => (
          <ConnectionCard
            key={req._id}
            connection={req.fromUserId}
            requestId={req._id}
            showActions={true}
            handleRequests={handleRequests}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;