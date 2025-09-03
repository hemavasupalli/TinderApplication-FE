import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
  const user = useSelector(store=>store.user)
  const { firstName, lastName, age , gender , photoUrl , about}= user
  return (
    <div className="flex justify-center">
    <div className="card bg-base-100 shadow-sm w-64 mt-20">
    <figure>
      <img
        src={photoUrl}
        alt="photo" />
    </figure>
    <div className="card-body">
      <h2 className="card-title">{firstName +" "+lastName}</h2>
      <p >{age +" ,"+gender}</p>

      <p>{about}</p>
      <div className="card-actions  flex justify-center">
        <button className="btn btn-primary">Ignore</button>
        <button className="btn btn-secondary">Interested</button>

      </div>
    </div>
  </div>
</div>
  )
}

export default Feed