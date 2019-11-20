import React from 'react';
import './CreatePost.css';
import Posts from '../Posts/Post/Post';

function CreatePost() {
    return (
        <div className="Input">
            <div>
                <h1>Share your thoughts...</h1>
                <textarea name="description" id="description" cols="30" rows="10"></textarea>
                <button>Post</button>
            </div>
            <div>
                <h2>Last 3 post on your wall</h2>
                <Posts />
            </div>
        </div>
    )
}

export default CreatePost;