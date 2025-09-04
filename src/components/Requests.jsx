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
        BASE_URL + "/review/" + status + "/" + id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    if (requests.length > 0) return; // Only fetch if empty
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <h1 className="text-center text-gray-500 mt-10">No requests found</h1>
    );

  return (
    <div className="flex flex-col items-center my-10 space-y-6 px-2 md:px-0">
      <h1 className="text-2xl font-bold mb-6">Requests</h1>
      {requests.map((requests) => (
        <ConnectionCard
          key={requests._id}
          connection={requests.fromUserId}
          requestId ={requests._id}
          showActions={true}
          handleRequests={handleRequests}
        />
      ))}
    </div>
  );
};

export default Requests;
