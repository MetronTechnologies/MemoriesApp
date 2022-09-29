import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Commenter } from '../Redux/AsyncActions/AsyncActions';
import "./CommentSection.css";

function CommentSection({ post, postId }) {

    let theComments = post[0]?.comments;

    const [comments, setComments] = useState(theComments);
    const [comment, setComment] = useState("");
    const textareaRef = useRef("");
    const commentsRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    async function clickHandler() {
        const finalComment = `${user.userToken.name}: ${comment}`;
        setComment("");
        const newComment = await dispatch(Commenter(finalComment, postId));
        setComments(newComment);
        commentsRef.current.scrollIntoView({behavior: "smooth"})
    }

    const min_textarea_height = 1;
    if (comment) {
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight, min_textarea_height
        )}px`
    }

    let buttonClass = "button_disabled";
    if (comment) {
        buttonClass = "button_enabled";
    } else {
        buttonClass = "button_disabled";
    }

    function signIn() {
        navigate("/auth")
    }



    return (
        <div>
            <div className="comment_container">
                <span className='comment_container_title'>Comments</span>
                {
                    user ? (
                        <>
                            <textarea placeholder='Write A Comment' ref={textareaRef} value={comment} className="commentarea" style={{ minHeight: min_textarea_height }} onChange={(e) => setComment(e.target.value)} />
                            <button className={buttonClass} disabled={!comment} onClick={clickHandler}>
                                Comment
                            </button>
                        </>
                    ) : (
                        <button className='signIn_button' onClick={signIn}>
                            SignIn or register to write a comment
                        </button>
                    )
                }

                <div className="comment_box">
                    {
                        comments?.map(
                            (com, index) => (
                                <div className="comments" key={index} >
                                    <strong>{com.split(": ")[0]}</strong> :
                                    {com.split(":")[1]}
                                </div>
                            )
                        )
                    }
                    <div ref={commentsRef}/>
                </div>
                
            </div>
        </div>
    )
}

export default CommentSection


