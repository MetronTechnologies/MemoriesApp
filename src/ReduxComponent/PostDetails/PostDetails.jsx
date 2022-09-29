import React from 'react';
import { CircularProgress } from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetPostsBySearch, SingleGetter } from '../Redux/AsyncActions/AsyncActions';
import "./PostDetails.css";
import CommentSection from './CommentSection';

function PostDetails() {

    const selector = useSelector(
        state => state.posts
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const isLoading = selector.loading;
    const memory = selector.singleReply;
    const memories = selector.reply;
    const commentPost = memories.filter(
        (mem) => mem?._id === memory?._id
    );

    useEffect(
        () => {
            dispatch(SingleGetter(id))
        }, [dispatch, id]
    );

    useEffect(
        () => {
            if (memory) {
                dispatch(GetPostsBySearch(
                    {
                        search: "none",
                        tags: memory?.tags.join(",")
                    }
                ))
            }
        }, [memory]
    );

    const recommended_memories = memories.filter(
        (mem) => mem?._id !== memory?._id
    )

    if (!memory) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="paper">
                <CircularProgress size="7em" />
            </div>
        );
    }

    const time = new Date(memory.createdAt);

    function openMemory(id) {
        navigate(`/memories/get/${id}`)
    }



    return (
        <div>
            <div className="details_container">
                <div className="details_container_details">
                    <div className="details_container_text_box">
                        <div className="details_container_title">
                            {memory.title}
                        </div>
                        <div className="details_container_tags">
                            {
                                memory.tags.map(
                                    tag => (
                                        <span>#{tag} </span>
                                    )
                                )
                            }
                        </div>
                        <div className="details_container_message">
                            {memory.message}
                        </div>
                        <div className="details_container_creator">
                            Created by: {memory.name}
                        </div>
                        <div className="details_container_time">
                            {time.toString()}
                            <br />
                            {moment(memory.createdAt).fromNow()}
                        </div>
                    </div>
                    <div className="details_container_image_box">
                        <img src={memory.image} alt="" className='details_container_image' />
                    </div>
                </div>
                <div className="details_container_recommendations">
                    <span>You might also like:</span>
                    <hr className='ruler' />
                    <div className="details_recommendations">
                        {
                            recommended_memories?.map(
                                reco => (
                                    <div className='reco_container' onClick={() => openMemory(reco._id)}>
                                        <div className="reco_title">
                                            {reco?.title}
                                        </div>
                                        <div className="reco_image_container">
                                            <img src={reco?.image} alt="" className='reco_image'/>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>

                </div>

            </div>
            
            <CommentSection post={commentPost} postId={memory._id}/>
        </div>
    )
}

export default PostDetails