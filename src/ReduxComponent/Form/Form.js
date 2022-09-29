import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { Creator, Updater } from "../Redux/AsyncActions/AsyncActions";
import "./Form.css"
import {useNavigate} from "react-router-dom"


function Form({ currentId, setCurrentId }) {

    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = profile?.userToken?.name;
    const navigate = useNavigate();

    const [postData, setPostData] = useState(
        {
            // creator: "",
            title: "",
            message: "",
            tags: "",
            image: ""
        }
    );

    const post = useSelector(
        (state) => (
            currentId ? state.posts.reply.find(
                (message) => message._id === currentId) : null
        )
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post]);

    const resetHandler = () => {
        setCurrentId(0);
        setPostData(
            {
                // creator: ' ',
                title: ' ',
                message: ' ',
                tags: ' ',
                image: ' '
            }
        );
    };

    var oldPost = {...postData};
    oldPost.name = user;
    var newPost = {...oldPost, name: user}


    const submitHandler = async (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(Creator({ ...postData, name: user }, navigate));
            resetHandler();
        } else {
            dispatch(Updater(currentId, newPost))
            resetHandler();
        }
    };

    function TitleHandler() {
        if (currentId) {
            return (
                <div className='form_title'>"Editing "{post.title}</div>
            )
        }
        else {
            return (
                <div className='form_title'>Creating a memory</div>
            )
        }
    }

    if (!user) {
        return (
            <div className='no_user'>
                <h2 className='no_user_text'>
                    Sign in to create your own memories and like other's memories
                </h2>
            </div>

        );
    }



    return (
        <div className='form_container'>
            {TitleHandler()}
            <div className='the_form'>
                <form autoComplete="off" onSubmit={submitHandler}>
                    {/* <label className='textfield'>
                        <input
                            type="text"
                            name="creator"
                            placeholder='Creator'
                            value={postData.creator}
                            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                        />
                        <span>Creator</span>
                    </label> */}
                    <label className='textfield'>
                        <input
                            type="text"
                            name="title"
                            placeholder='Title'
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                        <span>Title</span>
                    </label>
                    <label className='textfield'>
                        <textarea
                            rows={4}
                            cols={22}
                            name="message"
                            placeholder='Message'
                            value={postData.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        />
                        <span>Message</span>
                    </label>
                    <label className='textfield'>
                        <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            name="tags"
                            value={postData.tags}
                            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                        />
                        <span>Tags</span>
                    </label>
                    Image:
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, image: base64 })}
                    />
                    <br /><br />
                    <div className='form_action'>
                        <button
                            className='form_reset'
                            type="reset"
                            onClick={resetHandler}
                        >
                            Reset
                        </button>
                        <input className='form_submit' type="submit" />
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Form;