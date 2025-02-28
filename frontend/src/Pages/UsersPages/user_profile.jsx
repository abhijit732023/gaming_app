import React from 'react'
import {useAuth} from './../../FilesPaths/allpath.js'

function User_profile() {
  const {user}= useAuth()

  
  return user? <div>{user.username}</div>: <div>no profile</div>
}

export default User_profile
