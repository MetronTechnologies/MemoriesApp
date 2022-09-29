import React from 'react';
import { useSelector } from "react-redux";
import "../font-awesome-4.7.0/css/font-awesome.min.css";
import Post from "./Post/Post";
import "./Memories.css";

function Memories({ setCurrentId }) {
    const  userData  = useSelector(
        (state) => {
            return (
                state.posts
            );
        }
    )

    if (!userData.reply.length && !userData.loading) {
        return "No Posts"
    }

    function DataState(data) {
        if(data.loading) {
            return (
                <div>
                    <span className="fa fa-spinner fa-3x"/>
                    <h3>Bringing you good memories... </h3>
                </div>
                
            );
        }
        if (data.error) {
            return (
                <span className="fa fa-spinner">{data.error}... </span>
            );
        }
        else {
            return (
                <div className="memory_container">
                    {
                        data.reply.map(
                            (item) => {
                                return (
                                    <Post item={item} setCurrentId={setCurrentId} />
                                )
                            }
                        )
                    }
                </div>
            );
        }
    }

    return (
        DataState(userData)
    );
}

export default Memories;