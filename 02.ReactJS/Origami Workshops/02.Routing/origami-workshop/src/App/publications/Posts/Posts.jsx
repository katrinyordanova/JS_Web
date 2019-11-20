import React from 'react';
import './Posts.css';
import Post from './Post/Post';
import postService from '../../../services/post-service';
import PropTypes from 'prop-types';

class Posts extends React.Component {
    state = {
        posts: null
    };
    textInput = null;

    componentDidMount() {
        postService.load(null, this.props.limit).then(posts => {
            this.setState({ posts });
        });
    }

    inputChangeHandler = (e) => {
        console.log(e.target.value);
    }   

    render() {
        const { posts } = this.state;

        return (
            <div>
                {posts ? 
                <div className="Posts">
                    <h1>Publications</h1>
                    {posts.map((post) =>
                        <Post key={post.id} imageUrl="/blue-origami-bird.png" imageAlt="alt" author={post.author.username}>{post.description}</Post>)
                    }
                </div> : <div>Loading...</div>
                }
            </div>
        )
    }
}

Posts.propTypes = {
    limit: PropTypes.number 
}
export default Posts;