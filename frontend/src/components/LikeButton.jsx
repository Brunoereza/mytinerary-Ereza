import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import intinerariesActions from '../redux/actions/intinerariesActions'

export const LikeButton = () => {

    const dispatch = useDispatch()
  const [reload,setReload] = useState(false)
  const userLogin = useSelector(store => store.usersReducers.user)
  let intineraries = useSelector(state=>state.intinerariesReducer.intineraries)

  async function likeOrDislikes(event) {
    await dispatch(intinerariesActions.likeDislike(event.target.id))//con el dispatch traigo la accion de likeOrDislikes de mis actions, escucha el event.target.id al dar click
    setReload(!reload)
}

  return (
    <div>
    {intineraries.map(e=>
    {userLogin?       

        (<div >  {e?.likes.includes(userLogin?.user._id) ?
          <span onClick={likeOrDislikes} id={e?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite</span> :
          <span onClick={likeOrDislikes} id={e?._id} style={{ color: "red", fontSize: 30 }} className="material-icons likeDislike corazon">favorite_border</span>}</div>)

      : (<span style={{ fontSize: 30 }} className="material-icons">favorite_border</span>)}
    )}

    </div>
  )
}
