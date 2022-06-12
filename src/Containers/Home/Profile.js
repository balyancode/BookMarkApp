import { Button } from 'antd'
import React from 'react'
import UserAvatar from '../UserAvatar'

const Profile = ({name,onCLickLogout}) => {
    const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
       {
          <div className='flex'  style={{justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <UserAvatar size={50}
        image={name.picture || ""} 
        name={name.name || "U"}/>
        <h4 style={{margin:"10px"}}>{user.name || "User"}</h4>
        <Button type='primary'  onClick={onCLickLogout}>SignOut</Button>
      </div>
             }
    </div>
  )
}

export default Profile
