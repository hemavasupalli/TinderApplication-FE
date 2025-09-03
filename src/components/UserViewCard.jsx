import React from "react";


const UserViewCard = ({ feed }) => {
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
