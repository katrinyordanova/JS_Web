import React from 'react';
import './Profile.css';
import Posts from '../App/publications/Posts/Posts';

function Profile() {
    return (
        <div className="Profile">
            <img src="http://www.kjosbigmouth.com/wp-content/uploads/2019/09/best-free-staff-man-profile-person-icon-circle-photos.jpg" alt="profile-icon"/>
            <div className="personal-info">
            <p>
                <span>Email:</span>
                kirilk@abv.bg
            </p>
            <p>
                <span>Posts:</span>
                9
            </p>
            </div>
            <div>
                <h2>3 of your recent posts</h2>
                <Posts />
            </div>
        </div>
    )
}

export default Profile;