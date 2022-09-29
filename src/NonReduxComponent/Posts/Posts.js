import React, {useEffect, useState} from 'react';
import {deleteImage, getImages, likeImage} from "../NonReduxService";
import "./Posts.css";
import {Link,} from "react-router-dom";
import "../../font-awesome-4.7.0/css/font-awesome.min.css";

function Posts() {
    const [data, setData] = useState([]);

    function retrieve(){
        return (
            getImages()
                .then(
                    (response) => {
                        console.log(response);
                        setData(response);
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
        );
    }

    function remove(id){
        return (
            deleteImage(id)
                .then(
                    () => {
                        retrieve()
                    }
                )
        );
    }

   function like(id) {
        return (
            likeImage(id)
                .then(
                    () => {
                        retrieve()
                    }
                )
        );
    }


    useEffect(
        () => {
            retrieve()
        }
            , []
    );

    return (
        <div>
            <div>
                <button>
                    <Link to={"/addimage"} className="add_link">
                        Add Image
                    </Link>
                </button>
            </div>
            <div className="main_container">
                {data?.map((item) => (
                    <div className="image_gallery" key={item._id}>
                        <div className="title_container">
                            <Link to={`/editimage/${item._id}`} className="update_link">
                                <span className="update">...</span>
                            </Link>
                            <span className="image_creator">{item.creator}</span>
                            <span className="image_title">{item.title}</span>
                            <span className="image_message">{item.message}</span>
                            <span className="image_tag">{"#"+item.tags}</span>

                        </div>
                        <div className="image_container">
                            <img className="image" src={item.image} alt="" />
                        </div>
                        <div className="actions">
                            <span className="fa fa-trash delete_icon" onClick={(e) => remove(item._id)}/>
                            <span className="fa fa-heart like_icon" onClick={() => like(item._id)} >{item.likeCount}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;