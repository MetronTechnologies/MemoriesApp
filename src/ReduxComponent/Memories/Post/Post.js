import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Post.css";
import moment from "moment";
import { Deleter, Liker } from "../../Redux/AsyncActions/AsyncActions";
import "../../font-awesome-4.7.0/css/font-awesome.min.css";
import { createImageFromInitials } from "../../Utilities/ImageInitials";
import { getRandomColor } from "../../Utilities/RandomColor";
import { useNavigate } from "react-router-dom";

function Post({ item, setCurrentId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"))

  const name = item.name;
  const one_name = name?.split(" ")[1];
  const [likes, setLikes] = useState(item?.likes);
  const userId = user?.userToken?.googleId || user?.userToken._id;
  const hasLikedPost = likes.find(
    (like) => like === userId
  );
  
  async function likeHandler(){
    dispatch(Liker(item._id))
    if(hasLikedPost) {
      setLikes(likes.filter(
          id => id !== userId
        )
      )
    } else {
      setLikes([...likes, userId])
    }
  }

  function openPosts() {
    navigate(`/memories/get/${item._id}`)
  }

  const Likes = () => {
    if (likes) {
      return likes.find(
        (like) => like === (userId)
      ) ? (
        <>
          <span className="fa fa-thumbs-up" />&nbsp;{likes.length > 2 ? `${one_name} and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <span className="fa fa-thumbs-up" />&nbsp;{likes.length > 0 ? likes.length : ""} {likes.length === 1 || likes.length < 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return <>
      <span className="fa fa-thumbs-up" />&nbsp;Like
    </>

  }

  return (
    <div className="post">
      <div className="individual_posts" key={item._id}>
        <div className="cont">
          <div className="cont_one">
            <div>
              <img className="avatar" src={createImageFromInitials(500, name, getRandomColor())} alt="" />
            </div>
            <div className="cont_one_two">
              <span className="image_creator">{item.name}</span>
              <span className="image_title">{item.title}</span>
            </div>
            {
              (user?.userToken?.googleId === item?.creator || user?.userToken?._id === item?.creator) && (
                <i className="cont_one_three fa fa-ellipsis-v" onClick={() => setCurrentId(item._id)} />
              )
            }
          </div>
          <div className="cont_two">
            <img onClick={openPosts} className="count_two_one" src={item.image} alt="" />
          </div>
        </div>
        <div className="title_container">
          <span className="timer">{moment(item.createdAt).fromNow()}</span>
          <span className="image_tag">
            {item.tags.map((tag) => ` #${tag} `)}
          </span>
          <span className="image_message">{item.message}</span>
          <div className="action_bar">
            <div className="like_bar">
              <button
                className="like_button"
                disabled={!user?.userToken}
                onClick={likeHandler}
              >
                <Likes />
              </button>
            </div>
            <div className="delete_bar">
              {
                (user?.userToken?.googleId === item?.creator || user?.userToken?._id === item?.creator) && (
                  <span
                    className="fa fa-trash-o delete_button"
                    onClick={() => dispatch(Deleter(item._id)) && setCurrentId(0)}
                  />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
