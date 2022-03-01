import React from 'react';
import {useSelector} from 'react-redux';
const Profile = () =>{
    const {user} = useSelector((state)=> state.auth);
return (
    <div>
        <h1>Profile</h1>
        <div>
        <p>{user.user.email}</p>
        </div>
    </div>
    );
};

export default Profile;