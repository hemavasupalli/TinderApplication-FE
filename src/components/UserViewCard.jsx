import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserViewCard = ({ feed }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center">
      <div className="card bg-base-100 shadow-sm w-64 mt-20">
        <figure>
          <img src={feed?.photoUrl} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{feed?.firstName} {feed?.lastName}</h2>
          <p>{feed?.age ? `${feed.age}, ${feed.gender}` : feed?.gender}</p>
          <p>{feed?.about}</p>
          <div className="card-actions flex justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewCard;
